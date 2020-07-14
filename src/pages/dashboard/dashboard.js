import React from 'react'
import {Link} from 'react-router-dom'
import {db} from '../../services/firebase'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import './dashboard.style.css'

class Dashboard extends React.Component{

    state={
        quizCode:'',
        isLoading: false,
        quizTitle:'',
        quizes: [],
        quiz:[]

    }

    searchQuiz = () =>{
        try {
            db.ref('Quiz').on("value", snapshot => {
                let quizes = []
                snapshot.forEach((snap) => {
                    quizes.push(snap.val())
                })
                this.setState({ quizes })
                console.log('test', this.state.quizes)
            })
            setTimeout(()=>{
                if (this.state.quizes.length !== 0){
                setTimeout(this.filterQuiz, 500)
            }}, 1000)
            setTimeout(() =>{
                this.setState({
                    isLoading: false
                })
            }, 2000)
        } catch (error) {
            this.setState({readError: error.message})
        }
        
        
    }

    filterQuiz = () =>{
        const {quizes, quizCode} = this.state
        const quizFilter = quizes.filter(quiz =>(
            quiz.quizID.toLowerCase().includes(quizCode.toLowerCase())
        ))
        this.setState({
            quiz: quizFilter
        })
        
        console.log('ok',this.state.quiz.length)
    }
 
    handleChange = (event) =>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleClick = () =>{
        this.setState({
            isLoading: true
        })

        this.searchQuiz()
        
    }

    render(){
        let quizLength = this.state.quiz.length
        return(
            <div className="container fullwidth">
                <Header />
                <div className='content-holder'>
                    <div className="w3-bar-block w3-white menu-section">
                        <div className="search-section">
                            <input 
                            type= 'text'
                            className= 'form-control search'
                            placeholder= 'Enter Quiz Code to take Quiz'
                            value= {this.state.quizCode}
                            name= 'quizCode'
                            onChange={this.handleChange}
                            />
                            <div className='search-button-container'>
                                <button 
                                    className= 'btn btn-primary search-button hover-animation'
                                    onClick={this.handleClick}>
                                    Search
                                </button>
                            </div>
                        </div>
                        <Link className="links" to='/create-quiz'>
                            <div className="w3-bar-item hover-animation">Create Quiz</div>
                        </Link>
                        <div className="w3-bar-item">Quiz Results</div>
                        <div className="w3-bar-item">Tokyo</div>
                    </div>
                    <div className='search-area'>
                        {this.state.isLoading === true ? 
                            
                            <p><i className="fa fa-spinner w3-center w3-spin" style={{fontSize:'44px'}}/></p>
                            :
                            <div className="input-holder"> 
                                {this.state.quiz.length === 0 ?
                                    <h1>Search Quiz Code</h1>
                                    : 
                                    <div className="quiz-details">
                                        {this.state.error}
                                            {this.state.quiz.map(quiz =>(
                                                <div>
                                                    <p id='title'>Quiz Title: {quiz.quiztitle}</p>
                                                    <p>No of Question: {quiz.questions.length}</p>
                                                    <p>Time Limit: {quiz.time} Mins</p>
                                                    <Link 
                                                        className="btn btn-primary hover-animation"
                                                        to={{
                                                            pathname: '/take-quiz',
                                                            state: {
                                                                quizDetails: this.state.quiz
                                                            }
                                                        }}>
                                                        Start Quiz
                                                    </Link>
                                                </div>
                                            ))}
                                    </div>
                                }
                                    
                            </div>
                        }
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Dashboard