import { useState, useEffect, useRef } from "react";
import App_Bar from "../app_bar/app_bar";
import { Typography, useMediaQuery, Stack, Container, Grid, Button } from "@mui/material";
import Po_bill from "./po_bill";
import { useRouter } from "next/router";
import { useReactToPrint } from 'react-to-print';

export default function Preview_bill() {
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const isMobile = useMediaQuery('(min-width:600px)');
    const router = useRouter();
    // const { billData } = router.query;
    const [billData, setBillData] = useState([]);
    const styles = {
        main_box: { marginTop: '10px' }
    }
    useEffect(() => {
        if (localStorage !== undefined) {
            let data = localStorage.getItem('ravi-glass');
            if (data) {
                let parseData = JSON.parse(data);
                console.log(parseData, 'My data....');
                setBillData(parseData);
            }
        }
    }, []);
    return (
        <>
            <App_Bar type={{ status: true }} />
            <Typography variant={isMobile ? "h6" : "h5"} sx={{ textAlign: 'center', textDecoration: 'underline', marginBottom: '10px' }}>PROFORMA INVOICE PREVIEW</Typography>
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <Po_bill ref={componentRef} billData={billData} />

                    <Button variant="contained" sx={{ display: 'block', margin: 'auto', marginTop: '20px', marginBottom: '20px' }} onClick={handlePrint}>Print Bill</Button>
                </Grid>
                {/* <Grid item xs={6}>
                    

                </Grid> */}
            </Grid>
        </>

    );
}