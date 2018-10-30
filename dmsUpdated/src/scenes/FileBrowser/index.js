import React, {Component} from "react";
import PropTypes from "prop-types";
import {toJS} from "mobx";
import {inject, observer} from "mobx-react";
import {Row} from "react-bootstrap";
import FileExplorer from "../../components/FileExplorer";
import Filters from "../../components/FileExplorer/filters";
import {DragDropContext} from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { debug } from "util";

@inject("documentStore", "fileStore", "authStore", "uploadStore", "folderStore", "breadCrumbStore", "customerStore")
@observer
class FileBrowser extends Component {
  state = {
    view: "folders",
    display: "grid",
    groupBy: null,
    documents: [],
    searchText: "",
    documentsFrom: "",
    activeType: "folder",
    filters: [],
    tagFilters: [],
    mode: "manager",
    showMenu: true,
    activeFolder: ""
  };

  static propTypes = {
    setParentTitle: PropTypes.func,
    breadCrumbStore: PropTypes.object,
    documentStore: PropTypes.object,
    uploadStore: PropTypes.object,
    fileStore: PropTypes.object,
    authStore: PropTypes.object
  }

  constructor(props) {
    super(props);
    props.documentStore.loadTags();
  }

  componentWillMount() {
    
    //this.props.authStore.load();
    this.props.customerStore.loadCustomers();
    this.props.setParentTitle("filebrowsertitle");
  }

  getFiles = folder => {
    
    const {activeType} = this.state;
    const {breadCrumbStore, fileStore} = this.props;
    this.setState({activeFolder: folder.name});
    breadCrumbStore.add(folder);
    if (folder.type === "date") {
      fileStore.groupFolderByYear(folder.documents);
    } else if(activeType === "folder") {
      fileStore.getByFolder(folder);
      this.setState({documentsFrom: ""});
      this.clearSearch();
    } else {
      fileStore.groupFilesByMonth(folder.documents);
      this.setState({documentsFrom: ""});
    }
  };

  getByDate = folder => {
    
    const {fileStore} = this.props;
    if (folder.type === "date") {
      fileStore.groupFolderByYear(folder.documents);
    } else {
      fileStore.groupFilesByMonth(folder.documents);
      this.setState({documentsFrom: ""});
    }
  }
  
  toggleDisplay = display => {
    
    this.setState({ display });
  };

  toggleGroupBy = type => {
    this.props.breadCrumbStore.clear();
    this.props.fileStore.setGrouping(type);
    this.setState({ view: "folders", activeType: type, activeFolder:"", documentsFrom: "" });
  };

  toggleFilterBy = filter => {
    
    let {filters} = this.state;
    let index = filters.findIndex(el => el === filter);
    index === -1 ? filters.push(filter) : filters.splice(index, 1);
    this.setState({ filters });
    this.props.fileStore.setFilters(filters);
    this.setState({
      view: "files",
      documentsFrom: "",
      activeFolder: ""
    });
  };

  toggleMenu() {
    
    const {showMenu} = this.state;
    this.setState({showMenu: !showMenu});
  };

  onSelectTag = tag => {
    
    let {tagFilters} = this.state;
    let index = tagFilters.findIndex(el => el === tag);
    index === -1 ? tagFilters.push(tag) : tagFilters.splice(index, 1);
    this.setState({ tagFilters });
    this.props.fileStore.setTags(tagFilters);
    this.setState({
      view: "files",
      documentsFrom: "",
      activeFolder:""
    });
  };

  onSortBy = sort => {
    
    const {sortType, sortOrder} = sort;
    if(sortType.length !== 0 && sortOrder.length !== 0) {
      this.props.fileStore.setSort(sort);
      this.setState({
        view: "files",
        documentsFrom: "",
        activeFolder:""
      })
    }
  };

  search = e => {
    
    this.setState({ searchText: e.target.value, documentsFrom: "props",view: "folders" });
    this.props.fileStore.setSearch(e.target.value);
    this.setState({
      view: "files",
      documentsFrom: "",
      activeFolder:""
    })
  };

  changeMode = mode => {
    this.setState({ mode });
  }

  clearTags = () => {
    
    const tagFilters = [];
    this.setState({ tagFilters });
    this.props.fileStore.setTags(tagFilters);
    this.clearState();
  }

  clearGrouping = () => {
    
    this.setState({ groupBy: null, activeType: "" });
    this.props.fileStore.setGrouping("");
    this.clearState();
  }

  clearFilterBy = () => {
    
    const filters = [];
    this.setState({ filters });
    this.props.fileStore.setFilters(filters);
    this.clearState();
  }

  clearState = () => {
    this.setState({
      view: "files",
      documentsFrom: "",
      activeFolder: ""
    });
  }

  clearSearch = () => {
    this.props.fileStore.clearSearch();
    this.setState({ searchText: "" });
  }

  clearParams = () => {
    this.clearFilterBy();
    this.clearTags();
    this.clearGrouping();
    this.props.fileStore.setHome();
  }

  render() {
    const {documentStore, fileStore, breadCrumbStore, uploadStore} = this.props;
    const {
      searchText,
      activeType,
      tagFilters,
      showMenu,
      filters,
      display,
      view,
      mode,
    } = this.state;
    return (
      <Row>
        {showMenu &&
          <Filters
            mode={mode}
            display={display}
            searchValue={searchText}
            activeType={activeType}
            tagFilters={tagFilters}
            activeFilters={filters}
            documentStore={documentStore}
            authors={toJS(fileStore.authors)}
            tags={documentStore.tagsRegistry}
            search={e => this.search(e)}
            sortBy={sort => this.onSortBy(sort)}
            clearParams={() => this.clearParams()}
            selectTag={tag => this.onSelectTag(tag)}
            changeMode={mode=> this.changeMode(mode)}
            toggleDisplay={view => this.toggleDisplay(view)}
            toggleGroupBy={type => this.toggleGroupBy(type)}
            quickFilterBy={filter => this.toggleFilterBy(filter)}
          />
        }
        <FileExplorer
          view={view}
          mode={mode}
          display={display}
          showMenu={showMenu}
          fileStore={fileStore}
          activeFilters={filters}
          activeType={activeType}
          uploadStore={uploadStore}
          files={toJS(fileStore.file)}
          documentStore={documentStore}
          authors={toJS(fileStore.authors)}
          isLoading={documentStore.isLoading}
          activeFolder={this.state.activeFolder}
          emptyFolders={toJS(fileStore.emptyFolders)}
          breadcrumbs={toJS(breadCrumbStore.breadcrumbs)}
          sortBy={sort => this.onSortBy(sort)}
          getFiles={folder => this.getFiles(folder)}
          getByDate={folder => this.getByDate(folder)}
          toggleMenu={this.toggleMenu.bind(this)}
          toggleGroupBy={type => this.toggleGroupBy(type)}
          quickFilterBy={filter => this.toggleFilterBy(filter)}
          getByBreadCrumb={folder => breadCrumbStore.getBy(folder)}
          getByFolder={folder => this.props.fileStore.getByFolder(folder)}
        />
      </Row>
    );
  }
}

export default DragDropContext(HTML5Backend)(FileBrowser);