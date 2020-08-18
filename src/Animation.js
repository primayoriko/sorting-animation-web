import React from 'react';
import './static/style/Animation.css';

class Animation extends React.Component{
    constructor(props){
        super(props);
        this.state = { 
                        data : this.props.data, delay : this.props.delay, 
                        sortType : this.props.sortType, show : false,
                        explanation1: "", explanation2 : "" 
                    };
        this.bubbleSort = this.bubbleSort.bind(this);
        this.merge = this.merge.bind(this);
        this.mergeSort = this.mergeSort.bind(this);
    }

    async componentDidUpdate(){
        if(this.state.show){
            if(this.state.sortType === "bubblesort" ||
                this.state.sortType === "mergesort"){
                if(this.state.sortType === "bubblesort"){
                    this.bubbleSort();
                }
                else if(this.state.sortType === "mergesort"){
                    this.mergeSortInit();
                }
            }
        }
    }

    async componentWillReceiveProps(){
        await this.setState((state, props) => ({
            data : props.data,
            delay : props.delay,
            sortType : props.sortType,
            show : true
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
        const elmts = document.querySelectorAll(".blockElmt");
        const explanation1 = document.querySelector(".explanation1");
        const explanation2 = document.querySelector(".explanation2");
        const stepCount = document.querySelector(".stepCount");
        var count = 0;

        for(let i = 0; i < this.state.data.length - 1; i += 1){
            for(let j = 0; j < this.state.data.length - i - 1; j += 1){
                count = count + 1;
                elmts[j].style.backgroundColor = "red";
                elmts[j + 1].style.backgroundColor = "red";
                const val1 = elmts[j].innerHTML;
                const val2 = elmts[j + 1].innerHTML;
                stepCount.innerHTML = count;
                explanation1.innerHTML = `Comparing element no. ${j + 1}  and element no. ${j + 2} :\n ${val1} and ${val2}\n`;
                if(Number(val1) > Number(val2)){
                    explanation2.innerHTML = `Element no. ${j + 1} > element no. ${j + 2}, then its swapped`;
                    await this.frameTransition();
                    elmts[j].innerHTML = val2;
                    elmts[j + 1].innerHTML = val1;
                } else {
                    explanation2.innerHTML = `${j + 1} element <= ${j + 2} element, then dont need to swap`;
                    await this.frameTransition();
                }
                elmts[j].style.backgroundColor = "rgb(120,200,120)";
                elmts[j + 1].style.backgroundColor = "rgb(120,200,120)";
            }
            elmts[this.state.data.length - i - 1].style.backgroundColor = "rgb(120,120,200)";
        }
        elmts[0].style.backgroundColor = "rgb(120,120,200)";
        stepCount.innerHTML = "";
        explanation1.innerHTML = `Finished!\n`;
        explanation2.innerHTML = `Total step(s) : ${count}`;
    }

    async mergeSortInit(){
        const explanation1 = document.querySelector(".explanation1");
        const explanation2 = document.querySelector(".explanation2");
        const stepCount = document.querySelector(".stepCount");
        var counter = { count : 0, data : this.state.data }  
        await this.mergeSort(this.state.data, 0, counter);
        stepCount.innerHTML = "";
        explanation1.innerHTML = `Finished!\n`;
        explanation2.innerHTML = `Total step(s) : ${counter.count}`;
    }

    async mergeSort(arr, startIdx, counter){
        // Divide the array
        if(arr.length <= 1){
            return new Promise((resolve) => {
                resolve(arr);
            });
        }

        const middle = Math.ceil(arr.length/2);
        const leftArr = arr.slice(0, middle);
        const rightArr = arr.slice(middle);

        const result = await this.merge(await this.mergeSort(leftArr, startIdx, counter).then(this.returnInput)
                        , await this.mergeSort(rightArr, startIdx + middle, counter).then(this.returnInput), 
                        startIdx, counter)
                        .then(this.returnInput);
        // return result;
        return new Promise((resolve) => {
            resolve(result);
        });
    }

    async merge(leftArr, rightArr, startIdx, counter){
        // Conquering the array
        const elmts = document.querySelectorAll(".blockElmt");
        const explanation1 = document.querySelector(".explanation1");
        const explanation2 = document.querySelector(".explanation2");
        const stepCount = document.querySelector(".stepCount");
        
        counter.count = counter.count + 1;
        stepCount.innerHTML = counter.count;
        explanation1.innerHTML = `Combining left subarray of ${leftArr.length} elements from index ${startIdx + 1} until index ${startIdx + leftArr.length}`;
        explanation2.innerHTML = `and right subarray of ${rightArr.length} elements from index ${startIdx + leftArr.length + 1} until index ${startIdx + leftArr.length + rightArr.length}`;     

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
        // var tempArr = counter.data;
        for(let i = 0; i < leftArr.length; i++){
            elmts[i + startIdx].style.backgroundColor = "orange";
        }
        for(let i = leftArr.length; i < result.length; i++){
            elmts[i + startIdx].style.backgroundColor = "yellow";
        }
        await this.frameTransition();
        for(let i = 0; i < result.length; i++){
            elmts[i + startIdx].innerHTML = result[i]; 
            counter.data[i + startIdx] = result[i];
            elmts[i + startIdx].style.backgroundColor = "red";
        }
        // this.setState({data: tempArr});
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
                    <p className="stepCount"> </p>
                    <p className="explanation1"> </p>
                    <p className="explanation2"> </p>
                </div>
            </div>
        );
    }
}

export default Animation;