import React from 'react';
import './static/style/SettingForm.css';

class SettingForm extends React.Component{
    constructor(props){
        super(props);
        this.state = { data : [], delay : 0, sortType : "" };
        this.changeData = this.changeData.bind(this);
        this.changeDelay = this.changeDelay.bind(this);
        // this.changeSortType = this.changeSortType.bind(this);
        this.transferData = this.transferData.bind(this);
    }

    changeData(event){
        this.setState({data: event.target.value.split(";").map((x) => {
            return parseInt(x, 10);
            }).filter((x) =>{
                return x > 0 && x < 1000;
            })
        })
    }

    changeSortType(val){
        this.setState({ sortType : val });
    }

    changeDelay(event){
        this.setState({ delay : event.target.value })
    }

    transferData(event){
        this.props.changeData(this.state.data);
        this.props.changeDelay(this.state.delay);
        this.props.changeSortType(this.state.sortType);
        event.preventDefault();
    }

    render(){
        const template = (
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
                                <input size="80" 
                                        name="values" 
                                        onChange={this.changeData} 
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Sorting Type:</td>
                            <td>
                                <input colSpan={2} 
                                        type="radio" 
                                        name="count" 
                                        onClick={ () => this.changeSortType("bubblesort") }
                                />
                                Bubble Sort
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <input colSpan={2} 
                                        type="radio" 
                                        name="count"
                                        onClick={ () => this.changeSortType("mergesort") } 
                                />
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
                            <td> Animation delay (ms) : </td>
                            <td colSpan={2}>  
                                <input size="45" 
                                        name="values" 
                                        onChange={this.changeDelay} 
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3} style={{textAlign: "center"}}>
                                <button className="animateButton" 
                                        size="60" 
                                        onClick={this.transferData}
                                > 
                                    Simulate! 
                                </button> 
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        );
        return template;
    }
}

export default SettingForm;