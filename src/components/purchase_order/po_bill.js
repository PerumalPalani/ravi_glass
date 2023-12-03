import { Typography, Container, Table, TableRow, TableCell, TableContainer, Paper, TableBody, TableHead, Grid, createTheme, ThemeProvider } from "@mui/material";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Po_bill({ billData }) {
     // Calculate totals
     const totals = billData.reduce(
        (acc, item) => {
            acc.totalQty += item.qty;
            acc.totalCharSqtMtr += parseFloat(item.char_sqt_mtr);
            acc.totalNumBigCutout += item.num_big_cutout;
            acc.totalNumBigHole += item.num_big_hole;
            acc.totalNumCutout += item.num_cutout;
            acc.totalNumHole += item.num_hole;
            acc.totalAmount += parseFloat(item.amount);
            return acc;
        },
        {
            totalQty: 0,
            totalCharSqtMtr: 0,
            totalNumBigCutout: 0,
            totalNumBigHole: 0,
            totalNumCutout: 0,
            totalNumHole: 0,
            totalAmount: 0,
        }
    );

    // Apply a 9% increase to the total amount
    const increasedTotalAmount = totals.totalAmount * 1.09;

    console.log("Totals:", totals);
    console.log("Increased Total Amount (with 9% increase):", increasedTotalAmount.toFixed(2));
    console.log(billData, 'Data is came....');

    const [isEditing, setIsEditing] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');
    const [intialValue, setIntialValue] = useState({ no_hole: 10, hole_charge: 400, cgst: 9, sgst: 9, handling: 221.8 });
    const productList = ['8MM CLEAR TOUGHENED GLASS - SAINT GOBAIN GLASS', '10MM CLEAR TOUGHENED GLASS - SAINT GOBAIN GLASS', '12MM CLEAR TOUGHENED GLASS - SAINT GOBAIN GLASS', '16MM CLEAR TOUGHENED GLASS - SAINT GOBAIN GLASS'];
    const extra_chg = [
        { name: "Holes Charges", total_no: totals.totalNumHole, scale: "EACH", price: 40 },
        { name: "Cutout Charges", total_no: 0, scale: "EACH", price: 0 },
        { name: "Big Holes Charges", total_no: 0, scale: "EACH", price: 0 },
        { name: "Big Cutout Charges", total_no: 0, scale: "EACH", price: 0 },
        { name: "CSK Holes Charges", total_no: 0, scale: "EACH", price: 0 },
        { name: "Template Charges", total_no: 0, scale: "EACH", price: 0 },
        { name: "Shape Charges", total_no: 0, scale: "EACH", price: 0 },
        { name: "Frosting Charges", total_no: 0, scale: "EACH", price: 0 },
        { name: "Corner Round Charges", total_no: 0, scale: "EACH", price: 0 },
        { name: "Jumbo Size", total_no: 0, scale: "Area", price: 0 }
    ];
    const terms = ["Please check the size before confirmation", "100 % Advance should be paid with Purchase Order", "Mode of payment by RTGS / NEFT.", "We are not responsible for breakages after transit", "Transportation Extra as per Actuals.", "Delivery within 2-3 days after confirmation of Proforma.", "The Proforma invoice valid for 15 days from the dated Proforma", "Billing as per Proforma Invoice"];
    const add_head = ['Descriptions', 'Count', 'Scale', 'Price', 'Amount'];

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const colorValue = '1px solid green';
    const styles = {
        head_sect: { display: 'flex', justifyContent: 'space-around' },
        table_row: { textDecoration: 'underline', fontWeight: 'bold', border: 'none' },
        table_total: { fontWeight: 'bold', border: 'none', textAlign: 'right', padding: '2px 0 2px 0', fontSize: '12px', width: '10px', border: colorValue, borderTop: 'none', borderLeft: 'none' },
        table_font: { fontSize: '10px', fontWeight: 'bold', textAlign: 'center', padding: '0px', border: colorValue, borderTop: 'none' },
    }

    let extra_am = totals.totalNumHole * extra_chg[0].price;
    console.log(extra_am);
    let tax = extra_am + totals.totalAmount.toFixed(2)*1;
    console.log(tax);
    let gst = (tax + 221.6) * (9/100);
    console.log(gst, 'GST');

    let grand_total = gst * 2 + tax + 221.6;

    useEffect(() => {
        // Your client-side logic here
    }, []);

   
    return (
        <Container>
            {/*---Header 01--- */}
            <Grid container spacing={0} sx={{ border: colorValue, borderBottom: 'none' }}>
                <Grid item xs={3}>
                    <Typography variant="body2" sx={{ textAlign: 'center', fontSize: '10px', fontWeight: 'bold' }}>Annealed Float Glass From</Typography>
                    <Image src="/images/Saint-Gobain-Logo.png" height={40} width={150} style={{ marginLeft: '70px' }} alt="logo"></Image>
                    <Typography variant="body2" sx={{ textAlign: 'center', fontSize: '10px', fontStyle: 'italic', fontWeight: 'bold' }}>Toughened by</Typography>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={{ marginTop: '5px' }}>
                            <Image src='/images/Capture_icon.png' height={30} width={60} alt="logo1"></Image>
                        </div>
                        <div style={{ marginLeft: '20px' }}>
                            <Typography variant="body2" sx={{ fontSize: '6px' }}>IS 2553 : PART 1</Typography>
                            <Image src="/images/ISI-Mark-Black.png" height={20} width={50} alt="logo2"></Image>
                            <Typography variant="body2" sx={{ fontSize: '6px' }}>CM/L-6200190699</Typography>
                        </div>
                    </div>
                    <Typography variant="body2" sx={{ textAlign: 'center', fontSize: '10px', color: '#3381A6', fontWeight: 'bold' }}>PARIHAR TOUGHENED</Typography>
                </Grid>
                <Grid item xs={9}>
                    <Typography variant="body1" sx={{ textAlign: 'center', fontSize: '26px', fontWeight: 'bold' }}>PARIHAR SAFETY GLASS PRIVATE LIMITED</Typography>
                    <Typography variant="body2" sx={{ textAlign: 'center', fontWeight: 'bold', marginTop: '5px', fontSize: '14px' }}>S.No.650/A,A1, Bommandapalli Village, Kothakandapalli Post, Thally Road Cross, Old Anekal Road, Hosur- 635 109,<br></br>
                        Krishnagiri District, Tamilnadu. GST No:33AAJCP6743P1ZS, PH: 6366110134, 6366110135, 6366110139. </Typography>
                    <Typography variant="body2" sx={{ textAlign: 'center', fontWeight: 'bold', marginTop: '5px', fontSize: '14px' }}>E- Mail :pariharsafetyglass@gmail.com</Typography>
                </Grid>
            </Grid>

            {/*---Header 02--- */}
            <Grid container spacing={0} sx={{ border: colorValue }}>
                <Grid item xs={4} sx={{ borderRight: colorValue }}>
                    <Table size={'small'}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={styles.table_row}>
                                    CONSIGNEE:
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell sx={{ border: 'none' }}>
                                    <Typography variant="body2" sx={{ margin: '0px 0 82px 0' }}>RAVI GLASS, <br></br>Tirupattur</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ borderTop: colorValue, borderBottom: 'none' }}><b>PH.NO: +91-9894421089</b></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Grid>
                <Grid item xs={4} sx={{ borderRight: colorValue }}>
                    <Table size={'small'}>
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={2} sx={styles.table_row}>
                                    DISPATCH TO:
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={2} sx={{ border: 'none' }}>
                                    <Typography variant="body2" sx={{ margin: '0px 0 83px 0' }}>RAVI GLASS, <br></br>Tirupattur</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell sx={{ borderTop: colorValue, borderBottom: 'none', borderLeft: colorValue }}><b>WO NO:</b></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Grid>
                <Grid item xs={4}>
                    <Table size={'small'}>
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={2} sx={{ borderBottom: colorValue }}>
                                    PROFORMA INVOICE:
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow >
                                <TableCell sx={{ borderTop: colorValue, borderBottom: colorValue, borderRight: colorValue }}>Proforma Invoice No:</TableCell>
                                <TableCell sx={{ fontSize: '16px', fontWeight: 'bold', borderTop: colorValue, borderBottom: colorValue }}>PSG-5426</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ borderBottom: colorValue, borderRight: colorValue }}>PI Date:</TableCell>
                                <TableCell sx={{ borderBottom: colorValue }}>{new Date().toLocaleDateString('en-GB')}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ borderBottom: colorValue, borderRight: colorValue }}>Rev.No & Date:</TableCell>
                                <TableCell sx={{ borderBottom: colorValue }}></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ borderBottom: colorValue, borderRight: colorValue }}>Prepared By:</TableCell>
                                <TableCell sx={{ borderBottom: colorValue }}>GOPAL J</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ borderRight: colorValue }}>Checked By:</TableCell>
                                <TableCell>SIVAKUMAR K</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Grid>
            </Grid>

            <TableContainer component={Paper} sx={{ fontSize: '3px' }}>
                <Table size={'small'}>
                    <TableHead>
                        {/*---first row--- */}
                        <TableRow>
                            <TableCell sx={{ ...styles.table_font, width: '5px' }} rowSpan={2}>S.No</TableCell>
                            <TableCell sx={{ ...styles.table_font, width: '200px' }} rowSpan={2}>TYPE</TableCell>
                            <TableCell sx={{ ...styles.table_font }} colSpan={2}>ACTUAL SIZE IN "INCH"</TableCell>
                            <TableCell sx={{ ...styles.table_font }} colSpan={2}>ACTUAL SIZE IN "MM"</TableCell>
                            <TableCell sx={styles.table_font} rowSpan={2}>QTY</TableCell>
                            <TableCell sx={styles.table_font} colSpan={2}>CHARGEABLE SIZE IN "INCH"</TableCell>
                            <TableCell sx={{ ...styles.table_font, width: '20px' }} rowSpan={2}>CHARGEABLE AREA IN SQ.MTR</TableCell>
                            <TableCell sx={styles.table_font} rowSpan={2}>RATE PER SQ.MTR</TableCell>
                            <TableCell sx={styles.table_font} rowSpan={2}>NO. OF HOLES</TableCell>
                            <TableCell sx={styles.table_font} rowSpan={2}>NO. OF CUTOUTS</TableCell>
                            <TableCell sx={styles.table_font} rowSpan={2}>NO. OF BIG HOLES</TableCell>
                            <TableCell sx={styles.table_font} rowSpan={2}>NO. OF BIG CUTOUTS</TableCell>
                            <TableCell sx={styles.table_font} rowSpan={2}>AMOUNT BASIC RATE IN RS.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={styles.table_font}>WIDTH</TableCell>
                            <TableCell sx={styles.table_font}>HEIGHT</TableCell>
                            <TableCell sx={styles.table_font}>WIDTH</TableCell>
                            <TableCell sx={styles.table_font}>HEIGHT</TableCell>
                            <TableCell sx={styles.table_font}>WIDTH</TableCell>
                            <TableCell sx={styles.table_font}>HEIGHT</TableCell>
                        </TableRow>
                    </TableHead>
                    {/*---Main Table billing section-- */}
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={16} sx={{ ...styles.table_font, textAlign: 'center', color: '#0F6790', fontSize: '16px', fontWeight: 'bold', textDecoration: 'underline', padding: '2px 0 2px 0' }}>Please check the size before confirmation</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={16} onDoubleClick={handleDoubleClick} sx={{ ...styles.table_font, textAlign: 'center', fontWeight: 'bold', fontSize: '14px', padding: '2px 0 2px 0' }}>
                                12MM CLEAR TOUGHENED GLASS - SAINT GOBAIN GLASS
                            </TableCell>
                            {/* <TableCell colSpan={16} onDoubleClick={handleDoubleClick} sx={{ ...styles.table_font, textAlign: 'center', fontWeight: 'bold', fontSize: '14px', padding: '2px 0 2px 0' }}>
                                {isEditing ? (
                                    <select
                                        value={selectedValue}
                                        onChange={handleSelectChange}
                                        onBlur={() => setIsEditing(false)} // Close dropdown on blur
                                    >
                                        {productList.map((product, index) => (
                                            <option key={index} value={product}>
                                                {product}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <div style={{ cursor: 'pointer' }}>
                                        {selectedValue || 'Click to edit'}
                                    </div>
                                )}
                            </TableCell> */}
                        </TableRow>
                        {/*---each item ---- */}
                        {billData.map((item, i) => (
                            <TableRow key={i}>
                                <TableCell sx={{ ...styles.table_font, fontSize: '12px' }}>{item.id}</TableCell>
                                <TableCell sx={{ ...styles.table_font, fontSize: '12px' }}>{item.type}</TableCell>
                                <TableCell sx={{ ...styles.table_font, fontSize: '12px' }}>{item.gl_inch_width}</TableCell>
                                <TableCell sx={{ ...styles.table_font, fontSize: '12px' }}>{item.gl_inch_height}</TableCell>
                                <TableCell sx={{ ...styles.table_font, fontSize: '12px' }}>{(item.gl_mm_width).toFixed(2)}</TableCell>
                                <TableCell sx={{ ...styles.table_font, fontSize: '12px' }}>{(item.gl_mm_height).toFixed(2)}</TableCell>
                                <TableCell sx={{ ...styles.table_font, fontSize: '12px' }}>{item.qty}</TableCell>
                                <TableCell sx={{ ...styles.table_font, fontSize: '12px' }}>{item.char_inch_width}</TableCell>
                                <TableCell sx={{ ...styles.table_font, fontSize: '12px' }}>{item.char_inch_height}</TableCell>
                                <TableCell sx={{ ...styles.table_font, fontSize: '12px' }}>{item.char_sqt_mtr}</TableCell>
                                <TableCell sx={{ ...styles.table_font, fontSize: '12px' }}>{item.price_sqt}</TableCell>
                                <TableCell sx={{ ...styles.table_font, fontSize: '12px' }}>{item.num_hole}</TableCell>
                                <TableCell sx={{ ...styles.table_font, fontSize: '12px' }}>{item.num_cutout}</TableCell>
                                <TableCell sx={{ ...styles.table_font, fontSize: '12px' }}>{item.num_big_hole}</TableCell>
                                <TableCell sx={{ ...styles.table_font, fontSize: '12px' }}>{item.num_big_cutout}</TableCell>
                                <TableCell sx={{ ...styles.table_font, fontSize: '12px' }}>{item.amount}</TableCell>
                                
                            </TableRow>
                        ))}
                        {/*---total row 2-- */}
                        <TableRow>
                            <TableCell colSpan={16} sx={{border: colorValue, borderTop: 'none'}}></TableCell>
                        </TableRow>

                        {/*---total row 1-- */}
                        <TableRow>
                            <TableCell colSpan={6} sx={{ ...styles.table_font, fontSize: '12px' }}>TOTAL GLASS QTY & SQM</TableCell>
                            <TableCell sx={{ ...styles.table_font, fontSize: '12px' }}>{totals.totalQty}</TableCell>
                            <TableCell sx={{ ...styles.table_font, fontSize: '12px' }}></TableCell>
                            <TableCell sx={{ ...styles.table_font, fontSize: '12px' }}></TableCell>
                            <TableCell sx={{ ...styles.table_font, fontSize: '12px' }}>{totals.totalCharSqtMtr}</TableCell>
                            <TableCell sx={{ ...styles.table_font, fontSize: '12px' }}></TableCell>
                            <TableCell sx={{ ...styles.table_font, fontSize: '12px' }}></TableCell>
                            <TableCell sx={{ ...styles.table_font, fontSize: '12px' }}></TableCell>
                            <TableCell sx={{ ...styles.table_font, fontSize: '12px' }}></TableCell>
                            <TableCell sx={{ ...styles.table_font, fontSize: '12px' }}></TableCell>
                            <TableCell sx={{ ...styles.table_font, fontSize: '12px' }}></TableCell>
                        </TableRow>
                        {/*---Total row 2-- */}
                        <TableRow>
                            <TableCell colSpan={6} sx={{ ...styles.table_font, fontSize: '12px' }}>TOTAL NO. OF HOLES, CUTOUTS  & TOTAL</TableCell>
                            <TableCell sx={{ ...styles.table_font, fontSize: '12px' }}></TableCell>
                            <TableCell sx={{ ...styles.table_font, fontSize: '12px' }}></TableCell>
                            <TableCell sx={{ ...styles.table_font, fontSize: '12px' }}></TableCell>
                            <TableCell sx={{ ...styles.table_font, fontSize: '12px' }}></TableCell>
                            <TableCell sx={{ ...styles.table_font, fontSize: '12px' }}></TableCell>
                            <TableCell sx={{ ...styles.table_font, fontSize: '12px' }}>{totals.totalNumHole}</TableCell>
                            <TableCell sx={{ ...styles.table_font, fontSize: '12px' }}>{totals.totalNumCutout}</TableCell>
                            <TableCell sx={{ ...styles.table_font, fontSize: '12px' }}>{totals.totalNumBigHole}</TableCell>
                            <TableCell sx={{ ...styles.table_font, fontSize: '12px' }}>{totals.totalNumBigCutout}</TableCell>
                            <TableCell sx={{ ...styles.table_font, fontSize: '12px' }}>{(totals.totalAmount).toFixed(2)}</TableCell>
                        </TableRow>
                        {/*---Additional charges-- */}
                        <TableRow>
                            <TableCell rowSpan={2} colSpan={6} sx={{ padding: '2px 0px 2px 15px', border: colorValue }}>
                                <Table size={'small'}>
                                    <TableHead>
                                        <TableRow><TableCell colSpan={5} sx={{ fontWeight: 'bold', textDecoration: 'underline', border: 'none', fontSize: '10px', padding: '0px 0 0px 0' }}>ADDITIONAL CHARGES:</TableCell></TableRow>
                                        <TableRow>
                                            {add_head.map((item, i) => (
                                                <TableCell key={i} sx={{ textDecoration: 'underline', fontWeight: 'bold', border: 'none', fontSize: '10px', padding: '0px 0 0px 0', textAlign: i == 0 ? 'left' : 'center' }}>{item}</TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {extra_chg.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell sx={{ border: 'none', fontWeight: 'bold', fontSize: '10px', padding: '2px 0px 2px 0' }}>{index + 1 + ').'} {item.name}</TableCell>
                                                <TableCell style={{ border: colorValue, fontSize: '10px', padding: '2px 0px 2px 0', textAlign: 'center' }}>{item.total_no}</TableCell>
                                                <TableCell style={{ border: colorValue, fontSize: '10px', padding: '2px 0px 2px 0', textAlign: 'center' }}>{item.scale}</TableCell>
                                                <TableCell style={{ border: colorValue, fontSize: '10px', padding: '2px 0px 2px 0', textAlign: 'center' }}>{item.price}</TableCell>
                                                <TableCell sx={{ border: 'none', textAlign: 'center', fontSize: '10px', padding: '2px 0px 2px 0' }}>{item.total_no * item.price}</TableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow>
                                            <TableCell colSpan={5} sx={{ fontWeight: 'bold', border: 'none', fontSize: '10px', padding: '2px 0px 2px 0' }}>BREAK UP:</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableCell>
                            {/*---Total and tax section-- */}
                            <TableCell colSpan={10} style={{ border: colorValue, padding: '0px 0px 0px 0px' }}>
                                <Table size={'small'}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell colSpan={4} sx={styles.table_total}>Total Additional Processing Charges:</TableCell>
                                            <TableCell sx={{ ...styles.table_total, border: 'none', width: '50px', border: colorValue, textAlign: 'center' }}></TableCell>
                                            <TableCell colSpan={5} sx={{ ...styles.table_total, fontWeight: 'bold', borderRight: 'none', textAlign: 'center' }}>{totals.totalNumHole * extra_chg[0].price}</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell colSpan={4} sx={styles.table_total}>Sub Total:</TableCell>
                                            <TableCell sx={{ ...styles.table_total, border: 'none', width: '50px', border: colorValue, textAlign: 'center' }}></TableCell>
                                            <TableCell colSpan={5} sx={{ ...styles.table_total, fontWeight: 'bold', borderRight: 'none', textAlign: 'center' }}>{tax}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={4} sx={styles.table_total}>HANDLING CHARGES:</TableCell>
                                            <TableCell sx={{ ...styles.table_total, border: 'none', width: '50px', border: colorValue, textAlign: 'center' }}></TableCell>
                                            <TableCell colSpan={5} sx={{ ...styles.table_total, fontWeight: 'bold', borderRight: 'none', textAlign: 'center' }}>221.6</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={4} sx={styles.table_total}>FREIGHT CHARGES:</TableCell>
                                            <TableCell sx={{ ...styles.table_total, border: 'none', width: '50px', border: colorValue, textAlign: 'center' }}>0</TableCell>
                                            <TableCell colSpan={5} sx={{ ...styles.table_total, fontWeight: 'bold', borderRight: 'none', textAlign: 'center' }}>0</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={4} sx={styles.table_total}>IGST:</TableCell>
                                            <TableCell sx={{ ...styles.table_total, border: 'none', width: '50px', border: colorValue, textAlign: 'center' }}>0%</TableCell>
                                            <TableCell colSpan={5} sx={{ ...styles.table_total, fontWeight: 'bold', borderRight: 'none', textAlign: 'center' }}>0</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={4} sx={styles.table_total}>CGST:</TableCell>
                                            <TableCell sx={{ ...styles.table_total, border: 'none', width: '50px', border: colorValue, textAlign: 'center' }}>{intialValue.sgst}%</TableCell>
                                            <TableCell colSpan={5} sx={{ ...styles.table_total, fontWeight: 'bold', borderRight: 'none', textAlign: 'center' }}>{gst.toFixed(2)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={4} sx={styles.table_total}>SGST:</TableCell>
                                            <TableCell sx={{ ...styles.table_total, width: '50px', border: colorValue, textAlign: 'center' }}>{intialValue.sgst}%</TableCell>
                                            <TableCell colSpan={5} sx={{ ...styles.table_total, fontWeight: 'bold', border: colorValue, borderRight: 'none', textAlign: 'center' }}>{gst.toFixed(2)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={8} sx={{ ...styles.table_total, textAlign: 'center', fontWeight: 'bold', fontSize: '14px', borderBottom: 'none' }}>GRAND TOTAL</TableCell>
                                            <TableCell colSpan={2} sx={{ ...styles.table_total, fontWeight: 'bold', textAlign: 'center', borderBottom: 'none', borderRight: 'none' }}>{grand_total.toFixed(2)}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableCell>
                        </TableRow>
                        {/*---Terms and condition-- */}
                        <TableRow>
                            <TableCell rowSpan={2} colSpan={7} sx={styles.table_font}>
                                <Table size={"small"}>
                                    <TableHead><TableRow><TableCell sx={{ ...styles.table_font, border: "none", textAlign: 'left', textDecoration: 'underline', paddingLeft: '5px' }}>Terms & Conditions:</TableCell></TableRow></TableHead>
                                    <TableBody>
                                        {terms.map((item, i) => (
                                            <TableRow key={i}>
                                                <TableCell sx={{ ...styles.table_font, border: 'none', textAlign: 'left', fontWeight: i == 0 ? 'bold' : 'none', paddingLeft: '5px' }}>{item}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableCell>
                            <TableCell rowSpan={4} colSpan={3} sx={styles.table_font}> For PARIHAR SAFETY GLASS PVT LTD</TableCell>
                        </TableRow>
                        {/*--- Note-- */}
                        <TableRow>
                            <TableCell rowSpan={2} colSpan={6} sx={{ ...styles.table_font }}>
                                <u>NOTE :</u> TOUGHENED GLASSES ARE TAILOR MADE &
                                CUSTOM MADE. ONCE ORDER PLACED CANNOT BE
                                CANCELLED OR ALTERED.
                            </TableCell>
                        </TableRow>
                        {/*---Bank acount-- */}
                        <TableRow>
                            <TableCell colSpan={7} sx={{ ...styles.table_font }}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ ...styles.table_font, fontWeight: 'bold', border: 'none', textAlign: 'left', paddingLeft: '5px' }}>Account Details:</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell sx={{ ...styles.table_font, border: 'none', textAlign: 'left', paddingLeft: '5px' }}>
                                                Bank Details: <b>SOUTH INDIAN BANK LTD</b> (Anekal Branch-Bangalore)
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell sx={{ ...styles.table_font, border: 'none', textAlign: 'left', paddingLeft: '5px' }}>
                                                A/c:Type: <b>CA</b> . A/C: No: <b>0664083000000013</b>,
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell sx={{ ...styles.table_font, border: 'none', textAlign: 'left', paddingLeft: '5px' }}>
                                                IFSC : <b>SIBL0000664</b>, Name: <b>Parihar Safety Glass Pvt Ltd</b>.
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Container >
    );
}