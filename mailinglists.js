function mailingList(){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(response){
    if (this.readyState == 4){
      if (this.responseURL.match("cas.wpi.edu")){
        var lt = this.responseXML.querySelector("input[name=lt]").value;
        var execution = this.responseXML.querySelector("input[name=execution]").value;
        sendAuthentication(lt,execution);
      } else {
        verifyHP(this);
      }
    }
  };
  xhr.open("GET", "https://www.wpi.edu/academics/CCC/Services/Email/mailinglist.html", true);
  xhr.responseType = "document";
  xhr.send();
}
function sendAuthentication(lt,execution){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "https://cas.wpi.edu/cas/login?service=https%3a%2f%2fwww.wpi.edu%2facademics%2fCCC%2fServices%2fEmail%2fmailinglist.html", true);
  xhr.onreadystatechange = function() {
    if (this.readyState == 4) {
    verifyHP(this);
    }
  }
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  xhr.responseType = "document";

  var payload = "username=" + User.getUsername() +
    "&password=" + User.getPassword() +
    "&lt=" + lt +"&execution="+execution+"&_eventId=submit";

  xhr.send(payload);
}
function verifyHP(xhr){
  if (xhr.responseURL.match("www.wpi.edu")){
    setConnected(true);
  }
}
var connected = false;
function setConnected(connected){
  connected = true;
}
function getMailingList(name,callback)
{
  var url = "https://www.wpi.edu/cgi-bin/Pubcookie/MailingList?ListName=" + name + "&Submit=Change";
  
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(response){
    if (this.readyState == 4){
      var emailtext = this.responseXML.querySelector("textarea").value;
      var emails = emailtext.split("\n")
      emails = emails.filter(function(n){ return !!n });
      callback(emailtext);
    }
  };
  xhr.open("GET", url, true);
  xhr.responseType = "document";
  xhr.send();
}function saveMailingList(name,text,callback)
{
  var url = "https://www.wpi.edu/cgi-bin/Pubcookie/MailingList";
  
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(response){
    if (this.readyState == 4){
      callback && callback();
    }
  };
  xhr.open("POST", url, true);
  xhr.responseType = "document";
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  var payload = "ListName=" + name +
    "&Contents=" + encodeURIComponent(text) + "&Submit=Make";

  xhr.send(payload);
}

