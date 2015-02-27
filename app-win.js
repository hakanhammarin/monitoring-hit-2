// var sys = require('sys') // needs in app-bssid-win
var exec = require('child_process').exec;
var timers = '10';
bssid=''; // global values
signal=''; // global values
hostname=''; // global values
username=''; // global values
var fbssid = require('./app-bssid-win');

hostname = exec("hostname", fbssid.hostname) ;
tasklist = exec('tasklist /v /fi "imagename eq explorer.exe" /fo csv', fbssid.tasklist);
wifi = exec("netsh wlan show interfaces", fbssid.fbssid) ;

setInterval(function() { 
  
wifi = exec("netsh wlan show interfaces", fbssid.fbssid) ;

  }, 10000);

/* setInterval(function() { 
  
  console.log('BSSID='+bssid);
  console.log('Signal='+signal);
  console.log('Hostname='+hostname);
  console.log('Username='+username);
  }, 1000);
 */

 setInterval(function() { 
hostname = exec("hostname", fbssid.hostname) ;
//tasklist = exec('tasklist /v /fi "sessionname eq Console" /fo csv', fbssid.tasklist);
tasklist = exec('tasklist /v /fi "imagename eq explorer.exe" /fo csv', fbssid.tasklist);

  }, 60000);


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


  

var FFile = require('./lib/file'),


    files = [

      { name : 'dummy.xlsx-gemensam',
	    path : '\\\\intern.hoglandet.se\\dfs\\HKF-Adm\\HIT\\Produktion\\Infrastruktur\\Tjänster och Dokumentation\\monitoring\\dummy.xlsx',
        timeout : '30'
      },
	  { name : 'dummy.xlsx-lokalt',
        path : 'C:\\down\\monitoring\\dummy.xlsx',
        timeout : '60'
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
            timeout: 15
        },
        {
            name: '1MBAtSunet',
			url: 'http://ftp.sunet.se/pub/Linux/distributions/Debian/debian-cd/current-live/i386/iso-hybrid/debian-live-7.8.0-i386-rescue.iso.log',
            proxy: '',
			headers: {
				'host' : 'ftp.sunet.se',
				'Pragma' : 'no-cache',
				},
			timeout: 600
        },
        {
            name: 'Cacti',
			url: 'http://mgmtcacti.intern.hoglandet.se/',
            proxy: '',
			headers: {
				'host' : 'mgmtcacti.intern.hoglandet.se',
				'Pragma' : 'no-cache',
				},
			timeout: 15
        }
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
        timeout: website.timeout,
		
    });
    monitors.push(monitor);
});



    // *** Files

files.forEach(function (ffile) {
      var monitor = new FFile ({
      name: ffile.name,
      path: ffile.path,
    	timeout: ffile.timeout,
		
        });
        monitors.push(monitor);
    });

  

/* server = http.createServer(function (req, res) {
    var data = "Monitoring the following websites: \n \n" + websites.join("\n");
    res.end(data);
});
server.listen(port);
console.log('Listening to port %s', port);
 */