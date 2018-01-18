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

//POTENTIAL BUGS: certificates overflow
class CustomerDetail extends React.Component {
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
        <div onClick={() => this.setState({confirmDelete: true})}>
          <i className='fa fa-trash fa-lg clickable'
             style={{color: 'beige', display: 'inline-block'}}></i>
        </div>

        { confirmDelete ? <div style={{position: 'absolute', marginLeft: -85}}
                               onClick={() => this.setState({confirmDelete: false})}>
          <p style={{backgroundColor: 'red', padding: 5}} className='clickable'
             onClick={() => DeleteCustomer(customer.id)}>Confirm</p>
          <p style={{backgroundColor: 'goldenrod', padding: 5, textAlign: 'center'}} className='clickable'>
            Cancel
          </p>
        </div> : null }

        <div style={{marginLeft: 7.5}}>
          <p style={{fontWeight: 700}}>{customer.name}</p>
          <p>{customer.email}</p>

          <div style={{display: 'flex', alignItems: 'center', marginTop: 10, marginBottom: 12.5}}>
            <input type='text' placeholder='Private key' style={{display: 'inline-block'}}
                   onChange={event => this.setState({privateKey: event.target.value})}/>
            <span style={{marginLeft: 7.5, backgroundColor: 'white', fontSize: 14, fontWeight: 500}}
                  className='clickable button' onClick={() => alert("Functionality not included.")/*FetchCertificate({privateKey})*/}>
              Validate
            </span>
          </div>

          <p style={{marginBottom: 12.5}}>
            <span style={{backgroundColor: 'yellow', fontSize: 14, fontWeight: 500,
                          borderRadius: 3, paddingTop: 2.5, paddingBottom: 2.5}}
               onClick={() => this.setState({certForm: true})} className='clickable button'>
              Create Certificate
            </span>
          </p>

          { certForm ? <div style={{position: 'absolute', marginLeft: -170, marginTop: -37.5, boxShadow: '0 0 1px lightgray'}}>
            <textarea style={{height: 85, width: 110, resize: 'none', backgroundColor: 'yellow', padding: 5, fontSize: 15}}
                      onChange={event => this.setState({certBody: event.target.value})}
                      placeholder='Certificate Body' value={certBody} autoFocus>
            </textarea>
            <p style={{backgroundColor: 'white', textAlign: 'center', marginTop: -6}}
                  onClick={() => {
              CreateCertificate({body: certBody, user_id: customer.id});
              this.setState({certForm: false}); //need error handling
            }} className='clickable'>Submit</p>
          </div> : null }

          { activated ? <div style={{textAlign: 'center', width: 85, marginLeft: 7.5,
                                     marginBottom: 2.5, backgroundColor: 'lightgreen',
                                     borderRadius: 10, paddingLeft: 5, paddingRight: 5}}
                             onClick={() => this.setState({activated: !activated})}>
              <span style={{fontSize: 14, fontWeight: 500}} className='clickable'>Reactivate<br/>a Certificate</span>
          </div> : <div style={{textAlign: 'center', width: 85, marginLeft: 7.5,
                                marginBottom: 2.5, backgroundColor: 'red',
                                borderRadius: 10, paddingLeft: 5, paddingRight: 5}}
                        onClick={() => this.setState({activated: !activated})}>
            <span style={{fontSize: 14, fontWeight: 500}} className='clickable'>View Active<br/>Certificates</span>
          </div> }
        </div>
      </aside>

      <main style={{display: 'flex', overflow: 'scroll'}}>
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
