import React,{Component} from "react";
import axios from "axios";
import {apiUrl} from "../../../config/config";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//sweetalert2
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
//validation
import SimpleReactValidator from 'simple-react-validator';

class SupplierAddOrEditProduct extends Component{
    constructor() {
        super();
        this.validator = new SimpleReactValidator({autoForceUpdate: this});
    }
    state = {
        name: "",
        specification : "",
        description : "",
        images : [],
        price : 0,
        model : "",
        subCategoryId : null,
        supplierId : null,
        subCategories : []
    };

    componentDidMount = async () => {
        console.log(this.props.singleData);
        if(this.props.edit){
            let {name,specification,description,images,price,model,subCategoryId} = this.props.singleData;
            this.setState({
                name : name,
                specification : specification,
                description : description,
                images : images,
                price : price,
                model : model,
                subCategoryId : subCategoryId
            })
        }
        await axios.get(`${apiUrl}/subCategory`)
                .then(res => {
                    if(res.data.success){
                        this.setState({
                            subCategories : res.data.output
                        })
                    }
                })
                .catch(error => {
                    alert (error)
                })
    };

    handleChange = (e) => {
        this.validator.showMessages();
        this.setState({
            [e.target.name] : e.target.value
        })
    };

    handleDescription = (e,editor) => {
        this.validator.showMessages();
        let data = editor.getData();
        this.setState({
            description : data
        })
    };

    handleSpecification = (e,editor) => {
        this.validator.showMessages();
        let data = editor.getData();
        this.setState({
            specification : data
        })
    };

    fileSelectHandler = (e) => {
        this.setState({
                images : e.target.files
            });
    };

    loadSubCatg = () => {
        return this.state.subCategories.map((subCatg,key) => {
            return (
                <option value={subCatg.id} key={key}>{subCatg.name}</option>
            )
        })
    };

    onSave = async () => {

        if (this.validator.allValid()){
            const dataPost = new FormData();
            if (!this.props.edit){
                dataPost.set('name' , this.state.name);
                dataPost.set('specification' , this.state.specification);
                dataPost.set('description' , this.state.description);
                dataPost.set('price' , this.state.price);
                dataPost.set('model' , this.state.model);
                dataPost.set('subCategoryId' , this.state.subCategoryId);
                dataPost.set('supplierId' , this.props.supplierId);
                for(var x = 0; x < this.state.images.length; x++) {
                    dataPost.append('images', this.state.images[x])
                }

                await axios.post(`${apiUrl}/product/add`,dataPost, {
                    config: { headers: { "Content-Type": "multipart/form-data" } }
                })
                    .then(response => {
                        if (response.data.success === true) {
                            Swal.fire(
                                'Added!',
                                'Product added Successfully.',
                                'success'
                            );
                            // window.location.reload(false);
                        }
                        else {
                            alert("hey " + response.data)
                        }
                    })
                    .catch(error=>{
                        alert("Error 34 "+error.status+ error)
                    });

                this.props.onSave();
            }
            else{
                dataPost.set('name' , this.state.name);
                dataPost.set('specification' , this.state.specification);
                dataPost.set('description' , this.state.description);
                dataPost.set('price' , this.state.price);
                dataPost.set('model' , this.state.model);
                dataPost.set('subCategoryId' , this.state.subCategoryId);
                // dataPost.set('supplierId' , this.props.supplierId);
                for(var x = 0; x < this.state.images.length; x++) {
                    dataPost.append('images', this.state.images[x])
                }

                await axios.post(`${apiUrl}/product/update/${this.props.singleData.id}`,dataPost, {
                    config: { headers: { "Content-Type": "multipart/form-data" } }
                })
                    .then(response => {
                        if (response.data.success === true) {
                            Swal.fire(
                                'Updated!',
                                'Product updated Successfully.',
                                'success'
                            );
                            // window.location.reload(false);
                        }
                        else {
                            alert("hey " + response.data)
                        }
                    })
                    .catch(error=>{
                        alert("Error 34 "+error.status+ error)
                    });

                this.props.onSave();
            }
        }
        else{
            this.validator.showMessages();
        }


    };

    render() {

        const {name,specification,description,price,model} = this.state;
        console.log("2",specification,"3",description);

        return (
            <>
                <div>
                    <div className="form-group">
                        <label >Name</label>
                        <input type="text" className="form-control" name="name" value={name} placeholder="Enter Name" onChange={this.handleChange} />
                        {this.validator.message('name', this.state.name, 'required',{ className: 'text-danger' })}
                    </div>
                    <div className="form-group">
                        <label>Specification</label>
                        <CKEditor
                            editor={ ClassicEditor }
                            onChange={this.handleSpecification}
                            data = {this.props.edit ? this.props.singleData.specification : specification}
                        />
                        {this.validator.message('specification', this.state.specification, 'required|min:10|max:1000',{ className: 'text-danger' })}
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <CKEditor
                            editor={ ClassicEditor }
                            onChange={this.handleDescription}
                            data = {this.props.edit ? this.props.singleData.description : description}
                        />
                        {this.validator.message('description', this.state.description, 'required|min:10|max:100',{ className: 'text-danger' })}
                    </div>
                    <div className="form-group">
                        <label >Upload Photos (Maximum 4 photos)</label>
                        <input type="file" className="form-control" multiple onChange={this.fileSelectHandler}/>
                    </div>
                    <div className="form-group">
                        <label >Price</label>
                        <input
                            type="number"
                            required
                            className="form-control"
                            name="price"
                            placeholder="Price"
                            value={price}
                            onChange={this.handleChange}
                        />
                        {this.validator.message('price', this.state.price, 'required|numeric',{ className: 'text-danger' })}
                    </div>
                    <div className="form-group">
                        <label >Model</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            name="model"
                            placeholder="Model"
                            value={model}
                            onChange={this.handleChange}
                        />
                        {this.validator.message('model', this.state.model, 'required',{ className: 'text-danger' })}
                    </div>
                    <div className="form-group">
                        <label >Select Category</label>
                        <select className="form-control" name="subCategoryId" onChange={this.handleChange}>
                            <option>Choose...</option>
                            {this.loadSubCatg()}
                        </select>
                    </div>

                    <div className="form-group">
                        <button
                            type="submit"
                            className="btn btn-fill-out btn-block"
                            name="register"
                            onClick={this.onSave}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </>
        );
    }
}

export default SupplierAddOrEditProduct