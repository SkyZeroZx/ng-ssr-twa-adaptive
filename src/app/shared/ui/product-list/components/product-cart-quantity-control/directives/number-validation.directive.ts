import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[onlyNumber]',
  host: {
    '(keydown)': 'onInputChange($event)',
  },
})
export class NumberValidationDirective {
  private readonly elementRef = inject(ElementRef<HTMLInputElement>);
  private readonly allowedKeys = [
    'Backspace',
    'Tab',
    'ArrowLeft',
    'ArrowDown',
    'ArrowUp',
    'ArrowRight',
    'Home',
    'End',
  ];

  onInputChange(event: KeyboardEvent) {
    const inputValue = this.elementRef.nativeElement.value;

    const inputLength = inputValue.length;

    if (inputLength === 1 && 'Backspace'.includes(event.key)) {
      event.preventDefault();
    }

    if (this.allowedKeys.includes(event.key)) {
      return;
    }

    if (event.key >= '0' && event.key <= '9') {
      return;
    }

    event.preventDefault();
  }
}
