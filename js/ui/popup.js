/* export function showPopup(child, taskLabel, minutes) {
  console.log("minutes",minutes)
  let text;

    text = `
    🎉 Bra jobbat, ${child}!<br><br>
    ✔ ${taskLabel}<br>
    ⏱ +${minutes} min iPad-tid
  `;
  
  
 

  document.getElementById("popup-text").innerHTML = text;
  document.getElementById("popup").classList.remove("hidden");
} */

  export function showPopup(child, taskLabel, minutes) {

    let text;
  
    if (minutes === 0) {
      // ❗ 重复 / 失败提示
      text = `
        ⚠️ ${child}<br><br>
        Redan gjort idag!<br>
        T_T Mjao mjao mjao mjao...
      `;
    } else {
      // ✅ 正常奖励
      text = `
        🎉 Bra jobbat, ${child}!<br><br>
        ✔ ${taskLabel}<br>
        ⏱ +${minutes} min iPad-tid
      `;
    }
  
    document.getElementById("popup-text").innerHTML = text;
    document.getElementById("popup").classList.remove("hidden");
  }




export function closePopup() {
  document.getElementById("popup").classList.add("hidden");
}

