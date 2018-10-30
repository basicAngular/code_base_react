import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import uniqid from "uniqid";
import { Row, Col, Button, ButtonGroup, FormControl } from "react-bootstrap";
import { observer, inject } from "mobx-react";
import classNames from "classnames";
import Dropzone from "react-dropzone";
import { FormattedMessage } from "react-intl";
import PDFModal from "../components/PDFModal";
import FileModifyModal from "../components/FileModifyModal";
import UploadedFile from "./UploadedFile";
import messages from "./messages";

@inject("uploadStore", "documentStore", "fileStore", "authStore", "customerStore")
@observer
class Filters extends React.Component {

  static propTypes = {
    authStore: PropTypes.object,
    uploadStore: PropTypes.object,
    documentStore: PropTypes.object,
    mode: PropTypes.string,
    tags: PropTypes.object,
    search: PropTypes.func,
    authors: PropTypes.array,
    display: PropTypes.string,
    selectTag: PropTypes.func,
    activeType: PropTypes.string,
    changeMode: PropTypes.func,
    clearParams: PropTypes.func,
    tagFilters: PropTypes.array,
    searchValue: PropTypes.string,
    toggleDisplay: PropTypes.func,
    toggleGroupBy: PropTypes.func,
    quickFilterBy: PropTypes.func,
    activeFilters: PropTypes.array
  }

  state = {
    document: [],
    fileUpload: [],
    selectedFiles: [],
    showModal: false,
    dropzoneDisable: false,
    showModifyModal: false,
    isAllFilesSelected: true,
    fileList: []
  }

  onUnload(event) {
    if (this.props.uploadStore.files.values().length > 0) {
      localStorage.setItem("files", JSON.stringify(this.props.uploadStore.files.values()));
    }
  }

