chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('b.html', {bounds:{top: 0, left: 310, width: 600, height: 600}});
});

chrome.runtime.onInstalled.addListener(function() {
	// When the app gets installed, set up the context menus
	chrome.contextMenus.create({
        title: CONTEXT_MENU_CONTENTS.forLauncher[1],
        id: 'launcher2',
        contexts: ['launcher']
    });
});

chrome.contextMenus.onClicked.addListener(function(itemData) {
	chrome.app.window.create('b.html', {bounds:{top: 0, left: 310, width: 300, height: 300}});
});
