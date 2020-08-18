import React from 'react';
import SettingForm from './SettingForm';
import Animation from './Animation';
import './static/style/Content.css';

class Content extends React.Component {
    // constructor(props){
    //     super(props);
    // }

    constructor(){
        super();
        this.state = { data : [], delay : 1000, sortType : "adsa" };
        this.changeData = this.changeData.bind(this);
        this.changeDelay = this.changeDelay.bind(this);
        this.changeSortType = this.changeSortType.bind(this);
    }

    changeData(x){
        this.setState({ data : x })
    }

    changeDelay(x){
        this.setState({ delay : x });
    }

    changeSortType(x){
        this.setState({ sortType : x });
    }

    render(){
        // console.log(this.state.data);
        // console.log(this.state.delay);
        // console.log(this.state.sortType);
        
        return (
            <div className="contents">
                <div>
                    <SettingForm changeDelay={this.changeDelay}  
                                    changeData={this.changeData}
                                    changeSortType={this.changeSortType}
                    />
                </div>
                <div>
                    <Animation data={this.state.data}
                                delay={this.state.delay}
                                sortType={this.state.sortType}
                    />       
                </div>
            </div>
        );
    }
}

export default Content;