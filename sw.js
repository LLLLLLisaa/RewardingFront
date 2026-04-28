self.addEventListener("install", event => {
    console.log("Service Worker installed");
  });
  
  self.addEventListener("fetch", event => {
    // 先简单放过（后面可以做缓存）
  });