import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class Main extends Component {

    static propTypes = {
        setParentTitle: PropTypes.func
    }

    componentWillMount() {
        this.props.setParentTitle("Dashboard");
    }

    state = {
        alert: null,
        hide: true
    }

    hideAlert() {
        this.setState({alert: null});
    }

    render() {
        return (
            <div className="wrapper wrapper-content animated fadeInRight">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="ibox float-e-margins">
                            <div className="ibox-content" id="ibox-content">
                                <div className="text-center m-t-lg">
                                    <h1>
                                        Willkommen zurück!
                                    </h1>

                                </div>
                                <div id="vertical-timeline" className="vertical-container dark-timeline center-orientation">
                                    <div className="vertical-timeline-block">
                                        <div className="vertical-timeline-icon yellow-bg">
                                            <i className="fa fa-newspaper-o"></i>
                                        </div>

                                        <div className="vertical-timeline-content">
                                            <h2>Neuigkeiten von Papierkrempel</h2>
                                            <p>Das neue Papierkrempel-Portal eröffnet schon bald seine Pforten!</p>
                                            <span className="vertical-date">vor 2 Tagen
                                                <br/>
                                                <small>14. Mai</small>
                                            </span>
                                        </div>
                                    </div>


                                    <div className="vertical-timeline-block">
                                        <div className="vertical-timeline-icon blue-bg">
                                            <i className="fa fa-file-text"></i>
                                        </div>

                                        <div className="vertical-timeline-content">
                                            <h2>Neues Dokument</h2>
                                            <p>Dein Krempler hat ein neues Dokument für dich hochgeladen</p>
                                            <Link to="/c/documents/my" className="btn btn-sm btn-success">
                                                Zu meinen Dokumenten
                                            </Link>
                                            <span className="vertical-date">
                                                Gestern
                                                <br/>
                                                <small>15. Mai</small>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="vertical-timeline-block">
                                        <div className="vertical-timeline-icon navy-bg">
                                            <i className="fa fa-calendar"></i>
                                        </div>

                                        <div className="vertical-timeline-content">
                                            <h2>Impfschutz auffrischen</h2>
                                            <p>Dein Impfschutz muss in einer Woche erneuert werden.
                                            </p>
                                            <Link to="/c/vac/" className="btn btn-sm btn-primary">
                                                Zum Impfpass
                                            </Link>
                                            <span className="vertical-date">
                                                Heute
                                                <br/>
                                                <small>16. Mai</small>
                                            </span>
                                        </div>
                                    </div>




                                    <div className="vertical-timeline-block">
                                        <div className="vertical-timeline-icon lazur-bg">
                                            <i className="fa fa-comments"></i>
                                        </div>

                                        <div className="vertical-timeline-content">
                                            <h2>Nachricht von deinem Krempler</h2>
                                            <p>Dein Krempler hat dir eine Nachricht hinterlassen</p>
                                            <span className="vertical-date">vor 4 Tagen
                                                <br/>
                                                <small>12. Mai</small>
                                            </span>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>

                        {/* <div className="file-box">
                            <div className="file">
                                <LoadingOverlay isLoading={false}>
                                    <a href="#">
                                        <span className="corner"></span>

                                        <div className="icon">
                                            <i className="fa fa-file"></i>
                                        </div>
                                        <div className="file-name">
                                            Document_2014.doc
                                            <br />
                                            <small>Added: Jan 11, 2014</small>
                                        </div>
                                        <button onClick={() => {
                                            toastr.success(
                                                "In the beginning was the word",
                                                "and the Word was with God, and the Word was God...",
                                                {
                                                    timeOut: 30000,
                                                    progressBar: false
                                                }
                                            );
                                        }}>Wuff</button>
                                        <button onClick={() => {
                                            this.props.showSweetAlert(
                                                <SweetAlert success title="Good job!" onConfirm={this.props.hideSweetAlert}>
                                                    You clicked the button!
                                                </SweetAlert>
                                            );
                                        }}>Wuff2</button>
                                    </a>
                                </LoadingOverlay>
                            </div>

                        </div>
                    </div>
                    <div className="col-lg-12">
                        <button onClick={() => {
                            const hide = !this.state.hide;
                            this.setState({... this.state, hide});
                        }}>Wuff2</button>
                        <CSSTransitionGroup
                            transitionEnterTimeout={1000}
                            transitionLeaveTimeout={1000}
                            transitionName={{
                                enter: "animated",
                                enterActive: "fadeInRight",
                                leave: "animated",
                                leaveActive: "fadeOutRight"
                            }}>
                            { this.state.hide &&
                                <div className="text-center m-t-lg">
                                    <h1>
                                        Welcome in INSPINIA ReactJS Seed Project
                                    </h1>
                                    <small>
                                        It is an application skeleton for a typical web app. You can use it to quickly bootstrap your webapp projects.
                                    </small>

                                </div>
                            }
                        </CSSTransitionGroup>

                    </div>

                </div>
                <div className="row">
                    <div className="col-lg-8 col-lg-offset-2">
                        <KremplerForm />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4">
                        <IBox
                            hasTools={true}
                            title={
                                <h5>WUFF</h5>
                            }
                            content={[
                                <span>UUUUU</span>,
                                <p>Da guckste!</p>
                            ]}
                            toolOptions={
                            [

                            ]
                            }
                        >
                            <p>wuwuwuwuw</p>
                        </IBox>
                    </div>

                    <div className="col-lg-4">
                        <IBox
                            hasTools={true}
                            title={
                                <h5>WUFF</h5>
                            }
                            content={[
                                <span>UUUUU</span>,
                                <p>Da guckste!</p>
                            ]}
                            dropdownActions={[
                                {
                                    name: "wuff",
                                    onClick: () => console.log("wuff")
                                }
                            ]}
                        />*/}
                    </div>
                </div>
            </div>
        );
    }

}

export default Main;
