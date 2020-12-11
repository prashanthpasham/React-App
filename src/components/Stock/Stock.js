import React from 'react'
import GenericService from '../../apis/GenericService';
import Component from '../../Component';
import { Redirect, withRouter } from 'react-router-dom';
import StockService from '../../apis/Stock/StockService';

class Stock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "fields": [],
            "title": "",
            redirect: false
        }
        this.saveStock = this.saveStock.bind(this);
    }
    componentDidMount() {
        GenericService.fetchJsonFile('Fields/Stock/create.json')
            .then(data => { return JSON.parse(JSON.stringify(data)) })
            .then(res => {
                this.setState({ "title": res.title, "fields": res.fields }, () => {
                    {
                        StockService.uomList().then(response => {
                            for (var k = 0; k < this.state.fields.length; k++) {
                                let field = this.state.fields[k];
                                if (field.name === 'uomConfigId') {
                                    field.values = JSON.parse(JSON.stringify(response));
                                    break;
                                }
                            }
                            this.setState({ "fields": this.state.fields });
                        })
                    }
                })
            });


    }
    saveStock(object) {
        console.log(JSON.stringify(object));
        StockService.createStock(object).then(result => {
            if (result === "success") {
                this.setState({ "redirect": true });
            }
        })
    }
    render() {
        return (
            <>
                {this.state.redirect && <Redirect to="/app/stock" />}

                {this.state.fields.length > 0 ? <Component fields={this.state.fields} title={this.state.title} submit={this.saveStock} /> : <h1>Loading...</h1>}



            </>
        )
    }
}

export default withRouter(React.memo(Stock))
