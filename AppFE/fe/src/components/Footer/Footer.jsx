import React, {Component} from "react";
import "./Footer.css"


class Footer extends Component {
    constructor(props){
        super(props);
        this.state= {

        }
    }

    render() {
        return (
            <footer>
                <div className="child-wapper">
                    <div className="footer-content"></div>
                </div>
            </footer>
        );
    }
}

export default Footer;