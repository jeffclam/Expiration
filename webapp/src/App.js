import React from 'react'
import { 
  BrowserRouter as Router,  
  Route, 
  Redirect,
  Switch,
} from 'react-router-dom'
import './App.css'
import HomeView from './views/HomeView'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/'><Redirect to='/home' /></Route>
          <Route path='/home' component={HomeView} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
