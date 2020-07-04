import React,{Component} from "react";
import axios from 'axios';
import ProductComponent from "../components/product/product";
import Breadcrumbs from "../widgets/Breadcrumbs/breadcrumbs";
import {apiUrl} from "../../config/config";

class CategoryProductsShow extends Component {
    // console.log(props.match.params);
    state = {
        products: [],
    };


    componentDidMount() {
        this.fetchProduct(this.props.match.params.categoryId);
    }

    componentWillReceiveProps(nextProps) {
        console.log("component will receive",this.props.match.params.categoryId + nextProps.match.params.categoryId);
        if(this.props.match.params.categoryId !== nextProps.match.params.categoryId){
            this.fetchProduct(nextProps.match.params.categoryId);
        }
    }

    // componentDidUpdate(prevProps) {
    //     console.log("component did update",this.props.match.params.categoryId + prevProps.match.params.categoryId );
    //     if(this.props.match.params.categoryId !== prevProps.match.params.categoryId){
    //         this.fetchProduct(prevProps.match.params.categoryId);
    //     }
    // }

    fetchProduct = async (id) => {

        await axios.get(`${apiUrl}/product/mainCategoryProducts/get?categoryId=${id}`)
            .then(response => {
                console.log(response.data.output);
                this.setState({
                    products: response.data.output
                });

            }).catch(error => {

            })
    };

    render() {
        // console.log(this.state.products);
            return (
                <div>
                    <Breadcrumbs title="Products"/>
                    <div className="container">
                        <ProductComponent data={this.state.products}/>
                    </div>
                </div>
            )
        }





}

export default CategoryProductsShow