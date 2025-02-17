import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import axios from 'axios'
import SupplierAuthService from '../../supplierService/supplierAuthService'
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
  DropdownItem,
} from 'reactstrap'
import { apiUrl } from '../../../config/config'

class BottomBar extends Component {
  state = {
    category: [],
    toggle: false,
    currentSupplier: undefined,
    isOpen: false,
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  componentDidMount() {
    this.fetchCategory()
    const supplier = SupplierAuthService.getCurrentSupplier()
    this.setState({
      currentSupplier: supplier,
    })
  }

  logOut = () => {
    SupplierAuthService.logout()
    window.location.reload()
  }

  handleClick = (e) => {
    e.preventDefault()
    this.setState({ toggle: !this.state.toggle })
  }

  categoryUpdate = () => {
    // console.log(this.state.category);
    return this.state.category.map((item, key) => {
      return (
        <li
          key={key}
          className='dropdown dropdown-mega-menu'
          onClick={(e) => this.handleClick(e)}
        >
          <Link
            className={
              item.subCategories.length
                ? 'dropdown-item nav-links dropdown-toggler'
                : 'dropdown-item nav-links nav_item'
            }
            to={`/mainCategory/${item.id}`}
          >
            <i className={item.icon.length < 1 ? 'flaticon-tv' : item.icon} />
            <span>{item.name}</span>
          </Link>
          {item.subCategories.length ? (
            <div className='dropdown-menu'>
              <ul className='mega-menu d-lg-flex'>
                <li className='mega-menu-col col-lg-12'>
                  <ul className='d-lg-flex'>
                    <li className='mega-menu-col col-lg-6'>
                      <ul>
                        <li className='dropdown-header'>Featured Item</li>
                        {item.subCategories.map((subCatg, i) => {
                          return (
                            <li key={i} onClick={(e) => this.handleClick(e)}>
                              <Link
                                className='dropdown-item nav-links nav_item'
                                to={`/subCategory/${subCatg.id}`}
                              >
                                {subCatg.name}
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          ) : (
            ''
          )}
        </li>
      )
    })
  }

  fetchCategory = async () => {
    await axios
      .get(`/api/mainCategory`)
      .then((response) => {
        this.setState({
          category: response.data.output,
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    const { toggle, isOpen } = this.state
    // console.log(toggle);
    return (
      <>
        <Navbar
          light
          expand='md'
          className='bottom_header dark_skin main_menu_uppercase border-top'
        >
          <div className='container'>
            <NavbarBrand>
              <div className='categories_wrap' style={{ width: '300px' }}>
                <button
                  type='button'
                  data-toggle='collapse'
                  data-target='#navCatContent'
                  aria-expanded='false'
                  className='categories_btn categories_menu'
                  onClick={(e) => this.handleClick(e)}
                >
                  <span>All Categories </span>
                  <i className='linearicons-menu' />
                </button>
                {toggle && (
                  <div id='navCatContent' className='navbar'>
                    <ul>{this.categoryUpdate()}</ul>
                  </div>
                )}
              </div>
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className='mr-auto' navbar>
                <NavItem>
                  <NavLink to='/home' className='nav-links'>
                    Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to='/about' className='nav-links'>
                    About Us
                  </NavLink>
                </NavItem>
                {this.state.currentSupplier ? (
                  <>
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret className='nav-links'>
                        {this.state.currentSupplier.name}
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem>
                          <Link
                            className='dropdown-item nav-links nav_item'
                            to={'/supplier/profile'}
                          >
                            Profile
                          </Link>
                        </DropdownItem>
                        <DropdownItem>
                          <Link
                            className='dropdown-item nav-links nav_item'
                            to={'/supplier/employee'}
                          >
                            Employees
                          </Link>
                        </DropdownItem>
                        <DropdownItem>
                          <Link
                            className='dropdown-item nav-links nav_item'
                            to={'/supplier/product'}
                          >
                            Products
                          </Link>
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                    <NavItem onClick={this.logOut}>
                      <Link
                        className='nav-links nav_item'
                        to='/supplier/signup'
                      >
                        Logout
                      </Link>
                    </NavItem>
                  </>
                ) : (
                  <>
                    <NavItem>
                      <NavLink
                        to='/supplier/signin'
                        className='nav-links nav_item'
                      >
                        Sign In
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        to='/supplier/signup'
                        className='nav-links nav_item'
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
