import React from 'react';
import { connect } from 'react-redux';
import { deleteCustomer } from '../actions/customerActions';
import { /*fetchCertificate,*/ createCertificate } from '../actions/certificateActions';

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
  state = { privateKey: '', activated: true, expandCert: false,
            certForm: false, certBody: '', confirmDelete: false };

  render() {
    const { customer, DeleteCustomer,
            certificates, /*FetchCertificate,*/ CreateCertificate } = this.props;
    const { privateKey, activated, expandCert,
            certForm, certBody, confirmDelete } = this.state;

    return (<section style={{display: 'flex', backgroundColor: 'goldenrod', marginBottom: 15}}>
      <aside>
        <i className='fa fa-trash fa-lg'
           style={{color: 'beige', display: 'inline-block', margin: 5}}
           onClick={() => this.setState({confirmDelete: true})}></i>

        { confirmDelete ? <div style={{position: 'fixed', marginLeft: -50}}
                               onClick={() => this.setState({confirmDelete: false})}>
          <p onClick={() => DeleteCustomer(customer.id)}>Confirm</p>
          <p>Cancel</p>
        </div> : null }

        <div>
          <p>{customer.name}</p>
          <p>{customer.email}</p>

          <div>
            <input type='text' placeholder='Private key' style={{display: 'inline-block'}}
                   onChange={event => this.setState({privateKey: event.target.value})}/>
            <span style={{marginLeft: 5}} onClick={() => alert("Functionality not included.")/*FetchCertificate({privateKey})*/}>
              Validate
            </span>
          </div>

          <p onClick={() => this.setState({certForm: true})}>Create Certificate</p>

          { certForm ? <div style={{position: 'fixed', marginLeft: -50}}>
            <textarea onChange={event => this.setState({certBody: event.target.value})}>
              {certBody}
            </textarea>
            <span onClick={() => {
              CreateCertificate({body: certBody, user_id: customer.id});
              this.setState({certForm: false}); //need error handling
            }}>Submit</span>
          </div> : null }

          <div style={{textAlign: 'center'}}
               onClick={() => this.setState({activated: !activated})}>
            { activated ? <span>Reactivate<br/>a Certificate</span> :
                          <span>View Active<br/>Certificates</span> }
          </div>
        </div>
      </aside>

      <main>
        { expandCert ? <CertificateContainer key={`certificate-${expandCert}`}
                                             certificate={certificates[expandCert]} expanded={!!expandCert}
                                             onClick={() => this.setState({expandCert: false})}/> :
          activated ? customer.active_certs.map(
          certId => <CertificateContainer key={`certificate-${certId}`}
                                          certificate={certificates[certId]} expanded={!!expandCert}
                                          onClick={() => this.setState({expandCert: certId})}/>
        ) : customer.inactive_certs.map(
          certId => <CertificateContainer key={`certificate-${certId}`}
                                          certificate={certificates[certId]} expanded={!!expandCert}
                                          onClick={() => this.setState({expandCert: certId})}/>
        ) }
      </main>
    </section>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetail);
