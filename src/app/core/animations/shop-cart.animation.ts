import {
	trigger,
	transition,
	style,
	animate,
	animateChild,
	query,
	stagger
} from '@angular/animations';

export const shopCartAnimation = [
	trigger('list', [
		transition(':enter', [query('@items', stagger(250, animateChild()), { optional: true })])
	]),
	trigger('items', [
		transition(':enter', [
			style({ transform: 'scale(0.5)', opacity: 0 }), // initial
			animate('0.8s cubic-bezier(.8, -0.6, 0.2, 1.5)', style({ transform: 'scale(1)', opacity: 1 })) // final
		]),
		transition(':leave', [
			style({ transform: 'scale(1)', transition: 'all 0.4s ease 0s', opacity: 1, height: '*' }),
			animate(
				'0.8s cubic-bezier(.8, -0.6, 0.2, 1.5)',
				style({
					transform: 'scale(0.5)',
					opacity: 0,
					height: '0px',
					display: 'none',
					margin: '0px'
				})
			)
		])
	])
];
