function log(message) {
  document.getElementById('log').textContent += message + '\n';
}

chrome.contextMenus.onClicked.addListener(function(info) {
  if (!document.hasFocus()) {
    log('Ignoring context menu click that happened in another window');
    return;
  }

  log('Item selected in B: ' + info.menuItemId);
  if (info.menuItemId == "Mailing List"){
	mailingList();
  }
});

window.addEventListener("load", function(e){
  log('Window B is loaded');
  setUpContextMenus("windowB");
});
window.addEventListener("focus", function(e) {
  log('Window B is focused');
  setUpContextMenus("windowB");
});
function mailingList(){
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(response){
		if (this.readyState == 4){
			if (this.responseURL.match("cas.wpi.edu")){
				var lt = this.responseXML.querySelector("input[name=lt]").value;
				sendAuthentication(lt);
			} else {
				verifyHP(this);
			}
		}
	};
	xhr.open("GET", "https://www.wpi.edu/academics/CCC/Services/Email/mailinglist.html", true);
	xhr.responseType = "document";
	xhr.send();
}
function sendAuthentication(lt){
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "https://cas.wpi.edu/cas/login?service=https%3a%2f%2fwww.wpi.edu%2facademics%2fCCC%2fServices%2fEmail%2fmailinglist.html", true);
	xhr.onreadystatechange = function() {
	  if (this.readyState == 4) {
		verifyHP(this);
	  }
	}
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	xhr.responseType = "document";

	xhr.send("username=dimihal&password=Deltapi4&lt=" + lt +"&execution=e3s1&_eventId=submit");
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
			var emails = this.responseXML.querySelector("textarea").value.split("\n")
			emails = emails.filter(function(n){ return !!n });
			callback(emails);
		}
	};
	xhr.open("GET", url, true);
	xhr.responseType = "document";
	xhr.send();
}
