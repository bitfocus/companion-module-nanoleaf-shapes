module.exports = function (self) {
	self.setActionDefinitions({
		identify: {
			name: 'Identify',
			description: 'Causes panels to flash in unison',
			options: [],
			callback: async (event) => {
				self.client.identify().then(res => {
					console.log(res)
				}).catch(err => {
					self.log("error",err)
				})
			},
		},
		turnOn: {
			name: 'Turn on',
			description: 'Turns on the device',
			options: [],
			callback: async (event) => {
				self.client.turnOn().then(res => {
					console.log(res)
				}).catch(err => {
					self.log("error",err)
				})
			},
		},
		turnOff: {
			name: 'Turn off',
			description: 'Turns off the device',
			options: [],
			callback: async (event) => {
				self.client.turnOff().then(res => {
					console.log(res)
				}).catch(err => {
					self.log("error",err)
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
					min: 0,
					max: 255,
					default: 10,
					step: 1,
				}
			],
			callback: async (event) => {
				self.client.setSaturation(event.options.saturation).then(res => {
					console.log(res)
				}).catch(err => {
					self.log("error",err)
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
					min: -255,
					max: 255,
					default: 10,
					step: 1,
				}
			],
			callback: async (event) => {
				self.client.incrementSaturation(event.options.saturation).then(res => {
					console.log(res)
				}).catch(err => {
					self.log("error",err)
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
					min: 0,
					max: 255,
					default: 10,
					step: 1,
				}
			],
			callback: async (event) => {
				self.client.setBrightness(event.options.brightness).then(res => {
					console.log(res)
				}).catch(err => {
					self.log("error",err)
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
					min: -255,
					max: 255,
					default: 10,
					step: 1,
				}
			],
			callback: async (event) => {
				self.client.incrementBrightness(event.options.brightness).then(res => {
					console.log(res)
				}).catch(err => {
					self.log("error",err)
				})
			},
		},
		setDurationBrightness: {
			name: 'Set Duration Brightness',
			description: 'Sets brightness value temporarily',
			options: [
				{
					type: 'number',
					id: 'brightness',
					label: 'Brightness',
					min: 0,
					max: 255,
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
				self.client.setDurationBrightness(event.options.duration, event.options.brightness).then(res => {
					console.log(res)
				}).catch(err => {
					self.log("error",err)
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
					min: 0,
					max: 255,
					default: 10,
					step: 1,
				}
			],
			callback: async (event) => {
				self.client.setHue(event.options.hue).then(res => {
					console.log(res)
				}).catch(err => {
					self.log("error",err)
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
					min: -255,
					max: 255,
					default: 10,
					step: 1,
				}
			],
			callback: async (event) => {
				self.client.incrementHue(event.options.hue).then(res => {
					console.log(res)
				}).catch(err => {
					self.log("error",err)
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
					min: 2000,
					max: 8000,
					default: 3500,
					step: 1,
				}
			],
			callback: async (event) => {
				self.client.setColorTemperature(event.options.temperature).then(res => {
					console.log(res)
				}).catch(err => {
					self.log("error",err)
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
					console.log(res)
				}).catch(err => {
					self.log("error",err)
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
					console.log(res)
				}).catch(err => {
					self.log("error",err)
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
				console.log('event', JSON.stringify(event))
				console.log('color', event.options.color)
				var r = (event.options.color>>16)%256
				var g = (event.options.color>> 8)%256
				var b = (event.options.color    )%256
				self.client.setRgbColor(r, g, b)
			}
		},
		setHsvColor: {
			name: 'Set HSV Color',
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
					console.log(res)
				}).catch(err => {
					self.log("error",err)
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
					console.log(res)
				}).catch(err => {
					self.log("error",err)
				})
			},
		},



				
	})
}
