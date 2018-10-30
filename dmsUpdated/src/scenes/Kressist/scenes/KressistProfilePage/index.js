import dummyWoman from "data/img/dummy_woman.png";
import dummyMan from "data/img/dummy_man.png";
import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import { Prompt } from "components/SweetAlertHandler";
import moment from "moment";
import "./style.scss";

@inject("kressistStore", "kremplerStore", "authStore")
@observer
class KressistProfilePage extends React.Component {
    
    static propTypes = {
        hideSweetAlert: PropTypes.func,
        showSweetAlert: PropTypes.func,
        match: PropTypes.object,
        kremplerStore: PropTypes.object,
        setParentTitle: PropTypes.func,
        kressistStore: PropTypes.object,
        authStore: PropTypes.object
    }

    componentDidMount() {

    }

    componentWillMount() {
        if (this.props.match.params.id) {
            this.props.kressistStore.loadKressist(this.props.match.params.id, true);
        }
        this.props.setParentTitle("kremplerassistentdetailansicht");
    }

    renderBirthday(birthday) {
        const birthdayInCurrentYear = moment(birthday, "YYYY-MM-DD").year(moment().year());
        if (birthdayInCurrentYear.isAfter(moment()))
            return birthdayInCurrentYear.fromNow();
        else
            return birthdayInCurrentYear.add(1, "y").fromNow();
    }

    render() {
        const {id} = this.props.match.params;
        const kressist  = this.props.kressistStore.getKressist(id);
        const confirmDeleteSweetAlert = () => this.props.showSweetAlert(
            <Prompt close={this.props.hideSweetAlert} onConfirm={() => {this.props.kressistStore.deleteKressist(id);}} onCancel={() => {}}/>
        );
        if (!kressist) return <div />;

        return( 
          <div className="row">
            <div className="col-lg-4 col-lg-offset-4">
              <div className="ibox float-e-margins">
                <div className="ibox-content">
                  <div className="row ">
                    {/* <div className="col-sm-4 col-sm-offset-1">
                     <div  className="text-center"> <img alt="User Pic" src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg" id="profile-image1" className="img-circle img-responsive" /> 
                     </div>
                    </div> */}
                    <div className="col-sm-6 col-sm-offset-3 text-center">
                      <img alt="User Pic" src={kressist.gender === "male" ? dummyMan : dummyWoman} id="profile-image1" className="img-circle img-responsive m-b-md" />
                      <h4 className="">
                        {kressist.first_name + " " + kressist.last_name}
                      </h4>
                      <p className="text-muted">
                        <i className="fa fa-fw fa-map-marker" aria-hidden="true" /> {kressist.street}, {kressist.postal_code} {kressist.city}
                      </p>
                      <p className="">
                        <i className="fa fa-fw fa-birthday-cake" aria-hidden="true" /> {this.renderBirthday(kressist.birthday)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="ibox-footer">
                  <ul className="list-inline pull-right" style={{ marginBottom: 0, fontSize: "2.0em" }}>
                    <li>
                      <Link to={`/kressist/${id}/edit`} className="text-warning">
                        <i className="fa fa-pencil" />
                      </Link>
                    </li>
                    <li>
                      <a className="text-danger" onClick={() => confirmDeleteSweetAlert()}>
                        <i className="fa fa-trash" />
                      </a>
                    </li>
                  </ul>
                  <ul className="list-inline" style={{ marginBottom: 0, fontSize: "2.0em" }}>
                    <li>
                      <a href={`mailto:${kressist.email}`} className="text-success">
                        <i className="fa fa-envelope" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
    }
}

export default KressistProfilePage;
