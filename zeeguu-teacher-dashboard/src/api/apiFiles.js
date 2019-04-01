import { apiGet, apiPost } from './apiEndpoints'

export function uploadFiles(classId, data) {
  const result = apiPost(`/upload_files/${classId}`, data, false)
  return result
}

export function getFiles(classId) {
  const result = apiGet(`/cohort_files/${classId}`)

  return result
}
