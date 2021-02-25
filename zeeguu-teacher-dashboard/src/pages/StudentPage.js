import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from '@material-ui/core'
import { MdExpandMore, MdKeyboardArrowRight } from 'react-icons/md/'
import React, { useEffect, useState, useContext } from 'react'
import { loadUserSessions } from '../api/apiUser'
import '../assets/styles/pages/studentPage.scss'
import {
  secondsToHoursAndMinutes,
  millisecondsToSeconds,
} from '../helpers/studentPageHelpers'
import { timePeriodMap } from '../helpers/sharedHelperMaps'
import TimePeriodContext from '../context/TimePeriodContext'
import ElephantLoader from '../components/ElephantLoader'

const sessionDuration = (readingSession) => {
  return secondsToHoursAndMinutes(
    millisecondsToSeconds(readingSession.duration)
  )
}
const StudentActivity = ({ studentId }) => {
  const { timePeriod } = useContext(TimePeriodContext)
  const [articlesByDate, setArticlesByDate] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [totalArticlesCount, setTotalArticlesCount] = useState(0)

  useEffect(() => {
    setIsLoading(true)
    loadUserSessions(studentId, timePeriod).then((result) => {
      let totalArticlesCount = 0
      result.forEach((day) => {
        totalArticlesCount += day.reading_sessions.length
      })
      setArticlesByDate(result)
      setTotalArticlesCount(totalArticlesCount)
      setIsLoading(false)
    })
  }, [timePeriod])
  return (
    <div className="student-page">
      {isLoading ? (
        <ElephantLoader />
      ) : articlesByDate.length === 0 ? (
        <p style={{ textAlign: 'center' }}>
          The student has not read any articles yet
        </p>
      ) : (
        <div>
          <p className="total-article-count">
            {totalArticlesCount} articles read in the last{' '}
            {timePeriodMap[timePeriod]}
          </p>
          {articlesByDate.map((day, index) => (
            <div className="student-activity" key={index}>
              <p style={{ marginBottom: 10 }}>{day.date}</p>
              {day.reading_sessions.map((readingSession, index) => (
                <ExpansionPanel key={index}>
                  <ExpansionPanelSummary expandIcon={<MdExpandMore />}>
                    <div style={{ display: 'flex', alignItems: 'baseline' }}>
                      <h2 className="student-activity-item-heading">
                        {readingSession.article_title}
                      </h2>
                    </div>
                    <p className="student-activity-item-duration">
                      {sessionDuration(readingSession)}
                    </p>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className="student-activity-item-link"
                      href={`/read/article?articleID=${readingSession.article_id}`}
                    >
                      Read article →
                    </a>
                    {(readingSession.bookmarks.sentence_list.length === 0 && (
                      <p>No words were translated in this reading session.</p>
                    )) ||
                      readingSession.bookmarks.sentence_list.map(
                        (sentence, index) => (
                          <div
                            className="student-page-bookmark-compound"
                            key={index}
                          >
                            {sentence.context}
                            <div className="student-page-bookmarks">
                              {sentence.bookmarks.map((bookmark) => (
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
      )}
    </div>
  )
}

export default StudentActivity
