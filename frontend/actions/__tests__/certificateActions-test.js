import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { sampleState1, certificate1_0, certificate2 } from '../../utils/dataReducer-helper';
import * as actions from '../certificateActions';
import * as Api from '../../utils/api';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('certificateActions', () => {
  let store;

  beforeEach(() => { store = mockStore({ data: {} }); });

  test('createCertificate', () => {
    const expectedActions = [
      {type: actions.RECEIVE_CERTIFICATE, certificate: certificate2}
    ];

    Api.createCertificate = jest.fn(() => {
      return Promise.resolve(certificate2);
    });

    return store.dispatch(actions.createCertificate(certificate2)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('updateCertificate', () => {
    const expectedActions = [
      {type: actions.UPDATE_CERTIFICATE, certificate: certificate1_0}
    ];

    Api.updateCertificate = jest.fn(() => {
      return Promise.resolve(certificate1_0);
    });

    return store.dispatch(actions.updateCertificate(certificate1_0)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
