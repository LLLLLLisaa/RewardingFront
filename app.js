import { tasks } from "./js/tasks.js";
import { renderTasks,renderDetail } from "./js/render.js";
import { createPoint, getSummary,getDetails } from "./js/api.js";
import { showPopup, closePopup } from "./js/ui/popup.js";
import { initDate,formatDate } from "./js/ui/date.js";


/* initDate();
let currentTask = null;
let detailCache = null;

async function toggleDetail() {
  const div = document.getElementById("detail");

  if (!detailVisible) {

    div.style.display = "block";

    if (!detailCache) {
      // ⭐ 只有第一次才请求
      const child = document.getElementById("child").value;
      const date = document.getElementById("date").value;

      const data = await getDetails(child, date);
      detailCache = data;
    }

    div.innerHTML = renderDetail(detailCache);
    detailVisible = true;

  } else {
    div.style.display = "none";
    detailVisible = false;
  }
}

// 渲染任务
renderTasks(tasks, handleTaskClick);

// 点击任务
function handleTaskClick(task) {
  if (task.type === "FIXED") {
    submitTask(task.name, null);
  } else {
    currentTask = task.name;
    document.getElementById("inputBox").style.display = "block";
  }
}

// 提交分钟（必须挂 window）
window.submitDuration = function () {
  const minutes = document.getElementById("minutes").value;

  if (!minutes || minutes <= 0) {
    alert("Ange minuter!");
    return;
  }

  submitTask(currentTask, parseInt(minutes));

  document.getElementById("minutes").value = "";
  document.getElementById("inputBox").style.display = "none";
};

// 提交任务

//argument "taskName" must be the same as the backend
  async function submitTask(taskName, minutes) {
    const child = document.getElementById("child").value;
    const date = document.getElementById("date").value;
  
    try {
      const earned = await createPoint({
        childName: child,
        taskName: taskName,
        actualMinutes: minutes,
        date: date
      });
  
      // ✅ 成功才弹这个
      showPopup(child, taskName, earned);
  
      loadSummary();
  
    } catch (e) {
      // ❗ 重复任务走这里
      showPopup(child, "Redan gjort idag!", 0);
    }
    window.closePopup = closePopup;
  }

// 查询
async function loadSummary() {
  const child = document.getElementById("child").value;
  const date = document.getElementById("date").value;

  const data = await getSummary(child, date);

  document.getElementById("weekInfo").innerText =
    `Vecka ${data.weekNumber} (${formatDate(data.startDate)} - ${formatDate(data.endDate)})`;

  document.getElementById("total").innerText =  
  //`<span class="label">Total:</span> ${data.totalEarnedPoint} min`;
     `Total: ${data.totalEarnedPoint} min`;

     detailCache = await getDetails(child, date);
}

// HTML 按钮要用
window.loadSummary = loadSummary;

// 初始化
loadSummary();


let detailVisible = false;

async function toggleDetail() {
  const div = document.getElementById("detail");

  const child = document.getElementById("child").value;
  const date = document.getElementById("date").value;

  if (!detailVisible) {

    const data = await getDetails(child, date);  // ⭐ 调后端

    div.innerHTML = renderDetail(data);          // ⭐ 渲染
    div.style.display = "block";

    detailVisible = true;

  } else {
    div.style.display = "none";
    detailVisible = false;
  }
}


window.toggleDetail = toggleDetail;

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js")
    .then(() => console.log("SW registered"));
} */

    initDate();

let currentTask = null;
let detailCache = null;
let detailVisible = false;

renderTasks(tasks, handleTaskClick);

function handleTaskClick(task) {
  if (task.type === "FIXED") {
    submitTask(task.name, null);
  } else {
    currentTask = task.name;
    document.getElementById("inputBox").style.display = "block";
  }
}

function submitDuration() {
  const minutes = document.getElementById("minutes").value;

  if (!minutes || minutes <= 0) {
    alert("Ange minuters!");
    return;
  }

  submitTask(currentTask, parseInt(minutes));

  document.getElementById("minutes").value = "";
  document.getElementById("inputBox").style.display = "none";
}

async function submitTask(taskName, minutes) {
  const child = document.getElementById("child").value;
  const date = document.getElementById("date").value;

  try {
    const earned = await createPoint({
      childName: child,
      taskName: taskName,
      actualMinutes: minutes,
      date: date
    });

    showPopup(child, taskName, earned);

    detailCache = null;   // ⭐ 清缓存
    loadSummary();

  } catch (e) {
    showPopup(child, "Redan gjort idag!", 0);
  }
}
async function toggleDetail() {
  const div = document.getElementById("detail");

  const child = document.getElementById("child").value;
  const date = document.getElementById("date").value;

  if (!detailVisible) {

    div.style.display = "block";

    if (!detailCache) {
      div.innerHTML = "Laddar...";

      const data = await getDetails(child, date);
      detailCache = data;
    }

    div.innerHTML = renderDetail(detailCache);
    detailVisible = true;

  } else {
    div.style.display = "none";
    detailVisible = false;
  }
}

async function loadSummary() {
  const child = document.getElementById("child").value;
  const date = document.getElementById("date").value;

  const data = await getSummary(child, date);

  document.getElementById("weekInfo").innerText =
    `Vecka ${data.weekNumber} (${formatDate(data.startDate)} - ${formatDate(data.endDate)})`;

  document.getElementById("total").innerText =
    `Total: ${data.totalEarnedPoint} min`;

  // ⭐ 提前缓存 detail（关键优化）
  detailCache = await getDetails(child, date);
}

detailCache = null;

loadSummary();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js")
    .then(() => console.log("SW registered"))
    .catch(err => console.log("SW error", err));
}

window.loadSummary = loadSummary;
window.toggleDetail = toggleDetail;
window.submitDuration = submitDuration;
window.closePopup = closePopup;