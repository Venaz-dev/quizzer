import React from 'react';
import { auth } from './services/firebase';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect
} from 'react-router-dom'
import Quiz from './pages/takequiz/quiz'
import AddQuiz from './pages/createquiz/addQuiz'
import Signup from './pages/signup/signup'
import Login from './pages/signup/login'
import Home from './pages/Home'
import Dashboard from './pages/dashboard/dashboard';


function PrivateRoute({ component: Component, authenticated, ...rest}){
  return(
    <Route
      {...rest}
      render = {(props) => authenticated === true
          ? <Component {...props} />
          : <Redirect to={{pathname: '/login', state: {from: props.location} }} />}
    />
  )
}

function PublicRoute({ component: Component, authenticated, ...rest}){
  return(
    <Route
      {...rest}
      render = {(props) => authenticated === false
          ? <Component {...props} />
          : <Redirect to='/dashboard' />}
    />
  )
}

class App extends React.Component{

  state = {
    authenticated: false,
    loading: true
  }

  componentDidMount(){
    auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({
          authenticated: true,
          loading: false
        })
      }
      else {
        this.setState({
          authenticated: false,
          loading: false
        })
      }
    })
  }

  render(){
    return this.state.loading === true ? 
      <h2>Loading
        <p><i className="fa fa-spinner w3-center w3-spin" style={{fontSize:'44px'}}/></p>
      </h2> : (
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path="/" component={auth().currentUser ? Dashboard : Home}></Route>
          <PrivateRoute path="/dashboard" authenticated={this.state.authenticated} component={Dashboard}></PrivateRoute>
          <PrivateRoute path="/take-quiz" authenticated={this.state.authenticated} component={Quiz}></PrivateRoute>
          <PrivateRoute path="/create-quiz" authenticated={this.state.authenticated} component={AddQuiz}></PrivateRoute>
          <PublicRoute path="/signup" authenticated={this.state.authenticated} component={Signup}></PublicRoute>
          <PublicRoute path="/login" authenticated={this.state.authenticated} component={Login}></PublicRoute>
        </Switch>
      </Router>
    )
  }
}

export default App;
