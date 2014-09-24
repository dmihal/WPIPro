User = (function(){
  var _username, _password;
  var loaded = false;
  chrome.storage.sync.get(['username','password'],function(results){
    _username = results.username;
    _password = results.password;
    loaded = true;
  });

  var obj = {
    hasCredentials : function(callback){
      chrome.storage.sync.get(['username','password'],function(results){
        _username = results.username;
        _password = results.password;
        callback(_username && _password);
      });
    },
    getUsername : function(){
      return _username;
    },
    getPassword : function(){
      return _password;
    },
    setCredentials : function(username,password){
      _username = username;
      _password = password;
      chrome.storage.sync.set({username: username, password: password});
    }
  };

  return obj;
})();
