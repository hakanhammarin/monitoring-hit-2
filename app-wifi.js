// var sys = require('sys')
var exec = require('child_process').exec;
bssid='';
signal='';
var timers = '10';


// *** Files
var fbssid = require('./app-bssid');

setInterval(function() { 
  
wifi = exec("/System/Library/PrivateFrameworks/Apple80211.framework/Resources/airport -I", fbssid.fbssid) ;
  }, 10000);

/* setInterval(function() { 
  
  console.log('BSSID='+bssid);
  console.log('Signal='+signal);
  }, 1000);
*/



var FFile = require('./lib/file'),

    files = [

      { name : 'test.txt',
        path : '/Users/hakan/nodeapps/monitoring-hit-2/test.txt',
        timeout : '30'
      },
      { name : 'resolv.conf',
        path : '/etc/resolv.conf',
        timeout : '30'
      }
    ],
    monitors = [];

// Websites

var Ping = require('./lib/ping'),

    websites = [
    
		{
            name: 'Google',
			url: 'http://www.google.se',
			proxy: '',
			headers: {
				'host' : 'www.google.se',
				'Pragma' : 'no-cache',
				'Cookie' : '',

				},
            timeout: 30
        },
        
    ],
    http = require('http'),
    server,
    port = process.env.PORT || 3008,
	monitors = [];




// *** Websites
websites.forEach(function (website) {
    var monitor = new Ping ({
		name: website.name,
        website: website.url,
		proxy: website.proxy,
		headers: website.headers,
        timeout: timers
    });
    monitors.push(monitor);
});



    // *** Files

files.forEach(function (ffile) {
      var monitor = new FFile ({
      name: ffile.name,
      path: ffile.path,
    	timeout: timers
        });
        monitors.push(monitor);
    });


server = http.createServer(function (req, res) {
    var data = "Monitoring the following websites: \n \n" + websites.join("\n");
    res.end(data);
});
server.listen(port);
console.log('Listening to port %s', port);
