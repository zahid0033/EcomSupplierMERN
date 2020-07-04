import React,{Component} from "react";
import {Link, NavLink} from "react-router-dom";
import axios from "axios";
import SupplierAuthService from "../../supplierService/supplierAuthService";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import {apiUrl} from "../../../config/config";

class BottomBar extends Component{
    state = {
        category : [],
        toggle : false,
        currentSupplier : undefined,
        isOpen : false
    };

    toggle = () => {
        this.setState({
            isOpen : !this.state.isOpen
        })
    };

    componentDidMount() {
        this.fetchCategory();
        const supplier = SupplierAuthService.getCurrentSupplier();
        this.setState({
            currentSupplier : supplier
        })
    }

    logOut = () => {
        SupplierAuthService.logout();
        window.location.reload();
    };

    handleClick = (e) => {
        e.preventDefault();
        this.setState({toggle : !this.state.toggle});
    };

    categoryUpdate = () => {
        // console.log(this.state.category);
        return this.state.category.map((item,key) => {
            return (
                    <li key={key} className="dropdown dropdown-mega-menu" onClick={(e)=>this.handleClick(e)} >
                        <Link
                            className= {item.subCategories.length ? "dropdown-item nav-link dropdown-toggler" : "dropdown-item nav-link nav_item"}
                            to = {`/mainCategory/${item.id}`}
                        >
                            <i className="flaticon-tv" /><span>{item.name}</span>
                        </Link>
                        {item.subCategories.length ?
                            <div className="dropdown-menu">
                                <ul className="mega-menu d-lg-flex">
                                    <li className="mega-menu-col col-lg-12">
                                        <ul className="d-lg-flex">
                                            <li className="mega-menu-col col-lg-6">
                                                <ul>
                                                    <li className="dropdown-header">Featured Item</li>
                                                    {item.subCategories.map((subCatg,i)=>{
                                                        return (
                                                            <li key={i}
                                                                onClick={(e)=>this.handleClick(e)}
                                                            >
                                                                <Link
                                                                    className="dropdown-item nav-link nav_item"
                                                                    to={`/subCategory/${subCatg.id}`}
                                                                >
                                                                    {subCatg.name}
                                                                </Link>
                                                            </li>
                                                        )
                                                    }) }

                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                            : ''
                        }

                    </li>
                )
        });
    };

    fetchCategory = async () => {
       await axios.get(`${apiUrl}/mainCategory`)
            .then(response => {
                this.setState({
                    category: response.data.output
                })
            }).catch(error => {
            console.log(error)
        })
    };

