const API_BASE = 'http://127.0.0.1:8000/api';

/**
 * Get tokens from localStorage
 */
export function getTokens() {
  const access = localStorage.getItem('access_token');
  const refresh = localStorage.getItem('refresh_token');
  return { access, refresh };
}

/**
 * Save tokens to localStorage
 */
export function saveTokens(access, refresh) {
  localStorage.setItem('access_token', access);
  localStorage.setItem('refresh_token', refresh);
}

/**
 * Clear tokens from localStorage
 */
export function clearTokens() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
}

/**
 * Make an authenticated fetch request. Automatically attaches Bearer token.
 * If the access token is expired, it attempts a silent refresh.
 */
export async function authFetch(endpoint, options = {}) {
  const { access } = getTokens();

  const headers = {
    ...options.headers,
  };

  // Don't set Content-Type for FormData (browser sets it automatically with boundary)
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = headers['Content-Type'] || 'application/json';
  }

  if (access) {
    headers['Authorization'] = `Bearer ${access}`;
  }

  let response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  // If 401, try to refresh the token
  if (response.status === 401) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      const { access: newAccess } = getTokens();
      headers['Authorization'] = `Bearer ${newAccess}`;
      response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers,
      });
    }
  }

  return response;
}

/**
 * Attempt to refresh the access token using the refresh token.
 * Returns true on success, false on failure.
 */
async function refreshAccessToken() {
  const { refresh } = getTokens();
  if (!refresh) return false;

  try {
    const response = await fetch(`${API_BASE}/auth/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh }),
    });

    if (response.ok) {
      const data = await response.json();
      saveTokens(data.access, data.refresh || refresh);
      return true;
    } else {
      clearTokens();
      return false;
    }
  } catch {
    clearTokens();
    return false;
  }
}

/**
 * Login: POST to /api/auth/login/
 */
export async function loginUser(username, password) {
  const response = await fetch(`${API_BASE}/auth/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (response.ok) {
    saveTokens(data.access, data.refresh);
    return { success: true, data };
  }
  return { success: false, errors: data };
}

/**
 * Register: POST to /api/auth/register/
 */
export async function registerUser(payload) {
  const response = await fetch(`${API_BASE}/auth/register/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (response.ok) {
    saveTokens(data.tokens.access, data.tokens.refresh);
    return { success: true, data };
  }
  return { success: false, errors: data };
}

/**
 * Get current user profile: GET /api/auth/me/
 */
export async function fetchMe() {
  const response = await authFetch('/auth/me/');
  if (response.ok) {
    return await response.json();
  }
  return null;
}

/**
 * Logout: clear tokens
 */
export function logoutUser() {
  clearTokens();
}

/**
 * Download a report file from the backend.
 * Sends a POST to /api/reports/generate/ and triggers a browser file download.
 * 
 * @param {string} reportType - The report type (e.g. 'environmental', 'governance', 'overview')
 * @param {string} format - File format: 'pdf', 'excel', or 'csv'
 * @returns {Promise<{ok: boolean, message: string}>}
 */
export async function downloadReport(reportType = 'custom', format = 'pdf') {
  try {
    const response = await authFetch('/reports/generate/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ report_type: reportType, format }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      return { ok: false, message: err.detail || `Error ${response.status}` };
    }

    // Get the file blob and trigger download
    const blob = await response.blob();
    const contentDisposition = response.headers.get('Content-Disposition');
    let filename = `EcoSphere_Report_${reportType}.${format === 'excel' ? 'xlsx' : format}`;
    if (contentDisposition) {
      const match = contentDisposition.match(/filename="?([^"]+)"?/);
      if (match) filename = match[1];
    }

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);

    return { ok: true, message: 'Download started' };
  } catch (err) {
    return { ok: false, message: err.message || 'Network error' };
  }
}
