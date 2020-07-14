import React from "react";

class QuestionBox extends React.Component {
  state = {
    disable: false,
    selectAnswer: "",
    score: 0,
  };

  handleClick = (option, index) => {
    const { selectAnswer } = this.state;
    if (selectAnswer === option) {
      console.log("select");
    } else {
      this.setState({ selectAnswer: option });
      setTimeout(() => {
        this.props.calScore(index, option);
      }, 100);
    }
  };

  render() {
    const { question, index, a, b, c, d, answer } = this.props;
    const { disable, selectAnswer } = this.state;
    return (
      <div className="">
        <div className="question-container">
          <div className="">
            <h5 className="question-index">Question {index + 1}</h5>
            <h2 className="quiz-question">{question}</h2>
            <div className="quiz-button-container">
              <button
                className={
                  selectAnswer === a
                    ? "quiz-option-btn option-click"
                    : "quiz-option-btn"
                }
                onClick={() => this.handleClick(a, index)}
              >
                <label>A. </label> {a}
              </button>
              <button
                className={
                  selectAnswer === b
                    ? "quiz-option-btn option-click"
                    : "quiz-option-btn"
                }
                onClick={() => this.handleClick(b, index)}
              >
                <label>B. </label> {b}
              </button>
              <button
                className={
                  selectAnswer === c
                    ? "quiz-option-btn option-click"
                    : "quiz-option-btn"
                }
                onClick={() => this.handleClick(c, index)}
              >
                <label>C. </label> {c}
              </button>
              <button
                className={
                  selectAnswer === d
                    ? "quiz-option-btn option-click"
                    : "quiz-option-btn"
                }
                onClick={() => this.handleClick(d, index)}
              >
                <label>D. </label> {d}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default QuestionBox;
