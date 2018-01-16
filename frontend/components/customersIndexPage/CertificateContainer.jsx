import React from 'react';
import { connect } from 'react-redux';
import { updateCertificate } from '../actions/certificateActions'; //

const mapDispatchToProps = dispatch => ({
  UpdateCertificate: certificate => dispatch(updateCertificate(certificate))
});

class Certificate extends React.Component {
  state = {update: false};

  render() {
    const {certificate, UpdateCertificate, expanded} = this.props;
    const {update} = this.state;
    let active = certificate.active?; //could cause bug?

    return (<div>
      { update ? <div onClick={() => this.setState({update: true})}>
        <div onClick={() => UpdateCertificate({id: certificate.id, 'active?': !active})}>
          Confirm</div>
        <div>Cancel</div>
      </div> : active ?
      <div onClick={() => this.setState({update: true})}>Deactivate</div> :
      <div onClick={() => this.setState({update: true})}>Reactivate</div> }

      { expanded ? <p style={{marginLeft: 15, marginRight: 15, backgroundColor: 'yellow'}}>{certificate.body}</p> :
      <p style={{marginLeft: 15, marginRight: 15, backgroundColor: 'yellow', width: 180, height: 180,
                 overflowY: 'scroll'}}>{certificate.body}</p> }

      <p onClick={() => alert("Functionality not included.")}>Email Private Key</p>
    </div>);
  }
}

export default connect(null, mapDispatchToProps)(Certificate);
