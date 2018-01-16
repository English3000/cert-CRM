import * as Api from '../utils/api';
import { receiveErrors, RECEIVE_ERRORS } from './sessionActions';

export const PAGE_LOADING = 'PAGE_LOADING';
export const pageLoading = () => ({type: PAGE_LOADING});

export const RECEIVE_CUSTOMERS = 'RECEIVE_CUSTOMERS';
export const RECEIVE_CUSTOMER = 'RECEIVE_CUSTOMER';
export const REMOVE_CUSTOMER = 'REMOVE_CUSTOMER';

export const receiveCustomers = data => ({
  type: RECEIVE_CUSTOMERS,
  data
});
export const receiveCustomer = customer => ({
  type: RECEIVE_CUSTOMER,
  customer
});
export const removeCustomer = customer => ({
  type: REMOVE_CUSTOMER,
  customerId: customer.id
});

export const fetchCustomers = () => async (dispatch) => {
  dispatch(pageLoading());
  return dispatch(receiveCustomers(await Api.fetchCustomers()));
};
export const createCustomer = customer => dispatch => (
  Api.createCustomer(customer)
    .then( newCustomer => dispatch(receiveCustomer(newCustomer)),
           err => dispatch(receiveErrors(err.responseJSON)) )
);
export const deleteCustomer = id => async (dispatch) => dispatch(
  removeCustomer( await Api.deleteCustomer(id) )
);
