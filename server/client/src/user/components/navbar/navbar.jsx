import React,{Component} from "react";

import TopBar from "../../widgets/Navbar/topbar";
import MiddleBar from "../../widgets/Navbar/middlebar";
import BottomBar from "../../widgets/Navbar/bottombar";

class Navbar extends Component {

    render() {
        return (
            <header className="header_wrap">
                <TopBar/>
                <MiddleBar {...this.props}/>
                <BottomBar/>
            </header>
        )
    }
};
export default Navbar;