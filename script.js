// В Docker-окружении запросы идут на тот же origin (Nginx),
// а Nginx проксирует /api/ → backend:8000
const API_URL = "/api";

document.getElementById("sendBtn").addEventListener("click", async () => {
    const text = document.getElementById("textInput").value;
    const formData = new FormData();
    formData.append("text", text);

    const response = await fetch(`${API_URL}/submit`, {
        method: "POST",
        body: formData
    });

    const result = await response.json();
    document.getElementById("status").textContent =
        "Ответ: " + JSON.stringify(result);
});

document.getElementById("getBtn").addEventListener("click", async () => {
    const index = document.getElementById("requestInput").value.trim();
    const output = document.getElementById("resultOutput");

    const url = (index && index !== "0")
        ? `${API_URL}/data?index=${index}`
        : `${API_URL}/data`;

    try {
        const response = await fetch(url);
        const result = await response.json();

        if (!response.ok) {
            output.value = "Ошибка: " + (result.error || response.statusText);
            return;
        }

        output.value = result.content.length
            ? result.content.join("\n")
            : "(файл пуст)";
    } catch (e) {
        output.value = "Не удалось связаться с сервером: " + e.message;
    }
});