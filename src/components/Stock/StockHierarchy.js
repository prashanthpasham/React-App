import React, { Component } from 'react'
import StockHierarchyComponent from './StockHierarchyComponent';
class StockHierarchy extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        }
        this.stockHierarchy = this.stockHierarchy.bind(this);
    }
    stockHierarchy(ctIds, csNames, ctLength){

    }
    render() {
        return (
            <>
             <h2>Stock Hierarchy Setup</h2><br/>
               <StockHierarchyComponent hierarchy={true} stockHierarchy={this.stockHierarchy}/>
            </>
        )
    }
}

export default StockHierarchy
