import React from "react";
import PropTypes from "prop-types";

export default class BodyModification extends React.Component {
    static propTypes = {
        isWhite: PropTypes.bool,
        children: PropTypes.object
    }
    static defaultProps = {
        isWhite: false
    }
    componentDidMount() {
        document.body.classList.toggle("white-bg", this.props.isWhite);
    }
    componentWillReceiveProps(nextProps) {
        document.body.classList.toggle("white-bg", nextProps.isWhite);
    }
    componentWillUnmount() {
        document.body.classList.remove("white-bg");
    }
    render() {
        return this.props.children;
    }
}
