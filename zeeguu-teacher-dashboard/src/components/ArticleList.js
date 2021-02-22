import React from 'react'
import Chip from '@material-ui/core/Chip'

export const ArticleList = ({ articles, deleteArticle }) => {
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