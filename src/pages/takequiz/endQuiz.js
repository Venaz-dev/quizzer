import React from 'react'

function EndQuiz(props) {
    return(
        <div className="score-container">
            <h1 className="time-up">{props.timeup ? "Time is UP" : null}</h1>
            <h1>Score :{props.score}</h1>
        </div>
    )
}

export default EndQuiz