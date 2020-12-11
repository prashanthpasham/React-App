import { HashRouter, Route, Switch } from 'react-router-dom';
import Login from './Login';
import App from './App';
import Customer from './components/Customer/Customer';
import CustomerList from './components/Customer/CustomerList';
import CustomerType from './components/Customer/CustomerType';
import UserList from './components/User/UserList';
import RoleList from './components/Role/RoleList';
import BusinessHierarchy from './components/Business/BusinessHierarchy';
import StockHierarchy from './components/Stock/StockHierarchy';
import Measurement from './components/Stock/Measurement';
import Stock from './components/Stock/Stock';
function RouterComponent(){
        return (
            <div>
                <HashRouter>
                    <Switch>
                        <Route exact path='/' component={Login} />
                        <Route exact path='/app' component={App} />
                        <App>
                            <Route  component={({ match }) =>
                              <>
                                <Route exact path='/app/create-customer' component={Customer} ></Route>
                                <Route exact path='/app/customer' component={CustomerList}/>
                                <Route exact path='/app/customer-type' component={CustomerType}/>
                                <Route exact path='/app/users' component={UserList}/>
                                <Route exact path='/app/role-list' component={RoleList}/>
                                <Route exact path='/app/hierarchy/:id' component={BusinessHierarchy}/>
                                <Route exact path='/app/stock-hierarchy' component={StockHierarchy}/>
                                <Route exact path='/app/measurement' component={Measurement}/>
                                <Route exact path='/app/stock' component={Stock}/>
                            </>
                            } />
                        </App>
                    </Switch>
                </HashRouter>
            </div>
        )
    
}
export default RouterComponent;