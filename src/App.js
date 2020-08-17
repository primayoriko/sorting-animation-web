import React from 'react';
import Content from './Content';
import './static/style/App.css';

function App() {
    return ( 
        <div className = "main">
            <div className = "mainHeader">
                <p className="title"> Sorting Simulator </p>
                <p> Place to simulate and understand sorting better... </p> 
            </div>
            <div className = "mainBody"> 
                <Content />
            </div>
        </div>
    );
}

export default App;