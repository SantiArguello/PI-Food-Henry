import './App.css';

import {Route} from "react-router-dom"
import {Home} from './components/Home';
import { Landing } from './components/Landing';
import {AddRecipe} from './components/AddRecipe.jsx';
import { React } from 'react';

function App() {
  return (
    
    <div className="App">    
        <Route exact path="/" component={Landing} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/create" component={AddRecipe} />
     
    </div>
    
  );
}

export default App;
