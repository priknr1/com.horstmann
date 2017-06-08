# Horstmann/Secure

This app adds support for Secure / Horstmann devices.

If you like the work, please help me buy a stroller for my future kid :D 
<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
<input type="hidden" name="cmd" value="_s-xclick">
<input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----
">
<input type="image" src="https://www.paypalobjects.com/en_US/NL/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
<img alt="" border="0" src="https://www.paypalobjects.com/nl_NL/i/scr/pixel.gif" width="1" height="1">
</form>

If updating from V0.0.2 to V0.0.3  the units have to be re-added
On local change, Target temperature in Homey is updated immediatly,  
On target change in Homey, Target is updated after wake-up of the Thermostat


##Currently supported devices:
* HRT4-ZW   http://products.z-wavealliance.org/products/125
* SRT321  	http://products.z-wavealliance.org/products/115
* SRT323	http://products.z-wavealliance.org/products/1241
* SSR303	http://products.z-wavealliance.org/products/1618
* SES302	http://products.z-wavealliance.org/products/1240
* SES303	http://products.z-wavealliance.org/products/1175



##Not Working:
* Status changed of the boiler unit  (so not visible in Homey, when turned on/ off by thermostat


##Changelog:
0.1.3
* Add settings for 302 and 303 into drivers,
* Changed comment for settings
* Changed default values for settings

0.1.2
* Added Settings for Temperature/humidity Sensor SES303
* Added Settings for Temperature Sensor SES302


0.1.1
* Added Temperature/humidity Sensor SES303

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
