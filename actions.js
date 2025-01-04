module.exports = function (self) {
	self.setActionDefinitions({
		identify: {
			name: 'Identify',
			description: 'Causes panels to flash in unison',
			options: [],
			callback: async (event) => {
				self.client.identify().then(res => {
					self.log('debug', JSON.stringify(res))
				}).catch(err => {
					self.log("error",JSON.stringify(err))
				})
			},
		},
		togglePower: {
			name: 'Toggle power',
			description: 'Toggle the power of the device',
			options: [],
			callback: async (event) => {
				self.client.power(! self.deviceInfo.state.on.value).then(res => {
					self.log('debug', JSON.stringify(res))
				}).catch(err => {
					self.log("error",JSON.stringify(err))
				})
			},
		},
		turnOn: {
			name: 'Turn on',
			description: 'Turns on the device',
			options: [],
			callback: async (event) => {
				self.client.turnOn().then(res => {
					self.log('debug', JSON.stringify(res))
				}).catch(err => {
					self.log("error",JSON.stringify(err))
				})
			},
		},
		turnOff: {
			name: 'Turn off',
			description: 'Turns off the device',
			options: [],
			callback: async (event) => {
				self.client.turnOff().then(res => {
					self.log('debug', JSON.stringify(res))
				}).catch(err => {
					self.log("error",JSON.stringify(err))
				})
			},
		},
		setSaturation: {
			name: 'Set Saturation',
			options: [
				{
					type: 'number',
					id: 'saturation',
					label: 'Saturation',
					min: self.MIN_SATURATION,
					max: self.MAX_SATURATION,
					default: 10,
					step: 1,
				}
			],
			callback: async (event) => {
				self.client.setSaturation(event.options.saturation).then(res => {
					self.log('debug', JSON.stringify(res))
				}).catch(err => {
					self.log("error",JSON.stringify(err))
				})
			},
		},
		changeSaturation: {
			name: 'Change Saturation',
			options: [
				{
					type: 'number',
					id: 'saturation',
					label: 'Change saturation by',
					min: -self.MAX_SATURATION,
					max: self.MAX_SATURATION,
					default: 10,
					step: 1,
				}
			],
			callback: async (event) => {
				self.client.incrementSaturation(event.options.saturation).then(res => {
					self.log('debug', JSON.stringify(res))
				}).catch(err => {
					self.log("error",JSON.stringify(err))
				})
			},
		},
		setBrightness: {
			name: 'Set Brightness',
			options: [
				{
					type: 'number',
					id: 'brightness',
					label: 'Brightness',
					min: self.MIN_BRIGHTNESS,
					max: self.MAX_BRIGHTNESS,
					default: 10,
					step: 1,
				}
			],
			callback: async (event) => {
				self.client.setBrightness(event.options.brightness).then(res => {
					self.log('debug', JSON.stringify(res))
				}).catch(err => {
					self.log("error",JSON.stringify(err))
				})
			},
		},
		changeBrightness: {
			name: 'Change Brightness',
			options: [
				{
					type: 'number',
					id: 'brightness',
					label: 'Change Brightness by',
					min: -self.MAX_BRIGHTNESS,
					max: self.MAX_BRIGHTNESS,
					default: 10,
					step: 1,
				}
			],
			callback: async (event) => {
				self.client.increaseBrightness(event.options.brightness).then(res => {
					self.log('debug', JSON.stringify(res))
				}).catch(err => {
					self.log("error",JSON.stringify(err))
				})
			},
		},
		setDurationBrightness: {
			name: 'Fade to Brightness',
			description: 'Sets brightness value temporarily',
			options: [
				{
					type: 'number',
					id: 'brightness',
					label: 'Brightness',
					min: self.MIN_BRIGHTNESS,
					max: self.MAX_BRIGHTNESS,
					default: 10,
					step: 1,
				},
				{
					type: 'number',
					id: 'duration',
					label: 'Duration',
					min: 0,
					default: 10,
					step: 1,
				},
			],
			callback: async (event) => {
				self.client.setDurationBrightness(event.options.brightness, event.options.duration).then(res => {
					self.log('debug', JSON.stringify(res))
				}).catch(err => {
					self.log("error",JSON.stringify(err))
				})
			},
		},

		setHue: {
			name: 'Set Hue',
			options: [
				{
					type: 'number',
					id: 'hue',
					label: 'Hue',
					min: self.MIN_HUE,
					max: self.MAX_HUE,
					default: 10,
					step: 1,
				}
			],
			callback: async (event) => {
				self.client.setHue(event.options.hue).then(res => {
					self.log('debug', JSON.stringify(res))
				}).catch(err => {
					self.log("error",JSON.stringify(err))
				})
			},
		},
		changeHue: {
			name: 'Change Hue',
			options: [
				{
					type: 'number',
					id: 'hue',
					label: 'Change Hue by',
					min: -self.MAX_HUE,
					max: self.MAX_HUE,
					default: 10,
					step: 1,
				}
			],
			callback: async (event) => {
				self.client.increaseHue(event.options.hue).then(res => {
					self.log('debug', JSON.stringify(res))
				}).catch(err => {
					self.log("error",JSON.stringify(err))
				})
			},
		},

		setColorTemperature: {
			name: 'Set Color Temperature',
			options: [
				{
					type: 'number',
					id: 'temperature',
					label: 'Color Temperature',
					min: self.MIN_CT,
					max: self.MAX_CT,
					default: (self.MAX_CT + self.MIN_CT)/2,
					step: 1,
				}
			],
			callback: async (event) => {
				self.client.setColorTemperature(event.options.temperature).then(res => {
					self.log('debug', JSON.stringify(res))
				}).catch(err => {
					self.log("error",JSON.stringify(err))
				})
			},
		},
		changeColorTemperature: {
			name: 'Change Color Temperature',
			options: [
				{
					type: 'number',
					id: 'temperature',
					label: 'Change Color Temperature by',
					min: -5000,
					max: 5000,
					default: 10,
					step: 1,
				}
			],
			callback: async (event) => {
				self.client.incrementColorTemperature(event.options.temperature).then(res => {
					self.log('debug', JSON.stringify(res))
				}).catch(err => {
					self.log("error",JSON.stringify(err))
				})
			},
		},
		setEffect: {
			name: 'Set Effect',
			options: [
				{
					type: 'dropdown',
					id: 'effect',
					label: 'Effect',
					choices: self.CHOICES_EFFECTS,
					default: self.CHOICES_EFFECTS[0].id,
				}
			],
			callback: async (event) => {
				self.client.setEffect(event.options.effect).then(res => {
					self.log('debug', JSON.stringify(res))
				}).catch(err => {
					self.log("error",JSON.stringify(err))
				})
			},
		},
		setColorPicker: {
			name: 'Set Color (using color picker)',
			options: [
				{
					type: 'colorpicker',
					id: 'color',
					label: 'Color',
					returnType: 'number',
					default: '16776960',
				},
			],
			callback: async (event) => {
				var r = (event.options.color>>16)%256
				var g = (event.options.color>> 8)%256
				var b = (event.options.color    )%256
				self.client.setRgbColor(r, g, b).then(res => {
					self.log('debug', JSON.stringify(res))
				}).catch(err => {
					self.log("error",JSON.stringify(err))
				})
					
			}
		},
		setHsvColor: {
			name: 'Set HSV Color',
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
			callback: async (event) => {
				self.client.setHsvColor(
					event.options.hue,
					event.options.saturation,
					event.options.value
				).then(res => {
					self.log('debug', JSON.stringify(res))
				}).catch(err => {
					self.log("error",JSON.stringify(err))
				})
			},
		},
		setHslColor: {
			name: 'Set HSL Color',
			options: [
				{
					type: 'number',
					id: 'hue',
					label: 'Hue',
					min: 0,
					max: 359,
					default: 120,
					step: 1,
				},
				{
					type: 'number',
					id: 'saturation',
					label: 'Saturation',
					min: 0,
					max: 100,
					default: 100,
					step: 1,
				},
				{
					type: 'number',
					id: 'lightness',
					label: 'Lightness',
					min: 0,
					max: 100,
					default: 100,
					step: 1,
				},
			],
			callback: async (event) => {
				self.client.setHsvColor(
					event.options.hue,
					event.options.saturation,
					event.options.lightness
				).then(res => {
					self.log('debug', JSON.stringify(res))
				}).catch(err => {
					self.log("error",JSON.stringify(err))
				})
			},
		},
	})
}
