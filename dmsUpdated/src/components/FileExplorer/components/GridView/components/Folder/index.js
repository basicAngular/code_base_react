import React from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';

class Folder extends React.Component {
    static defaultProps = {
        name: "Test",
    }

    static propTypes = {
        name: PropTypes.string,
    }

    render() {
        return (
            <div className="folder">
                <a href="#">
                    <span className="corner"></span>

                    <div className="icon">
                        <i className="fa fa-folder"></i>
                    </div>
                    <div className="folder-name">
                        {this.props.name}<br/><br/>
                    </div>
                </a>
            </div>
        );
    }
}

export default Folder;
