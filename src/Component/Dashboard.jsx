import React, { useState, useEffect, createContext } from "react";
import Papa from "papaparse";
import '../style/Dashboard.css';
import GraphSection from "./GraphSection";
import EvDataTable from "./EvDataTable";

export const evDataContext = createContext()

const Dashboard = () => {
  const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    // Fetch the CSV file
    fetch("/Electric_Vehicle_Population_Data.csv")
      .then((response) => response.text())
      .then((csvText) => {
        // Parse CSV to JSON
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            setJsonData(result?.data?.slice(0,20))
          },
        });
      })
      .catch((error) => console.error("Error loading CSV:", error));
  }, []);



  return (
    <>
    <evDataContext.Provider value={jsonData}>
     <div className="Dash-body"> 
        <GraphSection/>
        <EvDataTable/>
     </div>
     </evDataContext.Provider>
     </>
  )

}

export default Dashboard