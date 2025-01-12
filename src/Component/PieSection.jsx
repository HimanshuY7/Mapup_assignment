import React, { useContext } from "react";
import {
    PieChart,
    Pie,
    Tooltip,
    Cell,
    Legend,
} from "recharts";
import { evDataContext } from "./Dashboard";
import '../style/Dashboard.css';

const PieSection = () => {

    const jsonData = useContext(evDataContext);

    // Count the number of EVs per city
    const processedData = jsonData.reduce((acc, item) => {
        const city = item.City || "Unknown"; 
        const existing = acc.find((entry) => entry.City === city);

        if (existing) {
            existing.count += 1;
        } else {
            acc.push({ City: city, count: 1 });
        }

        return acc;
    }, []);

    console.log(processedData);

    // Function to generate random colors
    const getRandomColor = () =>
        `#${Math.floor(Math.random() * 16777215).toString(16)}`;

    // Add colors to each data entry
    const coloredData = processedData.map((entry) => ({
        ...entry,
        color: getRandomColor(),
    }));



    return (
        <div className="pie-parent">
              <h2 className="pie-heading">Distribution of EVs by City</h2>
            <PieChart width={450} height={200}>
                <Pie
                    data={coloredData}
                    dataKey="count"
                    nameKey="City"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label={(entry) => `${entry.City}: ${entry.count}`}
                >
                    {coloredData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </div>
    )
}

export default PieSection