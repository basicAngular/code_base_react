import { bytesToSize } from "utils/helpers";
import React from "react";
import PropTypes from "prop-types";
import style from "./style.scss";
import {inject} from "mobx-react";
import classNames from "classnames/bind";
const cx = classNames.bind(style);

@inject("authStore")
class File extends React.Component {
    static contextTypes = {
        onSosToggle: PropTypes.func.isRequired,
        onFavoriteToggle: PropTypes.func.isRequired,
        onTaxRelevantToggle: PropTypes.func.isRequired,
        openFile: PropTypes.func.isRequired,
        modifyFile: PropTypes.func.isRequired,
    }

    static defaultProps = {
        id: 0,
        name: "Test",
        extension: "pdf",
        size: "2,4MB",
        added: "10.04.2017",
        tags: [],
        isSos: false,
        isFavorite: true,
        onSosToggle: () => {},
        onFavoriteToggle: () => {},
        onTaxRelevantToggle: () => {},
        openFile: () => {},
        modifyFile: () => {},
    }

    static propTypes = {
        id: PropTypes.string,
        name: PropTypes.string,
        extension: PropTypes.string,
        size: PropTypes.number,
        added: PropTypes.string,
        tags: PropTypes.array,
        isSos: PropTypes.bool,
        isFavorite: PropTypes.bool,
        isTaxRelevant: PropTypes.bool,
        onSosToggle: PropTypes.func,
        onFavoriteToggle: PropTypes.func,
    }

    render() {
        const sosIconClass = cx("fa", "fa-ambulance", {"isSOS": this.props.isSos});
        const favoriteIconClass = cx("fa", "fa-star", {"isFavorite": this.props.isFavorite});
        const taxIconClass = cx("fa", "fa-building", {"isTaxRelevant": this.props.isTaxRelevant});
        const buttonContainerClasses = cx("m-t-xs", "text-center");
        return (
            <div className={cx("file")} onClick={() => this.context.openFile({id: this.props.id, name: this.props.name })}>
                <div className={"icon"}>
                    <i className="fa fa-file-pdf-o"></i>
                </div>
                <div className={"fileName"}>
                    {this.props.name}
                    <br />
                    <small>added: {this.props.added}</small>
                    <br />
                    <small>size: {bytesToSize(this.props.size)}</small>
                    <div className={buttonContainerClasses}>
                        <button className="btn btn-default btn-circle" type="button" onClick={(event) => {event.stopPropagation(); this.context.onFavoriteToggle(this.props.id);}}>
                            <i className={favoriteIconClass}></i>
                        </button>
                        <button className="btn btn-default btn-circle" type="button" onClick={(event) => {event.stopPropagation(); this.context.onSosToggle(this.props.id);}}>
                            <i className={sosIconClass}></i>
                        </button>
                        <button className="btn btn-default btn-circle" type="button" onClick={(event) => {event.stopPropagation(); this.context.onTaxRelevantToggle(this.props.id);}}>
                            <i className={taxIconClass}></i>
                        </button>
                    </div>
                    {(this.props.authStore.user.role === "krempler" || this.props.authStore.user.role === "kressist") && <div className='m-t-sm'><button className={"btn btn-warning btn-xs btn-block"} onClick={(event) => {event.stopPropagation(); this.context.modifyFile(this.props.id);}}>edit</button></div>}
                </div>
            </div>
        );
    }
}

export default File;
