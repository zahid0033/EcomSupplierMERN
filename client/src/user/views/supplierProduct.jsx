import React,{Component} from "react";
import SupplierAuthService from "../supplierService/supplierAuthService";
import axios from 'axios';
import {apiUrl, frontendUrl} from "../../config/config";
import Breadcrumbs from "../widgets/Breadcrumbs/breadcrumbs";
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import SupplierAddOrEditProduct from "../components/Supplier/supplierAddOrEditProduct";
//sweetalert2
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import {Link} from "react-router-dom";
import parse from "html-react-parser";


class SupplierProduct extends Component{

    state = {
        currentSupplier : undefined,
        products: [],
        showAddModal : false,
        showEditModal : false,
        singleProduct : null
    };

    componentDidMount = async () => {
        const supplier = SupplierAuthService.getCurrentSupplier();
        if (supplier !== null && supplier.accessToken){
            await this.setState({
                currentSupplier : supplier
            });
            this.fetchProducts(this.state.currentSupplier.id);
        }else{
            this.props.history.push("/supplier/signin");
        }
    };

    fetchProducts = async (id) => {
        await axios.get(`${apiUrl}/supplier/get/${id}`)
            .then(res => {
                this.setState({
                    products : res.data.output[0].products
                })
            })
    };

    getSingleProduct = async (id) => {
       await axios.get(`${apiUrl}/product/get/${id}`)
            .then(res => {
                if (res.data.success){
                    console.log(res.data)
                    this.setState({
                        singleProduct : res.data.output,
                        showEditModal : true
                    })

                }else{
                    alert("error occurred");
                }
            })
    };

    toggleModal = () => {
        this.setState({
            showAddModal : false,
            showEditModal : false
        });
        this.fetchProducts(this.state.currentSupplier.id);
    };

    onDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this imaginary file!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                this.sendDelete(id)
                // For more information about handling dismissals please visit
                // https://sweetalert2.github.io/#handling-dismissals
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                )
            }
        })
    };

    sendDelete = (id) =>{
        axios.delete(`${apiUrl}/product/delete/${id}`)
            .then(response => {
                if (response.data.success) {
                    Swal.fire(
                        'Deleted!',
                        'Your employee has been deleted.',
                        'success'
                    );
                    this.fetchProducts(this.state.currentSupplier.id);
                }
            })
            .catch(error => {
                alert(error)
            })
    };

    renderProducts = () => {
      return this.state.products.map((product,key) => {
          let description  = parse(product.description);

          const imagePath = JSON.parse(product.images);
          const splitPath = imagePath[0].split("\\");
          const path = splitPath[splitPath.length - 1];

          return (
              <div className="col-md-6 col-6" key={key}>
                  <div className="product p-3">
                      <div className="row">
                          <div className="col-md-5">
                              <div className="product_img">
                                  <Link
                                      // href="shop-product-detail.html"
                                      to={`/productDetails/${product.id}`}
                                  >
                                      <img
                                          src={`${frontendUrl}/images/products/${path}`} alt={product.name} style={{width: "100%",height: "170px"}}
                                      />
                                  </Link>
                              </div>
                          </div>
                          <div className="col-md-5">
                              <div className="product_info">
                                  <h6 className="product_title">
                                      <Link to={`/productDetails/${product.id}`}>{product.name}</Link>
                                  </h6>
                                  <div className="product_price">
                                      <span className="price">৳ {product.price}</span>

                                  </div>
                                  <div className="rating_wrap">
                                      {/*<span className="rating_num">*/}

                                  </div>
                                  <div className="pr_desc">
                                      { description.length > 60 ? description.substring(0,60) + " ......" : description}
                                  </div>
                                  <div className="product_sort_info">
                                      <ul>
                                          <li>
                                              <i className="linearicons-tag" /> {product.model}
                                          </li>
                                      </ul>
                                  </div>

                                  <div className="list_product_action_box">
                                      <ul className="list_none ">
                                          <li className="add-to-cart">
                                              <Link to={`/productDetails/${product.id}`}>
                                                  <i className="icon-magnifier-add" /> Details
                                              </Link>
                                          </li>
                                      </ul>
                                  </div>
                              </div>
                          </div>
                          <div className="col-md-2">
                              <ul className="action-list">
                                  <li><span className="badge badge-primary" onClick={() => this.getSingleProduct(product.id)}> <i className="linearicons-pencil"></i> </span></li>
                                  <li><span className="badge badge-danger" onClick={()=> this.onDelete(product.id)}><i className="linearicons-trash"></i></span></li>
                              </ul>
                          </div>
                      </div>
                  </div>

              </div>
          )
      })
    };

    render() {
        if (this.state.currentSupplier === undefined){
            return (
                <>
                    {/*<span className="btn btn-fill-out btn-addtocart mb-5" onClick={()=>this.setState({showAddModal : true})}>Add Product</span>*/}
                    <h1>No Products Found</h1>

                </>

            )
        }else{
            return (
                <>
                    <Breadcrumbs title="Products"/>
                    <div className="main_content">
                        <div className="section">
                            <div className="container">
                                <span className="btn btn-fill-out btn-addtocart mb-5" onClick={()=>this.setState({showAddModal : true})}>Add Product</span>
                                <div className="row">
                                    {this.renderProducts()}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Modal isOpen={this.state.showAddModal} toggle={this.toggleModal} >
                        <ModalHeader toggle={this.toggleModal}>Product Add</ModalHeader>
                        <ModalBody>
                            <SupplierAddOrEditProduct
                                edit={false}
                                singleData = {null}
                                supplierId = {this.state.currentSupplier.id}
                                onSave = { ()=>this.toggleModal() }
                            />
                        </ModalBody>
                    </Modal>
                    <Modal isOpen={this.state.showEditModal} toggle={this.toggleModal} >
                        <ModalHeader toggle={this.toggleModal}>Product Edit</ModalHeader>
                        <ModalBody>
                            <SupplierAddOrEditProduct
                                edit={true}
                                singleData = {this.state.singleProduct}
                                supplierId = {this.state.currentSupplier.id}
                                onSave = { ()=>this.toggleModal() }
                            />
                        </ModalBody>
                    </Modal>
                </>
            );
        }

    }
}

export default SupplierProduct