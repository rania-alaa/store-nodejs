var fs = require('fs');
var path = require('path');

module.exports = {
    add: function(mykey,myvalue){
      var dicts = [];
      var dictAsJSON = fs.readFileSync(path.join(__dirname,"db.db")).toString()
      if (dictAsJSON != "") {
        dicts = JSON.parse(dictAsJSON);
      }
      dicts.push({
        key: mykey ,
        value: myvalue
      });
      fs.writeFileSync(path.join(__dirname,"db.db"),JSON.stringify(dicts))
      return "done adding"
    },
    list: function(){
      var dictAsJSON = fs.readFileSync(path.join(__dirname,"db.db")).toString()
      if (dictAsJSON == "") {
        return "No Keys "
      }
      else {
        var dicts = JSON.parse(dictAsJSON);
        console.log("the avalible key and values:");
        return dicts
      }
    },
    get: function(mykey){
      var selecteddict = "no such dictionary" ;
      var dictAsJSON = fs.readFileSync(path.join(__dirname,"db.db")).toString()
      if (dictAsJSON == "") {
        return "No Keys avalible to get it, please add a key first "
      }
      else {
        var dicts = JSON.parse(dictAsJSON);
        dicts.forEach(function(dict) {
          if (dict.key == mykey) {
            selecteddict = dict
          }
        });
      }
      return selecteddict
    },
    remove: function(mykey){
      var selecteddict ;
      var dictAsJSON = fs.readFileSync(path.join(__dirname,"db.db")).toString()
      if (dictAsJSON == "") {
        return "No Keys avalible to remove it, please add a key first "
      }
      else{
        var dicts = JSON.parse(dictAsJSON);
        dicts.forEach(function(dict) {
          if (dict.key == mykey) {
            selecteddict = dict
            var index= dicts.indexOf(selecteddict)
            dicts.splice(index,1)
            fs.writeFileSync(path.join(__dirname,"db.db"),JSON.stringify(dicts))
            selecteddict = selecteddict.key +" key removed" ;
          }
          else {
            selecteddict = "no such dictionary" ;
          }
        });
      }
      return selecteddict
    },
    clear: function(){
      var cler = "" ;
      fs.writeFileSync(path.join(__dirname,"db.db"),cler)
      var dictAsJSON = fs.readFileSync(path.join(__dirname,"db.db")).toString()
      return "cleared"
    }
};
require('make-runnable/custom')({
    printOutputFrame: false
})
