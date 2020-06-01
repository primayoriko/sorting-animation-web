import React from 'react';

class SortOptions2 extends React.Component{
    constructor(props){
        super(props);
        this.state = { elmtCount : 0 };
        this.handleCountChange = this.handleCountChange.bind(this);
    }

    animate(){

    }

    handleCountChange(event){
        if(event.target.value > 0 && event.target.value <= 15){
            this.setState({ elmtCount : event.target.value })
        } else{
            alert("Jumlah " + event.target.value + " tidak valid")
        }
    }

    render(){
        const app = (
            <form>
                <p>
                    <label> Number of Element: </label>
                    <input  type = "number" name = "count" value = {this.state.elmtCount} onChange = {this.handleCountChange} />
                    <label> {this.state.elmtCount}  </label>
                    <label> (Max. 15 number only) </label>
                </p>
                {/* <div id = "elements"> </div> */}
                <div> 
                    <p> {this.state.elmtCount} </p>
                {
                    [...Array(parseInt(this.state.elmtCount, 10)).keys()].map((value) => {
                        return (
                            <p>
                                <label> Value of {value + 1} Element : </label>
                                <input  name = {"elmt" + (value + 1)} />
                            </p>
                        )
                    })
                } </div>
                <p></p>
                <p></p>
                <button onClick = {() => this.animate()}> Simulate! </button>
            </form>
        );
        return app;
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

export default SortOptions2;