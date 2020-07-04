import React,{Component} from "react";
import ProductFilter from "../../widgets/Filter/filter";
import ProductTemplate from "../../widgets/Product/productTemplate";
import noDataImg from "../../assets/images/noDataFound.gif"

class ProductComponent extends Component {
    state = {
        status : [
            {value: "Platinum", isChecked: false},
            {value: "Gold", isChecked: false},
            {value: "Silver", isChecked: false},
            {value: "Verified", isChecked: false},
        ],
        supplierStatus : [],
        products: [],
        filterArray : []
    };

    permanentProducts = [];


    componentWillReceiveProps(nextProps) {
        // console.log('componentWillReceiveProps', nextProps.data);

        if (nextProps.data.length !== this.props.data.length){
            this.state.filterArray.splice(0,this.state.filterArray.length);
            // this.setState({
            //     status : [
            //         {value: "Platinum", isChecked: false},
            //         {value: "Gold", isChecked: false},
            //         {value: "Silver", isChecked: false},
            //         {value: "Verified", isChecked: false},
            //     ]
            // })
        }
        // console.log(this.state.filterArray);
    }

    handleCheckedStatus = (e) => {
        let status = this.state.status;
        status.forEach(item => {
            if (item.value === e.target.value)
                item.isChecked =  e.target.checked
        });
        this.setState({status: status});

        const currentIndex = this.state.supplierStatus.indexOf(e.target.value);
        if (e.target.checked){
            if (currentIndex === -1){
                this.state.supplierStatus.push(e.target.value)
            }
        }else{
            this.state.supplierStatus.splice(currentIndex,1);
        }

        this.filterData();
    };

    filterData = async () => {

        this.state.filterArray.splice(0,this.state.filterArray.length);

        await this.props.data.map((item,key)=>{
            if (this.state.supplierStatus.indexOf(item.supplier.status) !== -1){
                this.state.filterArray.push(item);
            }
        });
        this.setState({
            products : [...this.state.filterArray]
        });


    };

    loadProducts = () => {

        (this.props.data.length > 0 && this.permanentProducts.length !== this.props.data.length && this.state.filterArray.length === 0) ? this.changeStateData() : this.permanentProducts = [];

        if (this.state.products.length === 0 ){
            return (
                <div>
                    <h3>No Product Found</h3>
                    <img width="300px" src={noDataImg} alt="" />
                </div>
            )
        }

        return this.state.products.map((item,key) => {
            return (
                <ProductTemplate product={item} key={key}/>
            )
        })
    };

    changeStateData = () => {
        this.setState({
            products : [...this.props.data]
        });
        this.permanentProducts=[...this.props.data];

    };

    render() {
        console.log("product",this.props.data);

        return (
            <div className="main_content">
                <div className="section">
                    <div className="row">
                        <div className="col-lg-9">
                            <div className="row shop_container list">
                                {this.loadProducts()}
                            </div>
                        </div>
                        <div className="col-lg-3 order-lg-first mt-4 pt-2 mt-lg-0 pt-lg-0">
                            <ProductFilter handleCheckedStatus={this.handleCheckedStatus} status={this.state.status} product={this.props.data}/>
                        </div>
                    </div>
                </div>
            </div>

        );
    }



}

export default ProductComponent;