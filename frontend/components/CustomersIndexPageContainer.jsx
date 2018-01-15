import React from 'react';
import { connect } from 'react-redux';
import { signOut } from '../actions/sessionActions'; //
import CustomersIndexContainer from './customersIndexPage/CustomersIndexContainer';

const mapStateToProps = ({ session }) => ({
  currentUser: session.currentUser
});

const mapDispatchToProps = dispatch => ({
  SignOut: () => dispatch(signOut())
});

class CustomersIndexPage extends React.Component {
  render() {
    const {currentUser, SignOut} = this.props;

    return (<div style={{backgroundColor: 'beige'}}>
      <div style={{position: 'absolute', right: 25, zIndex: 2}}>
        <span style={{paddingRight: 5}}>{currentUser.name}</span>
        <i className='fa fa-sign-out' onClick={SignOut}></i>
      </div>
      <CustomersIndexContainer/>
    </div>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomersIndexPage);
