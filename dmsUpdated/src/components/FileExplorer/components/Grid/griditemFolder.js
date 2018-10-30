import React, { Component } from "react";
import PropTypes from "prop-types";
import { DropTarget } from "react-dnd";
import classNames from "classnames";
import { timingSafeEqual } from "crypto";

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
      data.folderId = props.item.data === undefined ?  props.item.id :props.item.data.id;
      data = Object.assign(data,file);
      props.documentStore.update(data).then(() => {
      props.fileStore.files.delete(data.id);  
      props.fileStore.reload();
      });

      component.setState({
        hasDropped: true,
        hasDroppedOnChild,
      }, () => {
        localStorage.setItem("files", JSON.stringify(filesFromStorage));
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
      isOverCurrent: monitor.isOver({shallow: true}),
  };
};

@DropTarget("file", folderTarget, collect)
class GridItemFolder extends Component {

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
    const { item, onClick, connectDropTarget, isOver, isOverCurrent, emptyFolders } = this.props;
    const folderId = (item && item.data !== undefined) ? item.data.id : item.id;
    const imageUrl = (item && item.data !== undefined) ? item.data.image : item.image;
    const isEmpty = emptyFolders.includes(folderId);
    const isActive = isOverCurrent || isOver;

    return connectDropTarget(
      <div className="file-box" onClick={onClick.bind()}>
        <div className={classNames("file", {"active": isActive})}>
          <a>
            {imageUrl === undefined || imageUrl === "" || imageUrl === null
              ? (
                <div className="icon">
                  <i className={classNames("fa fa-folder", {"empty": isEmpty})} />
                </div>
              ) : (
                <div className="image">
                  <img
                    src={imageUrl}
                    role="presentation"
                    width="100%"
                    className="img-responsive"/>
                </div>
              )}
            <div className="file-name">
              {item.name}
            </div>
          </a>
        </div>
      </div>
    );
  }
}

export default GridItemFolder;