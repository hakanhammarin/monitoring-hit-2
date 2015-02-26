var sys = require('sys')
// var exec = require('child_process').exec; // Needs in main app.js

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



module.exports = {

fbssid: function puts(error, stdout, stderr) {
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
  
  signal = signal2.pop().replace(/[ ][%]/g,'');
  console.log("signal="+signal);
  // var ret = JSON.parse(stdout);
return(bssid,signal)
  },
tasklist: function puts(error, stdout, stderr) {
  sys.puts(stdout);
    //console.log(stdout);
    //var ret = JSON.parse(stdout);
    //console.log(ret);
    var res1 = stdout.split(",");
//    var res2 = stdout.match("/bssid.*/gi");
    console.log(res1);
//  var search1 = find("B",stdout);
//var search1 = find("INTERN"",res1);
//var search2 = search1.toString().trim().split(": ");
//var search3 = search1.toString().trim();
//var search4 = search1.toString().trim().replace(/[:][ ]/g,'=');
var username1 = find('"INTERN',res1);
//var signal2 = signal1.toString().trim().split(": ");
//var signal3 = signal1.toString().trim();
username = username1.toString().trim().replace(/INTERN\\/g,'').replace(/["]/g,'');
//"{key1:value1}{key2:value2}".replace(/^{|}$/g, '').split('}{')
  //var res = str.toString();
  console.log(username1);
  console.log(username);
  //console.log(signal3);
  //console.log(signal4);
  
  },
hostname: function puts(error, stdout, stderr) {
  sys.puts(stdout);
  //username = username1.toString().trim().replace(/INTERN\\/g,'').replace(/["]/g,'');
  hostname = stdout.toString().trim().replace(/[\r\n]/g,'');
  console.log("hostname="+hostname);
return(hostname);
  },
username: function puts(error, stdout, stderr) {
  sys.puts(stdout);
  hostname = stdout;
  console.log("hostname="+hostname);
return(hostname);
  }
}
// exec("netsh wlan show interfaces", puts);
