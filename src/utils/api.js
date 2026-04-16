const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

async function request(path, { token, ...options } = {}) {
  const headers = {
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const message = data?.message || `Request failed (${response.status})`;
    throw new Error(message);
  }

  return data;
}

export async function loginUser({ email, password }) {
  return request('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
}

export async function getMe(token) {
  return request('/api/auth/me', { token });
}

export async function fetchLayouts(token) {
  return request('/api/layouts', { token });
}

export async function saveLayout(token, payload) {
  return request('/api/layouts/save', {
    token,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

export async function fetchCurrentState(token) {
  return request('/api/current-state', { token });
}

export async function syncCurrentState(token, payload) {
  return request('/api/current-state', {
    token,
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}
