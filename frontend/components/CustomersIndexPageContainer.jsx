import React from 'react';
import { connect } from 'react-redux';
import { signOut } from '../actions/sessionActions';
import CustomersIndexContainer from './customersIndexPage/CustomersIndexContainer';

const mapStateToProps = ({ session }) => ({
  currentUser: session.currentUser
});

const mapDispatchToProps = dispatch => ({
  SignOut: () => dispatch(signOut())
});

class CustomersIndexPage extends React.Component {
  render() { //bug: page only dynamically re-renders once
    const {currentUser, SignOut} = this.props;

    return (<div style={{backgroundColor: 'beige', paddingTop: 15, height: '100%', minHeight: 812.5}}>
      <div style={{position: 'absolute', right: 22.5, zIndex: 2, display: 'flex', alignItems: 'center'}}>
        <span style={{paddingRight: 10, fontWeight: 500}}>{currentUser.name}</span>
        <div onClick={SignOut}><i className='fa fa-sign-out-alt fa-lg clickable'></i></div>
      </div>
      <CustomersIndexContainer/>
    </div>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomersIndexPage);
