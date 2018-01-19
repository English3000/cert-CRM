import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { sampleState1, customer2 } from '../../utils/dataReducer-helper';
import * as actions from '../customerActions';
import * as Api from '../../utils/api';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('customerActions', () => {
  let store;

  beforeEach(() => { store = mockStore({ data: {} }); });

  test('fetchCustomers', () => {
    const expectedActions = [
      {type: actions.PAGE_LOADING},
      {type: actions.RECEIVE_CUSTOMERS, data: sampleState1}
    ];

    Api.fetchCustomers = jest.fn(() => {
      return Promise.resolve(sampleState1);
    });

    return store.dispatch(actions.fetchCustomers()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('createCustomer', () => {
    const expectedActions = [
      {type: actions.RECEIVE_CUSTOMER, customer: customer2}
    ];

    Api.createCustomer = jest.fn(() => {
      return Promise.resolve(customer2);
    });

    return store.dispatch(actions.createCustomer(customer2)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('deleteCustomer', () => {
    const customer1 = sampleState1.customers.by_id[1];

    const expectedActions = [
      {type: actions.REMOVE_CUSTOMER, customerId: customer1.id}
    ];

    Api.deleteCustomer = jest.fn(() => {
      return Promise.resolve(customer1);
    });

    return store.dispatch(actions.deleteCustomer(customer1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
