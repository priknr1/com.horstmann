'use strict';

const path = require('path');
const ZwaveDriver = require('homey-zwavedriver');

// http://www.pepper1.net/zwavedb/device/51
// http://www.pepper1.net/zwavedb/device/170
// http://products.z-wavealliance.org/products/115

module.exports = new ZwaveDriver(path.basename(__dirname), {
	capabilities: {
		'measure_battery': {
			'getOnWakeUp': true,
			'command_class'				: 'COMMAND_CLASS_BATTERY',
			'command_get'				: 'BATTERY_GET',
			'command_report'			: 'BATTERY_REPORT',
			'command_report_parser'		: function( report ) {
				return report['Battery Level (Raw)'][0];
			}
		},		
		'measure_temperature': {
			'getOnWakeUp': true,
			'command_class'				: 'COMMAND_CLASS_SENSOR_MULTILEVEL',
			'command_get'				: 'SENSOR_MULTILEVEL_GET',
			'command_get_parser'		: function(){
				return {
					'Sensor Type': 'Temperature (version 1)',
					'Properties1': {
						'Scale': 0
					}
				}
			},
			'command_report'			: 'SENSOR_MULTILEVEL_REPORT',
			'command_report_parser'		: function( report ){
				if( report['Sensor Type'] !== 'Temperature (version 1)' )
					return null;

				return report['Sensor Value (Parsed)'];
			}
		},
		'target_temperature': {
			'getOnWakeUp': true,
			'setOnWakeUp': true,
			'command_class'				: 'COMMAND_CLASS_THERMOSTAT_SETPOINT',
			'command_get'				: 'THERMOSTAT_SETPOINT_GET',
			'command_get_parser'		: function(){
				return {
					'Sensor Type': 'Set Point (version 1)',
					'Properties1': {
						'Scale': 0
					}
				}
			},
			'command_set'				: 'THERMOSTAT_SETPOINT_SET',
			'command_report'			: 'THERMOSTAT_SETPOINT_REPORT',
			'command_report_parser'		: function( report ){
				if( report['Sensor Type'] !== 'Set Point (version 1)' )
					return null;

				return report['Sensor Value (Parsed)'];
			}
				}
	},
	settings: {
		"enable_temperature_sensor": {
		"index": 1,
		"size": 1
		},
		"temperature_unit": {
			"index": 2,
			"size": 1
		},
		"temperature_delta": {
			"index": 3,
			"size": 1
		}
	}
});
