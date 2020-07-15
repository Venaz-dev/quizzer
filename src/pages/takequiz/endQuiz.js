import React from "react";
import {Link} from 'react-router-dom'

function EndQuiz(props) {
  return (
    <div className="question-box">
      {props.timeup ? (
        <img
          src={require("./time-up.jpg")}
          alt="time up"
          width={500}
          height={400}
        />
      ) : null}

      <h1 className="time-up">
        {props.timeup ? "Time is UP" : "Quiz Submitted"}
      </h1>
      <h1>
        Score : {props.score} / {props.overall}
      </h1>
      <Link to="/dashboard">
        <button className=" btn-primary quiz-option-btn">
          Back to Dashboard
        </button>
      </Link>
    </div>
  );
}

export default EndQuiz;
