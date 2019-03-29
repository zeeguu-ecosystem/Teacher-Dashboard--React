import React, { useState, useContext } from 'react'
import { Button, Dialog, DialogContent } from '@material-ui/core'
import Dropzone from 'react-dropzone'

import { getFiles, uploadFiles } from '../api/apiFiles'

import { MdClose } from 'react-icons/md/'

import { languageMap } from '../utilities/helpers'

import './filemanager.scss'
import ClassRoomContext from '../context/ClassRoomContext'

const ClassFiles = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button
        color="secondary"
        variant="contained"
        onClick={() => setIsOpen(true)}
      >
        Manage Files
      </Button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogContent>
          <FileManager />
        </DialogContent>
      </Dialog>
    </>
  )
}

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

const createArticleObject = (content, title, languageCode) => {
  const words = content.split(/\s+/)
  const wordCount = words.length
  const summary = words.slice(0, 30).join(' ')

  console.log('summary', summary)

  const fileObject = {
    title,
    content,
    wordCount,
    summary,
    languageCode
  }

  return fileObject
}

const FileManager = () => {
  const [files, setFiles] = useState([
    {
      name: 'Testfilehey1'
    },
    {
      name: 'Secondtestfilelol'
    }
  ])

  const classData = useContext(ClassRoomContext)
  const languageCode = languageMap[classData.language_name]
  console.log('hyoooooooooooooooooooooo')
  console.log(classData.language_name)

  const prepareFiles = files => {
    const filesData = files.map(async file => {
      const content = await readFileContent(file)
      const object = createArticleObject(content, file.name, languageCode)
      return object
    })
    Promise.all(filesData).then(data => {
      console.log('data', data)
      //todo send data to api
      uploadFiles(classData.id, data)
    })
  }

  const deleteFile = file => {
    console.log('delete file', file)
    //todo call deletefile endpoint
  }

  return (
    <div className="file-manager">
      <h2>Manage files</h2>
      <FileList files={files} deleteFile={deleteFile} />

      <Dropzone
        accept={['.txt']} //maybe add .doc and .docx ?
        onDrop={acceptedFiles => prepareFiles(acceptedFiles)}
      >
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div className="drop-files">
                Drag 'n' drop some files here, or click to select files
              </div>
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  )
}

const FileList = ({ files, deleteFile }) => {
  return (
    <div>
      <h4>File list</h4>
      <ul>
        {files.map(file => {
          return (
            <li key={file.name}>
              <p>{file.name}</p>
              <MdClose size="22px" onClick={() => deleteFile(file)} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default ClassFiles
