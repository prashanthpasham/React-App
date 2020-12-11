import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import CustomerService from '../../apis/Customer/CustomerService';
import Table from '../DataTable/Table';
import Input from '../Input';
function CustomerType(props) {
    const [custTypeList, setCustTypeList] = useState([]);
    const [type, setType] = useState("");
    const headers = [{ "header": "Customer Type", "key": "label" }];
    useEffect(() => {
        customerService();
    }, []);
    const customerService = () => {
        CustomerService.customerTypeList().then(response => {
            setCustTypeList(response);
        });
    }
    const handleInput = (e, name) => {
        // alert(name);
        setType(e.target.value.trim());
    }
    const addCustomerType = () => {
        if (type.length > 0) {
            let data = [];
            data[0] = type;
            CustomerService.createCustomerType(data).then(res => {
                if (res === 'fail') {
                    alert("Unable to create Customer Type");
                } else {
                    alert(res.length==0?"Customer Type Created Successfully!":res);
                }
                setType("");
                customerService();
            })
        } else {
            alert("Customer Type Required!");
        }
    }
    return (
        <>
            <h2>Customer Types</h2><br />
            <div className="col-md-12 col-sm-12 col-xs-12 col-lg-12">
                <fieldset className="scheduler-border">
                    <legend className="scheduler-border">Create Customer Type</legend>
                    <Input label="Customer Type" type="text" name="customerType" value={type} change={(e, n) => handleInput(e, n)} />
                    <button className="btn btn-primary" onClick={() => addCustomerType()}>Add</button>
                </fieldset>
            </div>
            <br />
            <Table headers={headers} data={custTypeList} />

        </>
    )
}
export default withRouter(React.memo(CustomerType));