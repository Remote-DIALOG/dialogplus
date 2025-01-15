import React from 'react';
import DialogBox from './dialog';
import ClinetRegistration from './clinet';
import ClinicanRegistration from './clinican';
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
        if (this.state.client === false && this.state.clinican ===false) {
            let error = {
                message:"Please select one option",
                iserror: true,
            }
            this.setState({error:error})
        }
        if (this.state.client || this.state.clinican) { 
            this.setState({openDialog:false})
        }
    }
    handleChange (name,event) {
        if (name === "client" && this.state.clinican ===false) {
            this.setState({client:!this.state.client});
            this.setState({error:{message:'',isError:false}})
        }
        if (name === "clinican" && this.state.client === false) {
            this.setState({clinican:!this.state.clinican});
            this.setState({error:{message:'',isError:false}})
        }
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
        let form
        if (this.state.client === true && this.state.openDialog === false) {
            form = <ClinetRegistration/>
        } 
        if (this.state.clinican===true && this.state.openDialog===false) {
            form = <ClinicanRegistration/>
        }
        return (
            <div>
                <DialogBox data={handlers}/>
                {form}
            </div>
           
        );
    }
}
export default Register;