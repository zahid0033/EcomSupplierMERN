import React,{Component} from "react";
import axios from 'axios';
import ProductComponent from "../components/product/product";
import Breadcrumbs from "../widgets/Breadcrumbs/breadcrumbs";


class CategoryProductsShow extends Component {
    // console.log(props.match.params);
    state = {
        products: [],
        filteredProducts : []
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

        await axios.get(`/api/product/mainCategoryProducts/get?categoryId=${id}`)
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
        return (
            <div>
                <Breadcrumbs title="Products"/>
                <div className="container">
                    <ProductComponent data={this.state.filteredProducts}/>
                </div>
            </div>
        )
    }
}

export default CategoryProductsShow