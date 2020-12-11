import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import StockService from '../../apis/Stock/StockService';
import DropDown from '../DropDown';
import Input from '../Input';
import Table from '../DataTable/Table';
class Measurement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "childId": 0,
            "name": "",
            "quantity": 0,
            "uomList": [],
            "headers":[{"header":"Name","key":"name"},{"header":"Quantity","key":"quantity"},{"header":"Child Uom","key":"childUomName"},
            {"header":"Child Qty","key":"childUomQty"}]
        }
        this.handleInput = this.handleInput.bind(this);
        this.addUom = this.addUom.bind(this);
        this.fetchList = this.fetchList.bind(this);
    }
    componentDidMount() {
       this.fetchList();
    }
    fetchList(){
        StockService.uomList().then(res => {
            this.setState({ "uomList": JSON.parse(JSON.stringify(res)) })
        })
    }
    handleInput(e, name) {
        this.setState({ [name]: e.target.value });
    }
    addUom() {
        if (this.state.name === null || this.state.name === undefined || this.state.name.trim().length === 0) {
            alert("Name Required");
        } else if (this.state.quantity === null || this.state.name === undefined || this.state.name.trim().length <= 0) {
            alert("Quantity should be greater than zero");
        } else if (this.state.uomList.length > 0 && this.state.childId <= 0) {
            alert("Child Uom Required");
        } else {
               StockService.createUom({"childId":this.state.childId,"name":this.state.name.trim(),"quantity":this.state.quantity}).then(res=>{
                if(res==='success'){
                    this.setState ( {
                        "childId": 0,
                        "name": "",
                        "quantity": 0
                    });
                    this.fetchList();
                }else{
                    alert(res);
                }
               })
        }
    }
    render() {
        return (
            <>
                <br />
                <h2>Measurement Configuration</h2>
                <fieldset className="scheduler-border">
                    <legend className="scheduler-border">
                        Add Measurement
                 </legend>
                    <Input type="text" name="name" value={this.state.name} required={true} label="Name" change={this.handleInput} />
                    <DropDown label="Child UOM" name="childId" required={true} optionLabel="name" optionValue="id" values={this.state.uomList} value={this.state.childId} change={this.handleInput} />
                    <Input type="number" name="quantity" value={this.state.quantity} required={true} label="Quantity" change={this.handleInput} />
                    <div className="form-group" style={{ 'margin': '20px', 'width': '100px' }}>
                        <button className="btn btn-primary" value="Add" onClick={() => this.addUom()}>Add</button>
                    </div>
                </fieldset>
                <br/>
               
            <Table headers={this.state.headers} data={this.state.uomList}/>
                   
            </>
        )
    }
}

export default withRouter(React.memo(Measurement))
