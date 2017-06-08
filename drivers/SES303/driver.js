'use strict';

const path = require('path'); 
const ZwaveDriver = require('homey-zwavedriver');


// http://products.z-wavealliance.org/products/1175

module.exports = new ZwaveDriver(path.basename(__dirname), {
	debug: true,
	capabilities: {
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
			command_class			: 'COMMAND_CLASS_SENSOR_MULTILEVEL',
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
		measure_humidity: {
			getOnWakeUp: true,
			command_class			: 'COMMAND_CLASS_SENSOR_MULTILEVEL',
			command_get				: 'SENSOR_MULTILEVEL_GET',
			command_get_parser		: function(){
				return {
					'Sensor Type': 'Relative humidity (version 2)',
					'Properties1': {
						'Scale': 0
					}
				}
			},
			command_report			: 'SENSOR_MULTILEVEL_REPORT',
			command_report_parser		: function( report ){
				if( report['Sensor Type'] !== 'Relative humidity (version 2)' )
					return null;

				return report['Sensor Value (Parsed)'];
			}
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
		},
		Humidity_Delta: {
			index: 3,
			size: 1,
		},
		Humidity_Report_Interval: {
			index: 4,
			size: 1,
		}
	}
});
