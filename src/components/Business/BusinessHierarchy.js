import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import BusinessService from '../../apis/Business/BusinessService';
import Table from '../DataTable/Table';
import DropDown from '../DropDown';
import Input from '../Input';
function BusinessHierarchy(props) {
    const [hierarchy, setHierarchy] = useState([]);
    const [data, setData] = useState({ 'type': props.match.params.id });
    const [title, setTitle] = useState('');
    const headers = [{ "header": "Hierarchy", "key": "name" }, { "header": "Parent Hierarchy", "key": "parentName" }];
    useEffect(() => {
        let id = props.match.params.id;
        if (id == 'BT')
            setTitle("Business Hierarchy");
        else if (id == 'ST')
            setTitle("Stock Hierarchy");
        hierarchyList();
    }, []);
    const hierarchyList = () => {
        BusinessService.hierarchyList(props.match.params.id).then(response => {
            setHierarchy(response);
        });
    }
    const handleInput = (e, name) => {
        setData({...data,[name]: e.target.value.trim() });
    }
    const addHierarchy = () => {
       // alert(JSON.stringify(data));
        if (data['name'] === null || data['name'] === null || data['name'] === undefined) {
            alert("Name Required");
            return false;
        } else {
            if (hierarchy.length > 0 && (data['parent'] === null || data['parent'] === null || data['parent'] === undefined)) {
                alert("Hierarchy Required");
                return false;
            }
        }
        BusinessService.saveHierarchy(data).then(response => {
            if (response === 'success') {
                hierarchyList();
            } else {
                alert(response);
            }
            setData({ 'type': props.match.params.id });
        })
    }
    return (
        <>
            <h2>{title}</h2><br />
            <div className="col-md-12 col-sm-12 col-xs-12 col-lg-12">
                <fieldset className="scheduler-border">
                    <legend className="scheduler-border">Create</legend>
                    <Input required={true} label="Name" type="text" name="name" value={data['name']} change={(e, name) => handleInput(e, name)} />
                    <DropDown required={true} name="parent" values={hierarchy} label="Hierarchy" value={data['parent']} optionLabel="name" optionValue="id" change={(e, name) => handleInput(e, name)} ></DropDown>
                    <button className="btn btn-primary" onClick={() => addHierarchy()}>Add</button>
                </fieldset>
            </div>
            <br />
            <Table headers={headers} data={hierarchy} />

        </>
    )
}
export default withRouter(React.memo(BusinessHierarchy));