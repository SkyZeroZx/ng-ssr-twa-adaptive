import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';

@Directive({
  selector: '[appHeartWish]',
  host: {
    '(click)': 'onClick()',
  },
})
export class HeartWishDirective {
  constructor(
    private buttonElement: ElementRef,
    private readonly renderer2: Renderer2
  ) {}

  private brokenHeartAnimation$!: Subscription;

  onClick() {
    const element = this.buttonElement.nativeElement as HTMLElement;

    const brokenHeart = element.getElementsByClassName('broken-heart')[0];

    brokenHeart.classList.remove('hidden');

    this.listenerBrokenHeart(brokenHeart);

    const isActive = element.classList.contains('active');

    if (isActive) {
      this.deactivateHeart(element);
    } else {
      this.activateHeart(element, brokenHeart);
    }
  }

  private activateHeart(element: HTMLElement, brokenHeart: Element) {
    this.renderer2.addClass(brokenHeart, 'hidden');
    this.renderer2.removeClass(element, 'deactivate');
    this.renderer2.addClass(element, 'active');
  }

  private deactivateHeart(element: HTMLElement) {
    this.renderer2.removeClass(element, 'active');

    this.renderer2.addClass(element, 'deactivate');
    setTimeout(() => {
      this.renderer2.removeClass(element, 'deactivate');
    }, 700);
  }

  private listenerBrokenHeart(brokenHeart: Element) {
    this.brokenHeartAnimation$ = fromEvent(
      brokenHeart,
      'animationend'
    ).subscribe((event: Event) => {
      const { animationName } = event as AnimationEvent;
      if (animationName === 'crackRight') {
        brokenHeart.classList.add('hidden');
      }
      this.brokenHeartAnimation$.unsubscribe();
    });
  }
}
