import React,{Component} from "react";
import PanelHeader from "../components/PanelHeader/PanelHeader";
import {Card, CardBody, CardHeader, CardTitle, Col, Row, Table} from "reactstrap";
import {tbody, thead} from "../variables/general";
import axios from "axios";
import {apiUrl, frontendUrl} from "../../config/config";
//sweetalert2
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

class ManageAdvertise extends Component{
    state = {
        position : "",
        file : null,
        advertises : []
    };

    componentDidMount() {
        this.loadAdvertise()
    }

    loadAdvertise = async () => {
        await axios.get(`/api/advertise`)
            .then(res => {
                this.setState({
                    advertises : res.data.output
                })
            })
            .catch(error => {
                alert(error);
            });
    };

    fileSelectHandler = (e) => {
        this.setState({
            file : e.target.files[0]
        })
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    };

    onDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this file!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                this.sendDelete(id)
                // For more information about handling dismissals please visit
                // https://sweetalert2.github.io/#handling-dismissals
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                )
            }
        })
    };

    sendDelete = async (id) =>{
        await  axios.delete(`/api/advertise/delete/${id}`)
            .then(response => {
                if (response.data.success) {
                    Swal.fire(
                        'Deleted!',
                        'Your Advertise has been deleted.',
                        'success'
                    );
                    this.loadAdvertise();
                }
            })
            .catch(error => {
                alert(error)
            })
    };

    renderAdvertise = () => {
        return this.state.advertises.map((advertise,key) => {
            if (advertise.image !== null){
                const splitPath = advertise.image.split("\\");
                const path = splitPath[splitPath.length - 1];

                return (
                    <tr key={key}>
                        <td>{key+1}</td>
                        <td><img style={{width : "50px", height : "50px"}} src={`/images/advertise/${path}`} alt=""/></td>
                        <td>{advertise.position}</td>
                        <td><span className="btn btn-danger" onClick={()=> this.onDelete(advertise.id)}><i className="now-ui-icons ui-1_simple-remove"></i></span></td>
                    </tr>
                )
            }
            else{
                return (
                    <tr key={key}>
                        <td>{key+1}</td>
                        <td>{advertise.text}</td>
                        <td>NO Photos</td>
                        <td><span className="btn btn-danger" onClick={()=> this.onDelete(advertise.id)}><i className="now-ui-icons ui-1_simple-remove"></i></span></td>
                    </tr>
                )
            }

        })
    };

    onSave = async () => {
        console.log(this.state.position,this.state.file);
        const dataPost = new FormData();
        dataPost.set('position' , this.state.position);
        dataPost.append('file' , this.state.file);

        await axios.post(`/api/advertise/add`,dataPost, {
            config: { headers: { "Content-Type": "multipart/form-data" } }
        })
            .then(response => {
                if (response.data.success === true) {
                    Swal.fire(
                        'Added!',
                        'Advertise added Successfully.',
                        'success'
                    );
                    this.loadAdvertise();
                }
                else {
                    alert("hey " + response.data.message)
                }
            })
            .catch(error=>{
                alert("Error 34 "+error.status+ error.code)
            });
    };

    render() {
        return (
            <>
                <PanelHeader size="sm" />
                <div className="content">
                    <Row>
                        <Col xs={12}>
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h4">Advertise Add</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <div className="form-row">
                                        <div className=" col-md-4">
                                            <label>Image (Upload 1 image at a time)</label>
                                            <input type="file" className="form-control" name="file"  onChange={this.fileSelectHandler}/>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label>Position</label>
                                            <select id="inputState" className="form-control" name="position"  onChange={this.handleChange}>
                                                <option>Choose...</option>
                                                <option value="after-latest-products">After latest products</option>
                                                <option value="after-exclusive-products-left">After exclusive products left</option>
                                                <option value="after-exclusive-products-middle">After exclusive products middle</option>
                                                <option value="after-exclusive-products-right">After exclusive products right</option>
                                                <option value="after-featured-products">After featured products</option>
                                            </select>
                                            {/*<input type="text" className="form-control" placeholder="Banner text" name="text" onChange={this.handleChange} />*/}
                                        </div>
                                        <div className="form-group col-md-4 pt-3">
                                            <button type="submit" className="btn btn-primary" onClick={() => this.onSave()}>Save</button>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h4">Advertise</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <Table responsive>
                                        <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Image</th>
                                            <th scope="col">Position</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.renderAdvertise()}
                                        </tbody>
                                    </Table>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </>
        );
    }
}

export default ManageAdvertise