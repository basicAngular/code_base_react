import LoadingSpinner from "components/LoadingSpinner";
import React, { Component } from "react";
import PropTypes from "prop-types";
//import IBox from "../../components/Ibox";
import SearchExplorer from "../../components/SearchExplorer";
import { inject, observer } from "mobx-react";

@inject("documentStore", "customerStore", "authStore")
@observer
class SearchBrowser extends Component {

    static propTypes = {
        tags: PropTypes.object,
        folders: PropTypes.object,
        companies: PropTypes.object,
        customerStore: PropTypes.object,
        documentStore: PropTypes.object,
        setParentTitle: PropTypes.func
    }

    componentWillMount() {
        // if (this.props.match.params.id) {
        //     this.props.documentStore.loadDocuments(this.props.match.params.id);
        // }
        // if (this.props.authStore.user.role === "customer") {
        this.props.customerStore.loadCustomers();
        
        this.props.setParentTitle("searchdocuments");    
        // } else {
        //     this.props.customerStore.loadCustomer(this.props.match.params.id, true).then((customer) => this.props.setParentTitle(`Dokumente von ${customer.first_name} ${customer.last_name}`));
        // }
    }

    componentDidMount() {
    }

    render() {
        if (this.props.customerStore.isLoading)
            return <LoadingSpinner />;
        return (
            <SearchExplorer
                files={this.props.documentStore.documents}
                folder={this.props.folders}
                tags={this.props.tags}
                companies={this.props.companies}
                onSosToggle={(fileId) => {
                    this.props.documentStore.toggle(fileId, "is_sos").then();
                }}
                onFavoriteToggle={(fileId) => {
                    this.props.documentStore.toggle(fileId, "is_favorite").then();
                }}
                onTaxRelevantToggle={(fileId) => {
                    this.props.documentStore.toggle(fileId, "is_tax_relevant").then();
                }}
            />
        );
    }

}

// const mapStateToProps = (state) => {
//     return {
//         files: state.documents.files,
//         folders: state.documents.folders,
//         companies: state.documents.companies,
//         tags: state.documents.tags,
//     };
// };

export default SearchBrowser;
