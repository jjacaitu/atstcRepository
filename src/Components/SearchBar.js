import React from "react";
import Autocomplete from "react-autocomplete"

function SearchBar({changeSelection, header, disabled, suggestions, inputText, onChangeFunction, onSelectFunction, filter, clearQueries }) {
    return (
        <form action="" onSubmit={(e) => {
            e.preventDefault();
            
        }}>
            <h3>Filter data by:</h3>
            <select name="" id="" disabled={disabled} required onChange={(e)=>{changeSelection(e)}}>
                {header.map((categories, index) => <option key={index} value={index}>{categories.split("_").join(" ")}</option>)}
            </select>
            {disabled
                ?
                <input type="text" disabled />
                :
                <Autocomplete
                    
                    disabled={disabled}
                    getItemValue={(item) => item}
                    items={suggestions
                    }
                    shouldItemRender={item => {
                        // Only render results that match with the text on the text input. Use to lowercase so that the query is not case sensitive
                        
                        if (item.toLowerCase().includes(inputText.toLowerCase()) && !disabled) {
                            return true
                        }
                    }}
                    renderItem={(item, isHighlighted) =>
                        <div key={item} style={{ background: isHighlighted ? 'lightblue' : '#0176B4' }}>
                            {item}
                        </div>
                    }
                    value={inputText}
                    onChange={onChangeFunction}
                    onSelect={onSelectFunction}
                />

            }
            <button disabled={disabled} type="submit" onClick={filter}>Filter</button>
            <button disabled={disabled} onClick={clearQueries}>Clear</button>

        </form>
    )
}

export default SearchBar;