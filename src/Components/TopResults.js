import React from "react";

function TopResults(props) {
    return (
        <div className="topDisplay">
            <h3>{props.categoryName}</h3>
            <div className="detail">
                <div className="detailName">
                    <h4>{props.categoryName}</h4>
                    {props.labels.map((label, index)=><p key={index}>{label}</p>)}
                </div>
                <div className="detailNumber">
                    <h4>Total</h4>
                    {props.dataArray.map((data, index) => <p key={index}>{data}</p>)}
                </div>
            </div>
        </div>
    )
}

export default TopResults;