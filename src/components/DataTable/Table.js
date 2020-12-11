import { array, bool } from "prop-types";
import { useState, useEffect } from 'react';


const Table = (props) => {
    const [counter, setCounter] = useState(0);
    
    const onPagination = (type) => {
        if (type === 'prev')
            setCounter(counter > 0 ? counter - 1 : counter);
        else
            setCounter(counter + 1);

    }
    useEffect(() => {
        let flag = true;
        if (counter != 0 && props.data.length < 50) {
            flag = false;
        }
        if (flag && props.pagination)
            props.onPagination((counter * 50) + 1, 50);
    }, [counter]);
    const onRadioSelection = (object) => {
        props.onRowSelect(object);
      
    }
    return (
        <div className="row">

            <div className=" col-md-12 col-lg-12 col-sm-12 col-xs-12">
                {
                    props.pagination &&
                    (<><a onClick={() => onPagination('prev')} style={{ 'fontSize': '18px', 'textDecoration': 'none' }} aria-label="Previous">
                        <span aria-hidden="true">Prev</span>
                    </a>
                        <a onClick={() => onPagination('next')} style={{ 'float': 'right', 'fontSize': '18px', 'textDecoration': 'none' }} aria-label="Next">
                            <span aria-hidden="true">Next</span>
                        </a></>
                    )

                }
                <table className=" table table-bordered" style={{ 'backgroundColor': 'white' }}>
                    <thead>
                        <tr style={{ 'backgroundColor': '#7952b3', 'color': 'white' }}>
                           {props.radio &&  <td key="-1" ></td>}
                            {
                                props.headers.map((head, index) => {
                                    return (
                                        <td key={index}>
                                            {head.header}
                                        </td>
                                    )
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.data.length == 0 &&
                            (
                                <tr><td colSpan={props.headers.length}>No Records Found</td></tr>
                            )
                        }
                        {
                            props.data.length > 0 &&
                            props.data.map((field, index) => {
                                return (
                                    <tr key={index}>
                                         {props.radio &&  <td key="-1" >
                                             <input type="radio"  name="radio" onClick={()=>onRadioSelection(field)} value={index}/>                                            </td>}
                                        {
                                            props.headers.map((head, indx) => {
                                                return (
                                                    <td key={indx}>
                                                        {field[head.key]}
                                                    </td>
                                                )
                                            })

                                        }


                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
Table.propTypes = {
    headers: array,
    data: array,
    pagination: bool,
    radio:bool
}
Table.defaultProps = {
    headers: [],
    data: [],
    pagination: false,
    radio:false
}
export default Table;