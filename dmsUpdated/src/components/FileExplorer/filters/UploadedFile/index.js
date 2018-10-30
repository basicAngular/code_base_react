import React, { Component } from "react";
import PropTypes from "prop-types";
import { DragSource } from "react-dnd";
import SmallLoader from "./../../../SmallLoader";

const cardSource = {
    
    beginDrag: function (props, monitor) {
      const {file, selectedFiles} = props;
      let responce = { files: [] };
      
      if(selectedFiles.length !== 0 && selectedFiles.length > 1) {
        responce.files = selectedFiles;
      } else {
       
        responce.files.push(file);
      }
      return responce;
    },
    endDrag: function(props, monitor) {
      
      const {setSelectedFiles} = props;
      setSelectedFiles([]);
    }
}

function collection(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging()
    }
}

@DragSource("file", cardSource, collection)
class UploadedFile extends Component {
  static propTypes = {
    file: PropTypes.object,
    openFile: PropTypes.func,
    deleteFile: PropTypes.func,
    onSelect: PropTypes.func,
    selectedFiles: PropTypes.array,
    connectDragSource: PropTypes.func,
    fileUpload: PropTypes.array,
    uploading: PropTypes.array
  }
  render() {
    const {file, openFile, deleteFile, onSelect, selectedFiles, connectDragSource, fileUpload} = this.props;
    let   fileUploadIndex = fileUpload.findIndex(f => f.name === file.name);
    const showProgress = (fileUpload.length !== 0 && fileUpload[fileUploadIndex] !== undefined) ? fileUpload[fileUploadIndex].status : false;
    const uploading = this.props.uploading;
    const uploadingFile = uploading.find(uploadingFile => uploadingFile.name === file.name);
    const percent = uploadingFile !== undefined ? uploadingFile.percentage : null;
    
    

    return connectDragSource( 
      <li
        key={file.created_at}
        onClick={() => onSelect(this.props.file)}
        className={selectedFiles.findIndex(el => el.name === file.name) !== -1 ? "active" : ""}>
        <div className="content">
          <i className="fa fa-file-pdf-o" />
          <span> {file.name}</span>
        </div>
        {showProgress ? (
          <SmallLoader percent={percent} />
        ) : (
          <div className="file-btn-wrapper">
            <i 
              className="fa fa-eye"
              onClick={e => openFile(e, this.props.file)}
            />
            <i 
              className="fa fa-trash-o delete-file"
              onClick={e => deleteFile(e, this.props.file)}
            />
          </div>
        )}
       
      </li>
    );
  }
}

export default UploadedFile;