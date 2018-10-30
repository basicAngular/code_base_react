import React from "react";
import PropTypes from "prop-types";
import File from "./components/File";
import _ from "lodash";
import moment from "moment";
import {observer, inject} from "mobx-react";
//import Folder from "./components/Folder";
import classnames from "classnames/bind";
//import style from "./style.scss";

//const cx = classnames.bind(style);
@inject("customerStore")
@observer
class GridView extends React.Component {
   
    static propTypes = {
        files: PropTypes.array,
        authStore: PropTypes.object,
        customerStore: PropTypes.object
    }

    renderFile(file) {
        return (<div key={file.id} style={{marginBottom: "15px"}}>
                <File
                    id={file.id}
                    name={file.name}
                    extension={file.extension}
                    size={file.size}
                    added={moment(file.date, "YYYY-MM-DD").format("DD.MM.YYYY")}
                    isSos={file.is_sos}
                    isFavorite={file.is_favorite}
                    isTaxRelevant={file.is_tax_relevant}
                    tags={file.tags}
                />
            </div>);
        
    }

    renderGroup(files, title) {
        return (
            <div key={title}>
                <h2 className="m-sm" >{title}</h2>
                <hr className="m-sm" />
                <div className="grid-md" style={{display: "flex", flexWrap: "wrap"}}>
                    {files.map(this.renderFile)}
                </div>
                <hr className="m-sm" />
            </div>
        );
    }

    renderCustomerGroup(files, customer_id) {
        const customer = this.props.customerStore.getCustomer(customer_id);
        if (!customer) return null;
        return (this.renderGroup(files, customer.first_name + " " + customer.last_name));
    }

    render() {
        if (this.props.files.length > 0) {
            const results = _.map(_.groupBy(this.props.files, "customer_id"), this.renderCustomerGroup.bind(this)).filter(v => v);
            if (results.length === 0) 
                return <h2 className="text-center">Keine Suchergebnisse vorhanden</h2>;
            return <div>{results}</div>;            
        }
        else 
            return <div></div>;    

    }
}

export default GridView;
