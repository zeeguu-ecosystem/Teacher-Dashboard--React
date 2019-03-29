import { apiGet, apiPost } from './apiEndpoints'

export function getFiles(classId) {
  const result = apiGet(`GET FILES ENDPOINT/${classId}`)
  return result
}

export function uploadFiles(classId, data) {
  const result = apiPost(`/upload_files/${classId}`, data, false)
  return result
}
