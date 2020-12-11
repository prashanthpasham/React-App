import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import { Redirect, withRouter } from 'react-router-dom';
import './App.css';
const menuItems = [
    {
        'menu': 'Company Info',
        'url': 'company-info'
    }, {
        'menu': 'Business Hierarchy',
        'url': 'hierarchy/BT'
    }, {
        'menu': 'Business Territory',
        'url': 'business-territory'
    },
    {
        'menu': 'Customer',
        'url': 'customer'
    }, {
        'menu': 'Customer Types',
        'url': 'customer-type'
    }, {
        'menu': 'User',
        'url': 'users'
    },  {
        'menu': 'Role',
        'url': 'role-list'
    },{
        'menu': 'Stock Hierarchy',
        'url': 'hierarchy/ST'
    },{
        'menu': 'Stock Hierarchy Setup',
        'url': 'stock-hierarchy'
    },{
        'menu': 'Measurement Configuration',
        'url': 'measurement'
    },{
        'menu': 'Stock',
        'url': 'stock'
    }
];
class App extends React.Component {
    constructor(props) {
        super(props)
        let user = JSON.parse(localStorage.getItem('user'));
        let grpIndex = parseInt((localStorage.getItem('selGrp')===null || localStorage.getItem('selGrp')==undefined)?0:localStorage.getItem('selGrp'));
       let menuIndex =  parseInt((localStorage.getItem('selMenuIndex')===null || localStorage.getItem('selMenuIndex')==undefined)?0:localStorage.getItem('selMenuIndex')); 
     
       this.state = {
            userName: user.userName,
            menus: JSON.parse(localStorage.getItem('menus')),
            loggedOut: false,
            menuMatched: false,
            menuUrl: "",
            selIndex: grpIndex,
            selMenuIndex:menuIndex
        }
        this.logout = this.logout.bind(this);
        this.onMenuChange = this.onMenuChange.bind(this);
        this.onGrpMenu = this.onGrpMenu.bind(this);

    }
    logout() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
        localStorage.removeItem('menus');
        localStorage.removeItem('selGrp');
        localStorage.removeItem('selMenuIndex');
        //this.props.history.push('/');
        this.setState({ "loggedOut": true });

    }
    onMenuChange(menu,index) {
        localStorage.setItem('selMenuIndex',index);
        this.setState({'selMenuIndex':index});
        for (let i = 0; i < menuItems.length; i++) {
            let menuItem = menuItems[i];
            if (menuItem['menu'] === menu) {
                //this.props.history.push("/app/" + menuItem['url']);
                this.setState({ "menuMatched": true, "menuUrl": '/app/' + menuItem['url'] });
                break;
            }
        }

    }
    onGrpMenu(index){
        this.setState({ 'selIndex': index });
        localStorage.setItem('selGrp',index);
    }
    render() {
        return (
            <ErrorBoundary>
                {
                    this.state.loggedOut && (<Redirect to="/" />)
                }
                {
                    this.state.menuMatched && (<Redirect to={this.state.menuUrl} />)
                }
                <div >
                    <nav className="navbar navbar-dark bg-dark">
                        <a className="navbar-brand">Welcome :<span style={{ color: 'red' }}>{this.state.userName}</span></a>

                        <button className="btn btn-outline-danger my-2 my-sm-0" type="submit" onClick={() => this.logout()}>Logout</button>

                    </nav>
                </div>
                <div className="row container-fluid col-md-12 col-lg-12">
                    <div className="col-md-3 col-lg-3" style={{ height: '100%' }}>
                        <nav className="navbar navbar-light">

                            <div className="accordion" id="accordionExample">
                                {this.state.menus.map((menuGrp, index) => {
                                    return (
                                        <div className="card" key={index}>
                                            <div className="card-header" id={`headingOne` + index}>
                                                <h2 className="mb-0">
                                                    <button className="btn  btn-block text-left" type="button" data-toggle="collapse" onClick={() =>this.onGrpMenu(index) } data-target={`#` + index} aria-expanded="true" aria-controls="collapseOne">
                                                        {menuGrp.groupName}
                                                    </button>
                                                </h2>
                                            </div>

                                            <div id={index} style={{ 'display': this.state.selIndex == index ? 'block' : 'none' }} aria-labelledby={`headingOne` + index} data-parent="#accordionExample">
                                                <div className="list-group-item">
                                                    {menuGrp.menuLinks.map((menu, index1) => {
                                                        return (
                                                            <div key={index1}>
                                                                <a  style={{'borderBottom':this.state.selMenuIndex===index1?'2px solid red':'0px'}} onClick={() => this.onMenuChange(menu.menuItem,index1)}>{menu.menuItem}<br /></a>
                                                                <br />

                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    )

                                })}
                            </div>

                        </nav>
                    </div>

                    <div className="col-md-9 col-lg-9" >

                        {this.props.children}


                    </div>

                </div>
            </ErrorBoundary>

        )
    }
}
export default withRouter(App);