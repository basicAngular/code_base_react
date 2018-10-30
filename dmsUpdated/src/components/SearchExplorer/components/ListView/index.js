import React from "react";
import PropTypes from "prop-types";
import style from "./style.scss";
import classnames from "classnames/bind";
import ReactTable from "react-table";

const cx = classnames.bind(style);

class ListView extends React.Component {
    static defaultProps = {
        files: {},
        folders: {},
    }

    static propTypes = {
        files: PropTypes.object,
        folders: PropTypes.object,
    }

    state = {
        files: this.props.files,
        folders: this.props.folders,
    }

    renderCell() {

    }

    renderRow() {

    }

    render() {
        const tableContent = Object.keys(this.state.files);

        const tableClasses = cx("-striped", "-highlight", "table");

        const columns = [{
            id: "fileName",
            header: "Name",
            accessor: currentItem => {return this.state.files[currentItem].name;} // String-based value accessors!
        }];
        return (
            <ReactTable
                className={tableClasses}
                data={tableContent}
                columns={columns}
                showPagination={false}
                defaultPageSize={Math.max(tableContent.length, 18)}
            />
        );
    }
}

export default ListView;
