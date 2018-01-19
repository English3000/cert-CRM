import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { sampleState1 } from '../../../utils/dataReducer-helper';
import * as actions from '../../../actions/customerActions';
import CustomersIndexContainer, { CustomersIndex } from '../CustomersIndexContainer';

const mockStore = configureMockStore([thunk]);
const testStore = mockStore({ data: sampleState1, errors: [], ui: {pageLoading: false} });

jest.mock('../CustomerDetailContainer', () => (
  () => ({ render: () => ( <div></div> ) })
));

Enzyme.configure({ adapter: new Adapter() });

describe('CustomersIndex', () => {
  let CustomersIndexWrapper;

  beforeEach(() => {
    actions.fetchCustomers = jest.fn(() => dispatch => {});

    CustomersIndexWrapper = mount(
      <CustomersIndexContainer store={testStore}/>
    ).find(CustomersIndex);
  });

  it('has customers prop', () => {
    expect(CustomersIndexWrapper.props().customers).toBeDefined();
  });

  it('allows customers to be created', () => {
    expect(CustomersIndexWrapper.props().CreateCustomer).toBeDefined();
  });

  it('fetches customers during mount', () => {
    expect(actions.fetchCustomers).toBeCalled();
  });

  it('renders customers', () => {
    expect(
      CustomersIndexWrapper.find('main').children().getElements().length
    ).toBe(1);
  });
});
//receives customers
//add customer button
