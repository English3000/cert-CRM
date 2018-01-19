import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { sampleState1 } from '../../../utils/dataReducer-helper';
import { deleteCustomer } from '../actions/customerActions';
import { createCertificate } from '../actions/certificateActions';
import CustomerDetailContainer, { CustomerDetail } from '../CustomerDetailContainer';

const mockStore = configureMockStore([thunk]);
const testStore = mockStore({ data: sampleState1 });

jest.mock('../CertificateContainer', () => (
  () => ({ render: () => ( <div></div> ) })
));

Enzyme.configure({ adapter: new Adapter() });

describe('CustomerDetail', () => {
  let CustomerDetailWrapper;

  beforeEach(() => {
    CustomerDetailWrapper = mount(
      <CustomerDetailContainer store={testStore}/>
    ).find(CustomerDetail);
  });
});
//receives certificates
//displays certificates
//create certificate button
//delete customer button
