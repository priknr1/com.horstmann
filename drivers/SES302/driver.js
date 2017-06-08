'use strict';

const path = require('path'); 
const ZwaveDriver = require('homey-zwavedriver');

// http://www.pepper1.net/zwavedb/device/51
// http://www.pepper1.net/zwavedb/device/170
// http://products.z-wavealliance.org/products/115

module.exports = new ZwaveDriver(path.basename(__dirname), {
	debug: true,
	capabilities: {
		custom_thermostat_mode: {
			'getOnWakeUp': true,
			command_class: 'COMMAND_CLASS_THERMOSTAT_MODE',
			command_get: 'THERMOSTAT_MODE_GET',
			command_report: 'THERMOSTAT_MODE_REPORT',
			command_report_parser: report => {
				var state_on = false;
				if (report && report.hasOwnProperty('Level') &&
					report['Level'].hasOwnProperty('Mode') &&
					typeof report['Level']['Mode'] !== 'undefined') 
					{
						if (report['Level']['Mode'].toLowerCase() == 'off')
						{
							state_on =  false;
						}
						if (report['Level']['Mode'].toLowerCase() == 'heat')
						{
							state_on =  true;
						}
						return state_on;
					}
				return state_on;
			},
		},
		measure_battery: {
			getOnWakeUp: true,
			command_class			: 'COMMAND_CLASS_BATTERY',
			command_get				: 'BATTERY_GET',
			command_report			: 'BATTERY_REPORT',
			command_report_parser		: function( report ) {
				return report['Battery Level (Raw)'][0];
			}
		},		
		measure_temperature: {
			getOnWakeUp: true,
			command_class				: 'COMMAND_CLASS_SENSOR_MULTILEVEL',
			command_get				: 'SENSOR_MULTILEVEL_GET',
			command_get_parser		: function(){
				return {
					'Sensor Type': 'Temperature (version 1)',
					'Properties1': {
						'Scale': 0
					}
				}
			},
			command_report			: 'SENSOR_MULTILEVEL_REPORT',
			command_report_parser		: function( report ){
				if( report['Sensor Type'] !== 'Temperature (version 1)' )
					return null;

				return report['Sensor Value (Parsed)'];
			}
		},
		target_temperature: {   
			getOnWakeUp: true,		   
			command_class: 'COMMAND_CLASS_THERMOSTAT_SETPOINT',
			command_get: 'THERMOSTAT_SETPOINT_GET',
			command_get_parser: () => ({
				'Level': {
					'Setpoint Type': 'Heating 1',
					 
				
	  
				}
			}),
			command_set: 'THERMOSTAT_SETPOINT_SET',
			command_set_parser: (value) => {
												 
														   
				 

				// Create value buffer
				const a = new Buffer(2);
				a.writeUInt16BE((Math.round(value * 2) / 2 * 10).toFixed(0));

				return {
					'Level': {
						'Setpoint Type': 'Heating 1'
					},
					'Level2': {
						'Size': 2,
						'Scale': 0,
						'Precision': 1
					},
					'Value': a
				};
			},
			command_report: 'THERMOSTAT_SETPOINT_REPORT',
			command_report_parser: report => {
				if (report.hasOwnProperty('Level2')
					&& report.Level2.hasOwnProperty('Scale')
					&& report.Level2.hasOwnProperty('Precision')
					&& report.Level2['Scale'] === 0
					&& report.Level2['Size'] !== 'undefined'
					&& typeof report['Value'].readUIntBE(0, report.Level2['Size']) !== 'undefined') {
					return report['Value'].readUIntBE(0, report.Level2['Size']) / Math.pow(10, report.Level2['Precision']);
				}
				return null;
			},
		}
	},
	settings: {
		Temp_Delta: {
			index: 1,
			size: 1,
		},
		Temp_Report_Interval: {
			index: 2,
			size: 1,
		}
	}
});
