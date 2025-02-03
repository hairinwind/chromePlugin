chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    alert(message.command);
    if (message.command === "switch-tab") {
      alert("快捷键触发成功！");
    }
  });