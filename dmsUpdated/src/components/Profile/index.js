import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import { Row, Col, Image } from "react-bootstrap";
import MobxFormInput from "../Form/components/MobxFormInput";
import MobxFormCheckbox from "../Form/components/MobxFormCheckbox";
import messages from "./messages";

import imageThumbnail from "./thumbnail.png";
import imageUpload from "./upload.png";

@observer
class Profile extends React.Component {
    static propTypes = {
      form: PropTypes.object,
      edit: PropTypes.object,
      handleEdit: PropTypes.func,
      handleSubmit: PropTypes.func
    }
    constructor (props) {
        super(props);
        this.updateProperty = this.updateProperty.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    updateProperty (key, value) {
        const {form} = this.props;
        form.$(key).value = value;
    }
    onChange (event) {
        this.updateProperty(event.target.name, event.target.value);
    }
    handleEditIcon(data) {
        const {form, handleEdit, handleSubmit, edit} = this.props;
        const {personal, account, bank} = edit;
        handleEdit(data);
        if (personal || account || bank) {
            handleSubmit(data, form.values());
        }
    }
    handleCheckbox(name, value) {
      this.updateProperty(name, value);
    }
    render() {
        const { form, edit } = this.props;
        const { personal, account, bank } = edit;
        const imageAvatar = !personal ? imageThumbnail : imageUpload;

        return (
          <Row>
            <Col lg={4}>
              <div className="ibox float-e-margins">
                <div className="ibox-content">
                  <div className="file-manager">
                    <Row>
                      <Col lg={12}>
                        <span className="user-mode pull-left">
                          <FormattedMessage 
                            {...messages.personalInfo}
                          />
                        </span>
                        <span
                          className="user-mode pull-right"
                          onClick={() => this.handleEditIcon("personal")}
                        >
                          <i className={classNames("fa cursor", { "fa-pencil": !personal })} />
                        </span>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12} className="text-center">
                        <p>
                          <Image
                            src={imageAvatar}
                            style={{ width: "45px" }}
                            className={classNames("avatar", { cursor: personal })}
                            circle
                          />
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={6}>
                        <MobxFormInput field={form.$("first_name")} edit={personal} change={this.onChange} />
                      </Col>
                      <Col lg={6}>
                        <MobxFormInput field={form.$("last_name")} edit={personal} change={this.onChange} />
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={6}>
                        <MobxFormInput field={form.$("email")} edit={personal} change={this.onChange} />
                      </Col>
                      <Col lg={6}>
                        <MobxFormInput field={form.$("phone")} edit={personal} change={this.onChange} />
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12}>
                        <MobxFormInput field={form.$("city")} edit={personal} change={this.onChange} />
                      </Col>
                      <Col lg={6}>
                        <MobxFormInput field={form.$("street")} edit={personal} change={this.onChange} />
                      </Col>
                      <Col lg={6}>
                        <MobxFormInput field={form.$("postal_code")} edit={personal} change={this.onChange}/>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12}>
                          <span 
                            className="user-mode pull-left"
                            onClick={() => this.handleEditIcon("personal")}
                          >
                            <i className={classNames("fa cursor",{ "fa-floppy-o": personal })} />
                          </span>
                          <span
                            className="user-mode pull-right"
                            onClick={() => this.handleEditIcon("personal")}
                          >
                            {personal && <i className="fa fa-times cursor" />}
                          </span>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </Col>

            <Col lg={4}>
              <div className="ibox float-e-margins">
                <div className="ibox-content">
                  <div className="file-manager">
                    <Row>
                      <Col lg={12}>
                        <span className="user-mode pull-left">
                          <FormattedMessage 
                            {...messages.accountInfo}
                          />
                        </span>
                        <span
                          className="user-mode pull-right"
                          onClick={() => this.handleEditIcon("account")}
                        >
                          <i
                            className={classNames(
                              "fa cursor",
                              { "fa-pencil": !account }
                            )}
                          />&nbsp;
                          {account && <i className="fa fa-times cursor" />}
                        </span>
                      </Col>
                    </Row>
                    <MobxFormInput field={form.$("old_password")} edit={account} change={this.onChange} showField={false} />
                    <MobxFormInput field={form.$("new_password")} edit={account} change={this.onChange} showField={false} />
                    <MobxFormInput field={form.$("re_type_password")} edit={account} change={this.onChange} showField={false} />
                    <Row>
                      <Col lg={12}>
                          <span 
                            className="user-mode pull-left"
                            onClick={() => this.handleEditIcon("account")}
                          >
                            <i className={classNames("fa cursor",{ "fa-floppy-o": account })} />
                          </span>
                          <span
                            className="user-mode pull-right"
                            onClick={() => this.handleEditIcon("account")}
                          >
                            {account && <i className="fa fa-times cursor" />}
                          </span>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </Col>

            <Col lg={4}>
              <div className="ibox float-e-margins">
                <div className="ibox-content">
                  <div className="file-manager">
                    <Row>
                      <Col lg={12}>
                        <span className="user-mode pull-left">
                          <FormattedMessage 
                            {...messages.bankInfo}
                          />
                        </span>
                        <span
                          className="user-mode pull-right"
                          onClick={() => this.handleEditIcon("bank")}
                        >
                          <i
                            className={classNames(
                              "fa cursor",
                              { "fa-floppy-o": bank },
                              { "fa-pencil": !bank }
                            )}
                          />&nbsp;
                          {bank && <i className="fa fa-times cursor" />}
                        </span>
                      </Col>
                    </Row>
                    <MobxFormInput field={form.$("account_holder")} edit={bank} change={this.onChange} />
                    <MobxFormInput field={form.$("account_iban")} edit={bank} change={this.onChange} />
                    <MobxFormInput field={form.$("account_bic")} edit={bank} change={this.onChange} />
                    {form.$("is_turnover_tax_subject").$value === true ? (
                      <MobxFormInput field={form.$("tax_number")} edit={bank} change={this.onChange} />
                    ) : null}
                    <MobxFormCheckbox field={form.$("is_turnover_tax_subject")} change={this.handleCheckbox} />
                    <Row>
                      <Col lg={12}>
                          <span 
                            className="user-mode pull-left"
                            onClick={() => this.handleEditIcon("bank")}
                          >
                            <i className={classNames("fa cursor",{ "fa-floppy-o": bank })} />
                          </span>
                          <span
                            className="user-mode pull-right"
                            onClick={() => this.handleEditIcon("bank")}
                          >
                            {bank && <i className="fa fa-times cursor" />}
                          </span>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        );
    }
}

export default Profile;
