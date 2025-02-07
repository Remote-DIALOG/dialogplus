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
import { PDFViewer, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { getSummary } from '../../reducers/notes';
import logo from './dialogplus.jpg';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        paddingTop: 5,
        paddingHorizontal: 20
    },
    username: {
        fontSize: 12,
        marginTop: 45,
    },
    title: {
        backgroundColor: '#4472C4',
        width: '100%',
        height: 50,
        marginTop: 10
    },
    image: {
        marginHorizontal: 500,
        marginTop: 0,
        height: 45,
        width: 50
    },
    sessiondates: {
        marginTop: 10,
        fontSize: 18, // Increased font size
        fontWeight: 'bold', // Make it bold
        textAlign: 'center', // Center alignment
        paddingLeft: 20 // Add more space from the left
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10 // Increased spacing between rows
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10 // Increased spacing between rows
    }
});

function SelectDate(props) {
    const [dates, setSelectedDates] = useState([]); // Array for selected dates
    const [result, setResult] = useState([]);
    const [title, setTitle] = useState('');
    const [showPDF, setShowPDF] = useState(false);
    const [sessionData, setSessionData] = useState(null); // Data fetched from the backend
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        console.log("React component mounted");
    }, []);

    // Handle checkbox selection for dates
    const handleCheckbox = (event, index) => {
        const date = props.dates[index].date;
        setSelectedDates((prevDates) => {
            if (event.target.checked) {
                return [...prevDates, date];
            } else {
                return prevDates.filter((d) => d !== date);
            }
        });
    };

    // Fetch data for selected dates
    const fetchData = async () => {
        let fetchedData = [];
        for (let i = 0; i < dates.length; i++) {
            try {
                const data = await props.getSummary({
                    clientId: props.client.id,
                    timestampe: dates[i].replace(/['"]+/g, ""),
                });
                fetchedData.push(data.payload);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        return fetchedData;
    };

    // Generate PDF
    const generatePDF = async (event, username) => {
        let data = await fetchData();
        setShowPDF(true);
        setTitle(username);
        setSessionData(data);
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
                                control={<Checkbox onChange={(event) => { handleCheckbox(event, index); }} />}
                            />
                            <Box sx={{ width: "15%", flex: 1, display: "flex", flexDirection: "row", alignItems: 'center' }}>
                                <Typography variant='h6'>{row.date.replace(/['"]+/g, '')}</Typography>
                            </Box>
                        </Box>
                    ))}
                </List>
            </DialogContent>
            <DialogActions>
                {showPDF && (
                    <div>
                        <PDFViewer width="100%" height="500px">
                            <Document>
                                <Page style={styles.page}>
                                    <Text style={styles.username}>{title}</Text>
                                    <Image style={styles.image} src={logo} />
                                    <View style={styles.title}>
                                        <Text style={{ marginTop: 10, color: 'white' }}>Remote DIALOG+ Plan</Text>
                                    </View>
                                    {sessionData.map((data, index) => (
                                        <View key={index} style={{ marginBottom: 10 }}>
                                            <View style={{ backgroundColor: '#4472C4', width: '100%', height: 40, marginTop: 10 }}>
                                                <Text style={{ marginTop: 10, color: 'white', fontSize: 18 }}>{data[12]?.created_at || "N/A"}</Text>
                                            </View>
                                            <View style={{ border: "1px solid black", padding: 10 }}>
                                                <Text style={styles.tableHeader}> Field                      | Score          | Action Items </Text>
                                                {Object.values(data).filter(entry => entry.name).map((entry, idx) => (
                                                      <View key={idx} style={styles.tableRow}>
                                                          <Text style={{ width: '30%' }}>{entry.name || "N/A"}</Text>
                                                          <Text style={{ width: '20%' }}>{entry.value || "N/A"}</Text>
                                                          <Text style={{ width: '50%' }}>{(entry.actionitems || []).join(', ') || "No action items"}</Text>
                                                      </View>
                                                  ))}
                                            </View>
                                        </View>
                                    ))}
                                </Page>
                            </Document>
                        </PDFViewer>
                    </div>
                )}
                <Button variant="outlined" onClick={(event) => generatePDF(event, props.client.full_name)}>Generate PDF</Button>
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
