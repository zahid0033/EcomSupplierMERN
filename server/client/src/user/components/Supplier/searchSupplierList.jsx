import React,{Component} from "react";
import SupplierTemplate from "../../widgets/SupplierSearch/supplierTemplate";
import noDataImg from "../../assets/images/noDataFound.gif"

class SearchSupplierList extends Component{

    loadSuppliers = () => {
        if(this.props.suppliers.length === 0){
            return (
                <div className="text-center">
                    <h1>No Supplier Found</h1>
                    <img width="300px" src={noDataImg} alt=""/>
                </div>
            )
        }
        else{
            return this.props.suppliers.map((supplier,key) => {
                return <SupplierTemplate supplier={supplier} key={key}/>
            })
        }

    };

    render() {
        return (
            <div className="main_content">
                <div className="section">
                    {this.loadSuppliers()}
                </div>
            </div>
        );
    }
}

export default SearchSupplierList