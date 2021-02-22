export const createArticleObject = (name, content, languageCode, user) => {
  const title = name.substr(0, name.lastIndexOf('.')) || name

  const words = content.split(/\s+/)
  const summary = words.slice(0, 30).join(' ')
  const authors = user.name

  const articleObject = {
    title,
    content,
    authors,
    summary,
    language_code: languageCode,
  }

  return articleObject
}
