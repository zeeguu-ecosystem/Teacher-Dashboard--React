import React, { useState, useContext, useEffect } from 'react'

import { deleteArticleFromCohort } from '../api/apiArticles'

import { getArticles } from '../api/apiArticles'

import '../assets/styles/components/cohortArticles.scss'
import ClassroomContext from '../context/ClassroomContext'
import UserContext from '../context/UserContext'
import { UserInputArticleUpload } from './UserInputArticleUpload'
import { ArticleList } from './ArticleList'
import { DragDropArticleUpload } from './DragDropArticleUpload'

const CohortArticles = () => {
  const cohortData = useContext(ClassroomContext)
  const user = useContext(UserContext)
  const [refetchArticles, setRefetchArticles] = useState(0) //this state is only used to force updates on article upload/delete
  const [articles, setArticles] = useState([])

  useEffect(() => {
    getArticles(cohortData.id).then((result) => {
      setArticles(result.data)
    })
  }, [refetchArticles])

  const deleteArticle = (article) => {
    deleteArticleFromCohort(cohortData.id, article.id).then((result) => {
      setRefetchArticles((prev) => prev + 1)
    })
  }

  return (
    <div className="article-manager">
      <h2>Manage articles</h2>
      <ArticleList articles={articles} deleteArticle={deleteArticle} />
      <DragDropArticleUpload
        setRefetchArticles={() => setRefetchArticles((prev) => prev + 1)}
        user={user}
        cohortData={cohortData}
      />
      <UserInputArticleUpload
        refetchArticles={() => setRefetchArticles((prev) => prev + 1)}
        user={user}
        cohortData={cohortData}
      />
    </div>
  )
}

export default CohortArticles
