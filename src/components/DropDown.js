import { array, string, bool } from "prop-types";

function DropDown(props) {
    return (
        <div className="col-md-4 col-lg-4" style={{ display: 'inline-block' }}>
       
           
            <label>{props.label}</label>{props.required&&<span style={{'color':'red'}}>*</span>} <span style={{'display':props.error.length>0?'block':'none','color':'red'}}>
            {props.error}
           </span><br/>
            <select style={{'borderColor':props.error.trim().length>0?'red':'white'}} className="form-control" name={props.name} value={props.value} onChange={(e) => props.change(e, props.name)} readOnly={props.readonly} hidden={props.hidden}
             required={props.required}>
                <option key="-1" value="">{props.required?"Select":"All"}</option>
                {
                    props.values.map((field,index) => {
                        return (<option key={index} value={field[props.optionValue]}>{field[props.optionLabel]}</option>)
                    })
                }
            </select>
       
        </div>
    );
}
DropDown.propTypes = {
    label: string,
    type: string,
    required: bool,
    hidden: bool,
    readonly: bool,
    name: string,
    value: string,
    values: array,
    error:string,
    optionLabel:string,
    optionValue:string
}
DropDown.defaultProps = {
    label: null,
    type: 'text',
    required: false,
    hidden: false,
    readonly: false,
    name: null,
    value: "",
    values: [],
    error:"",
    optionLabel:"label",
    optionValue:"value"
}
export default DropDown;