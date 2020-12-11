import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import Input from './components/Input';
import DropDown from './components/DropDown';
import BusinessComponent from './components/Business/BusinessComponent';
import StockHierarchyComponent from './components/Stock/StockHierarchyComponent';
import { withRouter } from 'react-router-dom';
import UploadImage from './components/Image/UploadImage';
class Component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: props.fields,
            title: props.title,
            "submission": {},
            "Bt": {},
            "St": {}
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.businessId = this.businessId.bind(this);
        this.stockHierarchy = this.stockHierarchy.bind(this);
        this.upload = this.upload.bind(this);
    }

    handleInputChange(event, name) {
        this.setState({ "submission": { ...this.state.submission, [name]: event.target.value } }, () => { console.log(this.state.submission) });
    }
    validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    upload(name, images) {
        this.setState({ "submission": { ...this.state.submission, [name]: images } });
    }
    submit = e => {
        e.preventDefault();
        let valid = true;

        for (var k = 0; k < this.state.fields.length; k++) {
            let field = this.state.fields[k];

            if (field.type === 'BT' || field.type === 'ST') {

                let value = null;
                if (field.type === 'BT')
                    value = this.state.Bt != undefined ? this.state.Bt['ids'] : null;
                else if (field.type === 'ST')
                    value = this.state.St != undefined ? this.state.St['ids'] : null;

                if (field.required) {
                    if (value === null || value === undefined || value.trim().length === 0) {
                        if (field.type === 'BT')
                            alert("Please Select Business Hierarchy");
                        else if (field.type === 'ST')
                            alert("Please Select Stock Hierarchy");
                        valid = false;
                        break;
                    }
                }
                if (value != null && value != undefined && value.trim().length > 0) {
                    let selIds = value.trim().split("@").length - 1;
                    let length = 0;
                    if (field.type === 'BT')
                        length = this.state.Bt['length'];
                    else if (field.type === 'ST')
                        length = this.state.St['length'];
                    if (selIds != length) {
                        let names = [];
                        if (field.type === 'BT')
                            names = this.state.Bt['names'].split("@");
                        else if (field.type === 'ST')
                            names = this.state.St['names'].split("@");
                        for (let j = selIds; j < names.length; j++) {
                            alert(names[j] + ' Required!');
                            valid = false;
                            break;
                        }
                        if (!valid)
                            break;
                    }
                }
            } else {
                let value = this.state.submission[field.name];
                field['error'] = "";
                let check = true;
                console.log(field.name + ">>" + value);
                if (field.required) {
                    if (value === null || value === undefined || value.trim().length === 0) {
                        alert(field.title + " Required");
                        valid = false;
                        check = false;
                        break;
                    }
                }

                if (check) {
                    if (field.type === 'input') {


                        if (field.dataType === 'text' || field.dataType === 'number') {
                            if (field.min > 0 && field.max > 0) {
                                if (value.trim().length < field.min) {
                                    alert(field.title + " should be min of " + field.min + " characters");
                                    valid = false;
                                    break;
                                } else if (value.trim().length > field.max) {
                                    alert(field.title + " should be min of " + field.max + " characters");
                                    valid = false;
                                    break;
                                }
                            }
                        } else if (field.dataType === 'email') {
                            if (!this.validateEmail(value.trim())) {
                                alert(field.title + " is not valid email");
                                valid = false;
                                break;
                            }
                        }

                    }
                }
            }
        }

        this.setState({ "fields": this.state.fields });
        if (valid) {
            let bsId = null;
            if (Object.keys(this.state.Bt).length > 0) {
                bsId = this.state.Bt.bsIds.split("@");


            }
            let ctId = null;
            if (Object.keys(this.state.St).length > 0) {
                ctId = this.state.St.ids.split("@");
            }
            
            if (bsId === null && ctId === null)
                this.props.submit(this.state.submission);
            else {
                //alert("ctId>>"+ctId[ctId.length - 2]);   
                var obj = this.state.submission;
                if (ctId != null)
                    obj["stockLookupId"] = ctId[ctId.length - 2];
                if (bsId != null)
                    obj["businessId"] = bsId[bsId.length - 2];
                this.setState({ "submission": obj  }, () => {
                    this.props.submit(this.state.submission);
                });

            }
        }
    }
    businessId(bsIds, bsNames, btLength) {
        this.setState({ "Bt": { 'ids': bsIds, 'length': btLength, 'names': bsNames } });
    }
    stockHierarchy(ctIds, csNames, ctLength) {
        this.setState({ "St": { 'ids': ctIds, 'length': ctLength, 'names': csNames } });
    }
    render() {
        return (
            <ErrorBoundary>
                <div className="container-fluid">
                    <form onSubmit={this.submit} noValidate="novalidate">
                        <div style={{ 'marginTop': '2%' }}>
                            <h3>{this.state.title}</h3>

                            <div className="form-group">
                                <button type="submit" style={{ 'marginTop': '-20px', 'marginRight': '5px', 'float': 'right', 'width': '100px' }} className="btn btn-primary">Save</button>
                            </div>
                            <div className="form-group">
                                <a onClick={() => this.props.history.goBack()} style={{ 'marginTop': '-28px', 'marginRight': '5px', 'float': 'right', 'width': '100px' }} className="btn btn-danger">Back</a>
                            </div>
                        </div>
                        <br />

                        <div className="row">

                            {this.state.fields.length > 0 && this.state.fields.map((field, index) => {
                                if (field.type === 'input') {
                                    return (<Input key={field.name} label={field.title} type={field.dataType} name={field.name} readonly={field.readonly} hidden={field.hideonly} change={this.handleInputChange} value={this.state.submission[field.name]} required={field.required} min={field.min} max={field.max} error={field.error} />)
                                }
                                if (field.type === 'dropdown') {
                                    return (<DropDown key={field.name} label={field.title} type={field.dataType} name={field.name} readonly={field.readonly} hidden={field.hideonly} change={this.handleInputChange} value={this.state.submission[field.name]} values={field.values} required={field.required} error={field.error} optionLabel={field.optionLabel} optionValue={field.optionValue} />)
                                }
                                if (field.type === 'BT') {
                                    return (<BusinessComponent bsIds={this.businessId} required={field.required} />)
                                }
                                if (field.type === 'ST') {
                                    return (<StockHierarchyComponent stockHierarchy={this.stockHierarchy} required={field.required} />)
                                }
                                if (field.type === 'image') {
                                    return (<UploadImage multiple={field.multiple} upload={this.upload} />);
                                }
                            })
                            }

                        </div>

                    </form>
                </div>

            </ErrorBoundary>
        )
    }
}
export default withRouter(Component);