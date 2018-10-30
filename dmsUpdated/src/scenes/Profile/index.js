import React from "react";
import PropTypes from "prop-types";
import LoadingSpinner from "components/LoadingSpinner";
import { withRouter } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { inject, observer } from "mobx-react";
import { injectIntl } from "react-intl";
import ProfilePage from "components/Profile";
import { fields, plugins } from "components/Profileform";
import messages from "components/Profileform/messages";
import MobxReactForm from "mobx-react-form";

@withRouter
@inject("authStore")
@observer
class Profile extends React.Component {
  
  static propTypes = {
    authStore: PropTypes.object,
    setParentTitle: PropTypes.func
  }

  state = {
    edit: {
      personal: false,
      account: false,
      bank: false
    }
  }

  componentWillMount() {
    this.props.authStore.pullUser();
    this.props.setParentTitle("profile");
  }

  handleEdit(type) {
    const edit = this.state.edit;
    edit[type] = !edit[type];
    this.setState({edit});
  }
  
  handleSubmit(type, values) {
    if(type === "account") {
      const { old_password, new_password } = values;
      if(old_password!=="" || new_password!=="")
      {
        this.props.authStore.updatePassword({ oldPassword: old_password, newPassword: new_password });
      }
    } else {
      this.props.authStore.updateProfile(values);
    }
  }

  render() {
    const self = this;
    const { edit } = this.state;
    if (this.props.authStore.user !== undefined) {
      Object.keys(this.props.authStore.user).map(
        key =>
          fields[key] !== undefined
            ? (fields[key].value = this.props.authStore.user[key])
            : ""
      );
    }
    const hooks = {
      onSubmit(form) {
        self.handleSubmit(form.values());
      },
      onError(form) {
        alert("Form has errors!");
        // get all form errors
      }
    };
    if (this.props.authStore.isLoading) {
      return (
        <div>
          <LoadingSpinner />
        </div>
      );
    }
    Object.keys(messages).map(
      key => {
        if (fields[key] !== undefined) {
          fields[key].label = this.props.intl.formatMessage({...messages[key]});
        }
      }
    );
    return (
      <Row>
        <Col lg={12}>
          <ProfilePage
            edit={edit}
            handleEdit={edit => this.handleEdit(edit)}
            handleSubmit={(type, values) => this.handleSubmit(type, values)}
            form={new MobxReactForm({ fields }, { plugins, hooks })}
          />
        </Col>
      </Row>
    );
  }
}

export default injectIntl(Profile);
