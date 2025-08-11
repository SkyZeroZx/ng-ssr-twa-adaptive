import { NgOptimizedImage } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';

import { slideAnimations } from './carousel.animations';
import { Slide } from './carousel.interface';
import { SwipeDirective } from '../swipe/directive/swipe.directive';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  imports: [NgOptimizedImage, SwipeDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [...slideAnimations],
})
export class CarouselComponent {
  slides = input.required<Slide[]>();

  previewImages = computed(() => this.slides().toSpliced(3));

  hasLengthOne = computed(() => this.slides().length === 1);

  protected animationDirection = signal<'right' | 'left'>('right');

  enterStart = computed(() => {
    const isRight = this.animationDirection() === 'right';
    if (isRight) {
      return '-100%';
    }
    return '100%';
  });

  currentSlide = signal(0);

  isFirst = true;

  onChangeSlide = output<Slide>();

  constructor() {
    afterNextRender(() => {
      this.isFirst = false;
    });
  }

  onPreviousClick() {
    this.animationDirection.set('left');

    const previous = this.currentSlide() - 1;
    this.currentSlide.set(previous < 0 ? this.slides().length - 1 : previous);
    this.changeSlide();
  }

  onNextClick() {
    this.animationDirection.set('right');
    const next = this.currentSlide() + 1;
    this.currentSlide.set(next === this.slides().length ? 0 : next);
    this.changeSlide();
  }

  changeImage(index: number) {
    this.currentSlide.set(index);
    this.changeSlide();
  }

  changeSlide() {
    this.onChangeSlide.emit(this.slides()[this.currentSlide()]);
  }
}
