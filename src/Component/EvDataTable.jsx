import React, { useContext, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    TableSortLabel,
} from "@mui/material";
import { evDataContext } from "./Dashboard";

const EvDataTable = () => {
    const jsonData = useContext(evDataContext); 
    const [page, setPage] = useState(0);
    const rowsPerPage = 5; 
    const [order, setOrder] = useState("asc"); 
    const [orderBy, setOrderBy] = useState("Electric Range"); 

    // Selecting relevant columns for the table
    const columns = ["Make", "Model", "City", "State", "Electric Range"];

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    // Sorting function for Electric Range column
    const sortedData = [...jsonData].sort((a, b) => {
        if (orderBy === "Electric Range") {
            const rangeA = parseFloat(a["Electric Range"]) || 0;
            const rangeB = parseFloat(b["Electric Range"]) || 0;
            if (order === "asc") {
                return rangeA - rangeB;
            } else {
                return rangeB - rangeA;
            }
        }
        return 0;
    });

    return (
        <div className="Table-Parent">
            <div className="Data-table">
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column}
                                        align="center"
                                        sx={{
                                            fontWeight: "bold",
                                            backgroundColor: "#247cb3",
                                            color: "black",
                                            fontSize: "14px",
                                            position: "sticky",
                                            top: 0,
                                            zIndex: 1,
                                        }}
                                    >
                                        {column === "Electric Range" ? (
                                            <TableSortLabel
                                                active={orderBy === "Electric Range"}
                                                direction={orderBy === "Electric Range" ? order : "asc"}
                                                onClick={(event) => handleRequestSort(event, "Electric Range")}
                                            >
                                                {column}
                                            </TableSortLabel>
                                        ) : (
                                            column
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedData 
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell align="center">{row.Make}</TableCell>
                                        <TableCell align="center">{row.Model}</TableCell>
                                        <TableCell align="center">{row.City}</TableCell>
                                        <TableCell align="center">{row.State}</TableCell>
                                        <TableCell align="center">{row["Electric Range"] || "N/A"}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    component="div"
                    count={jsonData.length} 
                    rowsPerPage={rowsPerPage} 
                    page={page}
                    onPageChange={handleChangePage} 
                    showFirstButton={false} 
                    showLastButton={false} 
                    rowsPerPageOptions={[]} 
                />
            </div>
        </div>
    );
};

export default EvDataTable;
