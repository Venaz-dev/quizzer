import React from 'react'
import { Link } from 'react-router-dom'
import './signup.style.css'
import { signin, signInWithGoogle, signInWithGitHub } from '../../helpers/auth'
import Header from '../../components/Header'

class SignUp extends React.Component{
    state= {
        email: '',
        password: '',
        error: null,
        username: ''
    }

    handleChange = (event) =>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) =>{
        event.preventDefault()
        this.setState({ error: '' })
        try {
            signin(this.state.email, this.state.password)
        } catch (error) {
            this.setState({error: error.message})
        }
    }
    googleSignIn = () =>{
        try {
            signInWithGoogle()
        } catch (error) {
            this.setState({ error: error.message})
        }
    }
    githubSignIn = () =>{
        try {
            signInWithGitHub()
        } catch (error) {
            this.setState({ error: error.message})
        }
    }

    render(){
        return(
            <div className="container sign-up w3-round-small">
                <Header />
                <div className="image-holder">
                </div>
                <div className='w3-animate-zoom form-container'>
                    <form className=" py-5 px-5 howdy-signin" onSubmit={this.handleSubmit}>
                        <div className="form-header">
                            <h1>
                                <Link className="logo" to='/'>Quizzer</Link>
                            </h1>
                            <div className="link-holder">
                                <h4><Link className="links " to='/signup'>Sign Up</Link></h4>
                                <h4><Link className="links active" to='/login'>Login</Link></h4>
                            </div>
                        </div>
                        
                        <p className="lead">Fill in the form to login.</p>
                        <div className="form-group">
                            <input className="form-control" placeholder="Email" name="email" type="email" onChange={this.handleChange} value={this.state.email}></input>
                        </div>
                        
                        <div className="form-group">
                            <input className="form-control" placeholder="Password" name="password" onChange={this.handleChange} value={this.state.password} type="password"></input>
                        </div>
                        <div className="form-group">
                            {this.state.error ? <p className="text-danger">{this.state.error}</p> : null}
                            <button className="btn btn-primary px-5 form-control button" type="submit">Login</button>
                        </div>
                        <p className="or-text"> or </p>
                        <button className="btn google-btn mr-2 form-control" type="button" onClick={this.googleSignIn}>
                            Sign in with Google
                        </button>
                        <button className=" btn github-btn mr-2 form-control" type="button" onClick={this.githubSignIn}>
                            Sign in with Github
                        </button>
                        <hr></hr>
                    
                    </form>
                </div>
            </div>
        )
    }
}


export default SignUp