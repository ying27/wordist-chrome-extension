var actions = {
  'search-def': 'search_word.js'
}

function performCommand (tab, command) {
  chrome.tabs.executeScript(tab.id, {
    file: actions[command]
  })
}

chrome.commands.onCommand.addListener(function (command) {
  chrome.tabs.query({
    active: true, // the active tab
    lastFocusedWindow: true // in the active window
  }, function (tabArray) {
    var activeTab = tabArray[0]
    if (!activeTab) throw new Error('no active tab (?)')
    performCommand(activeTab, command)
  })
})

/*
chrome.browserAction.onClicked.addListener(function (tab) {
  performCommand(tab, 'toggle-animus')
})
*/
