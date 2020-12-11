import GenericService from '../GenericService';
const StockService = {
  createStockHierarchy,
  stockHierarchy,
  stockHierarchyById,
  uomList,
  createUom,
  createStock
}
function createStockHierarchy(object) {
  return GenericService.postTextMethod('/stock/create-stock-hierarchy', object);
}
function stockHierarchy() {
  return GenericService.getMethod('/stock/hierarchy-data');
}
function stockHierarchyById(id) {
  return GenericService.getMethod('/stock/hierarchy-data/' + id);
}
function uomList() {
  return GenericService.getMethod('/stock/uom-list');
}
function createUom(object) {
  return GenericService.postTextMethod('/stock/create-uom-config', object);
}
function createStock(object) {
  return GenericService.postTextMethod('/stock/create-stock', object);
}
export default StockService;