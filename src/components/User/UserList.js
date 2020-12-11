import React from 'react';
import UserService from '../../apis/User/UserService';
import ListPage from '../ListPage/ListPage';
import { Link, withRouter } from 'react-router-dom';
import ErrorBoundary from '../../ErrorBoundary';
import GenericService from '../../apis/GenericService';
class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "users": [],
            "headers": [
                { "header": "User Code", "key": "userCode" },
                { "header": "User Name", "key": "userName" },
                { "header": "Status", "key": "status" }, { "header": "Created Date", "key": "createdDate" }
            ],
            "filters": []
        };

        this.pagination = this.pagination.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.fetchList = this.fetchList.bind(this);
    }
    componentDidMount() {
        GenericService.fetchJsonFile('Fields/User/list.json')
            .then(data => { return JSON.parse(JSON.stringify(data)) })
            .then(res => {
                this.setState({ "filters": res.fields });
            });


    }
    fetchList(object) {
        UserService.usersList(object).then(response => {
            this.setState({ "users": JSON.parse(JSON.stringify(response)) });
        })
    }
    pagination(first, pageSize) {
        this.fetchList({ "first": first, "size": pageSize });
    }

    onSearch(obj) {
        this.fetchList(obj);
    }
    render() {
        return (
            <ErrorBoundary>
                <br />
                <div className="row">
                    <div className="col-md-10 col-lg-10">
                        <h3>Users</h3>
                    </div>
                    <div className="col-md-2 col-lg-2">
                        <Link className="btn btn-primary" to="/app/create-user" style={{ 'textDecoration': 'none', 'color': 'white' }}>Create</Link>

                    </div>
                </div>
                <br />
                <div className="col-md-12 col-lg-12">
                    <ListPage paginator={true} headers={this.state.headers} dataList={this.state.users} onPagination={this.pagination} filters={this.state.filters} onSubmit={this.onSearch}></ListPage>
                </div>
            </ErrorBoundary>
        )
    }
}
export default withRouter(UserList);