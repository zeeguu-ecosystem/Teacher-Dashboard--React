import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary
} from '@material-ui/core'
import { MdExpandMore, MdKeyboardArrowRight } from 'react-icons/md/'
import React, { useEffect, useState } from 'react'
import { loadUserSessions, loadUserInfo } from '../api/apiUser'
import '../assets/styles/pages/studentPage.scss'
import { secondsToHoursAndMinutes } from '../utilities/helpers'

const StudentActivity = ({ classId, studentId }) => {
  const [articlesByDate, setArticlesByDate] = useState([])
  const [totalArticlesCount, setTotalArticlesCount] = useState(0)
  const [userInfo, setUserInfo] = useState({})
  useEffect(() => {
    loadUserSessions(studentId, 19).then(result => {
      let totalArticlesCount = 0
      result.forEach(day => {
        totalArticlesCount += day.reading_sessions.length
      })
      setArticlesByDate(result)
      setTotalArticlesCount(totalArticlesCount)
    })
    loadUserInfo(studentId, 10).then(({ data }) => {
      setUserInfo(data)
    })
  }, [])
  return (
    <div className="student-page">
      {articlesByDate.map((day, index) => (
        <div key={index}>
          <p>{day.date}</p>
          {day.reading_sessions.map((readingSession, index) => (
            <ExpansionPanel key={index}>
              <ExpansionPanelSummary expandIcon={<MdExpandMore />}>
                <h2 className="student-activity-item-heading">
                  {readingSession.article_title}
                </h2>
                <p className="student-activity-item-duration">
                  {secondsToHoursAndMinutes(readingSession.duration / 1000)}
                </p>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails
                style={{
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {readingSession.bookmarks.sentence_list.map(
                  (sentence, index) => (
                    <div className="student-page-bookmark-compound" key={index}>
                      {sentence.context}
                      <div className="student-page-bookmarks">
                        {sentence.bookmarks.map(bookmark => (
                          <p key={bookmark.id}>
                            <span className="student-page-bookmark-from">
                              {bookmark.from}
                            </span>{' '}
                            <MdKeyboardArrowRight
                              className="student-page-translation-arrow"
                              size="24"
                            />{' '}
                            {bookmark.to}{' '}
                          </p>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))}
        </div>
      ))}
    </div>
  )
}

export default StudentActivity
