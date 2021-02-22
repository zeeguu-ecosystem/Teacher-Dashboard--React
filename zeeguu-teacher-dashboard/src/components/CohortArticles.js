import React, { useState, useContext, useEffect } from 'react'

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
      console.log("STATE CHENGED REFETCHARTICLES IS NOW: "+ refetchArticles)
    })
  }, [refetchArticles])

  return (
    <div className="article-manager">
      <h2>Manage articles</h2>
      <ArticleList
        articles={articles}
        setRefetchArticles={() => setRefetchArticles((prev) => prev + 1)}
        cohortData={cohortData}
      />
      <DragDropArticleUpload
        user={user}
        setRefetchArticles={() => setRefetchArticles((prev) => prev + 1)}
        cohortData={cohortData}
      />
      <UserInputArticleUpload
        user={user}
        setRefetchArticles={() => setRefetchArticles((prev) => prev + 1)}
        cohortData={cohortData}
      />
    </div>
  )
}

export default CohortArticles
