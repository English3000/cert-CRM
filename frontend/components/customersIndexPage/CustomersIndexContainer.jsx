import React from 'react';
import { connect } from 'react-redux';
import { fetchCustomers, createCustomer } from '../actions/customerActions';
import CustomerDetailContainer from './CustomerDetailContainer';
import LoadingIcon from '../../utils/LoadingIcon';

const mapStateToProps = ({ data, ui }) => ({
  customers: data.customers,
  pageLoading: ui.pageLoading
});

const mapDispatchToProps = dispatch => ({
  fetchCustomers: () => dispatch(fetchCustomers()),
  CreateCustomer: customer => dispatch(createCustomer(customer))
});

//display customer form errors somewhere
class CustomersIndex extends React.Component {
  state = { all_ids: this.props.customers.all_ids, customerForm: false,
            name: '', email: '', password: '' };

  componentWillMount() { this.props.fetchCustomers(); }

  render() {
    const { all_ids, customerForm, name, email, password } = this.state;
    const { customers, CreateCustomer, certificates, pageLoading } = this.props;

    return (<div style={{display: 'flex', justifyContent: 'center'}}>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <i className='fa fa-user-plus fa-lg' style={{marginRight: 5}}
           onClick={() => this.setState({customerForm: true})}></i>
        <input defaultValue='Search for customers' onChange={event => {
          let ids_array = customers.all_ids.filter(
            id => customers.by_id[id].name.includes(event.target.value)
          );
          this.setState({all_ids: ids_array});
        }}/>
      </div>

      { customerForm ? <div>
        <input type='text' placeholder='Name' autoFocus
               onChange={event => this.setState({name: event.target.value})}/>
        <input type='text' placeholder='Email'
               onChange={event => this.setState({email: event.target.value})}/>
        <input type='text' placeholder='Password'
               onChange={event => this.setState({password: event.target.value})}/>
        <span onClick={() => {
          CreateCustomer({name, email, password, 'admin?': false});
          this.setState({customerForm: false}); //need error handling
        }}>Submit</span>
      </div> : null }

      <main style={{maxWidth: 900, marginTop: 45}}>
        { pageLoading ? <LoadingIcon/> :
          all_ids.length > 0 ? all_ids.map(
            customerId => <CustomerDetailContainer key={`customer-${customerId}`}
                                                   customer={customers.by_id[customerId]}/>
          ) : <p>Customer not found.</p> }
      </main>
    </div>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomersIndex);
