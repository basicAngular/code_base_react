import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { Button, ButtonGroup, DropdownButton, MenuItem } from "react-bootstrap";
import messages from "./messages.js";

const sortFilters = [
  {title: "name", name: "name"},
  {title: "date", name: "date_relevance"},
  {title: "size", name: "size"},
  {title: "createDate", name: "created_at"},
  {title: "modifiedDate", name: "modified_at"}
];

const style = {
  border: "1px solid #e7eaec",
  borderRadius: "3px"
};

export default class SortFilter extends React.Component {

  static propTypes = {
    sortBy: PropTypes.func
  }

  constructor() {
    super();
    this.state = {
      sortType: "name",
      sortOrder: "asc,desc"
    };
  }
  toggleSortOrder() {
    const { sortBy } = this.props;
    const { sortOrder } = this.state;
    let sortOrderType = sortOrder === "asc,desc" ? "desc,asc" : "asc,desc";
    this.setState({ sortOrder: sortOrderType }, () => {
      sortBy(this.state);
    });
  }
  handleSortType(sortType) {
    const { sortBy } = this.props;
    this.setState({ sortType }, () => {
      sortBy(this.state);
    });
  }
  render() {
    const { sortType, sortOrder } = this.state;
    const sortTitle = sortType.length > 0 ? sortFilters.find(o => o.name === sortType).title : "Sort by";

    return (
      <ButtonGroup>
        {sortOrder === "asc,desc" ? 
          <Button onClick={() => this.toggleSortOrder()}><i className="fa fa-angle-up" /></Button> : 
          <Button onClick={() => this.toggleSortOrder()}><i className="fa fa-angle-down" /></Button>
        }
        <DropdownButton
          id="sort-filter"
          bsStyle="default"
          title={sortTitle}
          style={style}
          onSelect={(eventKey) => this.handleSortType(eventKey)}
        >
          {sortFilters.map((filter, i) => 
            <MenuItem eventKey={filter.name} key={i} active={filter.name === sortType ? true : false}><FormattedMessage {...messages[filter.title]} /></MenuItem>
          )}
        </DropdownButton>
      </ButtonGroup>
    );
  }
}