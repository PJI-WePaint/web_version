if (typeof Array.prototype.deleteID != 'function') {
  Array.prototype.deleteID = function (id){
    return this.splice(id,1);
  };
}

if (typeof Array.prototype.deleteValue != 'function') {
  Array.prototype.deleteValue = function (value){
    var id = this.indexOf(value);
    if (id !=-1) return this.splice(id,1);
    return this;
  };
}

if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function (str){
    return this.slice(0, str.length) == str;
  };
}

if (typeof String.prototype.endsWith != 'function') {
  String.prototype.endsWith = function (str){
    return this.slice(-str.length) == str;
  };
}

function fetch_data(url, data, cb, method){
  jQuery.ajax({
    url: url,
    data: data,
    type: method,
    success: function(data) {
      cb(data) ;
    },
    error: function(xhr, textStatus, errorThrown) {
      //DEBUG*/ console.log( xhr )
      console.log("Fetch Data from " + url + " failed ["+textStatus+"]");
    }
  });
}