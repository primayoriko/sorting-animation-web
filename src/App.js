import React from 'react';
import SortOptions from './SortOptions';
import './App.css';

function App() {
    return ( 
        <div className = "main">
            <div className = "mainHeader">
                <p> Sorting Simulator </p>
                <p> Place to simulate and understand sorting better... </p> 
            </div>
            <div className = "mainBody"> 
                <SortOptions />
            </div>
        </div>
    );
}

export default App;

// <div className="App">
        //   <header className="App-header">
        //     <img src={logo} className="App-logo" alt="logo" />
        //     <p>
        //       Edit <code>src/App.js</code> and save to reload.
        //     </p>
        //     <a
        //       className="App-link"
        //       href="https://reactjs.org"
        //       target="_blank"
        //       rel="noopener noreferrer"
        //     >
        //       Learn React
        //     </a>
        //   </header>
        // </div>