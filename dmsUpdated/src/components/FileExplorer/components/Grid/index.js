import React from "react";
import PropTypes from "prop-types";
import { Row,Col } from "react-bootstrap";
import { observer,inject } from "mobx-react";
import GridItemDoc from "./griditemDoc";
import GridItemFolder from "./griditemFolder";
import "./style.scss";

@inject("documentStore","uploadStore", "fileStore")
@observer
class Grid extends React.Component {

  static propTypes = {
    mode: PropTypes.string,
    files: PropTypes.array,
    openModal: PropTypes.func,
    fileStore: PropTypes.object,
    openFolder: PropTypes.func,
    uploadStore: PropTypes.object,
    emptyFolders: PropTypes.array,
    setDropStatus: PropTypes.func,
    documentStore: PropTypes.object,
    openModifyModal: PropTypes.func
  }

  state = {
    folders: [],
    documents: [],
    showDocuments: false,
  }

  render() {
    const {
      mode,
      files,
      openModal, 
      fileStore,
      openFolder,
      uploadStore,
      emptyFolders,
      setDropStatus,
      documentStore,
      openModifyModal
    } = this.props;
    return (
      <Row>
        <div>
          <Col lg={12} className="grid-view">
            {files.map((item, index) => {
              let folderComponent;
              if(item.mime_type !== "application/pdf") {
                folderComponent = (
                    <GridItemFolder
                      key={index}
                      item={item}
                      onClick={openFolder.bind(this, item)}
                      setDropStatus={dropStatus => setDropStatus(dropStatus)}
                      documentStore={documentStore}
                      emptyFolders={emptyFolders}
                      uploadStore={uploadStore}
                      fileStore={fileStore}
                    />
                );
              } else {
                folderComponent = (<div key={index}></div>);
              }
              return folderComponent;
            })}
            </Col>
            <Col lg={12} className="grid-view">
              {files.map((item, index) => {
                let documentComponent;
                if(item.fileType === "document") {
                  documentComponent = (
                    <GridItemDoc 
                      key={index}
                      item={item}
                      mode={mode}
                      onClick={openModal.bind(this, item)}
                      openModifyModal={openModifyModal}
                      documentStore={documentStore}
                    />
                  )
                } else {
                  documentComponent = (<div key={index}></div>);
                }
                return documentComponent;
              })}
            </Col>
          </div>
      </Row>
    );
  }
}

export default Grid;
