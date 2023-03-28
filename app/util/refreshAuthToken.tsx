let interval: ReturnType<typeof setInterval>;

/**
 * refresh JWT token
 * this function works in browser only because it needs the http_only cookie
 * with the payload token that is saved by the browser
 */
export const refresh = () => {
  fetch('http://localhost:3000/api/users/refresh-token', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  // we don't care if the refresh was successful or not ...
}

export default function RefreshAuthToken() {
  if (typeof document !== "undefined") {
    // refresh token each 5 minutes
    clearInterval(interval);
    interval = setInterval(refresh, 5 * 60 * 1000);
  }
  return null;
}