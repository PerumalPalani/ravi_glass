import { useState } from "react";
import { Button, TextField, Container, Typography } from "@mui/material";
import { useRouter } from "next/router";

export default function Po_form() {
    const [count, setCount] = useState(1);
    const [height, setHeight] = useState("");
    const [width, setWidth] = useState("");
    const [glassData, setGlassData] = useState([]);
    const [msg, setMsg] = useState('');
    const [bill, setBill] = useState([]);
    const router = useRouter();

    function calculateArea(height, width) {
        let conversionFactor = 0.0254;

        // Convert dimensions to meters
        let heightInMeters = height * conversionFactor;
        let widthInMeters = width * conversionFactor;
        // Calculate area in square meters
        let areaSquareMeters = heightInMeters * widthInMeters;
        return areaSquareMeters;
    }


    const handleAdd = () => {
        if (!height || !width) {
            alert("Please enter both height and width");
            return;
        }

        const newData = {
            id: count,
            height: parseFloat(height),
            width: parseFloat(width),
        };
        // let filter_scale = filter_type(height, width);
        console.log(calculateArea((parseInt(height) + 2), (parseInt(width) + 2)), 'Square meter value....');
        let sqr_mtr_val = calculateArea((parseInt(height) + 2), (parseInt(width) + 2));
        const billData = {
            id: count,
            type: 'DRAWING',
            gl_inch_height: parseFloat(height),
            gl_inch_width: parseFloat(width),
            gl_mm_height: height * 25.4,
            gl_mm_width: width * 25.4,
            qty: 1,
            char_inch_height: parseInt(height) + 2,
            char_inch_width: parseInt(width) + 2,
            char_sqt_mtr: sqr_mtr_val.toFixed(2),
            price_sqt: 1620,
            num_hole: 1,
            num_cutout: 0,
            num_big_hole: 0,
            num_big_cutout: 0,
            amount: (sqr_mtr_val * 1620).toFixed(2)
        };

        setGlassData([...glassData, newData]);
        setBill([...bill, billData]);
        setCount(count + 1);
        setHeight("");
        setWidth("");
        setMsg(`Glass details added successfully!, row count ${count}`)
    };

    const handlePrint = () => {
        if (glassData.length !== 0 && bill.length !== 0) {
            console.log(glassData, 'Glass data');
            console.log(bill, 'bill data!');
            // Logic to print the bill (you can use react-print or any other library)
            // For simplicity, let's just log the data to the console for now
            // console.log("Printing Bill:", glassData);
            localStorage.setItem('ravi-glass', JSON.stringify(bill));
            router.push('/preview_po');
        }else{
            alert('Please fill the form because bill data is empty..!')
        }
    };

    return (
        <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', textDecoration: 'underline' }}>
                Glass Input Form
            </Typography>
            <TextField
                label="Count"
                value={count}
                InputProps={{
                    readOnly: true,
                }}
                sx={{ marginTop: '20px' }}
            />
            <TextField
                label="Glass Height (inch)"
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                sx={{ marginTop: '20px' }}
            />
            <TextField
                label="Glass Width (inch)"
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                sx={{ marginTop: '20px' }}
            />
            <Typography variant="body2" sx={{ color: 'green', marginTop: '10px' }}>{msg !== '' && msg}</Typography>
            <Button variant="contained" onClick={handleAdd} sx={{ marginTop: '20px', backgroundColor: 'green', padding: '5px 40px 5px 40px', '&:hover': { backgroundColor: 'rgba(0, 255, 0, 0.7)' } }}>
                Add
            </Button>
            <Button variant="contained" onClick={handlePrint} sx={{ marginTop: '20px', backgroundColor: '#5690b7' }}>
                Show Bill
            </Button>
        </Container>
    );
}
