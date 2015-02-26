var log4js = require('log4js');
var sys = require('sys')
var exec = require('child_process').exec;
var bssid='';
var signal='';

function find(key, array) {
  // The variable results needs var in this case (without 'var' a global variable is created)
  var results = [];
  for (var i = 0; i < array.length; i++) {
    if (array[i].indexOf(key) == 0) {
      results.push(array[i]);
    }
  }
//  console.log(results);
  return results;

}


function puts(error, stdout, stderr) {
  sys.puts(stdout);
    //console.log(stdout);
    //var ret = JSON.parse(stdout);
    //console.log(ret);
    var res1 = stdout.split("\n");
//    var res2 = stdout.match("/bssid.*/gi");
//    console.log(res1);
//  var search1 = find("B",stdout);
var search1 = find("    BSSID",res1);
var search2 = search1.toString().trim().split(": ");
//var search3 = search1.toString().trim();
//var search4 = search1.toString().trim().replace(/[:][ ]/g,'=');
var signal1 = find("    Signal",res1);
var signal2 = signal1.toString().trim().split(": ");
//var signal3 = signal1.toString().trim();
//var signal4 = signal1.toString().trim().replace(/[:][ ]/g,'=').replace(/[ ][%]/g,'');
//"{key1:value1}{key2:value2}".replace(/^{|}$/g, '').split('}{')
  //var res = str.toString();
  /* console.log(search1);
  console.log(search2);
  console.log(search3);
  console.log(search4);
   */
  bssid = search2.pop();
  console.log("bssid="+bssid);
  
 /*  console.log(signal1);
  console.log(signal2);
  console.log(signal3);
  console.log(signal4); */
  signal = signal2.pop().replace(/[ ][%]/g,'');
  console.log("signal="+signal);
  // var ret = JSON.parse(stdout);
  }


//console log is loaded by default, so you won't normally need to do this
//log4js.loadAppender('console');
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

//log4js.loadAppender('file');
//log4js.addAppender(log4js.appenders.console());
//log4js.addAppender(log4js.appenders.file('logs/10mila.log'), '10mila');

var logger = log4js.getLogger('Hoglandet');
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
		// exec("netsh wlan show interfaces", puts);
	
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

                }
                // No error but website not ok
                else if (!error) {
                    self.isNotOk(res.statusCode);

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
    isOk: function (timetaken, bssid, signal) {
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
<<<<<<< HEAD
		exec("netsh wlan show interfaces", puts);	
=======
>>>>>>> origin/master
        // if (timetaken>300) {status = status+' SLOW';severity='warn'};
		var self = this,
            time = Date.now(),
            output = '';
<<<<<<< HEAD
=======
        // output += status;
>>>>>>> origin/master
		output += " ; Website=" + self.name;
        output += " ; Time=" + time;
        output += " ; Status=" + status;
        output += " ; Message=" + msg  + " ; Timetaken=" + timetaken;
<<<<<<< HEAD
=======
        output += " ; BSSID=" + bssid  + " ; Signal=" + signal;
        output += " ; ";
>>>>>>> origin/master
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
