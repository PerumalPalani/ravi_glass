import { useState, useEffect } from "react";
import App_Bar from "../app_bar/app_bar";
import { Typography, useMediaQuery, Stack, Container, Grid } from "@mui/material";
import Po_bill from "./po_bill";
import Po_form from "./po_form";

export default function Purchase_Order() {
    const isMobile = useMediaQuery('(min-width:600px)');
    const styles = {
        main_box: { marginTop: '10px' }
    }
    useEffect(() => {
        // Your client-side logic here
    }, []);
    return (
        <>
            <App_Bar />
            <Typography variant={isMobile ? "h6" : "h5"} sx={{ textAlign: 'center', textDecoration: 'underline', marginBottom: '10px' }}>PROFORMA INVOICE</Typography>
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <Po_form />
                </Grid>
                {/* <Grid item xs={6}>
                    <Po_bill />

                </Grid> */}
            </Grid>
        </>

    );
}