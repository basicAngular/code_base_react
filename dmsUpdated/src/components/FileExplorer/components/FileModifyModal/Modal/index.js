import React from "react";
import PropTypes from "prop-types";
import { toJS } from "mobx";
import _ from "lodash";
import moment from "moment";
import { Modal, Button, FormGroup, ControlLabel, FormControl } from "react-bootstrap";
import momentLocalizer from "react-widgets-moment";
import { Multiselect, DateTimePicker, Combobox } from "react-widgets";
import ToolTip from "./../ToolTip/";
import { FormattedMessage } from "react-intl";
import messages from "./messages.js";

const date_formats = [
    "YYYY/MM/DD",
    "YYYY/MM",
    "YYYY"
];

moment.locale("en");
momentLocalizer();

export default class ModifyModal extends React.Component {

    static propTypes = {
        show: PropTypes.bool,
        files: PropTypes.array,
        onHide: PropTypes.func,
        authors: PropTypes.array,
        onSubmit: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = {
            file: {},
            isEqual: {},
            toolTip: {},
            isMultipleFiles: false,
            date_relevance: new Date(),
            date_format: "YYYY/MM",
        };
        this.handleTags = this.handleTags.bind(this);
        this.handleCreateTag = this.handleCreateTag.bind(this);
        this.handleDate = this.handleDate.bind(this);
    }

    componentDidMount() {
        
        let file;
        let { state } = this;
        const { files } = this.props;
        const isSingleFile = files && files.name !== undefined;
        const isMultipleFiles = files && files.length > 1;

        if(isSingleFile) {
            
            file = files;
            state.file = file;
            state.date_relevance = file.date_relevance.length === 0 ? state.date_relevance : new Date(files.date_relevance);
            state.file.tags = file.tags.length === 0 ? [] : file.tags;
            state.isMultipleFiles = false;
        } else if(isMultipleFiles) {
            
            const names = files.map(file => {return file.name;});
            const authors = files.map(file => {return file.author;});
            const fileTags = files.map(file => {return toJS(file.tags);});
            const dates = files.map(file => {return file.date_relevance;});
            // tooltip data
            state.toolTip.authors = authors;
            state.toolTip.fileTags = fileTags;
            state.toolTip.dates = dates;
            // check if fields are equal
            state.isEqual.tags = _.isEqual(...fileTags);
            state.isEqual.author = authors.every(item => (item.length === 0 || Object.is(authors[0], item)));
            state.isEqual.dates = dates.every(item => (item.length === 0 || Object.is(dates[0], item)));
            // fields data
            state.file.name = names.join(",");
            state.file.author = state.isEqual.author ? authors[0] : "";
            state.file.tags = state.isEqual.tags ? toJS(files[0].tags) : [];
            // additional
            state.placeholder = !state.isEqual.author ? authors.join(",") : "";
            state.date_relevance = state.isEqual.dates ? new Date(dates[0]) : state.date_relevance;
            state.isMultipleFiles = true;
        }

        this.setState(state);
    }

    handleChange(param, data) {
        
        const {file} = this.state;
        let value = data;
        file[param] = value;
        let state = {file};
        this.setState(state);
    }

    handleFile(param, value) {
        
        let {file} = this.state;
        file[param] = value;
        let state = {file};
        this.setState(state);
    }

    handleTags(tags) {
        
        let {file} = this.state;
        file.tags = tags;
        this.setState({file});
    }

    handleCreateTag(tag) {
        let {file} = this.state;
        file.tags = [...file.tags, tag];
        this.setState({file});
    }

    setDateFormat(data) {
        const date_format = data;
        this.setState({date_format});
    }

    handleDate(date) {
        const {date_format} = this.state;
        this.setState({date_relevance: date},() => {
            this.handleFile("date_relevance", moment(date).format(date_format));
        });
    }

    handleSubmit() {
        const {onSubmit} = this.props;
        const {file, date_relevance, date_format, isMultipleFiles} = this.state;
        file.date_relevance = isMultipleFiles ? moment(date_relevance).format(date_format) : file.date_relevance;
        onSubmit(file);
        this.setState({date: moment()});
    }

    render() {
        const {date_format,date_relevance,file,isEqual,toolTip,isMultipleFiles} = this.state;
        const {show,onHide,files,authors} = this.props;
        const isSingleFile = files.name !== undefined;
        return (
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {isSingleFile === "file" ? (
                            <FormattedMessage {...messages.modifyFile} />
                        ) : (
                            <FormattedMessage {...messages.modifyFiles} />
                        )}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-lg-12 no-padding d-flex flex-center flex-column">
                            <div className="col-lg-0 no-padding">
                                <i className="fa fa-file-pdf-o fs-30"></i>
                            </div>
                            <div className="inp form-group col-lg-6 col-xs-12 no-padding">
                                <FormGroup controlId="formBasicText">
                                    <ControlLabel>Name{!isSingleFile ? "s" : ""}</ControlLabel>
                                    <FormControl
                                        type="text"
                                        value={file.name}
                                        disabled={!isSingleFile}
                                        onChange={e => this.handleChange("name", e.target.value)}
                                    />
                                </FormGroup>
                            </div>
                            <div className="inp form-group col-lg-6 col-xs-12 no-padding">
                                <label className="control-label fw-400 full-width">
                                    <FormattedMessage {...messages.author} />
                                    {(isMultipleFiles && !isEqual.author) && <ToolTip name="author" data={toolTip.authors} />}
                                </label>
                                {file.author !== undefined &&
                                    <Combobox
                                        data={authors}
                                        defaultValue={file.author}
                                        onChange={data => this.handleChange("author", data)}
                                        onSelect={data => this.handleFile("author", data)}
                                    />
                                }
                            </div>
                            <div className="inp form-group col-lg-6 col-xs-12 no-padding">
                                <label className="control-label fw-400 full-width">
                                    <FormattedMessage {...messages.tags} />
                                    {(isMultipleFiles && !isEqual.tags) && <ToolTip name="tags" data={toolTip.fileTags} />}
                                </label>
                                {file.tags !== undefined &&
                                    <Multiselect
                                        value={toJS(file.tags)}
                                        textField="author"
                                        onChange={value => this.handleTags(value)}
                                        onCreate={tag => this.handleCreateTag(tag)}
                                    />
                                }
                            </div>
                            <div className="inp form-group col-lg-6 col-xs-12 no-padding">
                                <label className="control-label fw-400 full-width">
                                    <FormattedMessage {...messages.dateRelevance} />
                                    {(isMultipleFiles && !isEqual.dates) && <ToolTip name="dates" data={toolTip.dates} />}
                                </label>
                                <Combobox
                                    data={date_formats}
                                    defaultValue={date_format}
                                    onChange={data => this.setDateFormat(data)}
                                />
                            </div>
                            <div className="inp form-group col-lg-6 col-xs-12 no-padding">
                                <label className="control-label fw-400">
                                    <FormattedMessage {...messages.selectDate} />
                                </label>
                                <DateTimePicker
                                    time={false}
                                    format={date_format}
                                    value={date_relevance}
                                    onChange={date => this.handleDate(date)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 col-xs-12 no-padding">
                            <div className="col-lg-6 col-xs-6 no-padding">
                                <Button onClick={onHide}>
                                    <FormattedMessage {...messages.hide} />
                                </Button>
                            </div>
                            <div className="col-lg-6 col-xs-6 no-padding text-right">
                                <Button onClick={() => this.handleSubmit()}>
                                    
                                    <FormattedMessage {...messages.submit} />
                                </Button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}