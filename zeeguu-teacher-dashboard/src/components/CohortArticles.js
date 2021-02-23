import React, { useState, useContext } from 'react'
import '../assets/styles/components/cohortArticles.scss'
import ClassroomContext from '../context/ClassroomContext'
import UserContext from '../context/UserContext'
import { UserInputArticleUpload } from './UserInputArticleUpload'
import { ArticleList } from './ArticleList'
import { DragDropArticleUpload } from './DragDropArticleUpload'

const CohortArticles = () => {
  const cohortData = useContext(ClassroomContext)
  const user = useContext(UserContext)
  const [forceRerender, setForceRerender] = useState(0) //state to force rerendering of the articleList on article upload/delete

  return (
    <div className="article-manager">
      <h2>Manage articles</h2>
      <ArticleList
        forceRerender={forceRerender}
        setForceRerender={setForceRerender}
        cohortData={cohortData}
      />
      <DragDropArticleUpload
        user={user}
        setForceRerender={setForceRerender}
        cohortData={cohortData}
      />
      <UserInputArticleUpload
        user={user}
        setForceRerender={setForceRerender}
        cohortData={cohortData}
      />
    </div>
  )
}

export default CohortArticles
