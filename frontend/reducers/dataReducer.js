import { RECEIVE_CUSTOMERS, RECEIVE_CUSTOMER,
         REMOVE_CUSTOMER } from '../actions/customerActions';
import { RECEIVE_CERTIFICATE, UPDATE_CERTIFICATE } from '../actions/certificateActions';
import merge from 'lodash/merge';

const _defaultState = {
  customers: {
    all_ids: [],
    by_id: {}
  },
  certificates: {}
};

export default (state = _defaultState, action) => {
  Object.freeze(state);
  let newState = merge({}, _defaultState, state);

  switch (action.type) {
    case RECEIVE_CUSTOMERS:
      return action.data;
    case RECEIVE_CUSTOMER:
      newState.customers.by_id[action.customer.id] = action.customer;
      newState.customers.all_ids.unshift(action.customer.id);
      return newState;
    case REMOVE_CUSTOMER:
      delete newState.customers.by_id[action.customerId];
      newState.customers.all_ids.splice(newState.customers.all_ids.indexOf(action.customerId), 1);
      return newState;
    case RECEIVE_CERTIFICATE:
      newState.certificates[action.certificate.id] = action.certificate;
      newState.customers.by_id[action.certificate.user_id].certificate_ids.unshift(action.certificate.id);
      return newState;
    case UPDATE_CERTIFICATE:
      // console.log("Reducer", action.certificate);
      newState.certificates[action.certificate.id] = action.certificate;
      return newState;
    default:
      return state;
  }
};
