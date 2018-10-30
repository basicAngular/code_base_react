import React from "react";
import PropTypes from "prop-types";
import LoadingSpinner from "components/LoadingSpinner";
import { withRouter } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { inject, observer } from "mobx-react";
import NewsPage from "components/News";

@withRouter
@inject("newsStore", "authStore")
@observer
class News extends React.Component {
  state = {}

  static propTypes = {
    setParentTitle: PropTypes.func,
    newsStore: PropTypes.object,
    authStore: PropTypes.object
  }

  componentWillMount() {
    this.props.setParentTitle("News");
    this.props.newsStore.loadArticles();
    this.props.authStore.pullUser();
  }

  addArticle(service) {
    this.props.newsStore.addArticle(service);
  }

  updateArticle(service) {
    this.props.newsStore.updateArticle(service);
  }

  deleteArticle(id) {
    this.props.newsStore.deleteArticle(id);
  }

  render() {
    const { user } = this.props.authStore;
    const { getArticle } = this.props.newsStore;
    const articles = this.props.newsStore.articles;

    const userRole = user.role;
    if (this.props.authStore.isLoading)
      return (
        <div>
          <LoadingSpinner />
        </div>
      );
    return (
      <Row>
        <Col lg={12}>
          <NewsPage
            userRole={userRole}
            articles={articles}
            getArticle={getArticle}
            addArticle={this.addArticle.bind(this)}
            updateArticle={this.updateArticle.bind(this)}
            deleteArticle={this.deleteArticle.bind(this)}
          />
        </Col>
      </Row>
    );
  }
}

export default News;
