import LoadingSpinner from "components/LoadingSpinner";
import dummyWoman from "data/img/dummy_woman.png";
import dummyMan from "data/img/dummy_man.png";
import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";

import "./style.scss";

@inject("customerStore", "kremplerStore")
@observer
class CustomerProfilePage extends React.Component {

    static propTypes = {
        match: PropTypes.object,
        kremplerStore: PropTypes.object,
        customerStore: PropTypes.object,
        setParentTitle: PropTypes.func
    }

    componentDidMount() {}

    componentWillMount() {
        if (this.props.match.params.id) {
            this.props.customerStore.loadCustomer(this.props.match.params.id, true).then(customer => {
                this.props.kremplerStore.loadKrempler(customer.krempler, true);
            });
        }
        this.props.setParentTitle("kundendetailansicht");
    }

    renderBirthday(birthday) {
        const birthdayInCurrentYear = moment(birthday, "YYYY-MM-DD").year(moment().year());
        if (birthdayInCurrentYear.isAfter(moment()))
            return birthdayInCurrentYear.fromNow();
        else
            return birthdayInCurrentYear.add(1, "y").fromNow();
    }


    renderContractStart(contractStart) {
        return moment(contractStart, "YYYY-MM-DD").fromNow();
    }

    render() {
        if (this.props.customerStore.isLoading || this.props.kremplerStore.isLoading)
            return <LoadingSpinner />;
        const {id} = this.props.match.params;
        const customer = this.props.customerStore.getCustomer(id);
        if (!customer) return <LoadingSpinner />;
        
        const krempler = this.props.kremplerStore.getKrempler(customer.krempler);
        if (!customer || !krempler) return <LoadingSpinner />;
        
        return <div className="row">
            <div className="col-lg-4 col-lg-offset-4">
              <div className="ibox float-e-margins">
                <div className="ibox-content">
                  <div className="row ">
                    {/* <div className="col-sm-4 col-sm-offset-1">
                     <div  className="text-center"> <img alt="User Pic" src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg" id="profile-image1" className="img-circle img-responsive" /> 
                     </div>
                    </div> */}
                    <div className="col-sm-6 col-sm-offset-3 text-center">
                      {customer.gender === "male" ? <img alt="User Pic" src={dummyMan} id="profile-image1" className="img-circle img-responsive m-b-md" /> : <img alt="User Pic" src={dummyWoman} id="profile-image1" className="img-circle img-responsive m-b-md" />}
                      <h4 className="">
                        {customer.first_name + " " + customer.last_name}
                      </h4>
                      <h5>
                        Krempler: {krempler.first_name} {krempler.last_name}
                      </h5>
                      <p className="text-muted">
                        <i className="fa fa-fw fa-map-marker" aria-hidden="true" /> {customer.street}, {customer.postal_code} {customer.city}
                      </p>
                      <p className="">
                        <i className="fa fa-fw fa-birthday-cake" aria-hidden="true" /> {this.renderBirthday(customer.birthday)}
                      </p>
                      <p className="">
                        <i className="fa fa-fw fa-file-text-o" aria-hidden="true" /> {this.renderContractStart(customer.contract_start)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="ibox-footer">
                  <ul className="list-inline pull-right" style={{ marginBottom: 0, fontSize: "2.0em" }}>
                    <li>
                      <Link to={`/customer/${id}/edit`} className="text-warning">
                        <i className="fa fa-pencil" />
                      </Link>
                    </li>
                    <li>
                      <a className="text-danger" onClick={() => this.props.customerStore.deleteCustomer(id)}>
                        <i className="fa fa-trash" />
                      </a>
                    </li>
                  </ul>
                  <ul className="list-inline" style={{ marginBottom: 0, fontSize: "2.0em" }}>
                    <li>
                      <a href={`mailto:${customer.email}`} className="text-success">
                        <i className="fa fa-envelope" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>;
    }
}

export default CustomerProfilePage;
