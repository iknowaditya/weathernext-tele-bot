// lib/api.js
const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

async function fetchWithErrorHandling(url, options) {
  try {
    const response = await fetch(`${API_BASE}${url}`, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

export async function getUsers() {
  return fetchWithErrorHandling("/api/users");
}

export async function blockUser(id) {
  return fetchWithErrorHandling(`/api/users/block/${id}`, {
    method: "POST",
  });
}

export async function deleteUser(id) {
  return fetchWithErrorHandling(`/api/users/${id}`, {
    method: "DELETE",
  });
}

export async function getSettings() {
  return fetchWithErrorHandling("/api/settings");
}

export async function updateSettings(data) {
  return fetchWithErrorHandling("/api/settings", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}
