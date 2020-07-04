import React,{Component} from "react";
import axios from'axios';
import {Link} from "react-router-dom";
import {apiUrl} from "../../../config/config";


class ProductFilter extends Component{

    state = {
        mainCategories : [],
        subCategories : []
    };

    componentDidMount() {
        axios.get(`${apiUrl}/mainCategory`)
            .then(response => {
                this.setState({
                    mainCategories : response.data.output
                })
            })
    }

    createMainCategories = () => {
        return this.state.mainCategories.map((item,key) => {
            return (
                <li key={key}>
                    <Link to = {`/mainCategory/${item.id}`}  >
                        <span className="categories_name">{item.name}</span>
                        {/*<span className="categories_num">(9)</span>*/}
                    </Link>
                </li>
            )
        })
    }


    createCheckBoxes = () => {
        let status = this.props.status;
        return status.map((item,key)=>{
            return (
                <li key={key}>
                    <div className="custome-checkbox">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            name={item.value}
                            id={item.value}
                            value={item.value}
                            checked={item.isChecked}
                            // defaultValue
                            onClick={this.props.handleCheckedStatus}
                        />
                        <label className="form-check-label" htmlFor={item.value}>
                            <span>{item.value}</span>
                        </label>
                    </div>
                </li>
            )
        })
    };

    render() {
        return (
            <div className="sidebar">
                <div className="widget">
                    <h5 className="widget_title">Categories</h5>
                    <ul className="widget_categories">
                        {this.createMainCategories()}
                    </ul>
                </div>

                <div className="widget">
                    <h5 className="widget_title">Brand</h5>
                    <ul className="list_brand">
                        {this.createCheckBoxes()}
                    </ul>
                </div>

            </div>
        )
    }
}

export default ProductFilter