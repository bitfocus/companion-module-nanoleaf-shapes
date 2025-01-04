module.exports = function (self) {
	self.setVariableDefinitions([
		{ variableId: 'name', name: 'Device name' },
		{ variableId: 'serialNo', name: 'Serial number' },
		{ variableId: 'manufacturer', name: 'Manufacturer' },
		{ variableId: 'firmwareVersion', name: 'Firmware version' },
		{ variableId: 'hardwareVersion', name: 'Hardware version' },
		{ variableId: 'model', name: 'Model name' },
		{ variableId: 'effectsList', name: 'Effects list' },
		{ variableId: 'state_effect', name: 'Currently selected effect' },
		{ variableId: 'state_brightness', name: 'Current brightness (in static color mode)' },
		{ variableId: 'state_hue', name: 'Current hue (in static color mode)' },
		{ variableId: 'state_ct', name: 'Current color temperature (in static color mode)' },
		{ variableId: 'state_saturation', name: 'Current saturation (in static color mode)' },
		{ variableId: 'state_colorMode', name: 'Current color mode' },
		{ variableId: 'state_power', name: 'Current power state' },
	])
}
