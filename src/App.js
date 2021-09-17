
import React, {useState, useEffect} from "react";
import {Route, Link, Switch} from 'react-router-dom';
import Form from './components/Form';
import './App.css';



const App = () => { 
  return (
    <div>
      <header>
        <h1>Lambda Eats</h1>
        <h2>Umer's Pizza</h2>
      <nav>
        <Link to='/'><h2>Home</h2></Link>
        <Link to='/pizza'><h2>Order Online</h2></Link>
      </nav>
      </header>
      <Switch>
        <Route path='/pizza'>
          <Form/>
        </Route>
        <Route path='/'>
          <p>The internet's best pizza</p>
        </Route>
      </Switch>
    </div>
  );
};
export default App;
