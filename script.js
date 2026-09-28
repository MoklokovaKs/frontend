const API_URL = "http://127.0.0.1:8000";

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