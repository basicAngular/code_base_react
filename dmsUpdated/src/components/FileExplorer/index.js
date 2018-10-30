import React from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";
import { Row, Col } from "react-bootstrap";
import { DropTarget } from "react-dnd";
import classNames from "classnames";
import PDFModal from "./components/PDFModal";
import Grid from "./components/Grid";
import List from "./components/List";
import BreadCrumb from "./components/BreadCrumb";
import FileModifyModal from "./components/FileModifyModal";
import EmptyFolderErr from "./components/EmptyFolderErr";
import LoadingSpinner from "./../LoadingSpinner";

import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";

const folderTarget = {
  drop: function (props, monitor, component) {
    const {activeFolder, breadcrumbs, getByFolder} = props;
    const {files} = monitor.getItem();
    const hasDroppedOnChild = monitor.didDrop();
    const filesFromStorage = JSON.parse(localStorage.getItem("files"));
    const folder = Object.values(breadcrumbs).find(folder => folder.name === activeFolder);

		if (hasDroppedOnChild) {
			return
    }

    files.map(file => {
      let data = file;
      data.folderId = folder.id;
      data = Object.assign(data,file);

      props.documentStore.update(data).then(() => {
        props.uploadStore.files.delete(data.uploadId);
        props.fileStore.reload();
      });

      component.setState({
        hasDropped: true,
        hasDroppedOnChild,
      }, () => {
        let index = filesFromStorage.findIndex(file => file.id === data.id);
        if (index > -1) {
          filesFromStorage.splice(index, 1);
          localStorage.setItem("files", JSON.stringify(filesFromStorage));
        }
      });
      return null;
    });
    
    setTimeout(() => {
      getByFolder(folder);
    }, 1000);
  }
};

function collect(connect, monitor) {
  return {
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
  };
};

@DropTarget("file", folderTarget, collect)
@inject("uploadStore")
@observer
class FileExplorer extends React.Component {
  
  static propTypes = {
    mode: PropTypes.string,
    files: PropTypes.array,
    sortBy: PropTypes.func,
    authors: PropTypes.array,
    display: PropTypes.string,
    canDrop: PropTypes.bool,
    showMenu: PropTypes.bool,
    getFiles: PropTypes.func,
    getByDate: PropTypes.func,
    isLoading: PropTypes.bool,
    activeType: PropTypes.string,
    toggleMenu: PropTypes.func,
    getByFolder: PropTypes.func,
    uploadStore: PropTypes.object,
    breadcrumbs: PropTypes.object,
    activeFolder: PropTypes.string,
    emptyFolders: PropTypes.array,
    toggleGroupBy: PropTypes.func,
    activeFilters: PropTypes.array,
    quickFilterBy: PropTypes.func,
    isOverCurrent: PropTypes.bool,
    getByBreadCrumb: PropTypes.func,
    connectDropTarget: PropTypes.func,
    isUpdate: PropTypes.bool
  }

  state = {
    document: [],
    showModal: false,
    hasDropped: false,
    showModifyModal: false,
    hasDroppedOnChild: false,
  }

  openModal = document => {
    this.setState({ ...this.state, showModal: true, document });
  }

  closeModal = () => {
    this.setState({ ...this.state, showModal: false });
  }

  closeModifyModal = () => {
    this.setState({ showModifyModal: false });
  }

  modifyFile = doc => {
    this.setState({
      document: doc,
      showModifyModal: true
    });
  }

  updateFile = file => {
    const {uploadStore} = this.props;
    uploadStore.update(file);
  }

  render() {
    const {
      mode,
      files,
      sortBy,
      authors,
      display,
      canDrop,
      showMenu,
      getFiles,
      getByDate,
      isLoading,
      activeType,
      toggleMenu,
      getByFolder,
      breadcrumbs,
      activeFolder,
      emptyFolders,
      toggleGroupBy,
      activeFilters,
      quickFilterBy,
      isOverCurrent,
      getByBreadCrumb,
      connectDropTarget
    } = this.props;

    if (isLoading) return <LoadingSpinner />;

    const {showModifyModal, showModal, document} = this.state;
    const isDocuments = files.every(doc => doc.fileType === "document");
    const isActive = canDrop && isOverCurrent;

    return (
      <Col lg={9}>
        <Row>
          <Col lg={12} className="no-padding">
            <BreadCrumb
              display={display}
              showMenu={showMenu}
              activeType={activeType}
              breadcrumbs={breadcrumbs}
              isDocuments={isDocuments}
              activeFolder={activeFolder}
              activeFilters={activeFilters}
              sortBy={sort => sortBy(sort)}
              toggleMenu={toggleMenu}
              getFiles={folder => getFiles(folder)}
              getByDate={folder => getByDate(folder)}
              getByFolder={folder => getByFolder(folder)}
              toggleGroupBy={type => toggleGroupBy(type)}
              quickFilterBy={filter => quickFilterBy(filter)}
              getByBreadCrumb={folder => getByBreadCrumb(folder)}
            />
            <PDFModal
              show={showModal}
              document={document}
              onHide={this.closeModal.bind(this)}
            />
            <FileModifyModal
              isUpdate={true}
              files={document}
              authors={authors}
              show={showModifyModal}
              onHide={this.closeModifyModal.bind(this)} 
              updateFile={file =>this.updateFile(file)} 
            />
            {files.length > 0 ? (
              <div className="file-list-container">
                <PerfectScrollbar>
                  {connectDropTarget(
                    display === "grid" ? (
                      <div className={classNames("file-list-wrapper", {"active": isActive})}>
                        <Grid
                          mode={mode}
                          files={files}
                          emptyFolders={emptyFolders}
                          openFolder={folder => getFiles(folder)}
                          openModal={document => this.openModal(document)}
                          openModifyModal={this.modifyFile.bind(this)}
                        />
                      </div>
                    ) : (
                      <div className={classNames("file-list-wrapper", {"active": isActive})}>
                        <List
                          files={files}
                          emptyFolders={emptyFolders}                     
                          openFolder={folder => getFiles(folder)}
                          openModal={document => this.openModal(document)}
                        />
                      </div>
                    )
                  )}
                </PerfectScrollbar>
              </div>
            ) : (
              <EmptyFolderErr />
            )}
          </Col>
        </Row>
      </Col>
    );
  }
}

export default FileExplorer;
