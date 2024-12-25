const { InstanceBase, Regex, runEntrypoint, InstanceStatus } = require('@companion-module/base')
const UpgradeScripts = require('./upgrades')
const UpdateActions = require('./actions')
const UpdateFeedbacks = require('./feedbacks')
const UpdateVariableDefinitions = require('./variables')
const { ServiceDiscovery } = require('nanoleaf-client')

class ModuleInstance extends InstanceBase {
	constructor(internal) {
		super(internal)
	}

	async init(config) {
		this.config = config

		this.updateStatus(InstanceStatus.Ok)

		// TODO getEffectList
		var effects = [
			"Rainbow",
			"Flames",
			"Sunset",
			"Water"
		]
		this.CHOICES_EFFECTS = []
		effects.forEach((e) => {this.CHOICES_EFFECTS.push({id: e, label:e})})

		this.updateActions() // export actions
		this.updateFeedbacks() // export feedbacks
		this.updateVariableDefinitions() // export variable definitions
	}
	// When module gets deleted
	async destroy() {
		this.log('debug', 'destroy')
	}

	async configUpdated(config) {
		this.config = config
	}

	// Return config fields for web config
	getConfigFields() {
		console.log(1)
		this.serviceDiscovery = new ServiceDiscovery()
		console.log(2)
		var devices
		this.serviceDiscovery.discoverNanoleaf().then(d => {devices=d})
		console.log(3)
		// TODO
		this.CHOICES_DEVICES = [
			{ id: '1', label: 'Device 1' },
			{ id: '2', label: 'The other device' }
		]
		console.log(4)
		return [
			{
				type: 'dropdown',
				id: 'device',
				label: 'Nanoleaf device',
				width: 12,
				default: '1', 
				choices: this.CHOICES_DEVICES,
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
