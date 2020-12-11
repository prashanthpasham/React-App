import React, { Component } from 'react'
import BusinessService from '../../apis/Business/BusinessService';
import { bool } from 'prop-types';
class BusinessComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hierarchyList: [],
            "bt": ""
        }

        this.onBsSelection = this.onBsSelection.bind(this);

    }
    componentDidMount() {
        BusinessService.btHierarchList(this.props.required?"select":"all").then(res => {
            this.setState({ hierarchyList: JSON.parse(JSON.stringify(res)) }, () => {
                console.log(this.state.hierarchyList)
            });
        })
    }


    onBsSelection(event, obj) {

        let data = event.target.value.split("@");
        obj['selectedValue'] = event.target.value;
        let dataList = this.state.hierarchyList;
        let bsIds = "";
        let bsNames = "";
        dataList.forEach(lookup => {

            if (lookup.id > eval(data[0])) {
                lookup['selectedValue'] = lookup.id + "@0";
                lookup.items = [];
            }
            let value = lookup['selectedValue'].split("@")[1];
            if (value > 0)
                bsIds += value + "@";
            bsNames += lookup.name + "@";
        });

        this.setState({ 'hierarchyList': dataList }
            , () => {
                BusinessService.onBtChange(data[1], this.props.required?"select":"all").then(res => {

                    let data = JSON.parse(JSON.stringify(res));
                    let list = this.state.hierarchyList;
                    list.forEach(lookup => {
                        if (lookup.id === data.masterLookupId) {
                            lookup.items = data.items;
                        }
                    });
                    this.setState({ 'hierarchyList': list });
                });
                this.props.bsIds(bsIds, bsNames, this.state.hierarchyList.length);
            });

    }


    render() {
        return (
            <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12" >
                <fieldset className="scheduler-border">
                <legend className="scheduler-border">Business Territory</legend>
                {this.state.hierarchyList.map((hr,index) => {
                    return (<div className="col-md-4 col-lg-4" style={{ display: 'inline-block' }}>
                        <label>{hr.name}</label>{this.props.required && <span style={{ 'color': 'red' }}>*</span>}
                        <select key={index} className="form-control" value={hr.selectedValue} onChange={(event) => this.onBsSelection(event, hr)}>
                            {hr.items.map(item => { return (<option key={item.id} value={item.bsid}>{item.name}</option>) })}
                        </select>
                    </div>)
                })}
               </fieldset>
            </div>

        )
    }
}
BusinessComponent.propTypes = {
    required: bool
}
BusinessComponent.defaultProps = {
    required: false
}
export default BusinessComponent
