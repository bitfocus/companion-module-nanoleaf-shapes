const { combineRgb } = require('@companion-module/base')
const { colord } = require('colord')

module.exports = function (self) {
	const presets = {}
	const WHITE = combineRgb(255, 255, 255)
	const BLACK = combineRgb(0, 0, 0)
	const RED = combineRgb(255, 0, 0)

	for (const effect of self.CHOICES_EFFECTS) {
		presets[`effect_${effect.id}`] = {
			type: 'button',
			category: 'Effects',
			name: effect.label,
			style: {
				text: effect.label,
				size: 'auto',
				color: WHITE,
				bgcolor: BLACK,
			},
			steps: [
				{
					down: [
						{
							actionId: 'setEffect',
							options: {
								effect: effect.id
							}
						}
					],
					up: [],
				}
			],
			feedbacks: [
				{
					feedbackId: 'effect',
					options: {
						effect: effect.id
					},
					style: {
						color: BLACK,
						bgcolor: RED,
					}
				}
			]
		}
	}

	for (var hue=0; hue<360; hue+=30) {
		presets[`hue_${hue}`] = {
			type: 'text',
			category: 'Solid color',
		};
		[100,50].forEach( saturation => {
			[100,75,50].forEach( brightness => {
				const bgRgb = colord({h: hue, s: saturation, v: brightness, a:1}).toRgb()
				const bgColor = combineRgb(bgRgb.r, bgRgb.g, bgRgb.b)
				presets[`color_h${hue}s${saturation}v${brightness}`] = {
					type: 'button',
					category: 'Solid color',
					name: `color_h${hue}`,
					style: {
						text: `H ${hue}\nS ${saturation}\nV ${brightness}`,
						size: '14pt',
						color: WHITE,
						bgcolor: bgColor,
					},
					steps: [
						{
							down: [
								{
									actionId: 'setHsvColor',
									options: {
										hue: hue,
										saturation: saturation,
										value: brightness,
									}
								}
							],
							up: []
						}
					],
					feedbacks: [
						{
							feedbackId: 'hsvColor',
							options: {
								hue: hue,
								saturation: saturation,
								value: brightness,
							},
							style: {
								color: BLACK,
								text: 'X',
							}
						}
					]
				}
			})
		})
	}


	presets['togglePower'] = {
		type: 'button',
		category: 'Misc',
		name: 'Toggle Power',
		style: {
			text: 'Toggle Power',
			size: 'auto',
			color: WHITE,
			bgcolor: BLACK,
		},
		steps: [
			{
				down: [
					{
						actionId: 'togglePower',
						options: []
					},
				],
				up: []
			}
		],
		feedbacks: [
			{
				feedbackId: 'power',
				options: [],
				style: {
					color: BLACK,
					bgcolor: RED,
				}
			}
		]
	}

	return presets
}

