import React from 'react';
import {updateStage} from '../../reducers/session'
import {connect} from 'react-redux';
import Assement from './index'
import Select from './select';
import Discuss from './discuss';
import Review from './review';
import Summary from '../client/summary';
import Discuss2 from './discuss_2';
import Discuss3 from './discuss_3';
import ActionItems from '../client/actionItems';
import {send_message, recive_message} from '../../reducers/socket';

class Session extends React.Component {
    componentDidUpdate (previousProps, previousState) {
        recive_message()
        if (JSON.stringify(previousProps.current_session)!==JSON.stringify(this.props.current_session)) {
          send_message({id:this.props.clientinfo.id, current_session:this.props.current_session}) 
        }
      }
    render () {
        let current_stage = this.props.current_session[14].stage
        if (current_stage==="summary") {
          return <Summary nagivate={this.props.nagivate}/>
        }
        if (current_stage === "assessment") {
            return <Assement nagivate={this.props.nagivate}/>
        }
        else if (current_stage === "select") {
            return <Select/>
        }
        else if (current_stage === "discuss") {
            return <Discuss nagivate={this.props.nagivate}/>
        }
        else if (current_stage === "discuss2") {
          return <Discuss2 nagivate={this.props.nagivate}/>
        }
        else if (current_stage === "discuss3") {
          return <Discuss3 nagivate={this.props.nagivate}/>
      }
        else if (current_stage === "actionitems") {
          return <ActionItems nagivate={this.props.nagivate}/>
      }
     
        else if (current_stage === "review") {
            return <Review nagivate={this.props.nagivate}/>
        }
    }
}
const mapStateToProps = (state) => ({
    current_session:state.SessionReducer.current_session,
    clientinfo:state.ClientReducer.clientinfo,
  })
  const mapDispatchToProps = {
    updateStage
  }
export default connect(mapStateToProps, mapDispatchToProps)(Session)