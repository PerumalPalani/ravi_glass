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
   let sqr_val = 0;
    const arr = [
        { height: (872/25.4).toFixed(2), width: (1872/25.4).toFixed(2) },
        { height: (1250/25.4).toFixed(2), width: (1530/25.4).toFixed(2) },
        { height: (1234/25.4).toFixed(2), width: (1498/25.4).toFixed(2)},
      ];
      const filter_type = (targetHeight, targetWidth) =>{
        const data = arr.find(
            ({ height, width }) => height >= targetHeight && width >= targetWidth
          );
          console.log(data, 'My data');
          if(data){
            console.log(((data.height * data.width) / 1550.0031).toFixed(2), 'Waht is the value...');
            let calc =((data.height * data.width) / 1550.0031).toFixed(2);
            sqr_val = calc; // Calculate area in square meters
          return data;
          }
          else{
            let data02 ={ height: (1234/25.4).toFixed(2), width: (1498/25.4).toFixed(2) };
            let calc =((data02.height * data02.width) / 1550.0031).toFixed(2);
            sqr_val = calc;
            
            return data02;
          }
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
        let filter_scale = filter_type(height, width);

        const billData = {
            id: count,
            type: 'DRAWING',
            gl_inch_height: parseFloat(height),
            gl_inch_width: parseFloat(width),
            gl_mm_height: parseFloat(height * 25.4),
            gl_mm_width: parseFloat(width * 25.4),
            qty: 1,
            char_inch_height: filter_scale.height,
            char_inch_width: filter_scale.width,
            char_sqt_mtr: sqr_val,
            price_sqt: 1620,
            num_hole: 1,
            num_cutout: 0,
            num_big_hole: 0,
            num_big_cutout: 0,
            amount: (sqr_val * 1620).toFixed(2)
        };

        setGlassData([...glassData, newData]);
        setBill([...bill, billData]);
        setCount(count + 1);
        setHeight("");
        setWidth("");
        setMsg(`Glass details added successfully!, row count ${count}`)
    };

    const handlePrint = () => {
        console.log(glassData, 'Glass data');
        console.log(bill, 'bill data!');
        // Logic to print the bill (you can use react-print or any other library)
        // For simplicity, let's just log the data to the console for now
        // console.log("Printing Bill:", glassData);
        localStorage.setItem('ravi-glass', JSON.stringify(bill));
        router.push('/preview_po');
    };

    return (
        <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6" gutterBottom sx={{textAlign: 'center', textDecoration: 'underline'}}>
                Glass Input Form
            </Typography>
            <TextField
                label="Count"
                value={count}
                InputProps={{
                    readOnly: true,
                }}
                sx={{marginTop: '20px'}}
            />
            <TextField
                label="Glass Height (inch)"
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                sx={{marginTop: '20px'}}
            />
            <TextField
                label="Glass Width (inch)"
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                sx={{marginTop: '20px'}}
            />
            <Typography variant="body2" sx={{color: 'green', marginTop: '10px'}}>{msg !== '' && msg}</Typography>
            <Button variant="contained" onClick={handleAdd} sx={{marginTop: '20px', backgroundColor: 'green', padding: '5px 40px 5px 40px', '&:hover': {backgroundColor: 'rgba(0, 255, 0, 0.7)'}}}>
                Add
            </Button>
            <Button variant="contained" onClick={handlePrint} sx={{marginTop: '20px', backgroundColor: '#5690b7'}}>
                Show Bill
            </Button>
        </Container>
    );
}
