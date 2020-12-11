import React from 'react';
import Component from '../../Component';
import GenericService from '../../apis/GenericService';
import CustomerService from '../../apis/Customer/CustomerService';
import { withRouter, Redirect } from 'react-router-dom';
class Customer extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         fields: [],
         title: "Create Customer",
         redirect: false,
         "submission": {}
      };
     this.saveCustomer = this.saveCustomer.bind(this);
   }
   componentDidMount() {
      GenericService.fetchJsonFile('Fields/Customer/create.json')
         .then(data => { return JSON.parse(JSON.stringify(data)) })
         .then(res => {
            this.setState({ "title": res.title, "fields": res.fields },
               () => {
                  CustomerService.customerTypeList().then(response => {
                     for (var k = 0; k < this.state.fields.length; k++) {
                        let field = this.state.fields[k];
                        if (field.name === 'customerType') {
                           field.values = JSON.parse(JSON.stringify(response));
                           break;
                        }
                     }
                     this.setState({ "fields": this.state.fields });
                  })
               });
         });


   }
   saveCustomer(data) {
      data['createdBy'] = JSON.parse(localStorage.getItem('user')).userName;
      var d = new Date();
      data['createdDate'] = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
      // alert(JSON.stringify(data));
      // console.log(JSON.stringify(JSON.parse(JSON.stringify(data))));
      CustomerService.createCustomer(JSON.parse(JSON.stringify(data))).then(response => {
         if (response === "success") {
            alert("Customer Created Successfully!");
            this.setState({ "redirect": true });
         } else {
            alert("Unable to Create Customer,plz try again!");
         }
      })
   }
   render() {
      return (<div>
         {
            this.state.redirect && <Redirect to="/app/customer" />
         }
         {this.state.fields.length > 0 ? <Component fields={this.state.fields} title={this.state.title} submit={this.saveCustomer} /> : <h1>Loading...</h1>}
      </div>)
   }
}
export default withRouter(Customer)