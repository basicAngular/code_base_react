import React from "react";
import File from "./components/File";
import _ from "lodash";
import PropTypes from "prop-types";
import moment from "moment";
import {observer} from "mobx-react";
// import Folder from "./components/Folder";
// import classnames from "classnames/bind";
// import style from "./style.scss";
//
// const cx = classnames.bind(style);
@observer
class GridView extends React.Component {
    static defaultProps = {
        group: null,
        filter: null,
        tag: null,
    }


    static propTypes = {
        displayMode: PropTypes.number,
        files:  PropTypes.array,
        folders: PropTypes.array,
        tags: PropTypes.array,
        query: PropTypes.string
    }

    // toggleSos(fileId) {
    //     this.setState({...this.state, files: { ...this.state.files, [fileId]: {...this.state.files[fileId], isSos: !this.state.files[fileId].isSos}  }});
    // }
    //
    // toggleFavorite(fileId) {
    //     this.setState({...this.state, files: { ...this.state.files, [fileId]: {...this.state.files[fileId], isFavorite: !this.state.files[fileId].isFavorite}  }});
    // }

    state = {
        files: this.props.files,
        folders: this.props.folders,
        tags: this.props.tags,
        companies: this.props.companies,
        group: this.props.group,
        filter: this.props.filter,
        tag: this.props.tag,
        query: this.props.query
    };

    constructor(props) {
        super(props);
        this.renderFile = this.renderFile.bind(this);
    }

    getNamedTags(tags) {
        return this.state.tags.filter((tag) => tags.includes(tag.id)).map((tag) => tag.name);
    }

    getCompanyName(id) {
        const company = this.state.companies.find((company) => company.id === id);
        return company ? company.name : null;
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            files: nextProps.files,
            folders: nextProps.folders,
            tags: nextProps.tags,
            companies: nextProps.companies,
            group: nextProps.group,
            filter: nextProps.filter,
            tag: nextProps.tag,
            query: nextProps.query
        });
    }

    showFile(file) {
        const filterResult = (!this.state.filter) || (this.state.filter === "sos"  && file.is_sos) ||  (this.state.filter === "tax_relevant"  && file.is_tax_relevant) ||  (this.state.filter === "locker"  && file.is_locker) ||  (this.state.filter === "favorite"  && file.is_favorite);
        const tagResult = (!this.state.tag) || (file.tags.includes(this.state.tag));
        const queryResult = (!this.state.query) || (file.name.toLowerCase().includes(this.state.query.toLowerCase()));
        return filterResult && tagResult && queryResult;
    }

    renderFile(file) {
        if (this.showFile(file)) {
            return (<div key={file.id} style={{marginBottom: "15px"}}>
                <File
                    id={file.id}
                    name={file.name}
                    extension={file.extension}
                    size={file.size}
                    added={moment(file.date, "YYYY-MM-DD").format("DD.MM.YYYY")}
                    isSos={file.is_sos}
                    isFavorite={file.is_favorite}
                    isTaxRelevant={file.is_tax_relevant}
                    tags={file.tags}
                />
                    {/* tags={this.getNamedTags(file.tags)} */}
                
            </div>);
        }
        //     if (this.state.filter === "sos" && file.isSos)
        //         return (
        //             <div key={file.id} style={{marginBottom: "15px"}}>
        //                 <File
        //                     id={file.id}
        //                     name={file.name}
        //                     extension={file.extension}
        //                     size={file.size}
        //                     added={file.added.format("HH:mm DD.MM.YYYY")}
        //                     tags={this.getNamedTags(file.tags)}
        //                     isSos={file.isSos}
        //                     isFavorite={file.isFavorite}
        //                 />
        //             </div>
        //         );
        //     else if (this.state.filter === "favorite" && file.isFavorite)
        //         return (
        //             <div key={file.id} style={{marginBottom: "15px"}}>
        //                 <File
        //                     id={file.id}
        //                     name={file.name}
        //                     extension={file.extension}
        //                     size={file.size}
        //                     added={file.added.format("HH:mm DD.MM.YYYY")}
        //                     tags={this.getNamedTags(file.tags)}
        //                     isSos={file.isSos}
        //                     isFavorite={file.isFavorite}
        //                 />
        //             </div>
        //         );
        // } else {
        //     return (
        //         <div key={file.id} style={{marginBottom: "15px"}}>
        //             <File
        //                 id={file.id}
        //                 name={file.name}
        //                 extension={file.extension}
        //                 size={file.size}
        //                 added={file.added.format("HH:mm DD.MM.YYYY")}
        //                 tags={this.getNamedTags(file.tags)}
        //                 isSos={file.isSos}
        //                 isFavorite={file.isFavorite}
        //             />
        //         </div>
        //     );
        // }

    }

    renderGroup(files, title) {
        if (files.length === 0)
            return null;
        return (
            <div key={title}>
                <h2 className="m-sm" >{title}</h2>
                <hr className="m-sm" />
                <div className="grid-md" style={{display: "flex", flexWrap: "wrap"}}>
                    {files.map(this.renderFile)}
                </div>
                <hr className="m-sm" />
            </div>
        );
    }

    renderCompanyGroup(files, companyId) {
        // return (this.renderGroup(files, this.getCompanyName(companyId)));)
        return (this.renderGroup(files, files[0].company ? files[0].company : "Unbekannt"));
    }

    renderFolder(folder) {
    }

    render() {
        if (this.state.group)
        {
            let content = null;
            if (this.state.group === "companies")
            {
                const group = _.groupBy(this.state.files, "company");
                const sorted = Object.keys(group).sort();
                content = sorted.map(v => {
                    return this.renderCompanyGroup(group[v]);
                });
                // content = _.map(_.groupBy(this.state.files, "company"), this.renderCompanyGroup.bind(this));
            } else if (this.state.group === "year") {
                const group = _.groupBy(this.state.files, (file) => moment(file.date, "YYYY-MM-DD").format("YYYY"));
                const sorted = Object.keys(group).sort().reverse();
                content = sorted.map(v => {
                    return this.renderGroup(group[v], v);
                });
                // content = _.map(_.groupBy(this.state.files, (file) => moment(file.date, "YYYY-MM-DD").format("YYYY")), this.renderGroup.bind(this));
            } else if (this.state.group === "month") {
                const group = _.groupBy(this.state.files, (file) => moment(file.date, "YYYY-MM-DD").format("YYYY-MM"));
                const sorted = Object.keys(group).sort().reverse();
                content = sorted.map(v => {
                    return this.renderGroup(group[v], moment(v, "YYYY-MM").format("MMMM YYYY"));
                });
                // content = _.map(_.groupBy(this.state.files, (file) => moment(file.date, "YYYY-MM-DD").format("MMMM YYYY")), this.renderGroup.bind(this));
            }
            return (
                <div>
                    {content}
                </div>
            );
        } else {
            return (
                <div>
                    <div className="grid-md" style={{display: "flex", flexWrap: "wrap"}}>
                        {_.map(this.state.folders, this.renderFolder)}
                        {_.map(this.state.files, this.renderFile)}
                    </div>
                    <hr className="m-sm" />
                </div>
            );
        }

    }
}

export default GridView;
