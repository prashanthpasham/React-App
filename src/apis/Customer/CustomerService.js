import GenericService from '../GenericService';
const CustomerService = {
    customerTypeList,
    createCustomer,
    customerList,
    createCustomerType
}
function createCustomerType(customer){
    return GenericService.postTextMethod('/customer/create-customer-type',customer);
}
function customerTypeList(){
    return GenericService.getMethod('/customer/customer-type');
}
function createCustomer(customer){
    return GenericService.postTextMethod('/customer/create-customer',customer);
}
function customerList(data){
    return GenericService.postMethod('/customer/customers',data);
}
export default CustomerService;