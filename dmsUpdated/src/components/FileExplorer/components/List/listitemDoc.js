import React from "react";
import PropTypes from "prop-types";
import { Col } from "react-bootstrap";
import moment from "moment";
import classNames from "classnames";

class ListItemDoc extends React.Component {
  
  static propTypes = {
    item: PropTypes.object,
    onClick: PropTypes.func,
    setShowInfo: PropTypes.func,
    documentStore: PropTypes.object
  }

  state = {
    document: {},
    showInfo: false
  }

  componentDidMount() {
    const { item } = this.props;
    this.setState({ document: item });
  }

  componentWillReceiveProps(nextProps) {
    const { item } = nextProps;
    this.setState({ document: item });
  }

  toggleFlag(e, flag) {
    e.stopPropagation();
    const { documentStore } = this.props;
    const { document } = this.state;
    document[flag] = !document[flag];
    this.setState({ document },() => {
      documentStore.update(document);
    });
  }

  toggleShowInfo(e) {
    e.stopPropagation();
    const { showInfo } = this.state;
    const { setShowInfo } = this.props;
    this.setState({showInfo: !showInfo},() => {
      setShowInfo(showInfo);
    });
  }

  render() {
    const { item, onClick } = this.props;
    const { document, showInfo } = this.state;
    return (
      <Col lg={12} className="no-padding-xs" onClick={() => onClick()}>
        <div className="vote-item">
          <div className="row">
            {!showInfo && (
              <div className="col-xs-2 file-icon-cell">
                <div className="vote-icon">
                  <i className="fa fa-file-pdf-o" />
                </div>
              </div>
            )}
            {!showInfo ? (
              <div className="col-md-5 col-xs-10">
                <a href="#" className="vote-title vote-title1">
                  {item.name}
                </a>
              </div>
            ) : (
              <div>
                <div className="col-md-2 col-xs-12 text-center text-overflow">
                  <span className="vote-info vote-info1">{item.name}</span>
                </div>
                <div className="col-md-2 col-xs-12 text-center text-overflow">
                  <span className="vote-info vote-info1">{item.author}</span>
                </div>
              </div>
            )}
            <div className="col-md-2 col-xs-12 text-center text-overflow">
              <span className="vote-info vote-info1">{moment(item.created_at).format("D.M.Y")}</span>
            </div>
            <div className="col-md-2 col-xs-12 text-center text-overflow">
              <span className="vote-info vote-info1">{item.size} KB</span>
            </div>
            {!showInfo ? (
              <div className="col-md-2 col-xs-12">
                <div className="vote-icon vote-icon1">
                  <i className={classNames("fa fa-star cursor", {"active": document.is_favorite})}  onClick={e => this.toggleFlag(e, "is_favorite")}/>
                  <i className={classNames("fa fa-ambulance cursor", {"active": document.is_sos})}  onClick={e => this.toggleFlag(e, "is_sos")}/>
                  <i className={classNames("fa fa-building cursor", {"active": document.is_tax_relevant})}  onClick={e => this.toggleFlag(e, "is_tax_relevant")} />
                </div>
              </div>
            ) : (
              <div>
                <div className="col-md-2 col-xs-12 text-center text-overflow">
                  <ul
                    className="tag-list vote-info vote-info1"
                    style={{ padding: 0, lineHeight: "10px", marginTop: "10px" }}
                  >
                    {item.tags.map(tag => (
                      <li
                        key={tag}
                      >
                        <a>{tag}</a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-md-1 col-xs-12 text-center">
                  <span className="vote-info vote-info1">{moment(item.date_relevance).format("D.M.Y")}</span>
                </div>
              </div>
            )}
            <div className={classNames("file-info-icon", {"col-md-1 text-right": showInfo})}>
              <i
                className={classNames("fa info-icon", {"fa-info-circle": !showInfo}, {"fa-times-circle-o": showInfo})} 
                onClick={e => this.toggleShowInfo(e)}
              ></i>
            </div>
          </div>
        </div>
      </Col>
    );
  }
}

export default ListItemDoc;