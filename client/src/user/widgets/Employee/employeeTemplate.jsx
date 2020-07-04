import React from "react";
import {Card, CardBody} from "reactstrap";
import {frontendUrl} from "../../../config/config";

const EmployeeTemplate = (props) => {
    const employee = props.employee;

    if (employee.image){
        const splitPath = employee.image.split("\\");
        const path = splitPath[splitPath.length - 1];

        return (
            <div className="col-md-12">
                <Card className="mb-3">
                    <CardBody>
                        <div className="row">
                            <div className="col-md-6">
                                <p><span className="employee_title"><i className="linearicons-pencil"></i> Name :</span> {employee.name}</p>
                                <p><span className="employee_title"><i className="linearicons-envelope"></i> Email :</span> {employee.email}</p>
                                <p><span className="employee_title"><i className="linearicons-smartphone"></i> Phone :</span> {employee.phone}</p>
                                <p><span className="employee_title"><i className="linearicons-tag"></i> Designation :</span> {employee.designation}</p>
                            </div>
                            <div className="col-md-6">
                                <img className="circle_image" src={`${frontendUrl}/images/employee/${path}`} alt=""/>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        )
    }
    else{
        return (
            <div className="col-md-12">
                <Card className="mb-3">
                    <CardBody>
                        <div className="row">
                            <div className="col-md-6">
                                <p><span className="employee_title"><i className="linearicons-pencil"></i> Name :</span> {employee.name}</p>
                                <p><span className="employee_title"><i className="linearicons-envelope"></i> Email :</span> {employee.email}</p>
                                <p><span className="employee_title"><i className="linearicons-smartphone"></i> Phone :</span> {employee.phone}</p>
                                <p><span className="employee_title"><i className="linearicons-tag"></i> Designation :</span> {employee.designation}</p>
                            </div>
                            <div className="col-md-6">
                                <p>No Image Available</p>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        )
    }

};

export default EmployeeTemplate