import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "react-bootstrap/Button";

function createData(startDate, endDate, status, price) {
  return { startDate, endDate, status, price };
}

const rows = [
  createData("14 May, 2023", "22 May, 2023", "Available", 1099),
  createData("16 May, 2023", "24 May, 2023", "Available", 1099),
  createData("20 May, 2023", "28 May, 2023", "Available", 1099),
  createData("22 May, 2023", "30 May, 2023", "Available", 1099),
  createData("28 May, 2023", "6 June, 2023", "Available", 1099),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="fw-bold">Start Date</TableCell>
            <TableCell className="fw-bold">End Date</TableCell>
            <TableCell className="fw-bold">Status</TableCell>
            <TableCell className="fw-bold">Price</TableCell>
            <TableCell className="fw-bold"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.startDate}>
              <TableCell>{row.startDate}</TableCell>
              <TableCell>{row.endDate}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.price}</TableCell>
              <TableCell>
                <Button variant="success" size="sm">
                  Book Now
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
