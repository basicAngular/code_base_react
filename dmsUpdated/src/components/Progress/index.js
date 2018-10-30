import React from "react";

export const Progress = ({progress, height = 20, modification = ""}) => (
    <div className="progress" style={{"height": `${height}px`}}>
        <div style={{"width": `${progress}%`}} role="progressbar" className={"progress-bar "+modification}>
        </div>
    </div>
);