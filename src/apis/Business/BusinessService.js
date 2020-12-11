import GenericService from '../GenericService';
const BusinessService = {
  btHierarchList,
  hierarchyList,
  onBtChange,
  saveHierarchy
}
async function hierarchyList(type) {

  return GenericService.getMethod('/business/business-hierarchy?type=' + type);

}
async function btHierarchList(type) {

  return GenericService.getMethod('/business/business-territory?type=' + type);

}
async function saveHierarchy(object) {

  return GenericService.postTextMethod('/business/save-hierarchy',object);

}


async function onBtChange(parentId, type) {

  return GenericService.getMethod('/business/business-territory-data?id=' + parentId + "&type=" + type);

}
export default BusinessService;