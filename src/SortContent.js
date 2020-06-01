import React from 'react';
import './SortContent.css';

class SortOptions extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    animate(){

    }

    render(){
        const sortOptions = (
            <form>
                <table>
                    <tbody>
                        <tr>
                            <td colSpan={2}>
                                Input value to be sorted: 
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}> 
                                <font color="#CFAFAF">
                                    (Separate it by a ';', recommended below 16 num)
                                </font>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <input size="60" name="values" />
                            </td>
                        </tr>
                        <tr>
                            <td>Sorting Type:</td>
                            <td>
                                <input  type="radio" name="count" />
                                Bubble Sort
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <input  type="radio" name="count" />
                                Merge Sort
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <button className="animateButton" size="60" onClick={() => this.animate()}> 
                                    Simulate! </button> 
                            </td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </form>
        );
        return sortOptions;
    }
}

class Animation extends React.Component{
    constructor(props){
        super(props);

    }

    render(){
        return (
            <div>
            </div>
        );
    }
}

class SortContent extends React.Component {
    constructor(props){
        super(props);

    }

    render(){
        return (
            <div>
                <SortOptions />
                <Animation />
            </div>
        );
    }
}

export default SortContent;