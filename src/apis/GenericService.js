import API_URL from './server';
const GenericService = {
    postMethod,
    getMethod,
    fetchJsonFile,
    postTextMethod
};
function getJWTToken() {
    return localStorage.getItem('Token');
}
 function postMethod(url, data) {

   return postRequest(url,data,"json");
}
 function postTextMethod(url, data) {

    return postRequest(url,data,"text")
     
}
async function postRequest(url,data,type){
    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(data),
        headers: {'Content-Type':'application/json', 'Access-Control-Allow-Origin': '*', 'Authorization': 'Bearer ' + getJWTToken() },
    };
    const response = await fetch(API_URL + url, requestOptions);
    if(type=='text'){
        return response.text();
    }else{
        return response.json();
    }
}
async function getMethod(url) {

    const requestOptions = {
        method: 'GET',
        mode: 'cors',
        headers: { 'Access-Control-Allow-Origin': '*', 'Authorization': 'Bearer ' + getJWTToken() },
    };
    const response = await fetch(API_URL + url, requestOptions);
    return response.json();
}
async function fetchJsonFile(fileName){
   return await fetch(fileName, {
        headers: {
           'Content-Type': 'application/json',
           'Accept': 'application/json'
        }
     }).then(response => response.json())
}
export default GenericService;