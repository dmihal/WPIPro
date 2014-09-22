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

  mailingList();

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

});
window.addEventListener("focus", function(e) {
  log('Window B is focused');
  setUpContextMenus("windowB");
});

