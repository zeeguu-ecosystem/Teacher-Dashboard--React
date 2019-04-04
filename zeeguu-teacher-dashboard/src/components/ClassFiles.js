import React, { useState, useContext, useEffect } from 'react'
import { Button, Dialog, DialogContent, TextField } from '@material-ui/core'
import Dropzone from 'react-dropzone'

import { uploadFiles, deleteArticle } from '../api/apiFiles'

import { MdClose, MdCloudUpload } from 'react-icons/md/'

import { languageMap } from '../utilities/helpers'

import { getFiles } from '../api/apiFiles'

import '../assets/styles/components/classFiles.scss'
import ClassRoomContext from '../context/ClassRoomContext'
import UserContext from '../context/UserContext'

const readFileContent = file => {
  const reader = new FileReader()
  return new Promise((resolve, reject) => {
    reader.onload = function(event) {
      const content = event.target.result

      resolve(content)
    }
    reader.onerror = function(e) {
      reject(e)
    }
    reader.readAsText(file)
  })
}

const createArticleObject = (name, content, languageCode, user) => {
  const title = name.substr(0, name.lastIndexOf('.')) || name

  const words = content.split(/\s+/)
  const summary = words.slice(0, 30).join(' ')
  const authors = user.name

  const articleObject = {
    title,
    content,
    authors,
    summary,
    language_code: languageCode
  }

  return articleObject
}

const ClassFiles = () => {
  const classData = useContext(ClassRoomContext)
  const user = useContext(UserContext)
  const [refetchFiles, setRefetchFiles] = useState(0)
  const [filesToUpload, setFilesToUpload] = useState([])
  const [files, setFiles] = useState([])

  useEffect(() => {
    getFiles(classData.id).then(result => {
      setFiles(result.data)
    })
  }, [refetchFiles])

  const languageCode = languageMap[classData.language_name]

  const prepareFiles = files => {
    const filesData = files.map(async file => {
      const content = await readFileContent(file)
      const object = createArticleObject(file.name, content, languageCode, user)
      return object
    })
    Promise.all(filesData).then(data => {
      console.log('files', data)
      setFilesToUpload(data)
    })
  }

  const onUploadFiles = e => {
    e.preventDefault()
    console.log('uploading...')
    uploadFiles(classData.id, filesToUpload).then(result => {
      setRefetchFiles(prev => prev + 1)
    })
  }

  const deleteFile = file => {
    console.log('deleting...', file)
    deleteArticle(classData.id, file.id).then(result => {
      console.log('result', result)
      setRefetchFiles(prev => prev + 1)
    })
  }

  return (
    <div className="file-manager">
      <h2>Manage files</h2>
      <FileList files={files} deleteFile={deleteFile} />
      {/* <div className="user-upload"> */}
      <div style={{ marginBottom: '20px' }}>
        <Dropzone
          accept={['.txt']}
          onDrop={acceptedFiles => prepareFiles(acceptedFiles)}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="drop-files">
                  {filesToUpload.length ? (
                    <ul>
                      {filesToUpload.map(file => (
                        <li key={file.title}>{file.title}</li>
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
        {filesToUpload.length ? (
          <Button
            onClick={onUploadFiles}
            variant="contained"
            color="default"
            style={{ marginTop: 10 }}
          >
            Upload files as articles
            <MdCloudUpload style={{ marginLeft: '10px' }} />
          </Button>
        ) : null}
      </div>

      <UserInput
        refetchFiles={() => setRefetchFiles(prev => prev + 1)}
        user={user}
      />
    </div>
  )
}

const FileList = ({ files, deleteFile }) => {
  return (
    <div className="file-list">
      <h4>File list</h4>
      <ul>
        {files.map(file => {
          return (
            <li className="file" key={file.id}>
              <p>{file.title}</p>
              <MdClose size="22px" onClick={() => deleteFile(file)} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const UserInput = ({ user, refetchFiles }) => {
  const classData = useContext(ClassRoomContext)
  const languageCode = languageMap[classData.language_name]

  const [state, setState] = useState({
    article_title: '',
    article_content: ''
  })

  const handleChange = event => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  const submitArticle = e => {
    e.preventDefault()
    let articleObj = createArticleObject(
      state.article_title,
      state.article_content,
      languageCode,
      user
    )
    console.log('submitting', articleObj)
    uploadFiles(classData.id, [articleObj]).then(result => {
      refetchFiles()
    })
  }

  return (
    <form onSubmit={submitArticle}>
      <TextField
        type="text"
        placeholder="This will be the title of the article"
        value={state.article_title}
        onChange={handleChange}
        name="article_title"
        id="article_title"
        label="Article title"
        fullWidth
      />
      <TextField
        type="text"
        placeholder="Type any text here to create an article"
        multiline={true}
        value={state.article_content}
        onChange={handleChange}
        name="article_content"
        id="article_content"
        label="Article content"
        rows={6}
        fullWidth
      />
      <div>
        <Button
          style={{ marginTop: 10 }}
          type="submit"
          variant="contained"
          color="primary"
          disabled={!(state.article_title && state.article_content)}
        >
          Submit Article{' '}
        </Button>
      </div>
    </form>
  )
}

export default ClassFiles
