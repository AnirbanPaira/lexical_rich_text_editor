import { useState } from 'react';
import Editor from './Editor/Editor';
// import './App.css';
import './index.css'
import Form from './Form';

function App() {


  return (
    <div className="App">
     <h1>Rich Text example</h1>
     <p>This is an enviroment build in lexical </p>
     <Form/>
    </div>
  );
}

export default App;
