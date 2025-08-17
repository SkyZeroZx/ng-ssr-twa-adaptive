import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[onlyNumber]',
})
export class NumberValidationDirective {
  constructor(private readonly elementRef: ElementRef<HTMLInputElement>) {}

  @HostListener('keydown', ['$event']) onInputChange(event: KeyboardEvent) {
    const inputValue = this.elementRef.nativeElement.value;

    const allowedKeys = [
      'Backspace',
      'Tab',
      'ArrowLeft',
      'ArrowDown',
      'ArrowUp',
      'ArrowRight',
      'Home',
      'End',
    ];

    const inputLength = inputValue.length;

    if (inputLength === 1 && 'Backspace'.includes(event.key)) {
      event.preventDefault();
    }

    if (allowedKeys.includes(event.key)) {
      return;
    }

    if (event.key >= '0' && event.key <= '9') {
      return;
    }

    event.preventDefault();
  }
}
