import React, { useState, useContext, useEffect } from 'react'
import { Button } from '@material-ui/core'
import Dropzone from 'react-dropzone'

import { uploadArticles, deleteArticleFromCohort } from '../api/apiArticles'

import { MdCloudUpload } from 'react-icons/md/'

import { languageMap } from '../utilities/helpers'

import { getArticles } from '../api/apiArticles'

import '../assets/styles/components/cohortArticles.scss'
import ClassroomContext from '../context/ClassroomContext'
import UserContext from '../context/UserContext'
import { UserInputArticleUpload } from './UserInputArticleUpload'
import { createArticleObject } from './createArticleObject'
import { ArticleList } from './ArticleList'

//Function to read the article from the dropzone
const readArticleContent = article => {
  const reader = new FileReader()
  return new Promise((resolve, reject) => {
    reader.onload = function(event) {
      const content = event.target.result

      resolve(content)
    }
    reader.onerror = function(e) {
      reject(e)
    }
    reader.readAsText(article)
  })
}

const CohortArticles = () => {
  const cohortData = useContext(ClassroomContext)
  const user = useContext(UserContext)
  const [refetchArticles, setRefetchArticles] = useState(0) //this state is only used to force updates on article upload/delete
  const [articlesToUpload, setArticlesToUpload] = useState([])
  const [articles, setArticles] = useState([])

  useEffect(() => {
    getArticles(cohortData.id).then(result => {
      setArticles(result.data)
    })
  }, [refetchArticles])

  const languageCode = languageMap[cohortData.language_name]

  const prepareArticles = articles => {
    const articlesData = articles.map(async article => {
      const content = await readArticleContent(article)
      const object = createArticleObject(
        article.name,
        content,
        languageCode,
        user
      )
      return object
    })
    Promise.all(articlesData).then(data => {
      setArticlesToUpload(data)
    })
  }

  const onUploadArticles = e => {
    e.preventDefault()
    uploadArticles(cohortData.id, articlesToUpload).then(result => {
      setRefetchArticles(prev => prev + 1)
      setArticlesToUpload([])
    })
  }

  const deleteArticle = article => {
    deleteArticleFromCohort(cohortData.id, article.id).then(result => {
      setRefetchArticles(prev => prev + 1)
    })
  }

  return (
    <div className="article-manager">
      <h2>Manage articles</h2>
      <ArticleList articles={articles} deleteArticle={deleteArticle} />
      <div style={{ marginBottom: '20px' }}>
        <Dropzone
          accept={['.txt']}
          onDrop={acceptedArticles => prepareArticles(acceptedArticles)}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="drop-articles">
                  {articlesToUpload.length ? (
                    <ul>
                      {articlesToUpload.map(article => (
                        <li key={article.title}>{article.title}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>
                      Drag and drop some files here, or click to select files
                    </p>
                  )}
                </div>
              </div>
            </section>
          )}
        </Dropzone>
        {articlesToUpload.length ? (
          <Button
            onClick={onUploadArticles}
            variant="contained"
            color="default"
            style={{ marginTop: 10 }}
          >
            Upload files as articles
            <MdCloudUpload style={{ marginLeft: '10px' }} />
          </Button>
        ) : null}
      </div>

      <UserInputArticleUpload
        refetchArticles={() => setRefetchArticles(prev => prev + 1)}
        user={user}
        cohortData={cohortData}
      />
    </div>
  )
}

export default CohortArticles
