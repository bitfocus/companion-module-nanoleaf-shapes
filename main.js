const { InstanceBase, Regex, runEntrypoint, InstanceStatus } = require('@companion-module/base')
const UpgradeScripts = require('./upgrades')
const UpdateActions = require('./actions')
const UpdateFeedbacks = require('./feedbacks')
const UpdateVariableDefinitions = require('./variables')
const getPresetDefinitions = require('./presets')
const { ServiceDiscovery, NanoleafClient } = require('./nanoleaf/index.mjs')

class ModuleInstance extends InstanceBase {
	client = null
	pollInterval = null
	CHOICES_EFFECTS = [ {id: 'x', label: '** Connection failed **'} ]
	MIN_BRIGHTNESS = 0
	MAX_BRIGHTNESS = 100
	MIN_CT = 1200
	MAX_CT = 6500
	MIN_HUE = 0
	MAX_HUE = 360
	MIN_SATURATION = 0
	MAX_SATURATION = 100

	constructor(internal) {
		super(internal)
	}

	async init(config) {
		this.updateVariableDefinitions() // export variable definitions
		await this.configUpdated(config)

		this.updateActions() // export actions
		this.updateFeedbacks() // export feedbacks
	}

	// When module gets deleted
	async destroy() {
		this.log('debug', 'destroy')
		if (this.pollInterval != null) {
			clearInterval(this.pollInterval)
		}
	}

	async configUpdated(config) {
		var reconnect = false
		if (this.client == null || this.config.ip != config.ip) {
			reconnect = true
		}

		this.config = config

		if (reconnect) {
			await this.reconnect()
		}
				
	}

	async reconnect() {
		if (this.config.token != undefined) {
			this.client = new NanoleafClient(this.config.ip, this.config.token)
			this.updateStatus(InstanceStatus.Ok)
			await this.initPolling()
			this.setPresetDefinitions(getPresetDefinitions(this))
		} else {
			this.updateStatus(InstanceStatus.Connecting, "Long-press the NanoLeaf's power button")
			this.client = new NanoleafClient(this.config.ip)
			let self = this;
			(async function x() {
				while (true) {
					try {
						const result = await self.client.authorize()
						self.config.token = result
						self.saveConfig(self.config)
						self.log("info", "Received new token")
						self.updateStatus(InstanceStatus.Ok)
						self.client.identify()
						await self.initPolling()
						this.setPresetDefinitions(getPresetDefinitions(this))
						break
					} catch (error) {
						self.log("info", "Connection failed, retrying in 5 seconds. Long-press the power button of your device to connect.")
						await new Promise(resolve => setTimeout(resolve, 5000));
					}
				}
			})()
		}
	}

	async initPolling() {
		if (this.pollInterval != null) {
			clearInterval(this.pollInterval)
		}

		this.deviceInfo = await this.client.getInfo()
		this.CHOICES_EFFECTS = []
		this.deviceInfo.effects.effectsList.forEach((e) => {
			this.CHOICES_EFFECTS.push({id: e, label:e})
		})

		this.MIN_BRIGHTNESS = this.deviceInfo.state.brightness.min
		this.MAX_BRIGHTNESS = this.deviceInfo.state.brightness.max
		this.MIN_CT = this.deviceInfo.state.ct.min
		this.MAX_CT = this.deviceInfo.state.ct.max
		this.MIN_HUE = this.deviceInfo.state.hue.min
		this.MAX_HUE = this.deviceInfo.state.hue.max
		this.MIN_SATURATION = this.deviceInfo.state.sat.min
		this.MAX_SATURATION = this.deviceInfo.state.sat.max

		var variableValues = {
			name: this.deviceInfo.name,
			serialNo: this.deviceInfo.serialNo,
			manufacturer: this.deviceInfo.manufacturer,
			firmwareVersion: this.deviceInfo.firmwareVersion,
			hardwareVersion: this.deviceInfo.hardwareVersion,
			model: this.deviceInfo.model,
			effectsList: this.deviceInfo.effects.effectsList,
		}
		this.setVariableValues(variableValues)

		this.updateActions()

		this.pollInterval = setInterval( async () => {
			var checkFeedbacks = false
			var deviceInfo = await this.client.getInfo()
			var variableValues = {
				state_effect: deviceInfo.effects.select,
				state_brightness: deviceInfo.state.brightness.value,
				state_hue: deviceInfo.state.hue.value,
				state_ct: deviceInfo.state.ct.value,
				state_saturation: deviceInfo.state.sat.value,
				state_colorMode: deviceInfo.state.colorMode,
				state_power: deviceInfo.state.on.value,
			}
			if (deviceInfo.effects.select != this.deviceInfo.effects.select) {
				checkFeedbacks = true
			}
			if (deviceInfo.state.hue.value != this.deviceInfo.state.hue.value 
				|| deviceInfo.state.sat.value != this.deviceInfo.state.sat.value
				|| deviceInfo.state.brightness.value != this.deviceInfo.state.brightness.value
				|| deviceInfo.state.on.value != this.deviceInfo.state.on.value) {
				checkFeedbacks = true
			}
			this.deviceInfo = deviceInfo
			if (checkFeedbacks) {
				this.checkFeedbacks()
			}
			this.setVariableValues(variableValues)
		}, 1000)

	}

	// Return config fields for web config
	getConfigFields() {
		return [
			{
				type: 'textinput',
				id: 'ip',
				label: 'Device IP',
				width: 12,
				default: '',
				regex: Regex.IP,
			},
		]
	}

	updateActions() {
		UpdateActions(this)
	}

	updateFeedbacks() {
		UpdateFeedbacks(this)
	}

	updateVariableDefinitions() {
		UpdateVariableDefinitions(this)
	}
}

runEntrypoint(ModuleInstance, UpgradeScripts)
