//const BASE_URL = `http://${window.location.hostname}:8080/api`;

const BASE_URL = "https://rewardingipadtim-production-bcdb.up.railway.app/api"

/* export async function createPoint(data) {
  const res = await fetch(`${BASE_URL}/points`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return res.json();  
} */

  export async function createPoint(data) {
    const res = await fetch(`${BASE_URL}/points`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
  
    if (!res.ok) {
      // ⭐ 关键：让前端知道失败
      throw new Error("FAILED");
    }
  
    return res.json();
  }

export async function getSummary(child, date) {
  const res = await fetch(
    `${BASE_URL}/summary?childName=${child}&date=${date}`
  );
  return res.json();
}

export async function getDetails(child, date) {
  const res = await fetch(
    `${BASE_URL}/detail?childName=${child}&date=${date}`
  );

  return res.json();
}