import React, {useState} from 'react';
import { CSVReader } from "react-papaparse";

import TopResults from "./Components/TopResults";
import TableComponent from "./Components/TableComponent";
import SearchBar from "./Components/SearchBar";
import createGraph from "./createGraphs";
import './App.css';



function App() {
  

  // Create all the variables states using hooks

  const [fullInfo, setFullInfo] = useState([]);
  const [displayInfo, setDisplayInfo] = useState([]);
  const [filteredInfo, setFilteredInfo] = useState([]);
  const [header, setHeader] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [SortingIsIncreasing, setSortingIsIncreasing] = useState(false);
  const [LastHeaderButtonPressedIndex, setLastHeaderButtonPressedIndex] = useState("0");
  const [display, setDisplay] = useState("Table");
  const [inputText, setInputText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [categoryToQuery, setCategoryToQuery] = useState(0);
  const [selectedCarBrand, setSelectedCarBrand] = useState("Chevrolet");


  // Use useEffect to create graphs only when data is updated or when user decies to look at the data graphs.

  React.useEffect(() => {
    if (display === "Graphs") {
      if (window.chart !== undefined) {
        window.chart.destroy();
      }
      createGraph(fullInfo, selectedCarBrand);
    }
  },[display,fullInfo,selectedCarBrand])

  // Create a function to get top 5 results of different categories

  const getTopFive = (categoryIndex) => {
    const information = [...fullInfo];
    const categoryLabel = [];
    const categoryData = [];

    // For each row of information found in the file uploaded sum up all the elements that are repeatedto get the total (example: how many times is Canada repeated as country).

    information.forEach((row) => {
      const category = row[categoryIndex];

      if (categoryLabel.includes(category)) {
        categoryData[categoryLabel.indexOf(category)]++;
      } else {
        categoryLabel.push(category)
        categoryData.push(1);
      }
    })
      
    // Sort the arrays that contain that information in descending order
    categoryLabel.sort((a, b) => {

      return categoryData[categoryLabel.indexOf(b)] - categoryData[categoryLabel.indexOf(a)]
    })

    categoryData.sort((a, b) => { return b - a })
    

    // Rturn an object that contains only the top 5 categorys

    return { labels: categoryLabel.slice(0, 5), data: categoryData.slice(0, 5)}
      
  }

  
  // Create a function that will get the available options from the information of the file uploaded to populate the autocomplete component

  const getSuggestions = (index,array) => {
    
      const suggestions = [];
    array.forEach((row) => {
      if (row[index] !== undefined) {
        
        if (!suggestions.includes(row[index])) {
          suggestions.push(row[index]);
        }
        }
    })

    return suggestions
    
  }

  // Create a function to reset any queries and display the full information again

  const clearQueries = () => {

    const information = [...fullInfo];
    setDisplayInfo(information);
    setFilteredInfo(information.slice(0, 10));
    setCurrentPage(1);
    setInputText("");
  }

  // Create a function to filter and display onl the information that matches with the query when the user decides to filter the information.

  const filter = () => {
    let information = [...fullInfo];
    const categorySelected = categoryToQuery;
    const query = inputText;
    information = information.filter(item => {
      if (item[categorySelected] !== undefined){
      
        if (item[categorySelected].toLowerCase() === query.toLowerCase()) {
          return true;
        }
      }
    })

    // If the query is empty or there are no matches alert the user
    if (query === "") {
      alert("Your query is empty")
    }else if (information.length) {
      
      setDisplayInfo(information);
      setFilteredInfo(information.slice(0, 10));
      setCurrentPage(1);
      setInputText("");
      
    } else {
      alert("There are no results matching your query");
      setInputText("");
    }

  }


  // A function to sort the information that is displayed on the table depending on the button of the header that the user pressed

  const sort = (e) => {
    const buttonIndex = e.currentTarget.value;
    const information = [...displayInfo]
    const isIncreasing = LastHeaderButtonPressedIndex === buttonIndex ? !SortingIsIncreasing : true;



    information.sort(function (a, b) {

      // If the category being sorted by is the index then treat the data as numbers and sort them

      if (buttonIndex === "0") {
        if (isIncreasing) {

          return parseInt(a[buttonIndex]) - parseInt(b[buttonIndex])
        } else {
          return parseInt(a[buttonIndex]) + parseInt(b[buttonIndex])
        }
        
      }

      //  If the category being sorted by is the dates then treat the data as dates and sort them

      else if (buttonIndex === "1") {
        if ((new Date(a[buttonIndex])) > (new Date(b[buttonIndex]))){
          if (isIncreasing) {

            return 1
          } else {
            return -1
          }
        } else {
          if (isIncreasing) {

            return -1
          } else {
            return 1
          }
        } 

        // Else sort them normally
      }else {
        if (a[buttonIndex] > b[buttonIndex]) {
          if (isIncreasing) {
            
            return 1
          } else {
            return -1
          }
        } else {
          if (isIncreasing) {

            return -1
          } else {
            return 1
          }
        }
        
      }
    });

    setDisplayInfo(information);
    setFilteredInfo(information.slice(0, 10));
    setCurrentPage(1);
    setSortingIsIncreasing(isIncreasing);
    setLastHeaderButtonPressedIndex(buttonIndex);
    setDisplay("Table");
  }


  // Onchange handler for the select that is used to filter the information

  const changeSelection = (e) => {
    const categorySelected = e.target.value;
    const suggestions = getSuggestions(categorySelected, fullInfo);
    setSuggestions(suggestions);
    setInputText("");
    setCategoryToQuery(categorySelected);
  }

  
    
  // Return what will be rendered

  return (
    <div className="App">
      <header className="bar">
        <h1>CSV Reader</h1>
        <div className="uploadButton">
          <label htmlFor="fileReader">Upload a new CSV file: </label>

          <CSVReader
            id="fileReader"
            onFileLoaded={({ data }) => {

              // When the file loads get the suggestions that will populate the autocomplete
              
              const suggestions = getSuggestions(0, data.slice(1));
              
              // Set the states

              setFullInfo(data.slice(1));
              setDisplayInfo(data.slice(1));
              setFilteredInfo(data.slice(1, 11))
              setHeader(data[0]);
              setCurrentPage(1);
              setSuggestions(suggestions);
              setDisplay("Table")
        
            }}
            style={{ display: 'block' }}
            onError={() => alert("There has been an error trying to read the CSV file")}
          />
        </div>

        
        {/* If there is information uploaded then show the search bar to filter the information */}

        {fullInfo.length
          ?

          <SearchBar
            header={header}
            filter={filter}
            suggestions={suggestions}
            inputText={inputText}
            onChangeFunction={(e) => setInputText(e.target.value)} onSelectFunction={(val) => setInputText(val)}
            clearQueries={clearQueries}
            changeSelection={changeSelection}
            disabled={display !== "Table"} />
          :
          ""
        }

      </header>

      <main>

        {/* If there is information uploaded then show the options of seeing table or graphs to the user */}
        {
          displayInfo.length
            ?
            <div className="options">
              <h3>Display options:</h3>
              <button disabled={display === "Table" ? true : false} onClick={() => { setDisplay("Table") }}>Table</button>
              <button disabled={display === "Graphs" ? true : false} onClick={() => {
                
                setDisplay("Graphs");
                
                
              }}>Graphs and Top Results</button>
            </div>
            :
            ""
            }
        {
          // If the user selected table then show the table if not show the graphs and top results

          display === "Table"
            ?
            <div className="tableDiv">
              
              <TableComponent sort={sort} header={header} info={filteredInfo} buttonIndex={LastHeaderButtonPressedIndex} ascending={SortingIsIncreasing} />
              
              {/* Button to go to the previous 10 results of the table */}
              
              <div className="pageControlDiv">
                {currentPage !== 1 ?
                <button onClick={() => {
                  
                  setCurrentPage(currentPage - 1);
                  setFilteredInfo(displayInfo.slice(((currentPage - 1) * 10) - 10, (currentPage - 1) * 10))
                  }}><i className="fas fa-arrow-circle-left" aria-hidden={true}></i> Previous Page</button>
                :
                ""

              }

                {/* Button to go to the next 10 results of the table */}
                {
                  currentPage !== Math.ceil(displayInfo.length / 10) && displayInfo.length ?
                <button onClick={() => {
                  
                  setCurrentPage(currentPage + 1);
                  setFilteredInfo(displayInfo.slice(((currentPage + 1) * 10) - 10, (currentPage + 1) * 10))
                  
                    }}>Next Page <i className="fas fa-arrow-circle-right" aria-hidden={true}></i></button>
                :
                ""

                }

              </div>
            </div>
            :
            <div className="dataSummaryMain">
              
              <div className="dataSummaryPieCharts">
                <div className="topResultsSection">
                  <h2>TOP 5 RESULTS</h2>
                  <div className="topResultsMain">

                    {/* Show top results of 4 different categories */}
                    <TopResults categoryName={header[11]} labels={getTopFive(11).labels} dataArray={getTopFive(11).data} totalLength={fullInfo.length} />
                    
                    <TopResults categoryName={header[12]} labels={getTopFive(12).labels} dataArray={getTopFive(12).data} totalLength={fullInfo.length} />

                    <TopResults categoryName={header[10]} labels={getTopFive(10).labels} dataArray={getTopFive(10).data} totalLength={fullInfo.length} />

                    <TopResults categoryName={header[13]} labels={getTopFive(13).labels} dataArray={getTopFive(13).data} totalLength={fullInfo.length}/>

                  </div>
                </div>
              
                <div className="chartsDiv">
                  <canvas id="genderChart" width="200" height="200"></canvas>
                  <canvas id="ageChart" width="200" height="200"></canvas>

                </div>
              </div>
              <label htmlFor="brandSelect">Select a car brand:</label>
              {/* A select that lets the user change the brand of the car, re-rendering the byBrandChart */}

              <select onChange={(e) => {
                
                setSelectedCarBrand(e.target.value);
                
              }} name="" id="brandSelect">

                {/* Populate the options with all the car brands sorted alphabetically */}

                {getSuggestions(11, fullInfo).sort().map((brand, index) => {
                  return <option key={index} value={brand}>{brand}</option>
                })}
              </select>
              <div className="chartsDiv">

                <canvas id="byBrandChart" width="200" height="200"></canvas>
              </div>
            </div>
        
        
        }
      </main>
      <footer>
        <p>Made by Juan Acaiturri-Villa © 2020</p>
      </footer>
    </div>
  
  );
  
}

export default App;
