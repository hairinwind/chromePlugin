chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "log") {
      const logDiv = document.getElementById("log");
      const logEntry = document.createElement("p");
      logEntry.textContent = message.message;
      logDiv.appendChild(logEntry);
    }
  });

document.addEventListener("DOMContentLoaded", () => {
chrome.runtime.sendMessage({ action: "get_log" }, (response) => {
    if (response && response.log) {
    updateLog(response.log);
    }
});
});

// 更新 popup 里的日志内容
function updateLog(message) {
    const logDiv = document.getElementById("log");
    const logEntry = document.createElement("p");
    logEntry.textContent = message;
    logDiv.appendChild(logEntry);
}