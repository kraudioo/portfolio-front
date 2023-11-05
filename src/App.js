import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProjetoList from './components/ProjetoList';
import ProjetoEdit from "./components/ProjetoEdit";

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={ProjetoList}/> 
            <Route path='/projeto/:id' component={ProjetoEdit}/>
          </Switch>
        </Router>
    )
  }
}

export default App;