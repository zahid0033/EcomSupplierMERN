import React,{Component} from "react";
import axios from 'axios';
import ProductComponent from "../components/product/product";
import Breadcrumbs from "../widgets/Breadcrumbs/breadcrumbs";
import {apiUrl} from "../../config/config";

class SubCategoryProductsShow extends Component {
    // console.log(props.match.params);
    state = {
        products: [],
        filteredProducts : []
    };

    componentWillMount() {
        this.fetchProduct(this.props.match.params.categoryId);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.match.params.categoryId !== nextProps.match.params.categoryId){
            this.fetchProduct(nextProps.match.params.categoryId);
        }
    }

    fetchProduct = async (id) => {
        await axios.get(`${apiUrl}/product/subCategoryProducts/get?categoryId=${id}`)
            .then(response => {
                this.setState({
                    products: response.data.output
                });
            }).catch(error => {
                alert(error)
            });
        let filteredProducts = this.state.products.filter(product => {
            return product.supplier.status !== "Non-Verified"
        });
        this.setState({
            filteredProducts : filteredProducts
        });

    };

    render() {
        console.log(this.state.products);
        return (
            <div>
                <Breadcrumbs title="Sub Category Products"/>
                <div className="container">
                    <ProductComponent data={this.state.products}/>
                </div>
            </div>
        )
    }

}

export default SubCategoryProductsShow