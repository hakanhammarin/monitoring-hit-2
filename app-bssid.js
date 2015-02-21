var sys = require('sys')
var exec = require('child_process').exec;

function find(key, array) {
  // The variable results needs var in this case (without 'var' a global variable is created)
  var results = [];
  for (var i = 0; i < array.length; i++) {
    if (array[i].indexOf(key) == 0) {
      results.push(array[i]);
    }
  }
  console.log(results);
  return results;

}


function puts(error, stdout, stderr) {
  sys.puts(stdout);
    //console.log(stdout);
    //var ret = JSON.parse(stdout);
    //console.log(ret);
    var res1 = stdout.split("\n");
//    var res2 = stdout.match("/bssid.*/gi");
    console.log(res1);
//  var search1 = find("B",stdout);
var search1 = find("          BSSID",res1);

var search2 = search1.toString().trim().split(": ");
var search3 = search1.toString().trim();
var search4 = search1.toString().trim().replace(/[:][ ]/g,'=');
//"{key1:value1}{key2:value2}".replace(/^{|}$/g, '').split('}{')
  //var res = str.toString();
  console.log(search1);

  console.log(search2);
  console.log(search3);
  console.log(search4);
  var bssid = search2.pop();
  console.log(bssid);
  // var ret = JSON.parse(stdout);
  }

exec("/System/Library/PrivateFrameworks/Apple80211.framework/Resources/airport -I", puts);
