// src/api.js（或 main.jsx 裡也可以）
export async function sendThankYouEmail({ name, email }) {
  try {
    const response = await fetch("https://asia-northeast1-countbudd.cloudfunctions.net/sendThankYouEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email })
    });

    if (!response.ok) {
      throw new Error("Cloud Function failed");
    }

    return await response.json(); // 或 return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
}
