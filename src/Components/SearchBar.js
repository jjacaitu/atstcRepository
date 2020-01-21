import React from "react";
import Autocomplete from "react-autocomplete"

function SearchBar(props) {
    return (
        <form action="" onSubmit={(e) => {
            e.preventDefault();
            
        }}>
            <h3>Filter data by:</h3>
            <select name="" id="" disabled={props.disabled} required onChange={(e)=>{props.changeSelection(e)}}>
                {props.header.map((categories, index) => <option key={index} value={index}>{categories.split("_").join(" ")}</option>)}
            </select>
            {props.disabled
                ?
                <input type="text" disabled />
                :
                <Autocomplete
                    
                    disabled={props.disabled}
                    getItemValue={(item) => item}
                    items={props.suggestions
                    }
                    shouldItemRender={item => {
    
                        if (item.toLowerCase().includes(props.inputText.toLowerCase()) && !props.disabled) {
                            return true
                        }
                    }}
                    renderItem={(item, isHighlighted) =>
                        <div style={{ background: isHighlighted ? 'lightblue' : '#0176B4' }}>
                            {item}
                        </div>
                    }
                    value={props.inputText}
                    onChange={props.onChangeFunction}
                    onSelect={props.onSelectFunction}
                />

            }
            <button disabled={props.disabled} type="submit" onClick={props.filter}>Filter</button>
            <button disabled={props.disabled} onClick={props.clearQueries}>Clear</button>

        </form>
    )
}

export default SearchBar;