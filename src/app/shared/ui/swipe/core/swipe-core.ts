import { fromEvent, Observable, race, Subscription } from 'rxjs';
import { elementAt, map, switchMap, takeUntil, tap } from 'rxjs/operators';

import {
	SwipeCoordinates,
	SwipeDirection,
	SwipeEvent,
	SwipeStartEvent,
	SwipeSubscriptionConfig
} from './interface/swipe.interface';

export function createSwipeSubscription({
  domElement,
  onSwipeEnd,
  onSwipeLeft,
  onSwipeRight,
}: SwipeSubscriptionConfig): Subscription {
  if (!(domElement instanceof HTMLElement)) {
    throw new Error('Provided domElement should be an instance of HTMLElement');
  }

  if (typeof onSwipeEnd !== 'function') {
    throw new Error(
      'At least one of the following swipe event handler functions should be provided: onSwipeEnd'
    );
  }
  const eventListenerOptions = {
    passive: true,
  };

  const touchStarts$ = fromEvent<TouchEvent>(
    domElement,
    'touchstart',
    eventListenerOptions
  ).pipe(map(getTouchCoordinates));
  const touchMoves$ = fromEvent<TouchEvent>(
    domElement,
    'touchmove',
    eventListenerOptions
  ).pipe(map(getTouchCoordinates));
  const touchEnds$ = fromEvent<TouchEvent>(
    domElement,
    'touchend',
    eventListenerOptions
  ).pipe(map(getTouchCoordinates));
  const touchCancels$ = fromEvent<TouchEvent>(
    domElement,
    'touchcancel',
    eventListenerOptions
  );

  const touchStartsWithDirection$: Observable<SwipeStartEvent> =
    touchStarts$.pipe(
      switchMap((touchStartEvent: SwipeCoordinates) =>
        touchMoves$.pipe(
          elementAt(3),
          map((touchMoveEvent: SwipeCoordinates) => ({
            x: touchStartEvent.x,
            y: touchStartEvent.y,
            direction: getTouchDirection(touchStartEvent, touchMoveEvent),
          }))
        )
      )
    );

  return touchStartsWithDirection$
    .pipe(
      switchMap((touchStartEvent) =>
        touchMoves$.pipe(
          map((touchMoveEvent) =>
            getTouchDistance(touchStartEvent, touchMoveEvent)
          ),
          takeUntil(
            race(
              touchEnds$.pipe(
                map((touchEndEvent) =>
                  getTouchDistance(touchStartEvent, touchEndEvent)
                ),
                tap((coordinates: SwipeCoordinates) => {
                  if (typeof onSwipeEnd !== 'function') {
                    return;
                  }
                  onSwipeEnd(getSwipeEvent(touchStartEvent, coordinates));
                }),
                tap((coordinates: SwipeCoordinates) => {
                  if (typeof onSwipeLeft !== 'function') {
                    return;
                  }
                  const swipeEvent = getSwipeEvent(
                    touchStartEvent,
                    coordinates
                  );
                  const isX = swipeEvent.direction === SwipeDirection.X;
                  const isPositive = swipeEvent.distance > 0;
                  const isLeft = isX && isPositive;
                  const isRight = isX && !isPositive;

                  if (isLeft) {
                    onSwipeLeft(swipeEvent);
                  }

                  if (isRight && typeof onSwipeRight === 'function') {
                    onSwipeRight(swipeEvent);
                  }
                })
              ),
              touchCancels$
            )
          )
        )
      )
    )
    .subscribe();
}

function getTouchCoordinates(touchEvent: TouchEvent): SwipeCoordinates {
	return {
		x: touchEvent.changedTouches[0].clientX,
		y: touchEvent.changedTouches[0].clientY
	};
}

function getTouchDistance(
	startCoordinates: SwipeCoordinates,
	moveCoordinates: SwipeCoordinates
): SwipeCoordinates {
	return {
		x: moveCoordinates.x - startCoordinates.x,
		y: moveCoordinates.y - startCoordinates.y
	};
}

function getTouchDirection(
	startCoordinates: SwipeCoordinates,
	moveCoordinates: SwipeCoordinates
): SwipeDirection {
	const { x, y } = getTouchDistance(startCoordinates, moveCoordinates);
	return Math.abs(x) < Math.abs(y) ? SwipeDirection.Y : SwipeDirection.X;
}

function getSwipeEvent(
	touchStartEvent: SwipeStartEvent,
	coordinates: SwipeCoordinates
): SwipeEvent {
	return {
		direction: touchStartEvent.direction,
		distance: coordinates[touchStartEvent.direction]
	};
}
