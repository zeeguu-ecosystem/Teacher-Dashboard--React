import React, { useEffect, useState } from 'react'
import Chip from '@material-ui/core/Chip'
import { getArticles, deleteArticleFromCohort } from '../api/apiArticles'

export const ArticleList = ({ cohortData, forceRerender, setForceRerender }) => {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    getArticles(cohortData.id).then((result) => {
      setArticles(result.data)
    })
  }, [forceRerender])

  const deleteArticle = (article) => {
    deleteArticleFromCohort(cohortData.id, article.id).then((result) => {
      setForceRerender((prev) => prev + 1)
    })
  }

  return (
    <div className="article-list-container">
      <h4>Article list</h4>
      <ul className="article-list">
        {articles.map((article) => {
          return (
            <li key={article.id}>
              <Chip
                label={article.title}
                onDelete={() => deleteArticle(article)}
                className="article"
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
