import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import ModifyModal from "./Modal";

@inject("documentStore")
@observer
export default class FileModifyModal extends React.Component {

    static propTypes = {
        show: PropTypes.bool,
        authors: PropTypes.array,
        documentStore: PropTypes.object,
        onHide: PropTypes.func,
        files: PropTypes.array,
        updateFile: PropTypes.func,
        isUpdate: PropTypes.bool
    }
    
    onSubmit = data => {
        const { documentStore, onHide, files, updateFile, isUpdate } = this.props;

        if(files.length !== undefined && files.length > 1) {
            files.forEach(file => {
                if(file.id !== undefined) {
                    if(data.hasOwnProperty("name")) {
                        delete data.name;
                    }
                    let document =  {...file, ...data};
                    documentStore.update(document)
                    .then(() => {
                        updateFile(document);
                    });
                }
            }, this);
        } else {
            let document =  {...files, ...data};

            if(isUpdate) {
                documentStore.update(document);
            } else {
                documentStore.update(document)
                .then(() => {
                    updateFile(document);
                });
            }
        }
        onHide();
    }

    render() {
        const {show,onHide,files,authors} = this.props;

        return (
            <div>
                {show && 
                    <ModifyModal
                        show={show}
                        files={files}
                        authors={authors}
                        onHide={onHide}
                        onSubmit={files => this.onSubmit(files)}
                    />
                }
            </div>
        );        
    }
}