import React from "react";
import PropTypes from "prop-types";
import { Row } from "react-bootstrap";
import { observer, inject } from "mobx-react";
import ListItemFolder from "./listitemFolders";
import ListItemDoc from "./listitemDoc";
import ListHeader from "./listHeader";

@inject("documentStore","uploadStore","fileStore")
@observer
class List extends React.Component {
  static propTypes = {
    files: PropTypes.array,
    openFolder: PropTypes.func,
    openModal: PropTypes.func,
    documentStore: PropTypes.object,
    uploadStore: PropTypes.object,
    fileStore: PropTypes.object,
    emptyFolders: PropTypes.array
  }
  state = {
    showInfo: false,
  }
  setShowInfo(showInfo) {
    this.setState({showInfo: !showInfo});
  }
  render() {
    const { showInfo } = this.state;
    const { files, openFolder, openModal, documentStore, uploadStore, fileStore, emptyFolders } = this.props;
    return (
      <Row>
        <div className="list-view">
          <ListHeader showInfo={showInfo}/>
          {files.map((item, index) => {
            if (item.fileType === "document") {
              return (
                <ListItemDoc 
                  key={index} 
                  item={item} 
                  onClick={openModal.bind(this, item)}
                  setShowInfo={this.setShowInfo.bind(this)}
                />
              );
            } else {
              return (
                <ListItemFolder 
                  key={index} 
                  item={item}
                  onClick={openFolder.bind(this, item)} 
                  documentStore={documentStore}
                  emptyFolders={emptyFolders}
                  uploadStore={uploadStore} 
                  fileStore={fileStore}
                />
              );
            }
          })}
        </div>
      </Row>
    );
  }
}

export default List;