import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import { Col, FormGroup, InputGroup, FormControl, ControlLabel } from "react-bootstrap";
import { DropdownList } from "react-widgets";
import "./styles.css";

@observer
class ExtensionDateForm extends React.Component {
    static propTypes = {
        name: PropTypes.string,
        label: PropTypes.string,
        dates: PropTypes.array,
        title: PropTypes.string,
        field: PropTypes.object,
        updateProperty: PropTypes.func
    }

    constructor (props) {
        super(props);
        this.state = {
            dateFormat: "year",
            value: ""
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const { dates, value } = this.props;
        this.setState({
            value,
            dateFormat: dates[0].title
        }); 
    }

    componentWillReceiveProps(nextProps) {
        const { dates, value } = nextProps;
        this.setState({
            value,
            dateFormat: dates[0].title
        }); 
    }

    handleChange(event) {
        const { updateProperty, dates, name } = this.props;
        const { dateFormat } = this.state;

        const fieldName = name;
        const value = event.target.value;

        const selectedDate = dates.find(date => date.title === dateFormat);
        const cancellationDate = value*selectedDate.value;

        this.setState({ value }, () => {
            updateProperty(fieldName, cancellationDate);
        });
    }

    render() {
        const { field, title, dates, label } = this.props;
        const { dateFormat, value } = this.state;
        const datesArr = dates.map(date => {return date.title;});

        return (
            <div>
                <Col lg={12}>
                    <FormGroup>
                        <ControlLabel>{label}</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon style={{padding: "0"}}>
                                <DropdownList
                                    data={datesArr}
                                    value={dateFormat}
                                    id="extension-form"
                                    defaultValue={dateFormat}
                                    className="extension-date-form"
                                    onChange={value => this.setState({ dateFormat: value })}
                                />
                            </InputGroup.Addon>
                            <FormControl value={value} onChange={this.handleChange} placeholder={title} />
                        </InputGroup>
                    </FormGroup>
                </Col>
            </div>
        );
    }
}

export default ExtensionDateForm;
