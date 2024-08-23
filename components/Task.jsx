import { useState } from "react";

export default function Task(props) {
    const {details} = props;

    if (!details) {
        return null;
    }

    return (
        <div className="list-description">
            <p className="list-name">{details.name}</p>
            <p className="list-due">{details.date} {details.time}</p>
        </div>
    )
}