import React from 'react'

const ProgressBar = ({
    normalized_activity_proportion,
    learning_proportion
  }) => {
    //in case the user hasn't read anything, make the learning proportion 50 %
    learning_proportion = learning_proportion === 0 ? 50 : learning_proportion
    return (
      <div
        className="activity-bar"
        style={{
          width: normalized_activity_proportion + '%'
        }}
      >
        <div
          className="activity-bar__reading"
          style={{
            width: learning_proportion + '%'
          }}
        />
        <div
          className="activity-bar__exercises"
          style={{
            width: 100 - learning_proportion + '%'
          }}
        />
      </div>
    )
  }
  export default ProgressBar