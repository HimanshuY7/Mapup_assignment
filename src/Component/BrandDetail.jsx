import React, { useContext } from 'react'
import { evDataContext } from "./Dashboard";
import '../style/Dashboard.css';

const BrandDetail = () => {
    const jsonData = useContext(evDataContext);

    //simplifying and combining our json data
  const processedData = jsonData.reduce((acc, item) => {
    const make = item.Make || "Unknown"; 
    const range = parseInt(item["Electric Range"]) || 0; 
    const existing = acc.find((entry) => entry.Make === make);
    const City = item.City

    if (existing) {
      existing.totalRange += range;
      existing.count += 1;
      existing.averageRange = Math.round(existing.totalRange / existing.count);
    } else {
      acc.push({ Make: make, totalRange: range, count: 1, averageRange: range, City: City });
    }
    return acc;
  }, []).filter((entry) => entry.averageRange > 0);;

  return (
    <div className='Brand-Parent'>
        <table className='brand-table'>
            <th className='table-head'>
                Brand
            </th>
            <th className='table-head'>
                Total Range
            </th>
            <th className='table-head'>
                Average Range
            </th>
            <th className='table-head'>
                City
            </th>

            {processedData && processedData.map((item,index)=>{
                return (
                    <tr key={index} className='table-row'>
                        <td className='table-data'>{item.Make}</td>
                        <td className='table-data'>{item.totalRange}</td>
                        <td className='table-data'>{item.averageRange}</td>
                        <td className='table-data'>{item.City}</td>
                    </tr>
                )
            })}
        </table>
    </div>
  )
}

export default BrandDetail