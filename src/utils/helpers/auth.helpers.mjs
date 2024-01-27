export const isInvalidUserName = (username) =>
  !username || typeof username !== "string" || username.trim() === "";


