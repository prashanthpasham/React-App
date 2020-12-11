import { bool, string } from 'prop-types';
import React, { Component } from 'react'

class UploadImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "images": [],
            "counter": 0
        }
        this.addImage = this.addImage.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
        this.sendProps = this.sendProps.bind(this);
    }
    addImage(e) {
        const reader = new FileReader();
        const file = e.target.files[0];
        let type = file.type;
        let fileSize = ((file.size / 1024) / 1024);
        if (fileSize <= 10) {
            if (type === 'image/jpg' || type === 'image/jpeg' || type === 'image/png') {
                reader.onload = e => {
                    let base64 = e.target.result;
                    console.log(base64);
                    let imgObj = { "name": file.name, "size": Math.round(fileSize), "data": base64, "id": this.state.counter }
                    if (this.props.multiple) {
                        this.setState({ "images": [...this.state.images, imgObj], "counter": this.state.counter + 1 },()=>{
                            this.sendProps(this.props.name,this.state.images);
                        });
                    } else {
                        this.setState({ "images": [imgObj], "counter": this.state.counter + 1 },()=>{
                            this.sendProps(this.props.name,this.state.images);
                        });
                    }
                }
                reader.readAsDataURL(file);
            } else {
                alert("Supported File Formats are jpg or jpeg or png");
            }
        } else {
            alert("File Size should not be more than 1MB");
        }
    }
    deleteImage(index) {
        this.state.images.splice(index, 1);
        this.setState({ "images": [...this.state.images] },()=>{
            this.sendProps(this.props.name,this.state.images);
        });
    }
    sendProps(name,images){
        alert(images.length);
        var data =[];
        images.forEach(image=>{
            data.push(image.data);
        })
        this.props.upload(name,data);
    }
    render() {
        return (
            <div className="col-md-12 col-sm-12 col-xs-12 col-lg-12">
                <fieldset className="scheduler-border">
                    <legend className="scheduler-border">Images</legend>
                    <input type="file" id="upload" style={{'display':'none'}} onChange={(e) => this.addImage(e)} />
                 <buttton className="btn btn-primary glyphicon glyphicon-upload" onClick={()=>{document.getElementById('upload').click()}}>Upload Image</buttton>
                 <br/>
                    {
                        this.state.images.map((image, index) => {
                            return (
                                <div key={image.id} className="col-md-4 col-lg-4 card" style={{ 'width': '18rem', 'display': 'inline-block' }}>
                                    <img src={image.data} style={{ 'width': '100%', 'height': '150px' }} className="card-img-top" />
                                    <div className="card-body">
                                        <p className="card-text">File Name : {image.name}</p>
                                        <p className="card-text">File Size : {image.size} Mb</p>
                                        <a className="btn btn-danger" onClick={() => this.deleteImage(index)}>Delete</a>
                                    </div>
                                </div>
                            )
                        })
                    }
                   
                </fieldset>
            </div>
        )
    }
}
UploadImage.propTypes = {
    multiple: bool,
    name:string
}
UploadImage.defaultProps = {
    multiple: false,
    name:'images'
}
export default UploadImage
