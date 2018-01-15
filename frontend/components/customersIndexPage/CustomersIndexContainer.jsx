import React from 'react';
import { connect } from 'react-redux';
import { fetchCustomers, createCustomer } from '../actions/customerActions'; //
import CustomerDetail from './CustomerDetail'; //continue skeletoning
import LoadingIcon from '../../utils/LoadingIcon'; //

const mapStateToProps = ({ data }) => ({
  customers: data.customers
});

const mapDispatchToProps = dispatch => ({
  fetchCustomers: () => dispatch(fetchCustomers()),
  CreateCustomer: customer => dispatch(createCustomer(customer))
});

class CustomersIndex extends React.Component {
  componentWillMount() { this.props.fetchCustomers(); }

  render() {
    const {customers} = this.props;

    return (<div>
      {/* search box */}
      <main>
        {customers.all_ids.length > 0 ?
          customers.map( customer => <CustomerDetail/> ) : <LoadingIcon/>}
      </main>
    </div>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomersIndex);
