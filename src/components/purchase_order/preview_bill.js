import { useState, useEffect } from "react";
import App_Bar from "../app_bar/app_bar";
import { Typography, useMediaQuery, Stack, Container, Grid } from "@mui/material";
import Po_bill from "./po_bill";
import { useRouter } from "next/router";

export default function Preview_bill() {
    const isMobile = useMediaQuery('(min-width:600px)');
    const router = useRouter();
    // const { billData } = router.query;
    const [billData, setBillData] = useState([]); 
    const styles = {
        main_box: { marginTop: '10px' }
    }
    useEffect(() => {
        if(localStorage !== undefined){
            let data = localStorage.getItem('ravi-glass');
            if(data){
                let parseData = JSON.parse(data);
                console.log(parseData, 'My data....');
                setBillData(parseData);
            }
        }        
    }, []);
    return (
        <>
            <App_Bar />
            <Typography variant={isMobile ? "h6" : "h5"} sx={{ textAlign: 'center', textDecoration: 'underline', marginBottom: '10px' }}>PROFORMA INVOICE PREVIEW</Typography>
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <Po_bill billData = {billData}/>
                </Grid>
                {/* <Grid item xs={6}>
                    

                </Grid> */}
            </Grid>
        </>

    );
}