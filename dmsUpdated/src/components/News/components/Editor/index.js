import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Button } from "react-bootstrap";
import FormInput from "./../../../Form/components/FormInput";
import FormSelect from "./../../../Form/components/FormSelect";
import FormDatePicker from "./../../../Form/components/FormDatePicker";
import { EditorState, convertToRaw, convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { FormattedMessage, injectIntl, } from "react-intl";
import messages from "./messages";
import moment from "moment";
import './styles.css';

const rolesList = [
    "customer",
    "krempler"
];

const initialState = {
    role: [],
    title: "",
    content: "",
    creation_date: moment().format("YYYY-MM-DD"),
    editorState: EditorState.createEmpty()
};

const btnStyle = { marginTop: '20px' };

class ArticleEditor extends React.Component {
    static propTypes = {
        hideEditor: PropTypes.func,
        getArticle: PropTypes.func,
        addArticle: PropTypes.func,
        updateArticle: PropTypes.func
    }
    constructor (props) {
        super(props);
        this.state = initialState;
        this.saveArticle = this.saveArticle.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onEditorStateChange = this.onEditorStateChange.bind(this);
        this.onConsumerRoleChange = this.onConsumerRoleChange.bind(this);
    }
    componentDidMount() {
        const { updateId, getArticle } = this.props;
        if(updateId !== null) {
            const article = getArticle(updateId);
            this.setState({...article});
        }
    }
    onEditorStateChange(editorState) {
        const rawContent = convertToRaw(editorState.getCurrentContent());
        const content = draftToHtml(rawContent);
        this.setState({ content, editorState });
    }
    onTitleChange(event) {
        const title = event.target.value;
        this.setState({ title });
    }
    onDateChange(id, date) {
        this.setState({ creation_date: date });
    }
    onConsumerRoleChange(role) {
        this.setState({ role });
    }
    saveArticle() {
        const state = this.state;
        const { addArticle, updateArticle, updateId } = this.props;
        if(updateId === null) {
            addArticle(state);
        } else {
            updateArticle(state)
        }
        this.setState(initialState);
    }
    render() {
        const { hideEditor } = this.props;
        const { editorState, title, creation_date, role, content } = this.state;
        const validation = !(title.length !== 0 && content.length !== 0 && role.length !== 0);
        return (
            <div className="ibox">
                <div className="ibox-content">
                    <Row>
                        <Col lg={4}>
                            <FormInput
                                label={this.props.intl.formatMessage({...messages.title})}
                                id="title"
                                field={title}
                                change={this.onTitleChange}
                            />
                        </Col>
                        <Col lg={4}>
                            <FormDatePicker
                                label={this.props.intl.formatMessage({...messages.date})}
                                id="creation_date"
                                field={creation_date}
                                change={this.onDateChange}
                            />
                        </Col>
                        <Col lg={4}>
                            <FormSelect
                                label={this.props.intl.formatMessage({...messages.role})}
                                id="consumer_role"
                                field={role}
                                list={rolesList}
                                change={this.onConsumerRoleChange}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12}>
                            <Editor
                                editorState={editorState}
                                editorClassName="demo-editor"
                                wrapperClassName="demo-wrapper"
                                onEditorStateChange={this.onEditorStateChange}
                            />
                        </Col>
                        {/* <Col lg={4}>
                            <textarea
                                disabled
                                className="demo-editor"
                                value={htmlContent}
                            />
                        </Col>
                        <Col lg={4}>
                            <div className="demo-editor" dangerouslySetInnerHTML={{ __html: htmlContent }} ></div>
                        </Col> */}
                    </Row>
                    <Row>
                        <Col lg={12} className="d-flex flex-between">
                            <Button onClick={() => hideEditor()} style={btnStyle}>
                                <FormattedMessage 
                                    {...messages.closeArticle}
                                />
                            </Button>
                            <Button onClick={this.saveArticle} style={btnStyle} disabled={validation}>
                                <FormattedMessage 
                                    {...messages.saveArticle}
                                />
                            </Button>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default injectIntl(ArticleEditor);
