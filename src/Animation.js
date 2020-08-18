import React from 'react';
import './static/style/Animation.css';

class Animation extends React.Component{
    // state = { 
    //     data : [], delay : 0, 
    //     sortType : "", show : true,
    //     explanation1: "", steps: 0, explanation2 : "" 
    // };

    constructor(props){
        super(props);
        this.state = { 
                        data : this.props.data, delay : this.props.delay, 
                        sortType : this.props.sortType, show : true,
                        explanation1: "", steps: 0, explanation2 : "" 
                    };
        this.bubbleSort = this.bubbleSort.bind(this);
        this.merge = this.merge.bind(this);
        this.mergeSort = this.mergeSort.bind(this);
    }

    // componentDidUpdate(){
    //     if(this.state.show){
    //         if(this.state.sortType === "bubblesort" ||
    //             this.state.sortType === "mergesort"){
    //             if(this.state.sortType === "bubblesort"){
    //                 this.bubbleSort();
    //             }
    //             else if(this.state.sortType === "mergesort"){
    //                 this.mergeSort(this.state.data, 0);
    //             }
    //             this.setState({explanation1 : `Finish!`, explanation2 : ""});
    //         }
    //     } else {
    //         this.setState({ show : true });
    //     }
    // }

    async componentWillReceiveProps(){
        await this.setState((state, props) => ({
            data : props.data,
            delay : props.delay,
            sortType : props.sortType
        }));
    }

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
        for(let i = 0; i < this.state.data.length - 1; i += 1){
            for(let j = 0; j < this.state.data.length - i - 1; j += 1){
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
            elmts[this.state.data.length - i - 1].style.backgroundColor = "rgb(120,120,200)";
        }
        elmts[0].style.backgroundColor = "rgb(120,120,200)";
        this.setState({explanation1 : `Finished!\n`});
        this.setState({explanation2 : ``});
    }

    //  async bubbleSort(){
    //     // const container = document.querySelector(".animation");
    //     const elmts = document.querySelectorAll(".blockElmt");
    //     for(let i = 0; i < this.state.data.length - 1; i += 1){
    //         for(let j = 0; j < this.state.data.length - i - 1; j += 1){
    //             this.state.steps += 1;
    //             elmts[j].style.backgroundColor = "red";
    //             elmts[j + 1].style.backgroundColor = "red";
    //             await this.frameTransition();
    //             if(this.state.data[j] > this.state.data[j + 1]){
    //                 let tempArr = this.state.data;
    //                 let temp = tempArr[j];
    //                 tempArr[j] = tempArr[j + 1];
    //                 tempArr[j + 1] = temp;
    //                 this.setState({data: tempArr});
    //             }
    //             elmts[j].style.backgroundColor = "rgb(120,200,120)";
    //             elmts[j + 1].style.backgroundColor = "rgb(120,200,120)";
    //         }
    //         elmts[this.state.data.length - i - 1].style.backgroundColor = "rgb(120,120,200)";
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
        var tempArr = this.state.data;
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
        this.setState({data: tempArr});
        await this.frameTransition();
        for(let i = 0; i < result.length; i++){
            elmts[i + startIdx].style.backgroundColor = "rgb(120,200,120)";
        }
        return new Promise((resolve) => {
            resolve(result);
        });
    }

    render(){
        console.log(this.state.data);
        console.log(this.state.delay);
        console.log(this.state.sortType);
        if(!this.state.show){
            return (
                <div className="animation">
                </div>
            );
        }

        return (
            <div className="animation">
                <div className= "image">
                {
                    this.state.data.map((val, idx) => {
                        const elmt = (
                            <div className="blockElmt" 
                                    id={"elmt " + idx} 
                                    style={{translateX: `${idx * 30}px`}}
                            >
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
            </div>
        );
        // return (
        //     <div>
        //         <div>
        //             {this.state.data}
        //             <p>------+++++++------</p>
        //         </div>
        //         <div>
        //             {this.state.delay}
        //             <p>------========------</p>
        //         </div>
        //         <div>
        //             {this.state.sortType}
        //             <p>-------------------</p>
        //         </div>
        //     </div>
        // );
    }
}

export default Animation;