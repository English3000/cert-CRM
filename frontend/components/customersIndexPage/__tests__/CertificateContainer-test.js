import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { sampleState1 } from '../../../utils/dataReducer-helper';
import { updateCertificate } from '../../../actions/certificateActions';
import CertificateContainer, { Certificate } from '../CertificateContainer';

const mockStore = configureMockStore([thunk]);
const testStore = mockStore({ data: sampleState1, errors: [], ui: {pageLoading: false} });

Enzyme.configure({ adapter: new Adapter() });

describe('Certificate', () => {
  let CertificateWrapper;

  beforeEach(() => {
    CertificateWrapper = mount(
      <CertificateContainer store={testStore}
                            certificate={testStore.getState().data.certificates[1]}/>
    ).find(Certificate);
  });

  it('has certificate prop', () => {
    expect(CertificateWrapper.props().certificate).toBeDefined();
  });

  it('allows certificates to be updated', () => {
    expect(CertificateWrapper.props().UpdateCertificate).toBeDefined();
  });
});
