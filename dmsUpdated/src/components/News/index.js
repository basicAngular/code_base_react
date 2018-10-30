import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import { FormattedMessage } from "react-intl";
import { Button } from "react-bootstrap";
import Editor from "./components/Editor";
import NewsList from "./components/NewsList";
import NewsArticle from "./components/NewsArticle";
import messages from "./messages";

const initialState = {
    updateId: null,
    articleId: null,
    showArticle: false,
    showNewsList: true
}

@observer
class News extends React.Component {
    static propTypes = {
        userRole: PropTypes.string,
        articles: PropTypes.array,
        getArticle: PropTypes.func,
        addArticle: PropTypes.func,
        updateArticle: PropTypes.func,
        deleteArticle: PropTypes.func,
    }
    constructor (props) {
        super(props);
        this.state = initialState;
        this.showUpdate = this.showUpdate.bind(this);
        this.handleViewEditor = this.handleViewEditor.bind(this);
        this.handleShowArticle = this.handleShowArticle.bind(this);
        this.handleHideArticle = this.handleHideArticle.bind(this);
    }
    handleViewEditor() {
        const { showNewsList } = this.state;
        this.setState({ showNewsList: !showNewsList });
    }
    handleShowArticle(id) {
        let showArticle = this.state.showArticle;
        showArticle = !showArticle;
        const articleId = showArticle ? id : null;

        this.setState({ showArticle, articleId });
    }
    handleHideArticle() {
        this.setState(initialState);
    }
    showUpdate(id) {
        this.setState({ showNewsList: false, updateId: id });
    }
    render() {
        const {
            userRole,
            articles,
            getArticle,
            addArticle,
            updateArticle,
            deleteArticle,
        } = this.props;
        const {
            showNewsList,
            showArticle,
            updateId,
            articleId
        } = this.state;
        const fields = articles.filter(article => article.id);
        return (
                <div>
                    {showArticle ? (
                        <NewsArticle
                            articleId={articleId}
                            getArticle={getArticle}
                            handleHideArticle={this.handleHideArticle}
                        />
                    ) : (
                        <div>
                            {showNewsList &&
                                <div>
                                    {userRole === "admin" &&
                                        <Button  bsStyle="info" onClick={() => this.handleViewEditor()}>
                                            <FormattedMessage  {...messages.createArticle} />
                                        </Button>
                                    }
                                    <NewsList
                                        fields={fields}
                                        userRole={userRole}
                                        showUpdate={this.showUpdate}
                                        deleteArticle={deleteArticle}
                                        showArticle={this.handleShowArticle}
                                    />
                                </div>
                            }
                            {(!showNewsList && userRole === "admin") &&
                                <Editor
                                    updateId={updateId}
                                    addArticle={addArticle}
                                    getArticle={getArticle}
                                    updateArticle={updateArticle}
                                    hideEditor={this.handleViewEditor}
                                />
                            }
                        </div>
                    )}
            </div>
        )
    }
}

export default News;
