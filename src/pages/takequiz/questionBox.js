import React from 'react'


class QuestionBox extends React.Component{
state={
    disable: false,
    selectAnswer: '',
    score: 0
}

handleClick = (option, index) =>{
    const {selectAnswer} = this.state
    if (selectAnswer === option){
        console.log("select")
    }else{
        this.setState({selectAnswer : option})
        setTimeout(()=>{
            this.props.calScore(index, option)
        },100)  
    }
}




    render(){
        const {question, index, a, b, c, d, answer} = this.props
        const {disable, selectAnswer} = this.state
        return(
            <div className="container">
                <div style={{borderBottom:'1px solid #757575'}}>
                    <div className="question-box">
                        <h5>Question {index+1}</h5>
                        {question}
                        <div className="button-container">
                            <button 
                                className={selectAnswer === a ? "option-btn clicked": "option-btn"}
                                onClick={() => this.handleClick(a, index)}
                            >
                                <label>A. </label> {a}
                            </button>
                            <button 
                                className={selectAnswer === b ? "option-btn clicked": "option-btn"}
                                onClick={() => this.handleClick(b, index)}
                            >
                                <label>B. </label> {b}
                            </button>
                            <button 
                                className={selectAnswer === c ? "option-btn clicked": "option-btn"}
                                onClick={() => this.handleClick(c, index)}
                            >
                                <label>C. </label> {c}
                            </button>
                            <button 
                                className={selectAnswer === d ? "option-btn clicked": "option-btn"}
                                onClick={() => this.handleClick(d, index)}
                            >
                                <label>D. </label> {d}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default QuestionBox