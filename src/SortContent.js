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
        this.state = {values: [21,1,123,12,8,12,1,2,221,123], delay: 1000,
                        explanation1: "", steps: 0, explanation2 : ""}
        this.bubbleSort = this.bubbleSort.bind(this);
        this.merge = this.merge.bind(this);
        this.mergeSort = this.mergeSort.bind(this);
    }

    componentDidMount(){
        // this.bubbleSort();
        this.mergeSort(this.state.values, 0);
        this.setState({explanation1 : `Finish!`, explanation2 : ""});
    }

    // async swap(elmt1, elmt2){
        
    // }

    async frameTransition(){
        const promise = new Promise((resolve) => {
            window.requestAnimationFrame(() => {
                setTimeout(() => {
                    resolve();
                }, this.state.delay);
            });
        });
        return promise;
    }

    returnInput(input){
        return input;
    }

    async bubbleSort(){
        // const container = document.querySelector(".animation");
        const elmts = document.querySelectorAll(".blockElmt");
        for(let i = 0; i < this.state.values.length - 1; i += 1){
            for(let j = 0; j < this.state.values.length - i - 1; j += 1){
                this.setState({steps: this.state.steps + 1});
                elmts[j].style.backgroundColor = "red";
                elmts[j + 1].style.backgroundColor = "red";
                const val1 = elmts[j].innerHTML;
                const val2 = elmts[j + 1].innerHTML;
                this.setState({explanation1 : `Comparing element no. ${j + 1}  and element no. ${j + 2} :\n ${val1} and ${val2}\n`});
                if(Number(val1) > Number(val2)){
                    this.setState({explanation2 : `Element no. ${j + 1} > element no. ${j + 2}, then its swapped`});
                    await this.frameTransition();
                    elmts[j].innerHTML = val2;
                    elmts[j + 1].innerHTML = val1;
                } else {
                    this.setState({explanation2 : `${j + 1} element <= ${j + 2} element, then dont need to swap`});
                    await this.frameTransition();
                }
                elmts[j].style.backgroundColor = "rgb(120,200,120)";
                elmts[j + 1].style.backgroundColor = "rgb(120,200,120)";
            }
            elmts[this.state.values.length - i - 1].style.backgroundColor = "rgb(120,120,200)";
        }
        elmts[0].style.backgroundColor = "rgb(120,120,200)";
        this.setState({explanation1 : `Finished!\n`});
        this.setState({explanation2 : ``});
    }

    //  async bubbleSort(){
    //     // const container = document.querySelector(".animation");
    //     const elmts = document.querySelectorAll(".blockElmt");
    //     for(let i = 0; i < this.state.values.length - 1; i += 1){
    //         for(let j = 0; j < this.state.values.length - i - 1; j += 1){
    //             this.state.steps += 1;
    //             elmts[j].style.backgroundColor = "red";
    //             elmts[j + 1].style.backgroundColor = "red";
    //             await this.frameTransition();
    //             if(this.state.values[j] > this.state.values[j + 1]){
    //                 let tempArr = this.state.values;
    //                 let temp = tempArr[j];
    //                 tempArr[j] = tempArr[j + 1];
    //                 tempArr[j + 1] = temp;
    //                 this.setState({values: tempArr});
    //             }
    //             elmts[j].style.backgroundColor = "rgb(120,200,120)";
    //             elmts[j + 1].style.backgroundColor = "rgb(120,200,120)";
    //         }
    //         elmts[this.state.values.length - i - 1].style.backgroundColor = "rgb(120,120,200)";
    //     }
    //     elmts[0].style.backgroundColor = "rgb(120,120,200)";
    // }

    async mergeSort(arr, startIdx){
        // Divide the array
        if(arr.length <= 1){
            return new Promise((resolve) => {
                resolve(arr);
            });
        }

        const middle = Math.ceil(arr.length/2);
        const leftArr = arr.slice(0, middle);
        const rightArr = arr.slice(middle);

        const result = await this.merge(await this.mergeSort(leftArr, startIdx).then(this.returnInput)
                        , await this.mergeSort(rightArr, startIdx + middle).then(this.returnInput), startIdx)
                        .then(this.returnInput);
        // return result;
        return new Promise((resolve) => {
            resolve(result);
        });
    }

    async merge(leftArr, rightArr, startIdx){
        // Conquering the array
        this.setState({steps: this.state.steps + 1});
        this.setState({explanation1 : `Combining left subarray of ${leftArr.length} elements from index ${startIdx + 1} until index ${startIdx + leftArr.length}`});
        this.setState({explanation2 : `and right subarray of ${rightArr.length} elements from index ${startIdx + leftArr.length + 1} until index ${startIdx + leftArr.length + rightArr.length}`});        
        var elmts = document.querySelectorAll(".blockElmt");
        var result = [], leftIdx = 0, rightIdx = 0; 
        while(leftIdx < leftArr.length && rightIdx < rightArr.length){
            if(leftArr[leftIdx] < rightArr[rightIdx]){
                result.push(leftArr[leftIdx]);
                leftIdx++;
            } else {
                result.push(rightArr[rightIdx]);
                rightIdx++;
            }
        }
        result = result.concat(leftArr.slice(leftIdx), rightArr.slice(rightIdx));
        var tempArr = this.state.values;
        for(let i = 0; i < leftArr.length; i++){
            elmts[i + startIdx].style.backgroundColor = "orange";
        }
        for(let i = leftArr.length; i < result.length; i++){
            elmts[i + startIdx].style.backgroundColor = "yellow";
        }
        await this.frameTransition();
        for(let i = 0; i < result.length; i++){
            tempArr[i + startIdx] = result[i];
            elmts[i + startIdx].style.backgroundColor = "red";
        }
        this.setState({values: tempArr});
        await this.frameTransition();
        for(let i = 0; i < result.length; i++){
            elmts[i + startIdx].style.backgroundColor = "rgb(120,200,120)";
        }
        return new Promise((resolve) => {
            resolve(result);
        });
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
                    <p> Step Count : {this.state.steps} </p>
                    <p>{ this.state.explanation1 } </p>
                    <p>{ this.state.explanation2 } </p>
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