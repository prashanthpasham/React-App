function Name(props){
    return (<div key={props.value.id}>
       <p> Name:{props.value.name}</p>
        <p>Age:{props.value.age}</p>
        </div>)
}

function Person(props){
    return (
        <div>
          {
              props.names.map((person,index)=>{
               return <Name key={index} value={person}/>
              })
          }
          <button type="submit" onClick={()=>props.addName()}>Add</button>
          {
              1==0 && <h2>Hello</h2>
          }
        </div>
    );
}
export default Person