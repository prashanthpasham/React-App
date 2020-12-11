import GenericService from '../GenericService';
const UserService = {
   usersList
}

function usersList(){
    return GenericService.getMethod('/login/users-list');
}
  
export default UserService;