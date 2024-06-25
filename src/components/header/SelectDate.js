import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import {connect} from 'react-redux';
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
// import jsPDF from 'jspdf'
import {getSummary} from '../../reducers/notes'
function SelectDate (props) {
    const [dates, selectdate] = React.useState([]);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    React.useEffect(() => {
        console.log("React compoemt mounted")
    },[])
    const handleCheckbox = (event, index) => {
        selectdate( dates => [...dates, props.dates[index]]);
        console.log(dates)
    }
    React.useEffect(() => {
        return(() => {
          console.log("Unmounting FunctionalComponent")
        })
       },[])
    const generatePDF = () => {
        console.log(dates);
        let result = [];
        // const pdf = new jsPDF("p", "pt", "a4");
        // const columns = [
        //     "scale",
        //     "value",
        //     "Action Items",
        //   ];
        //   var rows = [];
        // for (var i=0; i<dates.length; i++ ){
        //     props.getSummary({ "clientId":props.clinet.id, "timestampe": dates[i].replace(/['"]+/g, '')}).then((data)=>{
        //         // console.log("------->", data.payload)
        //         result.push(data.payload)
        //     })
        // }
        // console.log("------>", result)
        // for (let i = 0; i < result.length; i++) {
        //     var temp = [
        //         result[i].name,
        //         result[i].value,
        //         result[i].actionitems
        //     ];
        //       rows.push(temp);
        // }
        // pdf.text(235, 40, "Table");
        // pdf.table(columns, rows, {
        //     startY: 65,
        //     theme: "grid",
        //     styles: {
        //       font: "times",
        //       halign: "center",
        //       cellPadding: 3.5,
        //       lineWidth: 0.5,
        //       lineColor: [0, 0, 0],
        //       textColor: [0, 0, 0]
        //     },
        //     headStyles: {
        //       textColor: [0, 0, 0],
        //       fontStyle: "normal",
        //       lineWidth: 0.5,
        //       lineColor: [0, 0, 0],
        //       fillColor: [166, 204, 247]
        //     },
        //     alternateRowStyles: {
        //       fillColor: [212, 212, 212],
        //       textColor: [0, 0, 0],
        //       lineWidth: 0.5,
        //       lineColor: [0, 0, 0]
        //     },
        //     rowStyles: {
        //       lineWidth: 0.5,
        //       lineColor: [0, 0, 0]
        //     },
        //     tableLineColor: [0, 0, 0]
        //   });
        //   console.log(pdf.output("datauristring"));
        //   pdf.save("pdf");
       
        
        // doc.addPage() // this code creates new page in pdf document
        // doc.setFont('helvetica')
       
        // doc.text(20, 100, 'This is the second page.')
        // doc.save('sample-file.pdf')
    }
        return (
            <Dialog fullScreen={fullScreen} open={props.open} onClose={props.close}>
                <DialogTitle>
                    <Box display="flex" alignItems="center">
                        <Box flexGrow={1}>Select Date</Box>
                        <Box><IconButton onClick={props.close}><CloseIcon /></IconButton></Box>
                </Box>
                </DialogTitle>
                <DialogContent>
                            <List component="nav" aria-labelledby="nested-list-subheader">
                                {props.dates.map((row, index)=>(
                                    <Box key={index} sx={{display:'flex', flexDirection:"row", width: '100%', justifyContent:'space-around', borderBottom: 1}}>
                                        <FormControlLabel control={<Checkbox onChange={(event)=>{handleCheckbox(event, index)}} />}/> 
                                            <Box sx={{width:"15%", flex:1, display:"flex", flexDirection:"row", alignItems:'center'}}>
                                                {/* <Typography variant='h6'>{row.date.replace(/['"]+/g, '')}</Typography> */}
                                            </Box>
                                    </Box>
                                ))}
                            </List>
                    </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={generatePDF} >For all</Button>
                    <Button variant="outlined" onClick={generatePDF} >Submit</Button>
                </DialogActions>
          </Dialog>
        )
}
const mapStateToProps = (state) => ({
    islogin:state.loginReducer.isLogin,
    clinet:state.ClientReducer.clientinfo,
    dates:state.ClientReducer.dates,
    summary:state.NotesReducer.sessionsummary
  })
  const mapDispatchToProps = {
    getSummary
  }
export default connect(mapStateToProps, mapDispatchToProps)(SelectDate);