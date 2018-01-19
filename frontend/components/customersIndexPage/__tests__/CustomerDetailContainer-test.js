import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { sampleState1 } from '../../../utils/dataReducer-helper';
import { deleteCustomer } from '../../../actions/customerActions';
import { createCertificate } from '../../../actions/certificateActions';
import CustomerDetailContainer, { CustomerDetail } from '../CustomerDetailContainer';

const mockStore = configureMockStore([thunk]);
const testStore = mockStore({ data: sampleState1, errors: [], ui: {pageLoading: false} });

jest.mock('../CertificateContainer', () => (
  () => ({ render: () => ( <div></div> ) })
));

Enzyme.configure({ adapter: new Adapter() });

describe('CustomerDetail', () => {
  let CustomerDetailWrapper;

  beforeEach(() => {
    CustomerDetailWrapper = mount(
      <CustomerDetailContainer store={testStore}
                               customer={testStore.getState().data.customers.by_id[1]}/>
    ).find(CustomerDetail);
  });

  it('has certificates prop', () => {
    expect(CustomerDetailWrapper.props().certificates).toBeDefined();
  });

  // it("has a customer's details", () => {
  //   expect(CustomerDetailWrapper.props().customer).toBeDefined();
  // });

  it('allows customers to be deleted', () => {
    expect(CustomerDetailWrapper.props().DeleteCustomer).toBeDefined();
  });

  it('allows certificates to be created', () => {
    expect(CustomerDetailWrapper.props().CreateCertificate).toBeDefined();
  });

  it('renders active certificates', () => {
    expect(
      CustomerDetailWrapper.find('main').children().getElements().length
    ).toBe(1);
  });
});
//receives certificates
//displays certificates
//create certificate button
//delete customer button
