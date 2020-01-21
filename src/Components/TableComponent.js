import React from "react";

function TableComponent({header, sort, buttonIndex, ascending, info}) {
    return (
        <table>
            <thead>
                <tr>
                    {header ? header.map((data, index) => {
                        return <th key={index} ><button onClick={sort} value={index}>{data.split("_").join(" ")}{buttonIndex == index && ascending ? <i className="fas fa-arrow-down" aria-hidden={true}></i> : buttonIndex == index && !ascending ? <i className="fas fa-arrow-up" aria-hidden={true}></i> : ""}</button></th>
                    }) : ""}
                </tr>
            </thead>

            <tbody>
                {info ? info.map((element,index) => {
                    return <tr key={index}>{element.map((data, index) => {
                        if (data) {
                            return <td key={index}>{data}</td>
                        }
                    })}</tr>
                }) : ""}

            </tbody>

        </table>
        
    )
}

export default TableComponent;