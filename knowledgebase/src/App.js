// App.js
import React from 'react';
import KnowledgeBase from './component/KnowledgeBase';
import './App.css'
function App() {
  return (
    <div className='App' >
      <h1 style={{textAlign:'center',backgroundColor:'#00acc1',margin:'0px', padding:'20px' ,width:'100%',color:'white' , height:'auto'}}>
        Knowledge Base Editor</h1>
      <KnowledgeBase /></div>
  );
}

export default App;