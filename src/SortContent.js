import React from 'react';
import './SortContent.css';

class SortOptions extends React.Component{
    constructor(props){
        super(props);
        this.state = {values: [], description:""};
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleSortChange = this.handleSortChange.bind(this);
    }

    handleValueChange(event){
        this.setState({values: event.target.value.split(";").map((x) => {
            return parseInt(x, 10);
            }).filter((x) =>{
                return x > 0 && x < 1000;
            })
        })
    }

    handleSortChange(event){

    }

    animate(){

    }

    render(){
        const sortOptions = (
            <form>
                <table>
                    <tbody>
                        <tr>
                            <td colSpan={3}>
                                Input value to be sorted: 
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3}> 
                                <font color="#CFAFAF" style={{fontSize: "10.5px"}}>
                                    (Separate it by a <b>';'</b>. It's recommended to insert at max. 10 numbers,
                                </font>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3}> 
                                <font color="#CFAFAF" style={{fontSize: "10.5px"}}>
                                    and  please insert value between 1 and 999, inclusive.)
                                </font>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3}>
                                <input size="60" name="values" onChange={this.handleValueChange} />
                            </td>
                        </tr>
                        <tr>
                            <td>Sorting Type:</td>
                            <td>
                                <input colSpan={2} type="radio" name="count" />
                                Bubble Sort
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <input colSpan={2}  type="radio" name="count" />
                                Merge Sort
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3} style={{textAlign: "center"}}>
                                <div className="sortDesc">
                                    {this.state.description}
                                </div> 
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3} style={{textAlign: "center"}}>
                                <button className="animateButton" size="60" onClick={() => this.animate()}> 
                                    Simulate! </button> 
                            </td>
                        </tr>
                    </tbody>
                </table>
                {/* <p> tHIS IS THE VALUES: </p>
                {
                    this.state.values.map((x) =>{
                        return <p> {x} </p>;
                    })
                } */}
            </form>
        );
        return sortOptions;
    }
}

class Animation extends React.Component{
    constructor(props){
        super(props);
        this.state = {values: [123,12,2,21,23,223,1,2,21,123,12,213,1]}
    }

    render(){
        return (
            <div className="animation">
                {
                    this.state.values.map((val, idx) => {
                        const elmt = (
                            <div className="blockElmt" id={"elmt " + idx} style={{translateX: `${idx * 30}px`}}>
                                {val}
                            </div>
                        )
                        return elmt;
                    })
                }
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
            <div className="contents">
                <SortOptions />
                <Animation />       
            </div>
        );
    }
}

export default SortContent;