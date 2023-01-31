import React from "react";

import {Box,Grid,item,TableBody ,TableCell,TableContainer,TableHead,TableRow,Table,Paper } from '@mui/material';
import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';




// import "./styles.css"

export default function QuotationPrint() {
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };
  // Example data (invoice items)


  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  const invoiceItems = [
    {
      qty: 1,
      price: 84.99,
      subtotal: 84.99,
      currency: "USD",
      name: "Gaming Headset"
    },
    {
      qty: 2,
      price: 99.99,
      subtotal: 199.98,
      currency: "USD",
      name: "Gaming Controller"
    },
    {
      qty: 1,
      price: 19.99,
      subtotal: 19.99,
      currency: "USD",
      name: "USB PowerPort"
    },
    {
      qty: 5,
      price: 5.08,
      subtotal: 25.4,
      currency: "USD",
      name: "Smartphone Screen Protector"
    },
    {
      qty: 3,
      price: 17.99,
      subtotal: 53.97,
      currency: "USD",
      name: "V-Neck T-Shirt"
    },
    {
      qty: 1,
      price: 33.96,
      subtotal: 33.96,
      currency: "USD",
      name: "Night Vision Binoculars"
    },
    {
      qty: 0,
      price: 8.49,
      subtotal: 0,
      currency: "USD",
      name: "USB Car Charger"
    },
    {
      qty: 1,
      price: 79.99,
      subtotal: 79.99,
      currency: "USD",
      name: "Car Dash Cam"
    },
    { qty: 0, price: 11.44, subtotal: 0, currency: "USD", name: "Sunglasses" },
    {
      qty: 1,
      price: 21.99,
      subtotal: 21.99,
      currency: "USD",
      name: "Leather Belt"
    }
  ];

  const reducer = (acc, value) => acc + value;

  console.log("jisoo", Object.keys(invoiceItems[0]));
  console.log("lisa", invoiceItems.map((item) => item.name).sort());

  return (
    <Container maxWidth="md">
      <h2 style={{ textAlign: "center" }}>Invoice</h2>
       

      <Paper>
        <TableContainer>
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Item>xs=8</Item>
                </Grid>
                <Grid item xs={4}>
                    <Item>xs=4</Item>
                </Grid>
                <Grid item xs={4}>
                    <Item>xs=4</Item>
                </Grid>
                <Grid item xs={8}>
                    <Item>xs=8</Item>
                </Grid>
            </Grid>
        </Box>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>{Object.keys(invoiceItems[0])[4]}</TableCell>
                <TableCell align="right">
                  {Object.keys(invoiceItems[0])[0]}
                </TableCell>
                <TableCell align="right">
                  {Object.keys(invoiceItems[0])[1]}
                </TableCell>
                <TableCell align="right">
                  {Object.keys(invoiceItems[0])[2]}
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {invoiceItems
                
                .filter((item) => item.subtotal > 0)
                .sort((a, b) => (a.name > b.name ? 1 : -1))
                .map((item) => {
                  return (
                    <TableRow key={item.name}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell align="right">{item.qty} </TableCell>
                      <TableCell align="right">
                        {" "}
                        {(item.price * 0.84).toFixed(2)}{" "}
                      </TableCell>
                      <TableCell align="right">
                        {(item.subtotal * 0.84).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell align="right">
                  <strong>Total Amount in EUR</strong>
                </TableCell>
                <TableCell align="right">
                  {invoiceItems
                    .map((item) => item.subtotal * 0.84)
                    .reduce((acc, value) => acc + value)
                    .toFixed(2)}{" "}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      
      </Paper>
    </Container>
  );
}

