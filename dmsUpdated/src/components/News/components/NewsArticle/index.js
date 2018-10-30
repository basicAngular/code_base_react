import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import { convertToRaw, ContentState, EditorState, convertFromRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import moment from "moment";

const initialState = {
    role: [],
    title: "",
    content: "",
    creation_date: moment(),
    editorState: EditorState.createEmpty()
};

class NewsArticle extends React.Component {
    static propTypes = {
        articleId: PropTypes.number,
        getArticle: PropTypes.func,
        handleHideArticle: PropTypes.func
    }
    constructor(props) {
        super(props);
        this.state = initialState;
    }
    componentDidMount() {
        const { articleId, getArticle } = this.props;
        const article = getArticle(articleId);
        this.setState({ article });
    }
    render() {
        const { article } = this.state;
        const content = article ? article : null;
        const htmlContent = article ? content : "";
        return (
            <div className="wrapper wrapper-content animated fadeInRight article">
                <div className="row justify-content-md-center">
                    <div className="ibox">
                        <div className="ibox-content">
                            <div className="float-right">
                                <button className="btn btn-white btn-xs" type="button">Model</button>
                                <button className="btn btn-white btn-xs" type="button">Publishing</button>
                                <button className="btn btn-white btn-xs" type="button">Modern</button>
                            </div>
                            <div className="text-center article-title">
                                <span className="text-muted"><i className="fa fa-clock-o"></i> {htmlContent.creation_date}</span>
                                <h1>
                                    {htmlContent.title}
                                </h1>
                            </div>
                            <div dangerouslySetInnerHTML={{ __html: htmlContent.content }} ></div>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>

            
        );
    }
}

export default NewsArticle;
