const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export async function sendContactMessage(data: { name: string; email: string; message: string }) {
  const res = await fetch(`${API_URL}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to send message");
  }
}
