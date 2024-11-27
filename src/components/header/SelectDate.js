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
import autoTable from 'jspdf-autotable'
import {PDFViewer, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { getSummary } from '../../reducers/notes';
import logo from './dialogplus.jpg'

const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      paddingTop:5,
      paddingHorizontal:20
    },
    username: {
      fontSize: 12,
      marginTop: 45,
    },
    title:{
      backgroundColor:'#4472C4',
      with:'100%',
      height:50,
      marginTop:10
    },
    image: {
      marginHorizontal: 500,
      marginTop:0,
      height:45,
      width:50
    },
    sessiondates:{
      marginTop:1
    }
  });
function SelectDate(props) {
    const [dates, setSelectedDates] = useState([]);  // Array for selected dates
    const [result, setResult] = useState([]);
    const [title, settitle] = React.useState('')
    const [showpdf, setshowpdf] = React.useState(false)
    const [sessiondata, setsessiondata] = React.useState(null)        // Data fetched from the backend
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
    const generatePDF = async (event, username) => {
        let data = await fetchData(); 
        setshowpdf(true)
        settitle(username)
        setsessiondata(data)    
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
            {showpdf && (
                <div>
                    <PDFViewer width="100%" height="500px">
            <Document>
              <Page style={styles.page}>
                <Text style={styles.username}>{title}</Text>
                <Image style={styles.image} src={logo}  />
                <View style={styles.title}>
                  <Text style={{marginTop:10, color:'white'}}>Remote DIALOG+ Plan</Text>
                </View>
                {sessiondata.map(function(data, index){
                  return (
                    <View>
                      <View style={{ backgroundColor:'#4472C4',with:'100%',height:40, marginTop:10}}>
                        <Text style={{marginTop:10, color:'white', fontSize:11}}>{data[12].created_at}</Text>
                      </View>
                      <View style={{flexDirection:'row', justifyContent:'space-between', border: "1px solid black"}}>
                        <View style={{flexDirection:'column', marginLeft:10, marginTop:10}}>
                          <Text style={{marginTop:1}}>{data[0].name}</Text>
                          <Text style={{marginTop:1}}>{data[1].name}</Text>
                          <Text style={{marginTop:1}}>{data[2].name}</Text>
                          <Text style={{marginTop:1}}>{data[3].name}</Text>
                          <Text style={{marginTop:1}}>{data[4].name}</Text>
                          <Text style={{marginTop:1}}>{data[5].name}</Text>
                          <Text style={{marginTop:1}}>{data[6].name}</Text>
                          <Text style={{marginTop:1}}>{data[7].name}</Text>
                          <Text style={{marginTop:1}}>{data[8].name}</Text>
                          <Text style={{marginTop:1}}>{data[9].name}</Text>
                          <Text style={{marginTop:1}}>{data[10].name}</Text>
                        </View>
                        <View style={{flexDirection:'column',  marginLeft:10, marginTop:10}}>
                        <Text style={{marginTop:1}}>{data[0].value}</Text>
                          <Text style={{marginTop:1}}>{data[1].value}</Text>
                          <Text style={{marginTop:1}}>{data[2].value}</Text>
                          <Text style={{marginTop:1}}>{data[3].value}</Text>
                          <Text style={{marginTop:1}}>{data[4].value}</Text>
                          <Text style={{marginTop:1}}>{data[5].value}</Text>
                          <Text style={{marginTop:1}}>{data[6].value}</Text>
                          <Text style={{marginTop:1}}>{data[7].value}</Text>
                          <Text style={{marginTop:1}}>{data[8].value}</Text>
                          <Text style={{marginTop:1}}>{data[9].value}</Text>
                          <Text style={{marginTop:1}}>{data[10].value}</Text>
                        </View>
                        <View>
                        </View>
                        <View style={{flexDirection:'column',  marginRight:10, marginTop:10}}>
                        <Text style={{marginTop:1}}>{data[0].select}</Text>
                          <Text style={{marginTop:1}}>{data[1].select == true ? "Yes": "No"}</Text>
                          <Text style={{marginTop:1}}>{data[2].select == true ? "Yes": "No"}</Text>
                          <Text style={{marginTop:1}}>{data[3].select == true ? "Yes": "No"}</Text>
                          <Text style={{marginTop:1}}>{data[4].select == true ? "Yes": "No"}</Text>
                          <Text style={{marginTop:1}}>{data[5].select == true ? "Yes": "No"}</Text>
                          <Text style={{marginTop:1}}>{data[6].select == true ? "Yes": "No"}</Text>
                          <Text style={{marginTop:1}}>{data[7].select == true ? "Yes": "No"}</Text>
                          <Text style={{marginTop:1}}>{data[8].select == true ? "Yes": "No"}</Text>
                          <Text style={{marginTop:1}}>{data[9].select== true ? "Yes": "No"}</Text>
                          <Text style={{marginTop:1}}>{data[10].select == true ? "Yes": "No"}</Text>
                        </View>
                      </View>
                  </View>
                  )
                })}
              </Page>
            </Document>
          </PDFViewer>
                </div>
            )}
                <Button variant="outlined" onClick={(event)=>generatePDF(event, props.client.full_name)}>Generate PDF</Button>
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
