import {
  DestroyRef,
  Directive,
  ElementRef,
  NgZone,
  afterNextRender,
  inject,
  output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';

@Directive({
  selector: '[scrollEnd]',
})
export class ScrollEndDirective {
  readonly nearEnd = output<void>();

  private readonly el: ElementRef<HTMLElement> = inject(ElementRef);
  private readonly ngZone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      this.runOutSide(() => {
        const scroll$ = fromEvent(document, 'scroll', {
          passive: true,
        }).pipe(takeUntilDestroyed(this.destroyRef));

        scroll$.subscribe(() => {
          // height of whole window page
          const heightOfWholePageWindow =
            window.document.documentElement.scrollHeight;

          const heightOfWholeObserver =
            window.document.documentElement.scrollHeight;
          // how big in pixels the element is
          const heightOfElement = this.el.nativeElement.scrollHeight;

          // currently scrolled Y position

          const currentScrolledY = window.scrollY;

          // height of opened window - shrinks if console is opened
          const innerHeight = window.innerHeight;

          /**
           * the area between the start of the page and when this element is visible
           * in the parent component
           */
          const spaceOfElementAndPage = heightOfWholeObserver - heightOfElement;

          // calculated whether we are near the end
          const scrollToBottom =
            heightOfElement -
            innerHeight -
            currentScrolledY +
            spaceOfElementAndPage;
          // if the user is near end
          if (scrollToBottom < heightOfWholePageWindow / 3) {
            this.runInZone(() => {
              this.nearEnd.emit();
            });
          }
        });
      });
    });
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  runOutSide(callbak: Function) {
    this.ngZone.runOutsideAngular(() => {
      callbak();
    });
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  runInZone(callbak: Function) {
    this.ngZone.run(() => {
      callbak();
    });
  }
}
