import React,{Component} from "react";
import axios from 'axios';
import adminAuthService from "../adminServices/adminAuthService";
import PanelHeader from "../components/PanelHeader/PanelHeader";
import {Button, Card, CardBody, Col, Row} from "reactstrap";
import {apiUrl, frontendUrl} from "../../config/config";

class AdminProfile extends Component{
    state = {
        admin : null
    };

    componentDidMount() {
        this.fetchAdmin(adminAuthService.getCurrentAdmin().id);
    }

    fetchAdmin = async (id) => {
       await axios.get(`${apiUrl}/admin/get/${id}`)
                .then(res => {
                    this.setState({
                        admin : res.data.output[0]
                    })
                })
    };

    renderImage = () => {
        if(this.state.admin.image !== null){
            const splitPath = this.state.admin.image.split("\\");
            const path = splitPath[splitPath.length - 1];

            return (<img className="avatar border-gray" src={`${frontendUrl}/images/admin/${path}`} alt=""/>)
        }else{
            return (<span className="avatar border-gray"><i className="users_circle-08"></i></span>)
        }
    };

    render() {
        const {admin} = this.state;
        if (admin === null){
            return (
                <>
                    <PanelHeader size="sm" />
                    <div className="content">
                        <Row>
                            <Col md="3"></Col>
                            <Col md="6">
                                <Card className="card-user">

                                    <CardBody>
                                        <p className="description text-center">
                                            Loading Please Wait..
                                        </p>
                                    </CardBody>

                                </Card>
                            </Col>
                            <Col md="3"></Col>
                        </Row>

                    </div>
                </>
            );
        }
        else{
            return (
                <>
                    <PanelHeader size="sm" />
                    <div className="content">
                        <Row>
                            <Col md="3"></Col>
                            <Col md="6">
                                <Card className="card-user">

                                    <CardBody>
                                        <div className="author">
                                                {this.renderImage()}
                                                <h5 className="title">{admin.name}</h5>
                                            <p className=" badge badge-success">{admin.role.role}</p>
                                        </div>
                                        <p className="text-center"><b>Email : </b>{admin.email}</p><hr />
                                        <p className="text-center"><b>Address : </b>{admin.address}</p><hr />
                                        <p className="text-center"><b>Phone : </b>{admin.phone}</p>
                                    </CardBody>
                                    <hr />

                                </Card>
                            </Col>
                            <Col md="3"></Col>
                        </Row>

                    </div>
                </>
            );
        }

    }
}

export default AdminProfile