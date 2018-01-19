import React from 'react';
import { connect } from 'react-redux';
import { updateCertificate } from '../../actions/certificateActions';

const mapDispatchToProps = dispatch => ({
  UpdateCertificate: certificate => dispatch(updateCertificate(certificate))
});

export class Certificate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {update: false};
  }

  render() {
    const {certificate, UpdateCertificate, expanded} = this.props;
    const {update} = this.state;

    return (<div style={{margin: 7.5, marginLeft: 15}}>
      { update ? <div style={{display: 'flex', textAlign: 'center'}} onClick={() => this.setState({update: false})}>
        { certificate['active?'] ? <div onClick={() => UpdateCertificate({id: certificate.id, 'active?': false})}
             style={{backgroundColor: 'salmon', borderTopLeftRadius: 3, width: '50%'}}
             className='clickable'>Confirm
        </div> : <div onClick={() => UpdateCertificate({id: certificate.id, 'active?': true})}
             style={{backgroundColor: 'lightgreen', borderTopLeftRadius: 3, width: '50%'}}
             className='clickable'>Confirm
        </div> }
        <div style={{backgroundColor: 'white', borderTopRightRadius: 3, width: '50%'}}
             className='clickable'>Cancel
        </div>
      </div> : certificate['active?'] ?
      <div style={{textTransform: 'uppercase', textAlign: 'center', fontWeight: 500,
                   backgroundColor: 'salmon', borderTopLeftRadius: 3, borderTopRightRadius: 3}}
           onClick={() => this.setState({update: true})} className='clickable'>
        Deactivate
      </div> : <div style={{textTransform: 'uppercase', textAlign: 'center',
                            fontWeight: 500, backgroundColor: 'lightgreen',
                            borderTopLeftRadius: 3, borderTopRightRadius: 3}}
                    onClick={() => this.setState({update: true})} className='clickable'>
        Reactivate
      </div> }

      { expanded ? <p style={{backgroundColor: 'yellow'}}>{certificate.body}</p> :
      <p style={{backgroundColor: 'yellow', width: 180, height: 150, boxSizing: 'border-box', padding: 5, paddingLeft: 7.5,
                 overflowY: 'auto'}}>{certificate.body}</p> }

      <p onClick={() => alert("Functionality not included.")} className='clickable'
         style={{textAlign: 'center', backgroundColor: 'white', borderBottomLeftRadius: 3, borderBottomRightRadius: 3}}>
        Email Private Key
      </p>
    </div>);
  }
}

export default connect(null, mapDispatchToProps)(Certificate);
