import React from "react";
import "../../style.css";
import "./takequiz.style.css";
import questionBank from "./questionBank";
import QuestionBox from "./questionBox";
import EndQuiz from "./endQuiz";
import Header from "../../components/Header";



class Quiz extends React.Component {
  state = {
    minutes: 0,
    seconds: 0,
    message: "",
    questions: questionBank,
    score: 0,
    timeOver: false,
    submitQuiz: false,
    answers: [],
  };

  componentDidMount() {
    //
    const { quizDetails } = this.props.location.state;
    const {questions} =this.state

    quizDetails.map((quiz) => {
      this.setState({
        questions: quiz.questions,
        minutes: quiz.time,
      });
    });

      const testing = [];

      for (let i in questions) {
        testing.push("");
      }
      console.log("testing,", testing);

      this.setState({
        answers: testing,
      });
    

    this.quizTimer();
    console.log("ok", this.props.location.state.quizDetails);
  }

  calScore = (index, result) => {
    let prevAnswers = this.state.answers;
    prevAnswers.splice(index, 1, result);
    this.setState({ answers: prevAnswers });
    console.log("st", prevAnswers);
  };

  checkAnswers = () => {
    this.state.questions.map((quest, index) => {
      if (quest.answer === this.state.answers[index]) {
        this.setState(({ score }) => ({ score: score + 1 }));
      }
    });
  };

  quizTimer = () => {
    this.myInterval = setInterval(() => {
      const { minutes, seconds } = this.state;

      if (seconds > 0) {
        this.setState(({ seconds }) => ({ seconds: seconds - 1 }));
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(this.myInterval);
          this.setState({ timeOver: true, submitQuiz: true });
          this.checkAnswers();
          document.getElementById("quiz-timer").style.display ="none";
        } else {
          this.setState(({ minutes }) => ({
            minutes: minutes - 1,
            seconds: 59,
          }));
        }
      }
    }, 1000);
  };

  render() {
    const { minutes, seconds, questions, submitQuiz } = this.state;
    const ListQuestion = questions.map((q, index) => (
      <QuestionBox
        key={q.questionId}
        question={q.question}
        index={index}
        a={q.option1}
        b={q.option2}
        c={q.option3}
        d={q.option4}
        answer={q.answer}
        calScore={this.calScore}
        submit={this.state.submitQuiz}
      />
    ));
    return (
      <div className="quiz-container">
        <Header />
        <div id="quiz-timer" className="fixed-top float-right timer">
          <h1>
            Time
            <p>
              {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </p>
          </h1>
        </div>
        {this.state.message === "" ? null : <h2>{this.state.message}</h2>}
        <div>
          {submitQuiz ? (
            <EndQuiz timeup={this.state.timeOver} score={this.state.score} overall={this.state.questions.length} />
          ) : (
            ListQuestion
          )}
        </div>
      </div>
    );
  }
}

export default Quiz;
