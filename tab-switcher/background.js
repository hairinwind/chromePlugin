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
  
  queue.add(activeInfo.tabId);
});


chrome.commands.onCommand.addListener((command) => {
  if (command === "switch-tab") {
    chrome.tabs.update(queue.getFirstItem(), { active: true });
  }
});