  componentDidMount() {
    window.addEventListener("beforeunload", event => this.onUnload(event));
  }
  componentWillMount() {

    const filesFromStorage = JSON.parse(localStorage.getItem("files"));
    const filesFromProps = this.props.uploadStore.files.values();

    if (filesFromProps && filesFromProps.length === 0 && filesFromStorage && filesFromStorage.length !== 0) {
      this.setState({
        fileList: filesFromStorage
      })
    } else if (filesFromProps && filesFromProps.length !== 0) {
      this.setState({
        fileList: _.unionBy(filesFromProps, filesFromStorage, "name")
      })
    } else {
      this.setState({
        fileList: filesFromProps
      })
    }
    const { changeMode } = this.props;
    const modeType = this.props.authStore.user.role === "customer" ? "user" : "manager";
    changeMode(modeType);
  }
  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onUnload);
  }

  onDrop(files) {
    const { uploadStore, documentStore } = this.props;
    this.setState({ dropzoneDisable: true });
    files.map(file => {
      let { fileUpload } = this.state;
      fileUpload.push({ status: true, name: file.name });
      this.setState({ fileUpload });
      const extension = file.name.split(".").splice(1, 1).join();
      let doc = {
        tags: [],
        author: "",
        name: file.name,
        size: file.size,
        folderId: null,
        extension: extension,
        mime_type: file.type,
        created_at: file.lastModified,
        modified_at: file.lastModified,
        date_relevance: "",
        is_user_upload: true,
        is_visible: false,
        is_sos: false,
        is_favorite: false,
        is_tax_relevant: false,
        fileType: "document",
        uploadId: uniqid()
      };

      uploadStore.uploadDocs(doc);

      const customer_id = this.props.customerStore.customers[0].id;
      documentStore.upload(file, customer_id)
        .then(data => {
          const { fileList } = this.state;
          let d = data;
          fileList.push(d);
          this.setState({ fileList });
          doc.path = d.path;
          setTimeout(() => {
            let { fileUpload } = this.state;
            let fileIndex = fileUpload.findIndex(f => f.name === doc.name);
            fileUpload.status = false;
            this.setState({ fileUpload, dropzoneDisable: false });
            if (fileIndex !== -1) {

              fileUpload[fileIndex].status = false;
              this.setState({ fileUpload, dropzoneDisable: false });
            }
          }, 1000);
        });

      return null;
    });
  }

  openFile = (e, document) => {
    e.stopPropagation();
    this.setState({ ...this.state, showModal: true, document });
  }

  deleteFile = (e, document) => {

    e.stopPropagation();
    const { uploadStore, documentStore } = this.props;
    documentStore.delete(document.id).then(() => {
      uploadStore.delete(document.id);
      const filesFromStorage = JSON.parse(localStorage.getItem("files"));
      this.setState({
        fileList: filesFromStorage
      })
    });
  }

  closeModal = () => {
    this.setState({ ...this.state, showModal: false });
  }

  selectFile = file => {

    let { selectedFiles } = this.state;
    let index = selectedFiles.findIndex(el => el.name === file.name);
    index === -1 ? selectedFiles.push(file) : selectedFiles.splice(index, 1);
    this.setState({ selectedFiles });
  }

  setSelectedFiles = selectedFiles => {
    this.setState({ selectedFiles });
  }

  toggleAllFiles = () => {

    const { isAllFilesSelected } = this.state;
    const { uploadStore } = this.props;

    const filesFromStorage = JSON.parse(localStorage.getItem("files"));
    const filesFromProps = uploadStore.files.values();
    let fileList = [];
    let selectedFiles = [];

    if (filesFromProps && filesFromProps.length === 0 && filesFromStorage && filesFromStorage.length !== 0) {
      fileList = filesFromStorage;
    } else if (filesFromProps && filesFromProps.length !== 0) {
      fileList = _.unionBy(filesFromProps, filesFromStorage, "name");
    } else {
      fileList = filesFromProps;
    }

    if (isAllFilesSelected) {
      selectedFiles = fileList;
    }

    this.setState({
      selectedFiles: selectedFiles,
      isAllFilesSelected: !isAllFilesSelected
    });
  }

  modifyFile = () => {
    this.setState({ showModifyModal: true });
  }

  updateFile = file => {
    const { uploadStore } = this.props;
    uploadStore.update(file);
    this.setState({ selectedFiles: [], isAllFilesSelected: true });
  }

  closeModifyModal = () => {
    this.setState({ showModifyModal: false });
  }

  handleChangeMode(mode) {
    const { changeMode, toggleGroupBy, clearParams } = this.props;
    if (mode === "manager") {
      clearParams();
      toggleGroupBy("folder");
    }
    changeMode(mode);
  }

  render() {
    const {
      mode,
      tags,
      search,
      authors,
      display,
      selectTag,
      activeType,
      tagFilters,
      searchValue,
      authStore,
      uploadStore,
      documentStore,
      toggleDisplay,
      toggleGroupBy,
      quickFilterBy,
      activeFilters,
    } = this.props;
    const {
      document,
      showModal,
      fileUpload,
      selectedFiles,
      showModifyModal,
      dropzoneDisable,
      isAllFilesSelected,
      fileList
    } = this.state;

    const userRole = authStore.user.role;
    const btnManagerClass = classNames("col-xl-12 col-lg-12 col-md-6 col-xs-6 btn", { "btn-white": mode === "user", "btn-primary": mode === "manager" });
    const btnUserClass = classNames("col-xl-12 col-lg-12 col-md-6 col-xs-6 btn", { "btn-primary": mode === "user", "btn-white": mode === "manager" });
    const uploading = documentStore.uploadingFiles;
    return (
      <Col lg={3} className="no-padding-xs">
        <PDFModal
          show={showModal}
          onHide={this.closeModal.bind(this)}
          document={document}
        />
        {mode === "manager" &&
          <FileModifyModal
            authors={authors}
            show={showModifyModal}
            files={selectedFiles.length === 1 ? selectedFiles[0] : selectedFiles}
            onHide={this.closeModifyModal.bind(this)}
            updateFile={file => this.updateFile(file)}
          />
        }
        <div className="ibox float-e-margins">
          <div className="ibox-content">
            <div className="file-manager">
              <Row>
                <Col md={12}>
                  <span className="user-mode pull-left">
                    {mode === "manager" ? (
                      <FormattedMessage {...messages.managerMode} />
                    ) : (
                        <FormattedMessage {...messages.userMode} />
                      )}
                  </span>
                  <ButtonGroup className="pull-right">
                    <Button
                      onClick={toggleDisplay.bind(this, "list")}
                      className={display === "list" ? "active" : ""}
                    >
                      <i className={classNames("fa fa-bars", { "green": display === "list" }, { "grey": display !== "list" })} />
                    </Button>
                    <Button
                      onClick={toggleDisplay.bind(this, "grid")}
                      className={display === "grid" ? "active" : ""}
                    >
                      <i className={classNames("fa fa-th-large", { "green": display === "grid" }, { "grey": display !== "grid" })} />
                    </Button>
                  </ButtonGroup>
                </Col>
              </Row>

              {userRole === "krempler" &&
                <Row>
                  <Col md={12}>
                    <ButtonGroup className="col-md-12 col-xs-12 nopadding">
                      <Button
                        className={btnManagerClass}
                        onClick={this.handleChangeMode.bind(this, "manager")}
                      >
                        <FormattedMessage
                          {...messages.managerMode}
                        />
                      </Button>
                      <Button
                        className={btnUserClass}
                        onClick={this.handleChangeMode.bind(this, "user")}
                      >
                        <FormattedMessage
                          {...messages.userMode}
                        />
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              }

              {mode === "user" &&
                <div className="inp">
                  <FormControl
                    type="text"
                    placeholder=""
                    value={searchValue}
                    onChange={search.bind(this)}
                  />
                </div>
              }
              {/* <div className="hr-line-dashed"></div> */}
              {mode === "manager" &&
                <div>
                  <br />
                  <div className="dropzone">
                    <Dropzone onDrop={this.onDrop.bind(this)} multiple disabled={dropzoneDisable}>
                      <p className="uplaod-doc">
                        <FormattedMessage
                          {...messages.uploadTitle}
                        />
                      </p>
                    </Dropzone>
                  </div>
                  <aside>
                    {fileList.length > 0 &&
                      <div>
                        <br />
                        <Row>
                          <Col md={12}>
                            <Button
                              onClick={() => this.toggleAllFiles()}
                              className={classNames("btn pull-right ", { "btn-white": isAllFilesSelected, "btn-primary": !isAllFilesSelected })}
                            >
                              {isAllFilesSelected ? (
                                <FormattedMessage
                                  {...messages.selectAll}
                                />
                              ) : (
                                  <FormattedMessage
                                    {...messages.deselectAll}
                                  />
                                )
                              }&nbsp;
                              <i className="fa fa-check-circle-o" aria-hidden="true"></i>
                            </Button>
                          </Col>
                        </Row>
                        <ul className="file-doc">
                          {fileList.map((f, key) => f.folderId === null || f.folderId === undefined ?(
                            <UploadedFile
                              file={f}
                              key={key}
                              uploading={uploading}
                              selectedFiles={selectedFiles}
                              openFile={this.openFile}
                              deleteFile={this.deleteFile}
                              onSelect={this.selectFile}
                              fileUpload={fileUpload}
                              setSelectedFiles={this.setSelectedFiles}
                            />
                          )
                          : null
                        )}
                        </ul>
                        <h3 className={classNames("file-upload-status text-center", { "visible fadeIn fadeOut": fileUpload.status }, { "hidden": !fileUpload.status })}>
                          <FormattedMessage
                            {...messages.uploadSuccess}
                          />
                        </h3>
                      </div>
                    }
                    <br />
                    <div className="modify-container">
                      <Button
                        className="btn"
                        onClick={this.modifyFile.bind(this)}
                        disabled={selectedFiles.length === 0}
                      >
                        <FormattedMessage
                          {...messages.modify}
                        />&nbsp;
                        {selectedFiles.length}&nbsp;
                        <FormattedMessage
                          {...messages.selectedDocuments}
                        />
                      </Button>
                    </div>
                  </aside>
                </div>
              }
              {mode === "user" &&
                <div>
                  <h5>
                    <FormattedMessage
                      {...messages.groupingFolderTitle}
                    />
                  </h5>
                  <ul className="folder-list" style={{ padding: 0 }}>
                    <li>
                      <a
                        onClick={toggleGroupBy.bind(this, "folder")}
                        className={activeType === "folder" ? "active" : ""}
                      >
                        <i className="fa fa-folder grey" />
                        <FormattedMessage
                          {...messages.groupingFolders}
                        />
                      </a>
                    </li>
                  </ul>
                  <h5>
                    <FormattedMessage
                      {...messages.groupingDocumentTitle}
                    />
                  </h5>
                  <ul className="folder-list" style={{ padding: 0 }}>
                    <li>
                      <a
                        onClick={toggleGroupBy.bind(this, "author")}
                        className={activeType === "author" ? "active" : ""}
                      >
                        <i className="fa fa-user" />
                        <FormattedMessage
                          {...messages.groupingDocumentAuthor}
                        />
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={toggleGroupBy.bind(this, "date")}
                        className={activeType === "date" ? "active" : ""}
                      >
                        <i className="fa fa-calendar" />
                        <FormattedMessage
                          {...messages.groupingDocumentDate}
                        />
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={toggleGroupBy.bind(this, "document_all")}
                        className={activeType === "document_all" ? "active" : ""}
                      >
                        <i className="fa fa-file grey" />
                        <FormattedMessage
                          {...messages.groupingDocumentAll}
                        />
                      </a>
                    </li>
                  </ul>
                  <h5>
                    <FormattedMessage
                      {...messages.groupingFiltersTitle}
                    />
                  </h5>
                  <ul className="folder-list" style={{ padding: 0 }}>
                    <li>
                      <a
                        onClick={quickFilterBy.bind(this, "is_sos")}
                        className={activeFilters.includes("is_sos") ? "active" : ""}
                      >
                        <i className="fa fa-ambulance" />
                        <FormattedMessage
                          {...messages.groupingFiltersSos}
                        />
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={quickFilterBy.bind(this, "is_favorite")}
                        className={activeFilters.includes("is_favorite") ? "active" : ""}
                      >
                        <i className="fa fa-star" />
                        <FormattedMessage
                          {...messages.groupingFiltersFavorised}
                        />
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={quickFilterBy.bind(this, "is_tax_relevant")}
                        className={
                          activeFilters.includes("is_tax_relevant")
                            ? "active"
                            : ""
                        }
                      >
                        <i className="fa fa-building" />
                        <FormattedMessage
                          {...messages.groupingFiltersTax}
                        />
                      </a>
                    </li>
                  </ul>
                  <h5 className="tag-title">
                    <FormattedMessage
                      {...messages.groupingTagsTitle}
                    />
                  </h5>
                  <ul className="tag-list" style={{ padding: 0 }}>
                    {tags.values().map(tag => (
                      <li
                        key={tag}
                        onClick={selectTag.bind(this, tag)}
                        className={tagFilters.includes(tag) ? "active" : ""}
                      >
                        <a>{tag}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              }
            </div>
          </div>
        </div>
      </Col>
    );
  }
}

export default Filters;
