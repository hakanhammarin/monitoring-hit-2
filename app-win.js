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




  
/* setInterval(function() { 
	exec("netsh wlan show interfaces", puts);
  }, 5000);
 */
// *** Files


var FFile = require('./lib/file'),


    files = [

      { name : 'dummy.xlsx-gemensam',
	    path : '\\\\intern.hoglandet.se\\dfs\\HKF-Adm\\HIT\\Produktion\\Infrastruktur\\Tjänster och Dokumentation\\monitoring\\dummy.xlsx',
        timeout : '30'
      },
	  { name : 'dummy.xlsx-lokalt',
        path : 'C:\\down\\monitoring\\dummy.xlsx',
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
        {
            name: '1MBAtSunet',
			url: 'http://ftp.sunet.se/pub/Linux/distributions/Debian/debian-cd/current-live/i386/iso-hybrid/debian-live-7.8.0-i386-rescue.iso.log',
            proxy: '',
			headers: {
				'host' : 'ftp.sunet.se',
				'Pragma' : 'no-cache',
				},
			timeout: 30
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
        timeout: timers,
		
    });
    monitors.push(monitor);
});



    // *** Files

files.forEach(function (ffile) {
      var monitor = new FFile ({
      name: ffile.name,
      path: ffile.path,
    	timeout: timers,
		
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