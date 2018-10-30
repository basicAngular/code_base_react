import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { Modal, Button } from "react-bootstrap";
import { DateTimePicker } from "react-widgets";
import moment from "moment";

@inject("documentStore")
@observer
export default class FileModifyModal extends React.Component {

    static propTypes = {
        file: PropTypes.object,
        show: PropTypes.object,
        onHide: PropTypes.func,
        documentStore: PropTypes.object,
        tags: PropTypes.array
    }

    componentWillMount() {
        const document = this.props.documentStore.getDocument(this.props.file);
        document.date = moment(document.date, "YYYY-MM-DD").toDate();
        this.setState({...document, is_locker: false });        
    }

    changeName = e => this.setState({...this.state, name: e.target.value});
    changeCompany = e => this.setState({...this.state, company: e.target.value});
    changeTags = e => this.setState({...this.state, tags: e.target.value.split(",")});
    changeDate = value => this.setState({...this.state, date: value});

    submitForm = ev => {
        ev.preventDefault();
        let document = this.state;
        document.folder = "";
        document.date = moment(document.date).format("YYYY-MM-DD");
        this.props.documentStore.updateDocument(document);
        this.props.onHide();
        // const { editorStore } = this.props;
        // editorStore.submit()
        //     .then(article => {
        //         editorStore.reset();
        //         this.props.history.replace(`/article/${article.slug}`);
        //     });
    };
    
    render() {
        if (this.props.documentStore.isLoading)
            return <div></div>;
        return (
            <Modal show={this.props.show} onHide={this.props.onHide}>
            <Modal.Header closeButton>
            <Modal.Title>{document.name} bearbeiten</Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    <div className="row">
                    <form onSubmit={this.submitForm.bind(this)}>
                        <div className="form-group col-lg-12">
                            <label className="control-label">Name</label>
                            <input type="text" onChange={this.changeName} value={this.state.name} label="Name" placeholder="" className="form-control" />
                        </div>
                        <div className="form-group col-lg-12">
                            <label className="control-label">Firma/Person</label>
                            <input type="text" onChange={this.changeCompany} value={this.state.company} label="Firma/Person" placeholder="" className="form-control" />
                        </div>
                        <div className="form-group col-lg-12">
                            <label className="control-label">Schlagworte</label>
                            <input type="text" onChange={this.changeTags} value={this.state.tags} label="Schlagworte" placeholder="" className="form-control" />
                        </div>
                        <div className="form-group col-lg-12">
                            <label className="control-label">Datum</label>
                            <DateTimePicker
                                value={this.state.date}
                                onChange={this.changeDate}
                                time={false}
                            />
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <Button onClick={this.props.onHide}>Schließen</Button>
                            </div>
                            <div className="col-lg-6 text-right">
                                <Button bsStyle="primary" type="submit" >Speichern</Button>
                            </div>
                        </div> 
                    </form>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}