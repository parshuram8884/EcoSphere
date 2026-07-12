import { useState, useEffect, useCallback } from 'react'
import { authFetch } from '../services/api'

/**
 * Custom hook for fetching data from the backend API.
 * Automatically attaches JWT token and handles loading/error states.
 *
 * @param {string} endpoint - The API endpoint (e.g., '/dashboard/overview/')
 * @param {object} options - Optional { autoFetch: true }
 * @returns {{ data, loading, error, refetch }}
 */
export function useApi(endpoint, options = {}) {
  const { autoFetch = true } = options
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(autoFetch)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await authFetch(endpoint)
      if (response.ok) {
        const json = await response.json()
        setData(json)
      } else {
        const errData = await response.json().catch(() => ({}))
        setError(errData.detail || `Error ${response.status}`)
      }
    } catch (err) {
      setError(err.message || 'Network error')
    } finally {
      setLoading(false)
    }
  }, [endpoint])

  useEffect(() => {
    if (autoFetch) {
      fetchData()
    }
  }, [autoFetch, fetchData])

  return { data, loading, error, refetch: fetchData }
}

/**
 * Helper to perform mutations (POST, PATCH, PUT, DELETE)
 *
 * @param {string} endpoint
 * @param {string} method
 * @param {object|FormData} body
 * @returns {Promise<{ok, data, status}>}
 */
export async function apiMutate(endpoint, method = 'POST', body = null) {
  const options = { method }
  if (body) {
    if (body instanceof FormData) {
      options.body = body
    } else {
      options.body = JSON.stringify(body)
    }
  }
  const response = await authFetch(endpoint, options)
  const data = await response.json().catch(() => ({}))
  return { ok: response.ok, data, status: response.status }
}
