import GenericService from '../GenericService';
const LoginService={
  login
}
function login(object){
  return  GenericService.postMethod('/login/authenticate',object);
}
export default LoginService;