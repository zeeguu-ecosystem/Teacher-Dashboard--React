import React from 'react'
import Chip from '@material-ui/core/Chip'
import { deleteArticleFromCohort } from '../api/apiArticles'

export const ArticleList = ({ articles, cohortData, setForceRerender }) => {
  const deleteArticle = (article) => {
    deleteArticleFromCohort(cohortData.id, article.id).then((result) => {
      setForceRerender((prev) => prev + 1)
    })
  }

    return (
      <div className="article-list-container">
        <h4>Article list</h4>
        <ul className="article-list">
          {articles.map(article => {
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