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
            </form>
        );
        return sortOptions;
    }
}

class Animation extends React.Component{
    constructor(props){
        super(props);
        this.state = {values: [2,21,123,12,213,1,1,2,21,123], delay: 500,
                        explanation1: "", steps: 0, explanation2 : ""}
        this.bubbleSort = this.bubbleSort.bind(this);
    }

    componentDidMount(){
        this.bubbleSort();
    }

    // async swap(elmt1, elmt2){
        
    // }

    async bubbleSort(delay = 500){
        const container = document.querySelector(".animation");
        const elmts = document.querySelectorAll(".blockElmt");
        for(let i = 0; i < this.state.values.length - 1; i += 1){
            for(let j = 0; j < this.state.values.length - i - 1; j += 1){
                this.state.steps += 1;
                elmts[j].style.backgroundColor = "red";
                elmts[j + 1].style.backgroundColor = "red";

                await new Promise((resolve) => {
                    setTimeout(() => {
                        resolve();
                    }, delay);
                });

                const val1 = elmts[j].innerHTML;
                const val2 = elmts[j + 1].innerHTML;
                this.setState({explanation1 : `Comparing ${j} element and ${j + 1} element:\n ${val1} and ${val2}\n`});
                if(Number(val1) > Number(val2)){
                    // elmts[j].style.backgroundColor = "red";
                    // elmts[j + 1].style.backgroundColor = "red";
                    await new Promise((resolve) => {
                        window.requestAnimationFrame(() => {
                            setTimeout(() => {
                                resolve();
                            }, 250);
                        });
                    });
                    elmts[j].innerHTML = val2;
                    elmts[j + 1].innerHTML = val1;
                    // container.insertBefore(elmts[j + 1], elmts[j]);
                }
                elmts[j].style.backgroundColor = "rgb(120,200,120)";
                elmts[j + 1].style.backgroundColor = "rgb(120,200,120)";
            }
            elmts[this.state.values.length - i - 1].style.backgroundColor = "rgb(120,120,200)";
        }
        elmts[0].style.backgroundColor = "rgb(120,120,200)";
    }

    render(){
        return (
            <div className="animation">
                <div className= "image">
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
                <div className="explanation">
                    { this.state.explanation1 }
                </div>
                {/* { this.bubbleSort(this.state.delay) } */}
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