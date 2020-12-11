import React from 'react';
import RoleService from '../../apis/Role/RoleService';
import ListPage from '../ListPage/ListPage';
import { Link, withRouter } from 'react-router-dom';
import ErrorBoundary from '../../ErrorBoundary';

class RoleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "roles": [],
            "headers": [
                { "header": "Role Name", "key": "roleName" },
                { "header": "Description", "key": "description" },
                { "header": "Created Date", "key": "createdDate" }
            ],
            "filters": []
        };

        this.pagination = this.pagination.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.fetchList = this.fetchList.bind(this);
    }

    fetchList(object) {
        RoleService.roleList(object).then(response => {
            this.setState({ "roles": JSON.parse(JSON.stringify(response)) });
        })
    }
    pagination(first, pageSize) {
        this.fetchList({ "first": first-1, "size": pageSize });
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
                        <h3>Role</h3>
                    </div>
                    <div className="col-md-2 col-lg-2">
                        <Link className="btn btn-primary" to="/app/create-role" style={{ 'textDecoration': 'none', 'color': 'white' }}>Create</Link>

                    </div>
                </div>
                <br />
                <div className="col-md-12 col-lg-12">
                    <ListPage radio={true} paginator={true} headers={this.state.headers} dataList={this.state.roles} onPagination={this.pagination} filters={this.state.filters} onSubmit={this.onSearch}></ListPage>
                </div>
            </ErrorBoundary>
        )
    }
}
export default withRouter(RoleList);