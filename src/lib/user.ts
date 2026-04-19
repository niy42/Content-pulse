export function getUserId() {
  let userId = localStorage.getItem("user_id");

  if (!userId) {
    userId = crypto.randomUUID(); // modern browsers
    localStorage.setItem("user_id", userId);
  }

  return userId;
}