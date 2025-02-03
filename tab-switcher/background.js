// Track last active tab
class TwoItemQueue {
  constructor() {
    this.queue = [];
    this.maxSize = 2;
  }

  add(item) {
    if (this.queue.length >= this.maxSize) {
      this.queue.shift(); // Remove the oldest item
    }
    this.queue.push(item); // Add the new item
  }

  getFirstItem() {
    return this.queue.length > 0 ? this.queue[0] : null; // Return first item or null if empty
  }

  getItems() {
    return [...this.queue]; // Return a copy of the queue
  }
}
const queue = new TwoItemQueue();  

chrome.tabs.onActivated.addListener((activeInfo) => {
  console.log("abcdefg..." + activeInfo.tabId);
  
  queue.add(activeInfo.tabId)

  // 向所有 popup 发送更新
  lastLog = `tab activated！ ${activeInfo.tabId }`;
  chrome.runtime.sendMessage({ action: "log", message: activeInfo.previousTabId});
});


let lastLog = ""; // 记录最近的快捷键触发日志

chrome.commands.onCommand.addListener((command) => {
  if (command === "switch-tab") {
    lastLog = `快捷键触发成功！ ${new Date().toLocaleTimeString()}`;

    chrome.tabs.update(queue.getFirstItem(), { active: true });

    // 向所有 popup 发送更新
    chrome.runtime.sendMessage({ action: "log", message: lastLog });
  }
});

// 允许 popup 获取最近的日志
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "get_log") {
    sendResponse({ log: lastLog });
  }
});