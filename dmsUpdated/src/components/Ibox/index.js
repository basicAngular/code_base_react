import React from "react";
import PropTypes from "prop-types";
import IBoxTools from "./components/IboxTools";
import renderIf from "../Common/RenderIf";

class Ibox extends React.Component {
    static propTypes = {
        hasTools: PropTypes.bool,
        title: PropTypes.node.isRequired,
        content: PropTypes.node.isRequired,
    }

    static defaultProps = {
        hasTools: false
    }

    constructor(props) {
        super(props);
        this.content = this.props.children || this.props.content;
        this.content = Array.isArray(this.content) ? this.content : [this.content];
    }

    renderContent(content, index) {
        return <div key={index} className="ibox-content">
            {content}
        </div>;
    }

    render() {
        return (
            <div className="ibox">
                <div className="ibox-title">
                    {this.props.title}
                    {renderIf(this.props.hasTools, <IBoxTools actions={this.props.dropdownActions} />)}
                </div>
                {this.content.map(this.renderContent)}
            </div>
        );
    }
}

export default Ibox;
