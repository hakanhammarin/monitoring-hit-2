var log4js = require('log4js'); 
//console log is loaded by default, so you won't normally need to do this
//log4js.loadAppender('console');
log4js.loadAppender('file');
//log4js.addAppender(log4js.appenders.console());
log4js.addAppender(log4js.appenders.file('logs/10mila.log'), '10mila');

var logger = log4js.getLogger('10mila');
logger.setLevel('INFO');
logger.info('Test');


var request = require('request'),
    statusCodes = require('http').STATUS_CODES;
/*
    Ping Constructor
*/
function Ping (opts) {
    // holds website to be monitored
	this.name ='';
    this.website = '';
	this.proxy = '';
	this.headers = '',
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
Ping.prototype = {
    init: function (opts) {
        var self = this;
		self.name = opts.name;
        self.website = opts.website;
		self.proxy = opts.proxy;
		self.headers = opts.headers;
        self.timeout = (opts.timeout * 1000);
        // start monitoring
        self.start();
    },
	start: function () {
    var self = this,
        time = Date.now();
    //console.log("\nLoading... " + self.website + "\nTime: " + time + "\n");
	logger.info("\nLoading... " + self.website + "\nTime: " + time + "\n");
    // create an interval for pings
    self.handle = setInterval(function () {
        self.ping();
    }, self.timeout);
}, ping: function () {
        var self = this, currentTime = Date.now();
		//console.log('Sent Time:'+currentTime);
        try {
            // send request
            request({ method: 'GET'
    , uri: self.website
    , proxy: self.proxy
	, headers: self.headers
	}
			, function (error, res, body) {
                // Website is up
                if (!error && res.statusCode === 200) {
                    var timetaken = (Date.now() - currentTime);
					self.isOk(timetaken);
					//console.log('Time Taken:' +(Date.now()-currentTime));
					//console.log('Error: ' +error+' Response: '+JSON.stringify(res.headers)+'\n');   // ' Body: \n'+body+'\n');
                }
                // No error but website not ok
                else if (!error) {
                    self.isNotOk(res.statusCode);
					//console.log('Error: ' +error+' Response: '+res.statusCode+'\n');   // ' Body: \n'+body+'\n');
                }
                // Loading error
                else {
                    self.isNotOk();
                }
            });
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
            htmlMsg +='</p><p>Website: ' + self.website;
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
        if (timetaken>300) {status = status+' SLOW';severity='warn'};
		var self = this,
            time = Date.now(),
            output = '';
        output += status;
		output += " ; Website: " + self.name;
        output += " ; Time: " + time;
        output += " ; Status: " + status;
        output += " ; Message:" + msg  + " ; Timetaken: " + timetaken;
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
module.exports = Ping;
