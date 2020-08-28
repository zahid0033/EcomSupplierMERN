import React,{Component} from "react";

class MiddleBar extends Component{
    state = {
        searchType : "",
        searchText : "product"
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    };

    handleSearchSubmit = (e) => {
        e.preventDefault();
        if (this.state.searchText) {
            this.props.history.push({
                pathname: "/search",
                state: {
                    searchType: this.state.searchType,
                    searchText: this.state.searchText
                }
            });
        } else {
            alert("Please enter some search text!");
        }
    };

    render() {
        console.log(this.state.searchText,this.state.searchType);
        return (
            <div className="middle-header dark_skin">
                <div className="container">
                    <div className="nav_block">
                        <a className="navbar-brand" href="index.html">
                            <img
                                className="logo_light"
                                src="assets/images/logo_light.png"
                                alt="logo"
                            />
                            <img
                                className="logo_dark"
                                src="assets/images/logo_dark.png"
                                alt="logo"
                            />
                        </a>
                        <div className="contact_phone order-md-last">
                            <i className="linearicons-phone-wave" />
                            <span>123-456-7689</span>
                        </div>
                        <div className="product_search_form">
                            <div>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <div className="custom_select">
                                            <select className="first_null" name='searchType' onChange={this.handleChange}>
                                                <option value="Product">Choose</option>
                                                <option value="Supplier">Supplier</option>
                                                <option value="Product">Product</option>
                                            </select>
                                        </div>
                                    </div>
                                    <input
                                        className="form-control"
                                        placeholder="Search Product (Example : pen)"
                                        required
                                        type="text"
                                        name="searchText"
                                        onChange={this.handleChange}
                                    />
                                    <button type="submit" className="search_btn" onClick={(event) => this.handleSearchSubmit(event)}>
                                        <i className="linearicons-magnifier" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default MiddleBar