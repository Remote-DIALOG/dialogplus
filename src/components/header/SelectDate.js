import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import { connect } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from "@mui/material/List";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import jsPDF from 'jspdf';
import "jspdf-autotable";
import { getSummary } from '../../reducers/notes';

function SelectDate(props) {
    const [dates, setSelectedDates] = useState([]);  // Array for selected dates
    const [result, setResult] = useState([]);        // Data fetched from the backend
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        console.log("React component mounted");
    }, []);

    // Handle checkbox selection for dates
    const handleCheckbox = (event, index) => {
        const date = props.dates[index].date
        setSelectedDates((prevDates) => {
            if (event.target.checked) {
                return [...prevDates, date]
            }
            else  {
                return prevDates.filter((d) => d !== date);
            }
        })
    };

    // Fetch data for selected dates
    const fetchData = async () => {
        let fetchedData = [];
        console.log(dates)
        for (let i = 0; i < dates.length; i++) {
            try {
                const data = await props.getSummary({
                    clientId: props.client.id,
                    timestampe: dates[i].replace(/['"]+/g, ""),
                });
                console.log("----- fetch data",data)
                fetchedData.push(data.payload);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        console.log(fetchedData)
        return fetchedData
        // setResult(fetchedData); 
        // console.log(fetchedData) // Store fetched data in result state
    };

    // Generate PDF
    const generatePDF = async () => {
        let data = await fetchData(); 
        console.log(data) // Fetch data before generating the PDF
        const pdf = new jsPDF("p", "pt", "a4");
        // if (result.length === 0) {
        //     alert("No data to generate the table. Please try again later.");
        //     return;
        // }

        // Columns and Rows for Table
        const columns = ["Scale", "Value", "Action Items"];
        let rows = [];

        // Populate the rows
        result.forEach((item) => {
            if (item && item.name && item.value && item.actionitems) {
                rows.push([item.name, item.value, item.actionitems]);
            }
        });

        // Check if there are any rows
        if (rows.length === 0) {
            alert("No valid data available to populate the table.");
            return;
        }

        // Add Title
        pdf.setFontSize(18);
        pdf.text(235, 40, "Table");

        // Add Table with AutoTable
        pdf.autoTable({
            head: [columns],
            body: rows,
            startY: 65,
            theme: "grid",
            styles: {
                font: "times",
                halign: "center",
                cellPadding: 3.5,
                lineWidth: 0.5,
                lineColor: [0, 0, 0],
                textColor: [0, 0, 0],
            },
            headStyles: {
                textColor: [0, 0, 0],
                fontStyle: "normal",
                lineWidth: 0.5,
                lineColor: [0, 0, 0],
                fillColor: [166, 204, 247],
            },
            alternateRowStyles: {
                fillColor: [212, 212, 212],
                textColor: [0, 0, 0],
                lineWidth: 0.5,
                lineColor: [0, 0, 0],
            },
            rowStyles: {
                lineWidth: 0.5,
                lineColor: [0, 0, 0],
            },
            tableLineColor: [0, 0, 0],
        });

        // Save the PDF with the Table
        pdf.save("table_with_data.pdf");

        // Add a new page
        pdf.addPage();
        pdf.setFont("helvetica");
        pdf.text(20, 100, "This is the second page.");

        // Save the final PDF
        pdf.save("Rem-D-SU-Plan-Report.pdf");
    };

    return (
        <Dialog fullScreen={fullScreen} open={props.open} onClose={props.close}>
            <DialogTitle>
                <Box display="flex" alignItems="center">
                    <Box flexGrow={1}>Select Date</Box>
                    <Box>
                        <IconButton onClick={props.close}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </Box>
            </DialogTitle>
            <DialogContent>
                <List component="nav" aria-labelledby="nested-list-subheader">
                    {props.dates.map((row, index) => (
                        <Box key={index} sx={{ display: 'flex', flexDirection: "row", width: '100%', justifyContent: 'space-around', borderBottom: 1 }}>
                            <FormControlLabel
                                control={<Checkbox onChange={(event) => { handleCheckbox(event, index) }} />}
                            />
                            <Box sx={{ width: "15%", flex: 1, display: "flex", flexDirection: "row", alignItems: 'center' }}>
                                <Typography variant='h6'>{row.date.replace(/['"]+/g, '')}</Typography>
                            </Box>
                        </Box>
                    ))}
                </List>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={generatePDF}>Generate PDF</Button>
            </DialogActions>
        </Dialog>
    );
}

const mapStateToProps = (state) => ({
    isLogin: state.loginReducer.isLogin,
    client: state.ClientReducer.clientinfo,
    dates: state.ClientReducer.dates,
    summary: state.NotesReducer.sessionsummary
});

const mapDispatchToProps = {
    getSummary
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectDate);
