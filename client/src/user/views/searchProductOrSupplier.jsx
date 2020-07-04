import React,{Component} from "react";
import axios from 'axios';
import {apiUrl} from "../../config/config";
import ProductComponent from "../components/product/product";
import SearchSupplierList from "../components/Supplier/searchSupplierList";
import Breadcrumbs from "../widgets/Breadcrumbs/breadcrumbs";

class SearchProductOrSupplier extends Component{
    state = {
        searchText : "",
        searchType : "",
        products : [],
        suppliers : []
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
            await axios.get(`${apiUrl}/product`)
                .then(res => {
                    let results = res.data.output.filter(item => item.name.toLowerCase().includes(searchText));
                    this.setState({
                        products : results
                    })
                })
                .catch(error => {
                    alert (error)
                })
        }else{
            await axios.get(`${apiUrl}/supplier/searchSupplier/${this.state.searchText}`)
                .then(res => {
                    this.setState({
                        suppliers : res.data.output
                    })
                })
                .catch(error => {
                    alert (error)
                })
        }

    };


    render() {
        return (
            <div>
                <Breadcrumbs title="Search"/>
                <div className="container">
                    {this.state.searchType === 'product' ? <ProductComponent data={this.state.products}/> :  <SearchSupplierList suppliers={this.state.suppliers}/>}
                    {/*{this.state.searchType === 'supplier' ? <SearchSupplierList suppliers={this.state.suppliers}/> : ''}*/}

                </div>
            </div>
        );
    }
}

export default SearchProductOrSupplier