import React from "react";
import PropTypes from "prop-types";
import LoadingSpinner from "components/LoadingSpinner";
import { withRouter } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { inject, observer } from "mobx-react";
import ServicesPage from "components/Services";

@withRouter
@inject("serviceStore", "authStore", "fileStore")
@observer
class Services extends React.Component {
  state = {}

  static propTypes = {
    setParentTitle: PropTypes.func,
    serviceStore: PropTypes.object,
    authStore: PropTypes.object,
    fileStore: PropTypes.object
  }

  componentWillMount() {
    this.props.setParentTitle("Services");
    this.props.serviceStore.loadServices();
    this.props.fileStore.loadAllDocuments();
    this.props.authStore.pullUser();
  }

  addService(service) {
    this.props.serviceStore.createService(service);
  }

  updateService(service) {
    this.props.serviceStore.updateService(service);
  }

  deleteService(id) {
    this.props.serviceStore.deleteService(id);
  }

  render() {
    const { setSearch } = this.props.fileStore;
    const { services, getService } = this.props.serviceStore;
    const documents = this.props.fileStore.getDocuments;
    if (this.props.authStore.isLoading)
      return (
        <div>
          <LoadingSpinner />
        </div>
      );
    return (
      <Row>
        <Col lg={12}>
          <ServicesPage
            services={services}
            documents={documents}
            getService={getService}
            searchFiles={setSearch}
            addService={this.addService.bind(this)}
            updateService={this.updateService.bind(this)}
            deleteService={this.deleteService.bind(this)}
          />
        </Col>
      </Row>
    );
  }
}

export default Services;
