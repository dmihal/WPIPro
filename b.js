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

  User.hasCredentials(function(credentialsExist){
    if (credentialsExist){
      mailingList();
    } else {
      $('#cred-modal').modal('show');
    }
  });

  var list = null;
  $("#ml-load").click(function(){
    var name = $("#ml-name").val();
    getMailingList(name,function(emails){
      list = name;
      $("#ml-body").val(emails);
    });
  });
  $("#ml-save").click(function(){
    if (list){
      var emails = $("#ml-body").val();
      saveMailingList(list,emails);
    }
  });
  $("#save-login").click(function(){
    var username = $("#cred-user").val();
    var password = $("#cred-pw").val();
    User.setCredentials(username,password);
    $('#cred-modal').modal('hide');
    mailingList();
  });

});
window.addEventListener("focus", function(e) {
  log('Window B is focused');
  setUpContextMenus("windowB");
});

