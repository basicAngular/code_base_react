import React from "react";
import PropTypes from "prop-types";
import {Button,ButtonGroup} from "react-bootstrap";
import moment from "moment";
import classNames from "classnames";
import {FormattedMessage} from "react-intl";
import messages from "./messages.js";

class GridItemDoc extends React.Component {
  
  static propTypes = {
    mode: PropTypes.string,
    item: PropTypes.object,
    onClick: PropTypes.func,
    documentStore: PropTypes.object,
    openModifyModal: PropTypes.func
  }

  state = {
    showInfo: false,
    document: {}
  }

  componentDidMount() {

    const { item } = this.props;
    this.setState({ document: item });
  }

  componentWillReceiveProps(nextProps) {
    const {item} = nextProps;
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
    const {showInfo} = this.state;
    this.setState({showInfo: !showInfo});
  }

  render() {
    const { item, onClick, openModifyModal, mode } = this.props;
    const { document, showInfo } = this.state;

    return (
      <div className="file-box" onClick={() => onClick()}>
        <div className="file" style={{ width: "100%" }}>
          {!showInfo && 
            <div className="icon">
              <i className="fa fa-file-pdf-o" />
            </div>
          }
          <div className="doc">
            <h3>{item.name.substring(0,25)}</h3>
            <div>
              <h5>
                <FormattedMessage {...messages.added} />
                {moment(item.created_at).format("D.M.Y")}
              </h5>
              <h5>
                <FormattedMessage {...messages.size} />
                {item.size}
                KB
              </h5>
              {showInfo && 
                <div>
                  <h5>
                    <FormattedMessage {...messages.author} />
                    {item.author}
                  </h5>
                  <h5>
                    <FormattedMessage {...messages.tags} />
                    <ul
                      className="tag-list vote-info vote-info1"
                      style={{ padding: 0, lineHeight: "15px" }}
                    >
                      {item.tags.map(tag => (
                        <li
                          key={tag}
                        >
                          <a>{tag}</a>
                        </li>
                      ))}
                    </ul>
                  </h5>
                  <h5>
                    <FormattedMessage {...messages.date} />
                    {item.date}
                  </h5>
                  <h5>
                    <FormattedMessage {...messages.dateRelevance} />
                    {item.date_relevance}
                  </h5>
                </div>
              }
              <p className="text-center no-margin">
                <i
                  className={classNames("fa info-icon", {"fa-info-circle": !showInfo}, {"fa-times-circle-o": showInfo})} 
                  onClick={e => this.toggleShowInfo(e)}
                ></i>
              </p>
              {mode === "manager" ? (
                <div className="bear">
                  <Button bsStyle="warning" onClick={e => {e.stopPropagation();openModifyModal(item);}}>
                    <FormattedMessage {...messages.edit} />
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
          {!showInfo && 
            <div className="all_btns">
              <ButtonGroup className="btn-group-justified">
                <div className="btn-group" role="group">
                  <Button className="col-md-4 flag-select" onClick={e => this.toggleFlag(e, "is_favorite")}>
                    <i className={classNames("fa fa-star cursor", {"active": document.is_favorite})} />
                  </Button>
                </div>
                <div className="btn-group" role="group">
                  <Button className="col-md-4 flag-select" onClick={e => this.toggleFlag(e, "is_sos")}>
                    <i className={classNames("fa fa-ambulance cursor", {"active": document.is_sos})} />
                  </Button>
                </div>
                <div className="btn-group" role="group">
                  <Button className="col-md-4 flag-select" onClick={e => this.toggleFlag(e, "is_tax_relevant")}>
                    <i className={classNames("fa fa-building cursor", {"active": document.is_tax_relevant})} />
                  </Button>
                </div>
              </ButtonGroup>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default GridItemDoc;