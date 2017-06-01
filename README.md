# Horstmann/Secure

This app adds support for Secure / Horstmann devices.
If updating from V0.0.2 to V0.0.3  the units have to be re-added
On local change, Target temperature in Homey is updated immediatly,  
On target change in Homey, Target is updated after wake-up of the Thermostat


##Currently supported devices:
* HRT4-ZW   http://products.z-wavealliance.org/products/125
* SRT321  	http://products.z-wavealliance.org/products/115
* SRT323	http://products.z-wavealliance.org/products/1241
* SSR303	http://products.z-wavealliance.org/products/1618
* SES302	http://products.z-wavealliance.org/products/1240



##Not Working:
* Status changed of the boiler unit  (so not visible in Homey, when turned on/ off by thermostat


##Changelog:
0.1.0
* Added Device ID for other version of HRT4-ZW, called  SSR303
* Added Temperature Sensor SES302
 
0.0.3
* Set target temperature on SRT321
* Receive target temperature on local change SRT321


0.0.2
* First Functionality for HRT4-ZW
* First Functionality for SRT321
* Battery and Actual temp status, 
* turn on/off boiler unit 

0.0.1
* First version
