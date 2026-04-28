import { tasks } from "./tasks.js";

export function renderTasks(tasks, onTaskClick) {
    const container = document.getElementById("taskContainer");
    container.innerHTML = "";
  
    tasks.forEach(task => {
      const btn = document.createElement("button");
  
      btn.className = "task-card";
      btn.textContent = task.label;
  
      btn.onclick = () => onTaskClick(task);
  
      if (task.action === "PENALTY") {
        btn.style.backgroundColor = "#e74c3c";
      }
  
      container.appendChild(btn);
    });
  }


  /* export function renderDetail(details) {

    let html = "";
  
    details.forEach(day => {
  
      const date = new Date(day.date);
  
      const weekday = date.toLocaleDateString("sv-SE", {
        weekday: "long"
      });
  
      // ⭐ 星期标题
      html += `<div class="day-block">`;
      html += `<h3>${weekday}</h3>`;
  
      if (day.tasks.length === 0) {
        html += `<p class="empty">Inget gjort</p>`;
      } else {
  
        day.tasks.forEach(task => {
  
          if (task.actualMinutes > 0) {
            // 阅读类
            html += `
              <p>
                ✔ ${task.taskName}
                (${task.actualMinutes} min)
                → +${task.earnedMinutes} min
              </p>
            `;
          } else {
            // 固定任务
            html += `
              <p>
                ✔ ${task.taskName}
                +${task.earnedMinutes} min
              </p>
            `;
          }
  
        });
  
      }
  
      html += `</div>`;
    });
  
    return html;
  }
 */

  export function renderDetail(details) {

    let html = "";
  
    details.forEach(day => {
  
      const date = new Date(day.date);
  
      const weekday = date.toLocaleDateString("sv-SE", {
        weekday: "long"
      });
  
      html += `<div class="day-block">`;
      html += `<h3>${weekday}</h3>`;
  
      if (day.tasks.length === 0) {
        html += `<p class="empty">Inget gjort</p>`;
      } else {
  
        day.tasks.forEach(task => {
  
          const taskLabel =
            tasks.find(t => t.name === task.taskName)?.label || task.taskName;
  
          if (task.actualMinutes > 0) {
            html += `
              <p>
                ✔ ${taskLabel}
                (${task.actualMinutes} min)
                → +${task.earnedMinutes} min
              </p>
            `;
          } else {
            html += `
              <p>
                ✔ ${taskLabel}
                +${task.earnedMinutes} min
              </p>
            `;
          }
  
        });
  
      }
  
      html += `</div>`;
    });
  
    return html;
  }