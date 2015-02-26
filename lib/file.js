var fs = require('fs');
var log4js = require('log4js');
//console log is loaded by default, so you won't normally need to do this
//log4js.loadAppender('console');
//log4js.loadAppender('file');
//log4js.addAppender(log4js.appenders.console());
//log4js.addAppender(log4js.appenders.file('logs/10mila.log'), '10mila');

log4js.configure({
	appenders: [
		{ type: 'console' },
		{ type: 'file', filename: 'logs/hoglandet.log', category: 'Hoglandet' },
		{
      "host": "mscrmtest.intern.hoglandet.se",
      "port": "9999",
      "type": "logstashUDP",
      "logType": "nodeMonitoring", // Optional, defaults to 'category'
      /* "fields": {             // Optional, will be added to the 'fields' object in logstash
        "field1": "value1",
        "field2": "value2"
      }, */
      "layout": {
        "type": "pattern",
        "pattern": "%m"
      },
      "category": "Hoglandet"
    }
	]
});
var logger = log4js.getLogger('Hoglandet');
logger.setLevel('INFO');
logger.info('Test');


var request = require('request'),
    statusCodes = require('http').STATUS_CODES;
/*
    File Constructor
*/
function FFile (opts) {
    // holds file to be monitored
	this.name ='';
    this.path = '';
	  // ping intervals in seconds
    this.timeout = 15;
    // interval handler
    this.handle = null;
    // initialize the app
    this.init(opts)
}
/*
    Methods
*/
FFile.prototype = {
    init: function (opts) {
        var self = this;
		self.name = opts.name;
        self.path = opts.path;
		    self.timeout = (opts.timeout * 1000);
        // start monitoring
        self.start();
    },
	start: function () {
    var self = this,
        time = Date.now();
	logger.info("\nLoading... " + self.path + "\nTime: " + time + "\n");
    // create an interval for pings
    self.handle = setInterval(function () {
        self.ffile();
    }, self.timeout);
},
ffile: function () {
        var self = this, currentTime = Date.now();
//		console.log('File Sent Time:'+currentTime);
        try {



//File
// console.log(self.path);
          fs.readFile(self.path, function (error, res) {

  // if (error) throw error;
  // console.log(res);
  if (!error) {
      var timetaken = (Date.now() - currentTime);
      self.isOk(timetaken);

}
else {
    self.isNotOk();
}
});

// END File



        }
        catch (err) {
            self.isNotOk();
        }
    },
    isOk: function (timetaken) {
        this.log('UP', 'OK', timetaken, 'info');
    },
    isNotOk: function (statusCode) {
        var time =  Date.now(),
            self = this,
            time = self.getFormatedDate(time),
            msg = statusCodes[statusCode + ''],
            htmlMsg = '<p>Time: ' + time;
            htmlMsg +='</p><p>Website: ' + self.path;
            htmlMsg += '</p><p>Message: ' + msg + '</p>';
        this.log('DOWN', msg,'','error');
        // Send admin and email
        // mailer({
            // from: 'hakan.hammarin@gmail.com',
            // to: 'hakan.hammarin@husqvarna.se',
            // subject: self.website + ' is down',
            // body: htmlMsg
        // }, function (error, res) {
            // if (error) {
                // console.log(error);
            // }
            // else {
                // console.log(res.message || 'Failed to send email');
            // }
        // });
    },
    log: function (status, msg, timetaken, severity) {
        // if (timetaken>300) {status = status+' SLOW';severity='warn'};
		var self = this,
            time = Date.now(),
            output = '';
        // output += status;
		output += " ; File=" + self.name;
        output += " ; Time=" + time;
        output += " ; Status=" + status;
        output += " ; Message=" + msg  + " ; Timetaken=" + timetaken;
         output += " ; BSSID=" + bssid  + " ; Signal=" + signal;
        output += " ; Hostname=" + hostname  + " ; Username=" + username;
        output += " ; ";
        //console.log(output);
		if (severity==='info') {logger.info(output)}
		else if (severity==='warn') {logger.warn(output)}
		else if (severity==='error') {logger.error(output)};


    },
    getFormatedDate: function (time) {
        var currentDate = new Date(time);
        currentDate = currentDate.toISOString();
        currentDate = currentDate.replace(/T/, ' ');
        currentDate = currentDate.replace(/\..+/, '');
        return currentDate;
    }
}
module.exports = FFile;
