import React from 'react'

function EndQuiz(props) {
    return(
        <div className="question-box">
            {props.timeup ? <img src="../../icons/time-up.jpg" /> : null}
            <h1 className="time-up">{props.timeup ? "Time is UP" : "Quiz Submitted"}</h1>
            <h1>Score :{props.score}</h1>
        </div>
    )
}

export default EndQuiz