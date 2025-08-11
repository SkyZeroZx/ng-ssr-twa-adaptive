import { style, animate, transition, group, query, trigger } from '@angular/animations';

export const slideAnimations = [
	trigger('slideToggle', [
		transition(
			'* => *',
			[
				group([
					query(':enter', style({ transform: 'translateX({{ enterStart }})' }), {
						optional: true
					}),
					query(
						':leave',
						[
							animate(
								'250ms cubic-bezier(0.785, 0.135, 0.15, 0.86)',
								style({ transform: 'translateX({{ leaveEnd }})' })
							)
						],
						{
							optional: true
						}
					),
					query(
						':enter',
						[
							animate(
								'250ms cubic-bezier(0.785, 0.135, 0.15, 0.86)',
								style({ transform: 'translateX(0)' })
							)
						],
						{
							optional: true
						}
					)
				])
			],
			{
				params: {
					leaveEnd: '',
					enterStart: ''
				}
			}
		)
	])
];
