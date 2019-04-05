import { apiGet, apiPost } from './apiEndpoints'

export function deleteArticle(classId, articleId) {
  const result = apiPost(`/delete_article/${classId}/${articleId}`)
  return result
}

export function uploadFiles(classId, data) {
  const result = apiPost(`/upload_articles/${classId}`, data, false)
  return result
}

export function getFiles(classId) {
  const result = apiGet(`/cohort_files/${classId}`)
  return result
}
