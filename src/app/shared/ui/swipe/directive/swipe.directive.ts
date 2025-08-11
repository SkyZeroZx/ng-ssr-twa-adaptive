import { Subscription } from 'rxjs';

import { Directive, ElementRef, NgZone, OnDestroy, afterNextRender, output } from '@angular/core';

import { SwipeEvent } from '../core/interface/swipe.interface';

@Directive({
	selector: '[appSwipe]'
})
export class SwipeDirective implements OnDestroy {
	private swipeSubscription: Subscription | undefined;

	readonly swipeEnd = output<SwipeEvent>();
	readonly swipeLeft = output<SwipeEvent>();
	readonly swipeRight = output<SwipeEvent>();

	constructor(
		private elementRef: ElementRef,
		private zone: NgZone,
	) {
		afterNextRender(() => {
			this.zone.runOutsideAngular(async () => {
				const swipeCore = await import('../core/swipe-core');
				this.swipeSubscription = swipeCore.createSwipeSubscription({
					domElement: this.elementRef.nativeElement,
					onSwipeEnd: (swipeEndEvent: SwipeEvent) =>
						this.runInZone(() => this.swipeEnd.emit(swipeEndEvent)),
					onSwipeLeft: (swipeLeftEvent: SwipeEvent) =>
						this.runInZone(() => this.swipeLeft.emit(swipeLeftEvent)),
					onSwipeRight: (swipeRightEvent: SwipeEvent) =>
						this.runInZone(() => this.swipeRight.emit(swipeRightEvent))
				});
			});
		});
	}

	private runInZone(fn: () => void) {
		this.zone.run(() => fn());
	}

	ngOnDestroy() {
		this.swipeSubscription?.unsubscribe?.();
	}
}
