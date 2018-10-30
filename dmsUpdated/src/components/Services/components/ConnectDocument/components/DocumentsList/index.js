import React from "react";
import PropTypes from "prop-types";
import ReactTable from "react-table";
import { injectIntl } from "react-intl";
import messages from "./messages";

class DocumentsList extends React.Component {
    static defaultProps = {
        documents: []
    }

    static propTypes = {
        documents: PropTypes.array,
        selectedFileId: PropTypes.number,
        handleSelectFile: PropTypes.func,
        handleViewDocument: PropTypes.func
    }

    render() {
        const { handleSelectFile, selectedFileId, handleViewDocument } = this.props;
        const tableContent = this.props.documents;
        const iconSize = { fontSize: '18px', cursor: 'pointer' };
        const columns = [
            {
                Header: this.props.intl.formatMessage({...messages.status}),
                accessor: "id",
                Cell: row => {
                    const isActive = (selectedFileId === row.value) ? "fa fa-check-circle-o" : "fa fa-circle-o";
                    return (
                        <i className={isActive} style={iconSize} onClick={() => handleSelectFile(row.value)}></i>
                    )
                },
                maxWidth: 70,
            },
            {
                Header: this.props.intl.formatMessage({...messages.name}),
                accessor: "name"
            },
            {
                Header: this.props.intl.formatMessage({...messages.author}),
                accessor: "author"
            },
            {
                accessor: "type",
                Cell: row => {
                    return (
                        <i className="fa fa-file-pdf-o" style={iconSize}></i>
                    )
                },
                maxWidth: 45,
            },
            {
                accessor: "id",
                Cell: row => {
                    return (
                        <i className="fa fa-external-link" style={iconSize} onClick={() => handleViewDocument(row.value)}></i>
                    )
                },
                maxWidth: 80,
            }
        ];
        return (
            <ReactTable
                data={tableContent}
                columns={columns}
                defaultPageSize={10}
                showPagination={true}
                showPageSizeOptions={false}
            />
        );
    }
}

export default injectIntl(DocumentsList);
