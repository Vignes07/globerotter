const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export async function fetchDestinations() {
  try {
    const response = await fetch(`${API_URL}/destinations`);
    if (!response.ok) throw new Error("Failed to fetch destinations");
    return await response.json();
  } catch (error) {
    console.error("Error fetching destinations:", error);
    return [];
  }
}

export async function saveUserScore(username, score) {
  try {
    const response = await fetch(`${API_URL}/users/score`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, score }),
    });

    if (!response.ok) throw new Error("Failed to save score");
    return await response.json();
  } catch (error) {
    console.error("Error saving user score:", error);
    return null;
  }
}

export async function getUserScore(username) {
  try {
    const response = await fetch(`${API_URL}/users/${username}/score`);
    if (!response.ok) throw new Error("Failed to fetch user score");
    return await response.json();
  } catch (error) {
    console.error("Error fetching user score:", error);
    return null;
  }
}
