import React,{Component} from "react";
import axios from "axios";
import {apiUrl} from "../../config/config";

class EmailVerify extends Component{

    state = {
        message : null
    };

    async componentDidMount() {
        await axios.get(`${apiUrl}/supplier/verifyEmail/${this.props.match.params.token}`)
            .then(res => {
                if (res.data.success){
                    this.setState({
                        message : res.data.message
                    });
                }
                else if (res.data.success === false){
                    this.setState({
                        message : res.data.message,
                    })
                }
            })
            .catch(error => {
                this.setState({
                    message : error.response.data.message,
                    tokenStatus : false
                })
            })
    }

    render() {
        return (
            <>
                <div className="container">
                    <p className="alert alert-primary">{this.state.message}</p>
                </div>
            </>
        );
    }
}

export default EmailVerify