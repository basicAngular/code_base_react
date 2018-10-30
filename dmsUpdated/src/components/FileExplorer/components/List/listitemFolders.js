import React, { Component } from "react";
import PropTypes from "prop-types";
import { DropTarget } from "react-dnd";
import { Col } from "react-bootstrap";
import classNames from "classnames";

const folderTarget = {
  drop: function (props, monitor, component) {
    const {files} = monitor.getItem();
    const hasDroppedOnChild = monitor.didDrop();
    const filesFromStorage = JSON.parse(localStorage.getItem("files"));

		if (hasDroppedOnChild) {
			return
    }
    
    files.map(file => {
      let data = file;
      data.folderId = props.item.data === undefined ?  props.item.id : props.item.data.id;
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
  }
};

function collect(connect, monitor) {
  return {
      connectDropTarget: connect.dropTarget(),
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
  }
};

@DropTarget("file", folderTarget, collect)
class ListItemFolder extends Component {
  
  static propTypes = {
    item: PropTypes.object,
    isOver: PropTypes.bool,
    onClick: PropTypes.func,
    emptyFolders: PropTypes.array,
    isOverCurrent: PropTypes.bool,
    connectDropTarget: PropTypes.func
  }

  state = {
		hasDropped: false,
		hasDroppedOnChild: false,
	}
  
  render() {
    const {item, onClick, connectDropTarget, isOver, isOverCurrent, emptyFolders} = this.props;
    const folderId = (item && item.data !== undefined) ? item.data.id : item.id;
    const imageUrl = (item && item.data !== undefined) ? item.data.image : item.image;
    const isEmpty = emptyFolders.includes(folderId);
    const isActive = isOverCurrent || isOver;
    return connectDropTarget(
      <div>
        <Col lg={12} className="no-padding-xs" onClick={onClick.bind()}>
          <div className={classNames("vote-item", {"active": isActive})}>
            <div className="row">
              <div className="col-xs-2 file-icon-cell">
                <div className="vote-icon">
                {imageUrl === undefined || imageUrl === "" || imageUrl === null ? (
                  <i className={classNames("fa fa-folder", {"empty": isEmpty})} />
                ) : (
                  <img src={imageUrl} role="presentation" width="100%" />
                )}
                </div>
              </div>
              <div className="col-md-8 col-xs-10">
                <a href="#" className="vote-title fold">
                  {item.name}
                </a>
              </div>
            </div>
          </div>
        </Col>
      </div>
    );
  }
}

export default ListItemFolder;