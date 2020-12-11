import React from 'react';
import CustomerService from '../../apis/Customer/CustomerService';
import ListPage from '../ListPage/ListPage';
import { Link, withRouter } from 'react-router-dom';
import ErrorBoundary from '../../ErrorBoundary';
import GenericService from '../../apis/GenericService';
class CustomerList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "customers": [],
            "headers": [
                { "header": "Customer Code", "key": "customerCode" },
                { "header": "Customer Name", "key": "customerName" },
                { "header": "Status", "key": "status" }, { "header": "Created Date", "key": "createdDate" }
            ],
            "filters": []
        };

        this.pagination = this.pagination.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.fetchList = this.fetchList.bind(this);
    }
    componentDidMount() {
        GenericService.fetchJsonFile('Fields/Customer/list.json')
            .then(data => { return JSON.parse(JSON.stringify(data)) })
            .then(res => {
                this.setState({ "filters": res.fields },
                    () => {
                        CustomerService.customerTypeList().then(response => {
                            for (var k = 0; k < this.state.filters.length; k++) {
                                let field = this.state.filters[k];
                                if (field.name === 'customerType') {
                                    field.values = JSON.parse(JSON.stringify(response));
                                    break;
                                }
                            }
                            this.setState({ "filters": this.state.filters });
                        })
                    });
            });


    }
    fetchList(object){
        CustomerService.customerList(object).then(response => {
            this.setState({ "customers": JSON.parse(JSON.stringify(response)) });
        })
    }
    pagination(first, pageSize) {
       this.fetchList({ "first": first, "size": pageSize });
    }
    
    onSearch(obj){
        this.fetchList(obj);
    }
    render() {
        return (
            <ErrorBoundary>
                <br />
                <div className="row">
                    <div className="col-md-10 col-lg-10">
                        <h3>Customer</h3>
                    </div>
                    <div className="col-md-2 col-lg-2">
                        <Link className="btn btn-primary" to="/app/create-customer" style={{ 'textDecoration': 'none', 'color': 'white' }}>Create</Link>

                    </div>
                </div>
                <br />
                <div className="col-md-12 col-lg-12">
                    <ListPage paginator={true} headers={this.state.headers} dataList={this.state.customers} onPagination={this.pagination} filters={this.state.filters} onSubmit={this.onSearch}></ListPage>
                </div>
            </ErrorBoundary>
        )
    }
}
export default withRouter(CustomerList);