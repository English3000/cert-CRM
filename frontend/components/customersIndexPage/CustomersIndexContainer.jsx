import React from 'react';
import { connect } from 'react-redux';
import { fetchCustomers, createCustomer } from '../actions/customerActions'; //
import CustomerDetailContainer from './CustomerDetailContainer'; //
import LoadingIcon from '../../utils/LoadingIcon'; //

const mapStateToProps = ({ data }) => ({
  customers: data.customers,
});

const mapDispatchToProps = dispatch => ({
  fetchCustomers: () => dispatch(fetchCustomers()),
  CreateCustomer: customer => dispatch(createCustomer(customer))
});

class CustomersIndex extends React.Component {
  state = {customers: this.props.customers};

  componentWillMount() { this.props.fetchCustomers(); }

  render() {
    const {customer} = this.state;
    const {FetchCertificate, certificates} = this.props;

    return (<div style={{display: 'flex', justifyContent: 'center'}}>
      {/* search box--filters down customers slice */}
      <main style={{maxWidth: 900, backgroundColor: 'goldenrod'}}>
        {customers.all_ids.length > 0 ?
          customers.all_ids.map(
            customerId => <CustomerDetailContainer key={`customer-${customerId}`}
                                                   customer={customers.by_id[customerId]}/>
          ) : <LoadingIcon/>}
      </main>
    </div>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomersIndex);
