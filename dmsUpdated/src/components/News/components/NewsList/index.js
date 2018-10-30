import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import { Row,Col } from "react-bootstrap";
import { EditorState, convertToRaw, convertFromHTML } from 'draft-js';
import ReactTable from "react-table";
import "react-table/react-table.css";
import { injectIntl, FormattedMessage} from "react-intl";
import messages from "./messages";
import Article from "../../../../models/Article/index";

@observer
class NewsList extends React.Component {
    static propTypes = {
        fields: PropTypes.array,
        showUpdate: PropTypes.func,
        showArticle: PropTypes.func,
        deleteArticle: PropTypes.func
    }
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleDelete(id) {
        const { deleteArticle } = this.props;
        deleteArticle(id);
    }
    handleUpdate(id) {
        const { showUpdate } = this.props;
        showUpdate(id);
    }
    handleShowArticle(id) {
        const { showArticle } = this.props;
        showArticle(id);
    }
    render() {
        const { fields } = this.props;
        const iconSize = { fontSize: '18px', cursor: 'pointer' };
        const content = fields ? fields : null;
        const htmlContent = fields ? content : null;

        if (fields.length != 0) {
            var i = fields.length - 1;
            const description = convertFromHTML(fields[i].content);
        }
        return (
            <div>
                <Row>
                    <ReactTable
                        data={fields}
                        columns={[
                            {
                                Header: "",
                                columns: [
                                    {
                                        Header: this.props.intl.formatMessage({ ...messages.title }),
                                        accessor: "title",
                                        maxWidth: 200
                                    },
                                    {
                                        Header: this.props.intl.formatMessage({ ...messages.description }),
                                        accessor: "content",
                                    },
                                    {
                                        Header: this.props.intl.formatMessage({ ...messages.creation_date }),
                                        accessor: "creation_date",
                                        maxWidth: 135
                                    },
                                    {
                                        accessor: "id",
                                        Cell: row => (
                                            <i className="fa fa-external-link" style={iconSize} onClick={() => this.handleShowArticle(row.value)}></i>
                                        ),
                                        maxWidth: 45
                                    },
                                    {
                                        accessor: "id",
                                        Cell: row => (
                                            <i className="fa fa-pencil-square-o" style={iconSize} onClick={() => this.handleUpdate(row.value)}></i>
                                        ),
                                        maxWidth: 45
                                    },
                                    {
                                        accessor: "id",
                                        Cell: row => (
                                            <i className="fa fa-trash-o" style={iconSize} onClick={() => this.handleDelete(row.value)}></i>
                                        ),
                                        maxWidth: 45
                                    }
                                ]
                            }
                        ]}
                        defaultPageSize={5}
                        className="-striped -highlight"
                    />
                </Row>
            </div>
        );
    }
}

export default injectIntl(NewsList);
