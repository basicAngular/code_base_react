import React from "react";
import PropTypes from "prop-types";

export default class PDFViewer extends React.Component {
  static propTypes = {
    doc: PropTypes.array
  }
  render() {
    const { doc } = this.props; 
    const url = "http://34.211.31.84:9066";
    const path = `${url}${doc.path}`;
    return (
      <iframe
        style={{ width: "100%", height: "500px" }}
        className="embed-responsive-item"
        src={path}
      />
    );
  }
}
