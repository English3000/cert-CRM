import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { sampleState1 } from '../../../utils/dataReducer-helper';
import * as actions from '../actions/customerActions';
import CustomersIndexContainer, { CustomersIndex } from '../CustomersIndexContainer';

const mockStore = configureMockStore([thunk]);
const testStore = mockStore({ data: sampleState1 });

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

  it('fetches customers during mount', () => {
    expect(actions.fetchCustomers).toBeCalled();
  });
});
//receives customers
//add customer button
