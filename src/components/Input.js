import { bool, number, string } from 'prop-types';

function Input(props) {
    return (
        <div className="col-md-4 col-lg-4" style={{ display: 'inline-block' }}>
            <label>{props.label}</label>{props.required && <span style={{ 'color': 'red' }}>*</span>} <span style={{ 'display': props.error.trim().length > 0 ? 'block' : 'none','color':'red' }}>
                {props.error}
            </span><br />
            <input style={{ 'borderColor': props.error.trim().length > 0 ? 'red' : 'white' }} className="form-control" type={props.type} name={props.name} value={props.value} onChange={(e) => props.change(e, props.name)} readOnly={props.readonly} hidden={props.hidden} required={props.required} min={props.min} max={props.max} />

        </div>
    );
}
Input.propTypes = {
    label: string,
    type: string,
    required: bool,
    hidden: bool,
    readonly: bool,
    name: string,
    value: string,
    min: number,
    max: number,
    error: string
}
Input.defaultProps = {
    label: null,
    type: 'text',
    required: false,
    hidden: false,
    readonly: false,
    name: null,
    value: "",
    min: 0,
    max: 10000000,
    error: ""
}
export default Input;