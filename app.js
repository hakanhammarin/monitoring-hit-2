

var timers = '10';
var Ping = require('./lib/ping'),
    websites = [
        // {
            // name: 'CID',
			// url: 'http://cid.hvwan.net/GroupCompany/GC_GroupCompaniesList.asp?selectfromlist=true&entitytype=All&code=&attribute=Country+Name&searchstring=Sweden',
			// proxy: 'http://cid.hvwan.net:80',
			// headers: {
				// 'host' : 'cid.hvwan.net',
				// 'Pragma' : 'no-cache',
				// },
            // timeout: 30
        // },
        {
            name: 'mobile.10mila.se (Internet)',
			url: 'http://mobile.10mila.se',
			proxy: 'http://mobile.10mila.se:80',
			headers: {
				'host' : 'mobile.10mila.se',
				'Pragma' : 'no-cache',
				'Cookie' : '',
			
				},
            timeout: 30
        },
        {
            name: '10mila.se',
			url: 'http://10mila.se',
			proxy: 'http://10mila.se:80',
			headers: {
				'host' : '10mila.se',
				'Pragma' : 'no-cache',
				'Cookie' : '',
			
				},
            timeout: 30
        },
        {
            name: 'dev.10milatv.se (Paywall)',
			url: 'http://dev.10milatv.se',
			proxy: 'http://dev.10milatv.se:80',
			headers: {
				'host' : 'dev.10milatv.se',
				'Pragma' : 'no-cache',
				'Cookie' : '',
			
				},
            timeout: 30
        },
		{
            name: 'OLA Startlista (Arena)',
			url: 'http://192.168.1.23/teamtracker/startlist?searchstring=',
			proxy: 'http://192.168.1.23:8080',
			headers: {
				'host' : '1.1.1.1',
				'Pragma' : 'no-cache',
				'Cookie' : '',
			
				},
            timeout: 30
        },
		{
            name: 'OLA Toplist Damer (Arena)',
			url: 'http://192.168.1.23/teamtracker/toplist?classId=2',
			proxy: 'http://192.168.1.23:8080',
			headers: {
				'host' : '1.1.1.1',
				'Pragma' : 'no-cache',
				'Cookie' : '',
			
				},
            timeout: 30
        },{
            name: 'OLA Resultat Damer (Arena)',
			url: 'http://192.168.1.23/teamtracker/resultlist?classId=2',
			proxy: 'http://192.168.1.23:8080',
			headers: {
				'host' : '1.1.1.1',
				'Pragma' : 'no-cache',
				'Cookie' : '',
			
				},
            timeout: 30
        },
		{
            name: 'online (localhost)',
			url: 'http://localhost/index.php',
			proxy: 'http://localhost:80',
			headers: {
				'host' : 'localhost',
				'Pragma' : 'no-cache',
				'Cookie' : '',
			
				},
            timeout: 30
        },
		{
            name: 'Google',
			url: 'http://www.google.se',
			proxy: 'http://www.google.se:80',
			headers: {
				'host' : 'www.google.se',
				'Pragma' : 'no-cache',
				'Cookie' : '',
			
				},
            timeout: 30
        },
        // {
            // name: 'PAID via Rev. Proxy',
			// url: 'http://paid.hvwan.net',
            // proxy: 'http://paid.hvwan.net:80',
			// headers: {
				// 'host' : 'paid.hvwan.net',
				// 'Pragma' : 'no-cache',
				// },
			// timeout: 30
        // }
    ],
    http = require('http'),
    server,
    port = process.env.PORT || 3008,
	monitors = [];
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
server = http.createServer(function (req, res) {
    var data = "Monitoring the following websites: \n \n" + websites.join("\n");
    res.end(data);
}); 
server.listen(port);
console.log('Listening to port %s', port);
