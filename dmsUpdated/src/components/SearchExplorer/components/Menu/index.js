import React from "react";
import RadioButtonGroup from "../../../Common/RadioButtonGroup";
import {Link} from "react-router-dom";

class Menu extends React.Component {
    static defaultProps = {
        tags: []
    }

    static propTypes = {
        // setDisplayMode: PropTypes.function
    }

    state = {
        filter: null,
        group: null,
        tags: this.props.tags,
        tag: null,
    }

    setFilter(filter) {
        if (this.state.filter === filter)
            this.setState({...this.state, filter: null});
        else
            this.setState({...this.state, filter});

        this.props.setFilter(filter);
    }

    setTagFilter(tag) {
        if (this.state.tag === tag)
            this.setState({...this.state, tag: null});
        else
            this.setState({...this.state, tag});

        this.props.setTagFilter(tag);
    }

    setGroup(group) {
       this.setState({...this.state, group});

        this.props.setGroupStyle(group);
    }

    render() {
        return (
            <div className="file-manager">
                <h5>Ansicht</h5>
                <RadioButtonGroup buttons={[
                    {
                        value: <i className="fa fa-th"></i>,
                        onClick: () => this.props.setDisplayMode(1),
                    },
                    // {
                    //     value: <i className="fa fa-list"></i>,
                    //     onClick: () => this.props.setDisplayMode(2),
                    // },
                ]} />
                {/* <h5>Sortierung</h5>
                <RadioButtonGroup buttons={[
                    {
                        value: [
                            <i key="1" className="fa fa-font"></i>,
                            <i key="2" className="fa fa-sort-amount-asc"></i>
                        ],
                        onClick: () => this.props.setDisplayMode(1),
                    },
                    {
                        value:                         <i className="fa fa-calendar"></i>
                        ,
                        onClick: () => this.props.setDisplayMode(2),
                    },
                ]} /> */}
                <div className="hr-line-dashed"></div>
                <Link to="c/documents/locker" className="btn btn-primary btn-block">Datei hochladen</Link>
                <div className="hr-line-dashed"></div>
                <h5>Dokumente</h5>
                <ul className="folder-list" style={{padding: 0}}>
                    {/* <li><a className={!this.state.group ? "active" : ""} onClick={() => this.setGroup(null)}><i className="fa fa-folder"></i> Ordner</a></li> */}
                    <li><a className={!this.state.group ? "active" : (this.state.group === "companies" ? "active" : "")} onClick={() => this.setGroup("companies")}><i className="fa fa-users"></i> Firmen/Personen</a></li>
                    {/* // <li><a href=""><i className="fa fa-files-o"></i> Typ</a></li> */}
                    <li><a className={this.state.group === "year" ? "active" : ""} onClick={() => this.setGroup("year")}><i className="fa fa-calendar"></i> Jahr</a></li>
                    <li><a className={this.state.group === "month" ? "active" : ""} onClick={() => this.setGroup("month")}><i className="fa fa-calendar"></i> Monat</a></li>
                </ul>
                <div className="hr-line-dashed"></div>
                <h5>Sofortfilter</h5>
                <ul className="folder-list" style={{padding: 0}}>
                    <li><a className={this.state.filter === "sos" ? "active" : ""} onClick={() => this.setFilter("sos")}><i className="fa fa-ambulance"></i> SOS</a></li>
                    <li><a className={this.state.filter === "favorite" ? "active" : ""} onClick={() => this.setFilter("favorite")}><i className="fa fa-star-o"></i> Favoriten</a></li>
                    <li><a className={this.state.filter === "tax_relevant" ? "active" : ""} onClick={() => this.setFilter("tax_relevant")}><i className="fa fa-building"></i> Einkommenssteuerrelevant</a></li>
                    <li><a className={this.state.filter === "locker" ? "active" : ""} onClick={() => this.setFilter("locker")}><i className="fa fa-archive"></i> Digitale Box</a></li>
                </ul>
                <div className="hr-line-dashed"></div>
                <h5 className="tag-title">Schlagworte</h5>
                <ul className="tag-list" style={{padding: 0}}>
                    {this.state.tags.map((tag, i) => <li key={i}><a  className={this.state.tag === tag ? "active" : ""} onClick={() => this.setTagFilter(tag)}>{tag}</a></li>)}
                </ul>
                <div className="clearfix"></div>
            </div>
        );
    }
}

export default Menu;
