import { bool } from 'prop-types';
import React, { Component } from 'react'
import StockService from '../../apis/Stock/StockService';

class StockHierarchyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "hierarchyList": [],
            "dialog": 'none',
            hierarchy: {}
        }
        this.openDialog = this.openDialog.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.onSelection = this.onSelection.bind(this);
        this.addHierarchy = this.addHierarchy.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.hierarchyService = this.hierarchyService.bind(this);
        this.saveHierarchy = this.saveHierarchy.bind(this);
    }
    componentDidMount() {
        this.hierarchyService();
    }
    hierarchyService() {
        StockService.stockHierarchy().then(res => {
            this.setState({ "hierarchyList": res });
        })
    }
    onAdd(field) {
        var check = true;
        let parentId = 0;
        for (var k = 0; k < this.state.hierarchyList.length; k++) {
            let data = this.state.hierarchyList[k];

            if (field.parentId === data.id) {
                parentId = data.selectedValue.split("@")[1];

            }

            if (check && data.id < field.id) {
                if (data.selectedValue.endsWith("@0")) {
                    alert("Please Select " + data.name);
                    check = false;

                }
            }
        }
        if (check) {
            this.setState({ "hierarchy": { ...this.state.hierarchy, "parentId": parentId, "masterLookupId": field.id } }, () => {
                this.openDialog('open');
            });
        }
    }
    openDialog(type) {
        if (type === 'open')
            this.setState({ "dialog": 'block' });
        else
            this.setState({ "dialog": 'none' });
    }
    onSelection(e, data) {
        let value = e.target.value;
        let split = value.split("@");
        let ctIds = "";
        let ctNames = "";

        StockService.stockHierarchyById(split[1]).then(res => {
            for (var k = 0; k < this.state.hierarchyList.length; k++) {
                let field = this.state.hierarchyList[k];
                if (field.id === data.id) {
                    field.selectedValue = value;
                }
                if (field.id > data.id) {
                    field.items = [];
                    field.selectedValue = field.id+"@0";
                }
                if (field.parentId === data.id) {
                    field.items = JSON.parse(JSON.stringify(res))['items'];
                }
                let value1 = field['selectedValue'].split("@")[1];
                if (value1 > 0)
                    ctIds += value1 + "@";
                ctNames += field.name + "@";
            }
            this.setState({ 'hierarchyList': this.state.hierarchyList }, () => {
                this.props.stockHierarchy(ctIds, ctNames, this.state.hierarchyList.length);
            });
        });
    }
    handleInput(e, name) {
        this.setState({
            "hierarchy": { ...this.state.hierarchy, [name]: e.trim() }
        })
    }
    addHierarchy() {

        if (this.state.hierarchy['name'] === null || this.state.hierarchy['name'] === undefined || this.state.hierarchy['name'].length === 0) {
            alert("Name Required");
        } else {

            this.saveHierarchy();

        }
    }
    saveHierarchy() {
        //  alert(JSON.stringify(this.state.hierarchy));
        StockService.createStockHierarchy(this.state.hierarchy).then(response => {
            if (response === 'success') {
                this.setState({ "hierarchy": { 'name': '' } });
                this.openDialog('close');
                alert("Stock Hierarchy Added Successfully!");
                this.hierarchyService();
            } else {
                alert(response);
            }
        })
    }
    render() {
        return (
            <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12" >
                <fieldset className="scheduler-border">
                    <legend className="scheduler-border">Stock Hierarchy</legend>
                    {this.state.hierarchyList.map((hr, index) => {
                        return (<div key={index} className="col-md-4 col-lg-4" style={{ display: 'inline-block' }}>
                            <label>{hr.name}</label>{this.props.required && <span style={{ 'color': 'red' }}>*</span>}
                            <select key={index} className="form-control" value={hr.selectedValue} onChange={(event) => this.onSelection(event, hr)}>
                                {hr.items.map(item => { return (<option key={item.id} value={item.stId}>{item.name}</option>) })}
                            </select>
                            {this.props.hierarchy && <><br /><button className="btn btn-primary" onClick={() => this.onAdd(hr)}>Add</button></>}
                        </div>)
                    })}
                </fieldset>
                <div className="modal" tabindex="-1" style={{ 'display': this.state.dialog }}>
                    <div className="modal-dialog" >
                        <div className="modal-content" style={{ 'backgroundColor': '#eee' }}>
                            <div className="modal-header">
                                <h5 className="modal-title">Add Hierarchy</h5>

                            </div>
                            <div className="modal-body" >
                                <div className="form-group">
                                    <label>Name</label><br />
                                    <input className="form-control" type="text" name="name" value={this.state.hierarchy['name']} onChange={(e) => this.handleInput(e.target.value, 'name')} required={true} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => this.openDialog('close')}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={() => this.addHierarchy()}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
StockHierarchyComponent.propTypes = {
    required: bool,
    hierarchy: bool
}
StockHierarchyComponent.defaultProps = {
    required: false,
    hierarchy: false
}
export default StockHierarchyComponent
