import { array, bool } from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';
import BusinessComponent from '../Business/BusinessComponent';
import Input from '../Input';
import DropDown from '../DropDown';
import Table from '../DataTable/Table';
class ListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "submission": {

            }

        };
        this.pagination = this.pagination.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.businessId = this.businessId.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    pagination(first, size) {
        this.props.onPagination(first, size);
    }
    handleInputChange(event, name) {
        this.setState({ "submission": { ...this.state.submission, [name]: event.target.value } })
    }

    onSearch() {

        let valid = true;

        for (var k = 0; k < this.props.filters.length; k++) {
            let field = this.props.filters[k];

            if (field.type === 'BT') {

                let value = this.state['Bt'] == undefined ? null : this.state['Bt']['bsIds'];
                if (field.required) {
                    if (value === null || value === undefined || value.trim().length === 0) {
                        alert("Please Select BT");
                        valid = false;
                        break;
                    }
                }
                if (value != null && value != undefined && value.trim().length > 0) {
                    let selIds = value.trim().split("@").length;
                    if (selIds != this.state.Bt['btlength']) {
                        let bsNames = this.state.Bt['bsNames'].split("@");
                        for (let j = selIds; j < bsNames.length; j++) {
                            alert(bsNames[j - 1] + ' Required!');
                            valid = false;
                            break;
                        }
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


        if (valid) {

            if (this.state['Bt'] != undefined && Object.keys(this.state.Bt).length > 0) {
                let bsId = this.state.Bt.bsIds.split("@");

                this.setState({
                    "submission": { ...this.state.submission, "businessId": bsId[bsId.length - 2], "bsIds": this.state.Bt.bsIds }
                }, () => {
                    this.props.onSubmit(this.state.submission);
                })
            } else {
                this.props.onSubmit(this.state.submission);
            }
        }
    }
    businessId(bsIds, bsNames, btLength) {
        this.setState({ "Bt": { 'bsIds': bsIds, 'btLength': btLength, 'bsNames': bsNames } });
    }
    onRowSelection(selObj){
        alert(JSON.stringify(selObj));
    }
    render() {
        return (
            <>

                {
                    this.props.filters.length > 0 &&
                    <>
                        <div className="row">
                            <div className="col-md-12 col-lg-12 col-xs-12 col-sm-12 accordion" id="accordionExample">
                                <div className="card">
                                    <div className="card-header" id="headingOne" style={{ 'backgroundColor': '#7952b3', 'color': 'white', 'height': '45px' }}>
                                        <h1 className="mb-0">
                                            <a style={{ 'marginTop': '-12px', 'textDecoration': 'none', 'color': 'white' }} className="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                Filters
                              </a>
                                        </h1>
                                    </div>

                                    <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                                        <div className="card-body" style={{ 'backgroundColor': 'rgba(0, 0, 0, 0.08)' }}>
                                            {
                                                this.props.filters.map((field, index) => {
                                                    if (field.type == 'BT') {
                                                        return (

                                                            <BusinessComponent bsIds={this.businessId} />


                                                        )
                                                    }
                                                    if (field.type === 'input') {
                                                        return (<Input key={field.name} label={field.title} type={field.dataType} name={field.name} change={this.handleInputChange} value={this.state.submission[field.name]} required={field.required} />)
                                                    }
                                                    if (field.type === 'dropdown') {
                                                        return (<DropDown key={field.name} label={field.title} type={field.dataType} name={field.name} change={this.handleInputChange} value={this.state.submission[field.name]} values={field.values} required={field.required} />)
                                                    }
                                                })

                                            }

                                            <button className="btn btn-success" style={{ 'margin': '20px', 'width': '120px' }} onClick={() => this.onSearch()}>Search</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <br />
                    </>
                }
                <Table radio={this.props.radio} onRowSelect={this.onRowSelection} pagination={this.props.paginator} headers={this.props.headers} data={this.props.dataList} onPagination={this.pagination}></Table>

            </>
        )
    }
}
ListPage.propTypes = {
    filters: array,
    headers: array,
    paginator: bool,
    dataList: array,
    radio:bool
}
ListPage.defaultProps = {
    filters: [],
    headers: [],
    paginator: false,
    dataList: [],
    radio:false
}
export default withRouter(ListPage);