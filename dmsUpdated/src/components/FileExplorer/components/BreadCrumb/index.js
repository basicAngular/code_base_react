import React from "react";
import PropTypes from "prop-types";
import { inject } from "mobx-react";
import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import SortFilter from "./../SortFilter";
import messages from "./messages.js";

@inject("breadCrumbStore")
 class BreadCrumb extends React.Component {

    static propTypes = {    
        getByDate: PropTypes.func,
        activeType: PropTypes.string,
        getByFolder: PropTypes.func,
        breadCrumbStore: PropTypes.object,
        getByBreadCrumb: PropTypes.func,
        quickFilterBy: PropTypes.func,
        activeFilters: PropTypes.array,
        toggleGroupBy: PropTypes.func,
        breadcrumbs: PropTypes.object,
        isDocuments: PropTypes.bool,
        sortBy: PropTypes.func,
        display: PropTypes.string,
        showMenu: PropTypes.bool,
        toggleMenu: PropTypes.func
    }

    state = { 
        sortByName: "asc,desc",
        sortBySize: "asc,desc",
        sortByDate: "asc,desc"
    }

    toggleSortByName() {
        const {sortBy} = this.props;
        const {sortByName} = this.state;
        let sortOrder = sortByName === "asc,desc" ? "desc,asc" : "asc,desc";
        this.setState({ sortByName: sortOrder, sortByDate: "asc,desc", sortBySize: "asc,desc" }, () => {
            sortBy({sortType: "name",sortOrder: sortOrder});
        });
    }

    toggleSortBySize() {
        const {sortBy} = this.props;
        const {sortBySize} = this.state;
        let sortOrder = sortBySize === "asc,desc" ? "desc,asc" : "asc,desc";
        this.setState({ sortBySize: sortOrder, sortByName: "asc,desc", sortByDate: "asc,desc" }, () => {
            sortBy({sortType: "size",sortOrder: sortOrder});
        });
    }
    
    toggleSortByDate() {
        const {sortBy} = this.props;
        const {sortByDate} = this.state;
        let sortOrder = sortByDate === "asc,desc" ? "desc,asc" : "asc,desc";
        this.setState({ sortByDate: sortOrder, sortByName: "asc,desc", sortBySize: "asc,desc" }, () => {
            sortBy({sortType: "created_at",sortOrder: sortOrder});
        });
    }

    handleBreadCrumb(folder) {
        const {getByBreadCrumb, getByFolder, getByDate, activeType, breadCrumbStore} = this.props;
        switch(activeType) {
            case "date":
                breadCrumbStore.filterByDate(folder);
                getByDate(folder);
                break;
            case "folder":
                getByBreadCrumb(folder);
                getByFolder(folder);
                break;
            default:
        }
    }

    render() {
        const {sortBySize, sortByDate, sortByName} = this.state;
        const {quickFilterBy, activeFilters, toggleGroupBy, activeType, breadcrumbs, isDocuments, sortBy, display, showMenu, toggleMenu} = this.props;
        const folders = Object.values(breadcrumbs);

        return (
            <div className="breadcrumb">
                <ol className="crumbs">
                    <li>
                        <span className="cursor upper-case">
                            <a onClick={() => toggleGroupBy(activeType)}>
                                <FormattedMessage {...messages.title} />
                            </a>
                        </span>
                    </li>
                    {folders.map((folder, key) => (
                        <li key={key}>
                            <a onClick={() => this.handleBreadCrumb(folder)}>{folder.name}</a>
                        </li> 
                    ))}
                    <i 
                        className={classNames("pull-right toggle-menu fa ",{"fa-angle-up":showMenu},{"fa-angle-down":!showMenu})}
                        onClick={() => toggleMenu()}
                    />
                </ol>
                {display === "grid" ? (
                    <SortFilter sortBy={sortBy} toggleGroupBy={toggleGroupBy}/>
                ) : (
                    <ol>
                        <li>
                            <span className="cursor upper-case" onClick={() => this.toggleSortByName()}>
                                <i className={classNames("fa ", {"fa-angle-down": sortByName === "desc,asc"}, {"fa-angle-up": sortByName === "asc,desc"} )}  />&nbsp;
                                <FormattedMessage {...messages.sortByName} />
                            </span>
                        </li>
                        <li>
                            <span className="cursor upper-case" onClick={() => this.toggleSortByDate()}>
                                <i className={classNames("fa ", {"fa-angle-down": sortByDate === "asc,desc"}, {"fa-angle-up": sortByDate === "desc,asc"} )}  />&nbsp;
                                <FormattedMessage {...messages.sortByDate} />
                            </span>
                        </li>
                        <li>
                            <span className="cursor upper-case" onClick={() => this.toggleSortBySize()}>
                                <i className={classNames("fa ", {"fa-angle-down": sortBySize === "asc,desc"}, {"fa-angle-up": sortBySize === "desc,asc"} )}  />&nbsp;
                                <FormattedMessage {...messages.sortBySize} />
                            </span>
                            </li>
                        {isDocuments && <li>
                            <span className="cursor upper-case" onClick={() => quickFilterBy("is_favorite")}>
                                <i className={classNames("cursor fa fa-star", {"active": activeFilters.includes("is_favorite")})} />
                            </span>
                        </li>}
                        {isDocuments && <li>
                            <span className="cursor upper-case" onClick={() => quickFilterBy("is_sos")}>
                                <i className={classNames("cursor fa fa-ambulance", {"active": activeFilters.includes("is_sos")})} />
                            </span>
                        </li>}
                        {isDocuments && <li>
                            <span className="cursor upper-case" onClick={() => quickFilterBy("is_tax_relevant")}>
                                <i className={classNames("cursor fa fa-building", {"active": activeFilters.includes("is_tax_relevant")})} />
                            </span>
                        </li>}
                    </ol>
                )}          
            </div>
        );        
    }
}

export default BreadCrumb;
