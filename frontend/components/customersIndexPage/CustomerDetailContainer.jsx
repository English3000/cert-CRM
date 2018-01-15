import React from 'react';
import { connect } from 'react-redux';
import { deleteCustomer } from '../actions/customerActions'; //
import { fetchCertificate } from '../actions/certificateActions'; //

const mapStateToProps = ({ data }) => ({
  certificates: data.certificates
});

const mapDispatchToProps = dispatch => ({
  DeleteCustomer: id => dispatch(deleteCustomer(id)),
  FetchCertificate: privateKey => dispatch(fetchCertificate(privateKey))
});

//POTENTIAL BUGS: certificates overflow
class CustomerDetail extends React.Component {
  state = {privateKey: '', activated: true, expandCert: false};

  render() {
    const { customer, DeleteCustomer,
            certificates, FetchCertificate } = this.props;
    const { privateKey, activated, expandCert, readOnly } = this.state;

    // * upon clicking trash button, should ask for confirmation *
    return (<section style={{display: 'flex', margin: 15}}>
      <aside>
        <i className='fa fa-trash fa-lg'
           style={{color: 'beige', display: 'inline-block', margin: 5}}
           onClick={() => DeleteCustomer(customer.id)}></i>

        <div>
          <p>{customer.name}</p>
          <p>{customer.email}</p>

          <div>
            <input type='text' placeholder='Private key' style={{display: 'inline-block'}}
                   onChange={event => this.setState({privateKey: event.target.value})}/>
            <span style={{marginLeft: 5}} onClick={() => FetchCertificate({privateKey})}>
              Validate
            </span>
          </div>

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
