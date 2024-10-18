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
        // console.log(fetchedData)
        return fetchedData
        // setResult(fetchedData); 
        // console.log(fetchedData) // Store fetched data in result state
    };

    // Generate PDF
    const generatePDF = async () => {
        let data = await fetchData(); 
        // console.log(data)
    const pdf = new jsPDF('p', 'pt', 'a4');

    // Set custom font size and title
    pdf.setFontSize(18);

    // Draw blue box behind the username header
    const headerY = 70;
    const headerHeight = 30;
    pdf.setFillColor(166, 204, 247);  // Light blue color (RGB)
    pdf.rect(40, headerY, 500, headerHeight, 'F');  // Draw filled rectangle (x, y, width, height)

    // Add header text - Username
    pdf.setFontSize(12);
    pdf.setTextColor(255, 255, 255);  // White text color for contrast with blue background
    pdf.text('Report', 45, headerY + 20);  // Position the text inside the blue box

    // Set color to black for section titles
    pdf.setTextColor(0, 0, 0);

    const result = data
    let currentY = 120;

    // Render each section with corresponding scales and action items
    
    result.forEach(x => {
        x.forEach(item => {
            console.log("Showing items ");
            console.log(item);
    
            // Check if item has a valid name and value before rendering
            if (item.name && typeof item.value !== 'undefined') {
                // Render scale name and value
                pdf.setFontSize(14);
                pdf.text(`${item.name}`, 40, currentY);
                pdf.setFontSize(12);
                pdf.text(`Score: ${item.value}`, 200, currentY);
                currentY += 20; // Move down for the next entry
    
                // Check if actionitems exist and are not empty
                if (Array.isArray(item.actionitems) && item.actionitems.length > 0) {
                    pdf.setFontSize(12);
                    pdf.text(`Action Items: ${item.actionitems.join(', ')}`, 60, currentY);
                    currentY += 20; // Move down after action items
                }
            } else {
                console.warn("Invalid item detected", item);
            }
        });
    });
    

    // Notes section
    currentY += 30;
    pdf.setFontSize(14);
    pdf.text('NOTES:', 40, currentY);

    // Empty boxes to indicate placeholder for scores, action items, and notes
    currentY += 30;
    const boxStartX = 40;
    const boxHeight = 60;
    const boxWidth = 150;

    for (let i = 0; i < 3; i++) {
        // Score box
        pdf.setDrawColor(0, 0, 0);
        pdf.rect(boxStartX, currentY, boxWidth, boxHeight); // Rectangle (x, y, width, height)

        // Action items box
        pdf.rect(boxStartX + boxWidth + 10, currentY, boxWidth, boxHeight);

        // Notes box
        pdf.rect(boxStartX + 2 * (boxWidth + 10), currentY, boxWidth, boxHeight);

        currentY += boxHeight + 20;
    }

    // Add session dates
    currentY += 30;
    const sessionDates = [
        'Date of most recent session (e.g. 7th March 2024)',
        'Date of second most recent session',
        'Date of third most recent session'
    ];

    sessionDates.forEach((date) => {
        pdf.text(date, 40, currentY);
        currentY += 20;
    });

    // Save the PDF
    pdf.save('Styled_Dialog_Plus_Report.pdf');
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
