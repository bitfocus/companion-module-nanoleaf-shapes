const { combineRgb } = require('@companion-module/base')

module.exports = async function (self) {
	self.setFeedbackDefinitions({
		effect: {
			name: 'Effect',
			type: 'boolean',
			label: 'Active effect',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
                                {
                                        type: 'dropdown',
                                        id: 'effect',
                                        label: 'Effect',
                                        choices: [...self.CHOICES_EFFECTS, {id: '*Solid*', label: 'Solid color'}],
                                        default: self.CHOICES_EFFECTS[0].id,
                                },
			],
			callback: (feedback) => {
				if (self.deviceInfo.effects.select == feedback.options.effect) {
					return true
				} else {
					return false
				}
			},
		},
		hsvColor: {
			name: 'HSV Color',
			type: 'boolean',
			label: 'HSV Color',
			defaultStyle: {
				text: 'X',
			},
                        options: [
                                {
                                        type: 'number',
                                        id: 'hue',
                                        label: 'Hue',
                                        min: self.MIN_HUE,
                                        max: self.MAX_HUE,
                                        default: 120,
                                        step: 1,
                                },
                                {
                                        type: 'number',
                                        id: 'saturation',
                                        label: 'Saturation',
                                        min: self.MIN_SATURATION,
                                        max: self.MAX_SATURATION,
                                        default: 100,
                                        step: 1,
                                },
                                {
                                        type: 'number',
                                        id: 'value',
                                        label: 'Value',
                                        min: 0,
                                        max: 100,
                                        default: 100,
                                        step: 1,
                                },
                        ],
			callback: (feedback) => {
				if (self.deviceInfo.effects.select == '*Solid*'
					&& self.deviceInfo.state.hue.value == feedback.options.hue
					&& self.deviceInfo.state.sat.value == feedback.options.saturation
					&& self.deviceInfo.state.brightness.value == feedback.options.value) {
					return true
				} else {
					return false
				}
			}
		},
		power: {
			name: 'Power state',
			type: 'boolean',
			label: 'Power state',
			defaultStyle: {
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(255, 0, 0),
			},
			options: [],
			callback: (feedback) => {
				return self.deviceInfo.state.on.value
			}
		}
	})
}
