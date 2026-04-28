export function initDate() {
    const today = new Date().toISOString().split("T")[0];
    document.getElementById("date").value = today;
  
    updateWeekday();
  
    document
      .getElementById("date")
      .addEventListener("change", updateWeekday);
  }
  
  function updateWeekday() {
    const dateValue = document.getElementById("date").value;
  
    if (!dateValue) return;
  
    const date = new Date(dateValue);
  
    const weekday = date.toLocaleDateString("sv-SE", {
      weekday: "long"
    });
  
    const formatted =
      weekday.charAt(0).toUpperCase() + weekday.slice(1);
  
    document.getElementById("weekday").innerText = formatted;
  }

  export function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("sv-SE", {
      day: "numeric",
      month: "short"
    });
  }