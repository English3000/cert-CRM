import React from 'react';
import { connect } from 'react-redux';
import { deleteCustomer } from '../../actions/customerActions';
import { /*fetchCertificate,*/ createCertificate } from '../../actions/certificateActions';
import CertificateContainer from './CertificateContainer';

const mapStateToProps = ({ data }) => ({
  certificates: data.certificates
});

const mapDispatchToProps = dispatch => ({
  DeleteCustomer: id => dispatch(deleteCustomer(id)),
  // FetchCertificate: privateKey => dispatch(fetchCertificate(privateKey)),
  CreateCertificate: certificate => dispatch(createCertificate(certificate))
});

export class CustomerDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { privateKey: '', activated: true, expandCert: false,
                   certForm: false, certBody: '', confirmDelete: false, newProps: false };
  }

  render() {
    const { customer, DeleteCustomer,
            certificates, /*FetchCertificate,*/ CreateCertificate } = this.props;
    const { privateKey, activated, expandCert,
            certForm, certBody, confirmDelete } = this.state;

    const activeCertIds = customer.certificate_ids.filter(id => certificates[id]['active?']);
    const inactiveCertIds = customer.certificate_ids.filter(id => !certificates[id]['active?']);

    return (<section style={{backgroundColor: 'goldenrod', boxSizing: 'border-box', marginBottom: 15, padding: 7.5, display: 'flex', height: 222}}>
      <aside style={{display: 'flex'}}>
        <button id={`delete-${customer.email}`} style={{color: 'beige', height: 21, width: 19}}
                onClick={() => this.setState({confirmDelete: true})}>
          <i className='fa fa-trash fa-lg clickable'></i>
        </button>

        { confirmDelete ? <div style={{position: 'absolute', marginLeft: -85}}
                               onClick={() => this.setState({confirmDelete: false})}>
          <button id={`confirm-delete-${customer.email}`} style={{backgroundColor: 'salmon', padding: 5, display: 'block'}} className='clickable'
             onClick={() => DeleteCustomer(customer.id)}>Confirm</button>
          <button style={{backgroundColor: 'goldenrod', width: 51.61, padding: 5, display: 'block', textAlign: 'center'}} className='clickable'>
            Cancel
          </button>
        </div> : null }

        <div style={{marginLeft: 7.5}}>
          <p style={{fontWeight: 700}}>{customer.name}</p>
          <p>{customer.email}</p>

          <div style={{display: 'flex', alignItems: 'center', marginTop: 10, marginBottom: 12.5}}>
            <input type='text' placeholder='Private key' style={{display: 'inline-block'}}
                   onChange={event => this.setState({privateKey: event.target.value})}/>
            <button style={{marginLeft: 7.5, backgroundColor: 'white', fontSize: 14, fontWeight: 500}}
                  className='clickable button' onClick={() => alert("Functionality not included.")/*FetchCertificate({privateKey})*/}>
              Validate
            </button>
          </div>

          <p style={{marginBottom: 12.5}}>
            <button id={`cert-${customer.email}`} style={{backgroundColor: 'yellow', fontSize: 14, fontWeight: 500,
                          borderRadius: 3, paddingTop: 2.5, paddingBottom: 2.5}}
               onClick={() => this.setState({certForm: true})} className='clickable button'>
              Create Certificate
            </button>
          </p>

          { certForm ? <div style={{position: 'absolute', marginLeft: -170, marginTop: -37.5, boxShadow: '0 0 1px lightgray'}}>
            <textarea id='cert-body' style={{height: 85, width: 110, resize: 'none', backgroundColor: 'yellow', padding: 5, fontSize: 15, display: 'block'}}
                      onChange={event => this.setState({certBody: event.target.value})}
                      placeholder='Certificate Body' value={certBody} autoFocus>
            </textarea>
            <button style={{backgroundColor: 'white', width: '100%', textAlign: 'center', marginTop: -6}}
               onClick={() => CreateCertificate({body: certBody, user_id: customer.id})
                 .then( () => this.setState({certForm: false, certBody: ''}),
                        err => this.setState({certBody: err}) )} className='clickable'>
              Submit
            </button>
          </div> : null }

          { activated ? <div style={{textAlign: 'center', width: 85, marginLeft: 6.25,
                                     marginBottom: 2.5, backgroundColor: 'lightgreen',
                                     borderRadius: 10, paddingLeft: 5, paddingRight: 5}}
                             onClick={() => this.setState({activated: !activated})}>
              <button style={{fontSize: 14, fontWeight: 500}} className='clickable'>Reactivate<br/>a Certificate</button>
          </div> : <div style={{textAlign: 'center', width: 85, marginLeft: 6.25,
                                marginBottom: 2.5, backgroundColor: 'salmon',
                                borderRadius: 10, paddingLeft: 5, paddingRight: 5}}
                        onClick={() => this.setState({activated: !activated})}>
            <button style={{fontSize: 14, fontWeight: 500}} className='clickable'>View Active<br/>Certificates</button>
          </div> }
        </div>
      </aside>

      <main style={{display: 'flex', overflowX: 'auto'}}>
        { expandCert ? <CertificateContainer key={`certificate-${expandCert}`}
                                             certificate={certificates[expandCert]} expanded={!!expandCert}
                                             onClick={() => this.setState({expandCert: false})}/> :
          activated ? activeCertIds.map(
            id => <CertificateContainer key={`certificate-${id}`}
                                        certificate={certificates[id]} expanded={!!expandCert}
                                        onClick={() => this.setState({expandCert: id})}/>
        ) : inactiveCertIds.map(
              id => <CertificateContainer key={`certificate-${id}`}
                                          certificate={certificates[id]} expanded={!!expandCert}
                                          onClick={() => this.setState({expandCert: id})}/>
        ) }
      </main>
    </section>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetail);
//maybe this is responsible for re-rendering bugs