    render() {
        const {toggle,isOpen} = this.state;
        // console.log(toggle);
        return (
            <>
                <Navbar  light expand="md"  className="bottom_header dark_skin main_menu_uppercase border-top">
                    <div className="container">
                        <NavbarBrand  >
                            <div className="categories_wrap" style={{width:"300px"}}>
                                <button
                                    type="button"
                                    data-toggle="collapse"
                                    data-target="#navCatContent"
                                    aria-expanded="false"
                                    className="categories_btn categories_menu"
                                    onClick={(e)=>this.handleClick(e)}
                                >
                                    <span>All Categories </span>
                                    <i className="linearicons-menu" />
                                </button>
                                {toggle &&
                                <div id="navCatContent" className="navbar">
                                    <ul>
                                        {this.categoryUpdate()}
                                    </ul>
                                </div>
                                }

                            </div>
                        </NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={isOpen} navbar>
                            <Nav className="mr-auto" navbar>
                                <NavItem>
                                    <NavLink
                                        to="/home"
                                        className="nav-link"
                                    >
                                        Home
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        to="/about"
                                        className="nav-link"
                                    >
                                        About Us
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <a
                                        className="dropdown-toggle nav-link"
                                        href="/#"
                                        data-toggle="dropdown"
                                    >
                                        Products
                                    </a>
                                    <div className="dropdown-menu">
                                        <ul className="mega-menu d-lg-flex">
                                            <li className="mega-menu-col col-lg-3">
                                                <ul>
                                                    <li className="dropdown-header">Woman's</li>
                                                    <li>
                                                        <a
                                                            className="dropdown-item nav-link nav_item"
                                                            href="shop-three-columns.html"
                                                        >
                                                            Vestibulum sed
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="dropdown-item nav-link nav_item"
                                                            href="shop-four-columns.html"
                                                        >
                                                            Donec porttitor
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="dropdown-item nav-link nav_item"
                                                            href="shop-grid-view.html"
                                                        >
                                                            Donec vitae facilisis
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="dropdown-item nav-link nav_item"
                                                            href="shop-list-view.html"
                                                        >
                                                            Curabitur tempus
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="dropdown-item nav-link nav_item"
                                                            href="shop-left-sidebar.html"
                                                        >
                                                            Vivamus in tortor
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="mega-menu-col col-lg-3">
                                                <ul>
                                                    <li className="dropdown-header">Men's</li>
                                                    <li>
                                                        <a
                                                            className="dropdown-item nav-link nav_item"
                                                            href="shop-cart.html"
                                                        >
                                                            Donec vitae ante ante
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="dropdown-item nav-link nav_item"
                                                            href="checkout.html"
                                                        >
                                                            Etiam ac rutrum
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="dropdown-item nav-link nav_item"
                                                            href="wishlist.html"
                                                        >
                                                            Quisque condimentum
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="dropdown-item nav-link nav_item"
                                                            href="compare.html"
                                                        >
                                                            Curabitur laoreet
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="dropdown-item nav-link nav_item"
                                                            href="cart-empty.html"
                                                        >
                                                            Vivamus in tortor
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="mega-menu-col col-lg-3">
                                                <ul>
                                                    <li className="dropdown-header">Kid's</li>
                                                    <li>
                                                        <a
                                                            className="dropdown-item nav-link nav_item"
                                                            href="shop-product-detail.html"
                                                        >
                                                            Donec vitae facilisis
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="dropdown-item nav-link nav_item"
                                                            href="shop-product-detail-left-sidebar.html"
                                                        >
                                                            Quisque condimentum
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="dropdown-item nav-link nav_item"
                                                            href="shop-product-detail-right-sidebar.html"
                                                        >
                                                            Etiam ac rutrum
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="dropdown-item nav-link nav_item"
                                                            href="shop-product-detail-thumbnails-left.html"
                                                        >
                                                            Donec vitae ante ante
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="dropdown-item nav-link nav_item"
                                                            href="shop-product-detail-accordion-style.html"
                                                        >
                                                            Donec porttitor
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="mega-menu-col col-lg-3">
                                                <ul>
                                                    <li className="dropdown-header">Accessories</li>
                                                    <li>
                                                        <a
                                                            className="dropdown-item nav-link nav_item"
                                                            href="shop-product-detail.html"
                                                        >
                                                            Curabitur tempus
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="dropdown-item nav-link nav_item"
                                                            href="shop-product-detail-left-sidebar.html"
                                                        >
                                                            Quisque condimentum
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="dropdown-item nav-link nav_item"
                                                            href="shop-product-detail-right-sidebar.html"
                                                        >
                                                            Vivamus in tortor
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="dropdown-item nav-link nav_item"
                                                            href="shop-product-detail-thumbnails-left.html"
                                                        >
                                                            Donec vitae facilisis
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="dropdown-item nav-link nav_item"
                                                            href="shop-product-detail-accordion-style.html"
                                                        >
                                                            Donec porttitor
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                        <div className="d-lg-flex menu_banners">
                                            <div className="col-lg-6">
                                                <div className="header-banner">
                                                    <div className="sale-banner">
                                                        <a className="hover_effect1" href="/#">
                                                            <img
                                                                src="assets/images/shop_banner_img7.jpg"
                                                                alt="shop_banner_img7"
                                                            />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="header-banner">
                                                    <div className="sale-banner">
                                                        <a className="hover_effect1" href="/#">
                                                            <img
                                                                src="assets/images/shop_banner_img8.jpg"
                                                                alt="shop_banner_img8"
                                                            />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </NavItem>
                                <NavItem>
                                    <a className="nav-link nav_item" href="/#">
                                        Contact Us
                                    </a>
                                </NavItem>
                                {this.state.currentSupplier ? (
                                    <>
                                        <UncontrolledDropdown nav inNavbar>
                                            <DropdownToggle nav caret>
                                                {this.state.currentSupplier.name}
                                            </DropdownToggle>
                                            <DropdownMenu right>
                                                <DropdownItem>
                                                    <Link
                                                        className="dropdown-item nav-link nav_item"
                                                        to={"/supplier/profile"}
                                                    >
                                                        Profile
                                                    </Link>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <Link
                                                        className="dropdown-item nav-link nav_item"
                                                        to={"/supplier/employee"}
                                                    >
                                                        Employees
                                                    </Link>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <Link
                                                        className="dropdown-item nav-link nav_item"
                                                        to={"/supplier/product"}
                                                    >
                                                        Products
                                                    </Link>
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                        <NavItem  onClick={this.logOut}>
                                            <Link className="nav-link nav_item" to="/supplier/signup">
                                                Logout
                                            </Link>
                                        </NavItem>
                                    </>

                                ) : (
                                    <>
                                        <NavItem>
                                            <NavLink
                                                to="/supplier/signin"
                                                className="nav-link nav_item"
                                            >
                                                Sign In
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                to="/supplier/signup"
                                                className="nav-link nav_item"
                                            >
                                                Sign Up
                                            </NavLink>
                                        </NavItem>
                                    </>
                                )}

                            </Nav>
                        </Collapse>
                    </div>

                </Navbar>
            </>

        )
    }


}

export default BottomBar