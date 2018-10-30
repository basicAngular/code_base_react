import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { SubmissionError } from "redux-form";
import {kremplerCreate, kremplerUpdate} from "../../../../services/api";
import KremplerForm from "../../../../components/Form/Krempler";
import {toastr} from "react-redux-toastr";
import {routerActions} from "react-router-redux";
import { browserHistory } from "react-router";
import _ from "lodash";
import {fetchOne} from "../../../../ducks/krempler";

class KremplerFormContainer extends React.Component {
    static defaultProps = {
        kremplerId: null,
        krempler: {}
    }

    static propTypes = {
        kremplerId: PropTypes.number,
        krempler: PropTypes.object,
    }

    state = {
        kremplerId: this.props.kremplerId,
        krempler: this.props.krempler,
    }

    componentDidMount() {
        if (_.isEmpty(this.state.krempler) && this.state.kremplerId) {
            this.props.fetchOne(this.state.kremplerId);
        }

    }

    componentWillReceiveProps(nextProps) {
        if (_.isEmpty(this.state.krempler))
            this.setState({...this.state, krempler: nextProps.krempler});
    }

    componentWillUnmount() {

    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return false;
    // }

    handleSubmit(values) {
        if (!this.props.krempler.id) {
            // this.props.createKrempler({...values, contract_state});
            return kremplerCreate({...values})
                .then((response) => {
                    toastr.success(
                        "Klasse!",
                        "Der Krempler wurde erfolgreich erstellt.",
                        {
                            timeOut: 10000,
                            progressBar: false
                        }
                    );
                    // this.props.replace(`krempler/${response.data.id}`);
                    browserHistory.push("/krempler");
                })
                .catch((error) => {
                    toastr.error(
                        "Schade!",
                        "Das Formular enthält leider Fehler, daher konnte der Krempler nicht erstellt werden.",
                        {
                            timeOut: 10000,
                            progressBar: false
                        }
                    );
                    throw new SubmissionError(error.response.data);
                });
        } else {
            // this.props.updateKrempler({...values, contract_state});
            return kremplerUpdate({...values, id: this.state.kremplerId})
                .then(() =>{
                    toastr.success(
                        "Klasse!",
                        "Der Krempler wurde erfolgreich aktualisiert.",
                        {
                            timeOut: 10000,
                            progressBar: false
                        }
                    );
                    // this.props.replace(`krempler/${response.data.id}`);
                    browserHistory.push("/krempler");
                })
                .catch((error) => {
                    toastr.error(
                        "Schade!",
                        "Das Formular enthält leider Fehler, daher konnte der Krempler nicht erstellt werden.",
                        {
                            timeOut: 10000,
                            progressBar: false
                        }
                    );
                    throw new SubmissionError(error.response.data);
                });
        }

    }

    render() {
        return (
            <div>
                <KremplerForm enableReinitialize={true} onSubmit={this.handleSubmit.bind(this)} initialValues={this.state.krempler}/>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    let krempler = {};
    const kremplerId = ownProps.params.id;

    if (kremplerId && state.krempler.entities.length > 0) {
        krempler = _.find(state.krempler.entities, (krempler) => krempler.id === kremplerId);
    }
    return { kremplerId, krempler };
};

export default connect(mapStateToProps, { replace: routerActions.push, fetchOne })(KremplerFormContainer);
