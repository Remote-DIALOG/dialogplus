import { Outlet, Navigate } from 'react-router-dom'
import React  from 'react';
import {connect} from 'react-redux';
const PrivateRoutes = (props) => {
    let auth = {'token':props.isLogin}
    return(
        auth.token ? <Outlet/> : <Navigate to="/"/>
    )
}
const mapStateToProps = (state) => ({
    client:state.ClientReducer,
    isLogin:state.loginReducer.isLogin 
})
// const mapDispatchToProps = {
//     setActionItems,
//     getSessionDates,
//     getNotes,
//     setDate
// }
export default connect(mapStateToProps, null)(PrivateRoutes)