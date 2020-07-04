import React,{Component} from "react";
import {Row, Col, Card, CardHeader, CardTitle, CardBody} from "reactstrap";
import PanelHeader from "../components/PanelHeader/PanelHeader";
import axios from "axios";
import {apiUrl} from "../../config/config";

class ManageCategories extends Component{

    state = {
        mainCategories : [],
        mainCategory : "",
        icon : "",
        subCategory : "",
        mainCatgId : 0,
        file : null,
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    };

    componentDidMount() {
        this.fetchCategories();
    }

    fetchCategories = () => {
        axios.get(`${apiUrl}/mainCategory`)
            .then(res => {
                this.setState({
                    mainCategories : res.data.output
                })
            })
            .catch(error => {
                alert(error)
            })
    };

    renderCategories = () => {
        return this.state.mainCategories.map( (mainCategory,key) => {
            return (
                <div key={key}>
                    <p>{mainCategory.name}</p>
                    {mainCategory.subCategories.map((subcategory,key) => {
                        return <p className="pl-4" key={key}># {subcategory.name}</p>
                    })}

                </div>
            );
        })
    };

    loadCatgOptions = () => {
        return this.state.mainCategories.map((mainCatg,key) => {
            return <option value={mainCatg.id} key={key}>{mainCatg.name}</option>
        });
    };

    fileSelectHandler = (e) => {
        this.setState({
            file : e.target.files[0]
        })
    };

    onMainCatgSave = async () => {
        const mainCatgData = new FormData();
        mainCatgData.set('name' , this.state.mainCategory);
        mainCatgData.set('icon' , this.state.icon);
        mainCatgData.append('file' , this.state.file);

        await axios.post(`${apiUrl}/mainCategory/add`,mainCatgData, {
            config: { headers: { "Content-Type": "multipart/form-data" } }
        })
            .then(res => {
                this.fetchCategories()
            })
            .catch(error => {
                alert(error);
            })
    };

    onSubCatgSave = async () => {
        const subCatgData = {
            name : this.state.subCategory,
            mainCatgId : this.state.mainCatgId
        };
        await axios.post(`${apiUrl}/subCategory/add`,subCatgData)
            .then(res => {
                this.fetchCategories()
            })
            .catch(error => {
                alert(error)
            })
    };

    render() {
        console.log(this.state.mainCategories);
        return (
            <>
                <PanelHeader size="sm" />
                <div className="content">
                    <Row>
                        <Col xs={12}>
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h4">Main Category Add</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <div className="form-row">
                                        <div className="form-group col-md-3">
                                            <label>Category Name</label>
                                            <input type="text" className="form-control" placeholder="Category Name" name="mainCategory" onChange={this.handleChange} />
                                        </div>
                                        <div className="form-group col-md-3">
                                            <label>Icon Name</label>
                                            <input type="text" className="form-control" placeholder="Icon Name" name="icon" onChange={this.handleChange} />
                                        </div>
                                        <div className="col-md-3 ">
                                            <label>Image Upload</label>
                                            <input type="file" className="form-control" name="file" onChange={this.fileSelectHandler}/>
                                        </div>
                                        <div className="form-group col-md-3 pt-3">
                                            <button type="submit" className="btn btn-primary" onClick={() => this.onMainCatgSave()}>Save</button>
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
                                    <CardTitle tag="h4">Sub Category Add</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <div className="form-row">
                                        <div className="form-group col-md-4">
                                            <label>Category Name</label>
                                            <input type="text" className="form-control" placeholder="Category Name" name="subCategory" onChange={this.handleChange} />
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label htmlFor="inputState">Main Category</label>
                                            <select id="inputState" className="form-control" name="mainCatgId"  onChange={this.handleChange}>
                                                 <option>Choose...</option>
                                                {this.loadCatgOptions()}
                                            </select>
                                        </div>
                                        <div className="form-group col-md-4 pt-3">
                                            <button type="submit" className="btn btn-primary" onClick={() => this.onSubCatgSave()}>Save</button>
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
                                    <CardTitle tag="h4">All Categories</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    {this.renderCategories()}
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </>
        );
    }
}

export default ManageCategories