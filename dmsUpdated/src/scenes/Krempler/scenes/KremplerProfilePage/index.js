import dummyWoman from "data/img/dummy_woman.png";
import dummyMan from "data/img/dummy_man.png";
import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import moment from "moment";
import "./style.scss";

@inject("kremplerStore")
@observer
class KremplerProfilePage extends React.Component {

    static propTypes = {
        match: PropTypes.object,
        kremplerStore: PropTypes.object,
        setParentTitle: PropTypes.func
    }

    componentDidMount() {

    }

    componentWillMount() {
        if (this.props.match.params.id) {
            this.props.kremplerStore.loadKrempler(this.props.match.params.id, true);
        }
        this.props.setParentTitle("kremplerdetailansicht");
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
        const {id} = this.props.match.params;
        const krempler  = this.props.kremplerStore.getKrempler(id);
        if (!krempler) return <div />;

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
                      <img alt="User Pic" src={krempler.gender === "male" ? dummyMan : dummyWoman} id="profile-image1" className="img-circle img-responsive m-b-md" />
                      <h4 className="">
                        {krempler.first_name + " " + krempler.last_name}
                      </h4>
                      <p className="text-muted">
                        <i className="fa fa-fw fa-map-marker" aria-hidden="true" /> {krempler.street}, {krempler.postal_code} {krempler.city}
                      </p>
                      <p className="">
                        <i className="fa fa-fw fa-birthday-cake" aria-hidden="true" /> {this.renderBirthday(krempler.birthday)}
                      </p>
                      <p className="">
                        <i className="fa fa-fw fa-file-text-o" aria-hidden="true" /> {this.renderContractStart(krempler.contract_start)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="ibox-footer">
                  <ul className="list-inline pull-right" style={{ marginBottom: 0, fontSize: "2.0em" }}>
                    <li>
                      <Link to={`/krempler/${id}/edit`} className="text-warning">
                        <i className="fa fa-pencil" />
                      </Link>
                    </li>
                    <li>
                      <a className="text-danger" onClick={() => this.props.kremplerStore.deleteKrempler(id)}>
                        <i className="fa fa-trash" />
                      </a>
                    </li>
                  </ul>
                  <ul className="list-inline" style={{ marginBottom: 0, fontSize: "2.0em" }}>
                    <li>
                      <a href={`mailto:${krempler.email}`} className="text-success">
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

export default KremplerProfilePage;
