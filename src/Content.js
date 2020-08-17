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
        this.state = { data : [], delay : 0, sortType : "" };
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
        this.setState({ sort : x });
    }

    render(){
        return (
            <div className="contents">
                <div>
                    <SettingForm changeDelay={this.changeDelay}  
                                    changeData={this.changeData}
                                    changeSortType={this.changeSortType}
                    />
                </div>
                {/* <div>
                    {this.state.data}
                </div> */}
                <div>
                    {this.state.delay}
                </div>
                <div>
                    {this.state.sort}
                </div>
                <div>
                    <Animation data={this.state.data}
                                delay={this.state.delay}
                                sortType={this.state.sort}
                    />       
                </div>
            </div>
        );
    }
}

export default Content;