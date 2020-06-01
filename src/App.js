import React from 'react';
import SortContent from './SortContent';
import './App.css';

function App() {
    return ( 
        <div className = "main">
            <div className = "mainHeader">
                <p className="title"> Sorting Simulator </p>
                <p> Place to simulate and understand sorting better... </p> 
            </div>
            <div className = "mainBody"> 
                <SortContent />
            </div>
        </div>
    );
}

export default App;