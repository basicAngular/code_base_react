import PDFModal from "components/FileExplorer/components/PDFModal";
import React from "react";
import GridView from "./components/GridView";
import PropTypes from "prop-types";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import {inject, observer} from "mobx-react";
import FileModifyModal from "./components/FileModifyModal";

@inject("documentStore")
@observer
class SearchExplorer extends React.Component {

    static childContextTypes = {
        onSosToggle: PropTypes.func.isRequired,
        onFavoriteToggle: PropTypes.func.isRequired,
        onTaxRelevantToggle: PropTypes.func.isRequired,
        openFile: PropTypes.func.isRequired,
        modifyFile: PropTypes.func.isRequired,
    }

    getChildContext() {
        return {
            onSosToggle: this.props.onSosToggle,
            onFavoriteToggle: this.props.onFavoriteToggle,
            onTaxRelevantToggle: this.props.onTaxRelevantToggle,
            openFile: this.openFile.bind(this),
            modifyFile: this.modifyFile.bind(this),
        };
    }

    static defaultProps = {
        displayMode: 1,
        files: [],
        folders: [],
        companies: [],
        group: "companies",
        filter: null,
        tag: null,
    }

    static propTypes = {
        tag: PropTypes.object,
        group: PropTypes.string,
        filter: PropTypes.object,
        file: PropTypes.object,
        show: PropTypes.object,
        onHide: PropTypes.func,
        documentStore: PropTypes.object,
        displayMode: PropTypes.number,
        files:  PropTypes.array,
        folders: PropTypes.array,
        tags: PropTypes.array,
        companies: PropTypes.array,
        onSosToggle: PropTypes.func.isRequired,
        onFavoriteToggle: PropTypes.func.isRequired,
        onTaxRelevantToggle: PropTypes.func.isRequired
    }

    state = {
        displayMode: this.props.displayMode,
        files: this.props.files,
        folders: this.props.folders,
        tags: this.props.tags,
        companies: this.props.companies,
        group: this.props.group,
        filter: this.props.filter,
        tag: this.props.tag,
        showModal: false,
        showModifyModal: false,
        query: ""
    }

    switchMode = (mode) => {
        this.setState({...this.state, displayMode: mode});
    }

    setGroupStyle = (group) => {
        // if (this.state.group === group)
        //     this.setState({...this.state, group: null});
        // else
        this.setState({...this.state, group});
    }

    setFilter = (filter) => {
        if (this.state.filter === filter)
            this.setState({...this.state, filter: null});
        else
            this.setState({...this.state, filter});

    }

    setTagFilter = (tag) => {
        if (this.state.tag === tag)
            this.setState({...this.state, tag: null});
        else
            this.setState({...this.state, tag});

    }


    closeModal() {
        this.setState({ ...this.state, showModal: false });
    }

    closeModifyModal() {
        this.setState({ ...this.state, showModifyModal: false });
    }
    
    openModal() {
        this.setState({ ...this.state, showModal: true });
    }
    
    openFile(file) {
        this.props.documentStore.getFileContent(file.id).then((url) => {
            // const url = URL.createObjectURL(content);
            this.setState({ ...this.state, pdf: url, fileName: file.name, showModal: true});
        });
    }
    
    modifyFile(file) {
        this.setState({ ...this.state, showModifyModal: true, modify: file});
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.documentStore.query(this.search.value);
    }

    componentWillMount() {
        //this.props.documentStore.clear();
    }

    render() {
    //     const tags = [...new Set(this.props.documentStore.documents.reduce((acc, v) => 
    //     acc = [...acc, ...v.tags]
    // , []))];
        return (
            <div className="row">
                <div className="col-lg-8 col-lg-offset-2">
                <div className="search-form">
                <form onSubmit={this.onSubmit.bind(this)} autoComplete="off">
                    <div className="form-group">
                        <label>Suchanfrage</label>
                        <input type="text" placeholder="" ref={input => this.search = input} name="search" className="form-control" />
                        </div>
                    {/* <div className="form-group">
                        <label>Firma/Person</label>
                        <input type="text" placeholder="" ref={input => this.company = input} name="search" className="form-control" />
                        </div> */}
                        <div className="text-center">
                        <button className="btn btn-primary text-center" type="submit">
                                Suche
                            </button>
                            </div>
                    </form>
                </div>
                <PDFModal show={this.state.showModal} onHide={this.closeModal.bind(this)} pdf={this.state.pdf} fileName={this.state.fileName} />
                {this.state.showModifyModal && <FileModifyModal show={this.state.showModifyModal} onHide={this.closeModifyModal.bind(this)} file={this.state.modify} />}
                <div className="col-lg-12">
                    <CSSTransitionGroup
                        className="transition-container"
                        component="div"
                        transitionEnterTimeout={1000}
                        transitionLeaveTimeout={1000}
                        transitionName={{
                            enter: "animated",
                            enterActive: "fadeInRight",
                            leave: "animated",
                            leaveActive: "fadeOutDown"
                        }}>
                        {this.state.displayMode === 1 && <GridView
                            files={this.props.documentStore.documents}
                            filter={this.state.filter}
                            tag={this.state.tag}
                            query={this.state.query}
                        />}
                    </CSSTransitionGroup>

                </div>
            </div>
            </div>
        );
    }
}

export default SearchExplorer;
