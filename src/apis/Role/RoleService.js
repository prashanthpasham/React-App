import GenericService from '../GenericService';
const RoleService = {
  roleList
}
async function roleList(object) {

  return GenericService.postMethod('/role/role-list',object);
}

export default RoleService;