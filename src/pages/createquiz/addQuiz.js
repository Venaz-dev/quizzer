import React from 'react'
import Header from '../../components/Header'
import {auth, db} from '../../services/firebase'
import './addQuiz.style.css'

class AddQuiz extends React.Component{

    state = {
        user: auth().currentUser,
        title: '',
        question:'',
        option1:'',
        option2:'',
        option3:'',
        option4:'',
        answer:'',
        questionId: '',
        questions:[],
        errorMessage:'',
        successMessage:'',
        time: 0,
        quizID:''
    }

    handleChange = (event) =>{
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })

    }

    getQuizId =() =>{
        const {title} = this.state
        const id = title.split(' ')[0]
        let idNum = Math.floor((Math.random() * 1000)+ 1)
        const quizID =  `${id}-${idNum}-quizzer`
        this.setState({
            quizID
        })
    }

    submitQuiz =() =>{
        this.getQuizId()
        try {
            db.ref('Quiz').push({
                quiztitle: this.state.title,
                quizID: this.state.quizID,
                questions: this.state.questions,
                tester: this.state.user.displayName,
                time: this.state.time,
                uid: this.state.user.uid
           })
           console.log('done')
       } catch (error) {
           this.setState({ errorMessage: error.message})
       }
       
    }
    
    /* Add new question object to this.state.question array */

    addQuestion = (event) =>{
        event.preventDefault()
        const prevQuestions = this.state.questions
        const {question, option1, option2, option3, option4, answer} = this.state

        if(question === "" || option1 === "" || option2 === "" || option3 === "" || option4 === "" || answer === ""){

            this.setState({errorMessage: 'Please fill in all fields'})

        }else{
            const id =  Math.floor((Math.random() * 1000)+ 1)

            this.setState({errorMessage: ''})
            const newQuestion = {  
                question: question,
                option1: option1,
                option2: option2,
                option3: option3,
                option4: option4,
                answer: answer,
                questionId: id
            }
            prevQuestions.push(newQuestion)
            this.setState({
                questions: prevQuestions
            })
            this.setState({
                question:'',
                option1:'',
                option2:'',
                option3:'',
                option4:'',
                answer:'',
                successMessage:'Question Added',
                questionId: ''
            })
            setTimeout(()=>{
                this.setState({successMessage:""})
            }, 3000)
            console.log(this.state.questions)
        }
        

    }

    /* Add New question Form */
    questionForm = () =>{
        const {question, option1, option2, option3, option4, answer, errorMessage, successMessage} = this.state
            return(
                <div style={{borderBottom:'1px solid #757575', position:'relative'}}>
                    {errorMessage === '' ? null : <p className="error">{errorMessage}</p>}
                    {successMessage === '' ? null : <p className="success">{successMessage}</p>}
                    {<h4>({this.state.questions.length}) Questions Added</h4>}
                        <form>
                            <div className="question-box">
                                <p>Question: 
                                    <input
                                        type= 'text'
                                        name= 'question'
                                        className= 'form-control'
                                        value= {question}
                                        placeholder= 'Question'
                                        onChange={this.handleChange}
                                    />
                                </p>
                            </div>
                            <div className="button-container">
                                <div className='options'>
                                    <label>A:</label>
                                    <input 
                                        type='text'
                                        className= 'form-control'
                                        placeholder= 'Option A'
                                        name= 'option1'
                                        value= {option1}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className='options'>
                                    <label>B:</label>
                                    <input 
                                        type='text'
                                        className= 'form-control'
                                        placeholder= 'Option B'
                                        name= 'option2'
                                        value= {option2}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className='options'>
                                    <label>C:</label>
                                    <input 
                                        type='text'
                                        className= 'form-control'
                                        placeholder= 'Option C'
                                        name= 'option3'
                                        value= {option3}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className='options'>
                                    <label>D:</label>
                                    <input 
                                        type='text'
                                        className= 'form-control'
                                        placeholder= 'Option D'
                                        name= 'option4'
                                        value= {option4}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className='options form-answer'>
                                    <label>Answer:</label>
                                    <input 
                                        type='text'
                                        className= 'form-control'
                                        placeholder= 'Type in Answer'
                                        name= 'answer'
                                        value= {answer}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className='options'>
                                <button 
                                    className="option-btn hover-animation"
                                    onClick={this.addQuestion}
                                >
                                    Add Question
                                </button>
                                </div>
                                
                                
                            </div>
                        </form>
                    </div>
            )
        
        
    }

    /* Render preview of all add questions */
    renderPreview = () =>{
        const {questions} = this.state
        return(
            <div className="">
                <h1 className="preview-header">PREVIEW</h1>
                {
                    this.state.questions.length === 0 ?
                    <h2 className='no-preview'>
                        No Questions has been added yet
                    </h2>
                    :
                    questions.map((quest, index) =>(
                        <div id={index} className="question-box border shadow">
                            <h5>Question {index+1}</h5>
                            {quest.question}
                            <div className="button-container" style={{marginTop:'20px'}}>
                                
                                <div className='options border preview-options'>
                                    <label>A:</label><span>{quest.option1}</span>
                                </div>
                                <div className='options  border preview-options'>
                                    <label>B:</label><span>{quest.option2}</span>
                                </div>
                                <div className='options  border preview-options'>
                                    <label>C:</label><span>{quest.option3}</span>
                                </div>
                                <div className='options border preview-options'>
                                    <label>D:</label><span>{quest.option4}</span>
                                </div>
                                <div className='options border preview-options'>
                                    <label>Answer:</label><span>{quest.answer}</span>
                                </div>
                            </div>
                        </div>
                    ))
                }
                
            </div>
        )
    }

    render(){
        return(
            <div >
                <Header />
                <div className="container">
                    <h1> Fill in the details to continue</h1>
                    <div  >
                        <form>
                            <div  style={{margin: 'auto'}}>    
                                <div className='quiz-title'>
                                    <h2>Quiz Title - </h2>
                                    <input
                                        className='form-control'
                                        type= 'text'
                                        name='title'
                                        value={this.state.title}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className= 'quiz-time'>
                                <h2>Enter Time limit: </h2>
                                <input
                                    className='add-time form-control'
                                    type='number'
                                    name='time'
                                    value={this.state.time}
                                    onChange={this.handleChange}
                                />
                                <h2>Minutes</h2>
                                </div>
                            </div>
                        </form>
                    </div>
                    {
                        this.questionForm()
                    }
                </div>
                <div>
                    {
                        this.renderPreview()
                    }
                </div>
                <div>
                    
                    <button 
                        className="btn btn-primary hover-animation"
                        onClick={this.submitQuiz}>
                        Submit
                    </button>
                </div>
            </div>
        )
    }
}

export default AddQuiz