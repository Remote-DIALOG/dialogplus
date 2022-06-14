import { ThreeSixtyOutlined } from '@mui/icons-material';
import { toHaveStyle } from '@testing-library/jest-dom/dist/matchers';
import React from 'react';
import DialogBox from './dialog';
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: {
                message:'',
                iserror:false,
            },
            user:{
                username:'',
                type:''
            },
            openDialog: false,
            usertype: ['client', 'clinican'],
            client: false,
            clinican: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.setUsertype = this.setUsertype.bind(this);

    }
    setUsertype () {

    }
    handleChange (name,event) {
        // if (this.state.client==true && this.state.clinican==true) {
        //     let error = {
        //         message:"Please select only one option",
        //         iserror: true,
        //     }
        //     this.setState({error:error})
        // }
        // if (name==="client") {
        //     this.setState({client:!this.state.client});
        //     // this.setState({error:{message:'',isError:false}})
        // }
        // if (name==="clinican") {
        //     this.setState({clinican:!this.state.clinican});
        //     // this.setState({error:{message:'',isError:false}})
        // }
    }
    componentDidMount(){
        this.setState({openDialog:true});
    }
    render(){
        let handlers = {
            openDialog:this.state.openDialog,
            handleChange:this.handleChange,
            setUsertype:this.setUsertype,
            error:this.state.error,
            usertype:this.state.usertype,
            client:this.state.client,
            clinican:this.state.clinican
        }
        return (
            <DialogBox data={handlers}/>
        );
    }
}
export default Register;