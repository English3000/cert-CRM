import React from 'react';
import { connect } from 'react-redux';
import { fetchCustomers, createCustomer } from '../../actions/customerActions';
import CustomerDetailContainer from './CustomerDetailContainer';
import LoadingIcon from '../../utils/LoadingIcon'; //would use for heavier data loads, replacing null w/in <main>

const mapStateToProps = ({ data, errors, ui }) => ({
  customers: data.customers,
  errors,
  pageLoading: ui.pageLoading
});

const mapDispatchToProps = dispatch => ({
  fetchCustomers: () => dispatch(fetchCustomers()),
  CreateCustomer: customer => dispatch(createCustomer(customer))
});

//display customer form errors somewhere
class CustomersIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { all_ids: this.props.customers.all_ids, customerForm: false,
                   name: '', email: '', password: '' };
  }

  componentWillMount() { this.props.fetchCustomers(); }

  componentWillReceiveProps(newProps) {
    if (this.props.customers.all_ids.length !== newProps.customers.all_ids) {
      this.setState({all_ids: newProps.customers.all_ids});
    }
  }

  render() {
    const { all_ids, customerForm, name, email, password } = this.state;
    const { customers, CreateCustomer, certificates, pageLoading } = this.props;

    return (<div>
      <div style={{display: 'flex', alignItems: 'center', justifyContent:'center', marginBottom: 15}}>
        <div onClick={() => this.setState({customerForm: true})}>
          <i className='fa fa-user-plus fa-lg clickable' style={{marginRight: 7.5}}></i>
        </div>
        <input style={{width: 150, padding: 3, paddingLeft: 4.5, fontSize: 14}} placeholder='Search for customers' onChange={event => {
          let ids_array = customers.all_ids.filter(
            id => customers.by_id[id].name.includes(event.target.value)
          );
          this.setState({all_ids: ids_array});
        }}/>
      </div>

      { customerForm ? <div style={{margin: '0 auto'}}>
        <p style={{marginBottom: 7.5, textAlign: 'center', fontWeight: 500}}>
          Add Customer
        </p>
        <div style={{backgroundColor: 'goldenrod', padding: 10, borderRadius: 3,
                     display: 'flex', justifyContent: 'center', alignItems: 'center',
                     width: 400, margin: '0 auto'}}>
          <input type='text' placeholder='Name' style={{marginRight: 5}} autoFocus
                 onChange={event => this.setState({name: event.target.value})}/>
          <input type='text' placeholder='Email' style={{marginRight: 5}}
                 onChange={event => this.setState({email: event.target.value})}/>
          <input type='text' placeholder='Password' style={{marginRight: 7.5}}
                 onChange={event => this.setState({password: event.target.value})}/>
          <span style={{backgroundColor: 'white', borderRadius: 2, paddingLeft: 2.5, paddingRight: 2.5}}
                className='clickable' onClick={() => {
                  CreateCustomer({name, email, password, 'admin?': false});
                  this.setState({customerForm: false}); //need error handling
          }}>Submit</span>
        </div>
      </div> : null }

      <main style={{margin: '0 auto', maxWidth: 900, marginTop: 15}}>
        { pageLoading ? null :
          all_ids.length > 0 ? all_ids.map(
            customerId => (<CustomerDetailContainer key={`customer-${customerId}`}
                                                    customer={customers.by_id[customerId]}/>)
          ) : <p style={{textAlign: 'center'}}>Customer not found.</p> }
      </main>
    </div>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomersIndex);
