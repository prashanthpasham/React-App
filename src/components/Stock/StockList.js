import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';
 class StockList extends Component {
    render() {
        return (
            <div>
                <h1>Stock</h1>
                <br/>
                
            </div>
        )
    }
}

export default withRouter(React.memo(StockList))
