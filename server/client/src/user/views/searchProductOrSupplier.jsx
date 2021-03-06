import React,{Component} from "react";
import axios from 'axios';

import ProductComponent from "../components/product/product";
import SearchSupplierList from "../components/Supplier/searchSupplierList";
import Breadcrumbs from "../widgets/Breadcrumbs/breadcrumbs";

class SearchProductOrSupplier extends Component{
    state = {
        searchText : "",
        searchType : "",
        products : [],
        suppliers : [],
        filteredProducts : [],
        filteredSupplier : []
    };

    componentDidMount() {
        this.handleSearch();
    }

    componentDidUpdate(prevProps) {
        let prevSearchText = prevProps.location.state.searchText;
        let prevSearchType = prevProps.location.state.searchType;
        let newSearchText = this.props.location.state.searchText;
        let newSearchType = this.props.location.state.searchType;
        if (prevSearchText !== newSearchText  || prevSearchType !== newSearchType) {
            this.handleSearch();
        }
    }

    handleSearch = async () => {
        let searchText = this.props.location.state.searchText.toLowerCase();
        let searchType = this.props.location.state.searchType.toLowerCase();
        await this.setState({
            searchText : searchText,
            searchType : searchType
        });
        if(this.state.searchType === 'product'){
            await axios.get(`/api/product`)
                .then(res => {
                    let results = res.data.output.filter(item => item.name.toLowerCase().includes(searchText));
                    this.setState({
                        products : results
                    })
                })
                .catch(error => {
                    alert (error)
                });

            let filteredProducts = this.state.products.filter(product => {
                return product.supplier.status !== "Non-Verified"
            });
            this.setState({
                filteredProducts : filteredProducts
            });

        }else{
            await axios.get(`/api/supplier/searchSupplier/${this.state.searchText}`)
                .then(res => {
                    this.setState({
                        suppliers : res.data.output
                    })
                })
                .catch(error => {
                    alert (error)
                });

            let filteredSupplier = this.state.suppliers.filter(supplier => {
                return supplier.status !== "Non-Verified"
            });
            this.setState({
                filteredSupplier : filteredSupplier
            });
        }

    };


    render() {
        return (
            <div>
                <Breadcrumbs title="Search"/>
                <div className="container">
                    {this.state.searchType === 'product' ? <ProductComponent data={this.state.filteredProducts}/> :  <SearchSupplierList suppliers={this.state.filteredSupplier}/>}
                    {/*{this.state.searchType === 'supplier' ? <SearchSupplierList suppliers={this.state.suppliers}/> : ''}*/}

                </div>
            </div>
        );
    }
}

export default SearchProductOrSupplier