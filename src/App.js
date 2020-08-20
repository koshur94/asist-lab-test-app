import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { State } from './context/State';
import Navbar from './components/Navbar';
import { Home } from './pages/Home';
import { Posts } from './pages/Posts';
import { Post } from './pages/Post';
import { Photos } from './pages/Photos';
import { Albums } from './pages/Albums';
import { Stats } from './pages/Stats';
import './App.css';

function App() {
  return (
    <State>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/posts' exact component={Posts} />
          <Route path='/posts/:id' exact component={Post} />
          <Route path='/albums' exact component={Albums} />
          <Route path='/albums/:id' exact component={Photos} />
          <Route path='/stats' exact component={Stats} />
        </Switch>
      </BrowserRouter>
    </State>
  );
}

export default App;
