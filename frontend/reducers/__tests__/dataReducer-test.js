import { sampleState1 } from '../../utils/dataReducer-helper';
import dataReducer, {_defaultState} from '../dataReducer';
import * as CustomerActions from '../../actions/customerActions';
import * as CertificateActions from '../../actions/certificateActions';

describe('dataReducer', () => {
  test('initializes with a certificates & a customers slice', () => {
    expect(dataReducer(undefined, {})).toEqual(_defaultState);
  });

  test('returns state by default', () => {
    expect(dataReducer(undefined, { type: 'RECEIVE_ERRORS' })).toEqual(_defaultState);
  });

  describe('actions', () => {
    let type, data, action, oldState, newState;

    describe('RECEIVE_CUSTOMERS', () => {
      beforeEach(() => {
        type = 'RECEIVE_CUSTOMERS';
        data = sampleState1;
        action = {type, data};
      });

      test("doesn't modify old state", () => {
        oldState = _defaultState;

        dataReducer(oldState, action);
        expect(oldState).toEqual(_defaultState);
      });

      test('new state has customers & certificates', () => {
        newState = dataReducer(undefined, action);

        expect(newState.customers.all_ids.length).toBeGreaterThan(0);
        expect(Object.keys(newState.certificates).length).toBeGreaterThan(0);
      });
    });

    describe('RECEIVE_CUSTOMER', () => {
      test('adds customer to new state', () => {
        type = 'RECEIVE_CUSTOMER';
        data = {id: 2, name: 'New Customer', email: 'br@nd.new', certificate_ids: []};
        action = {type, customer: data};

        oldState = _defaultState;
        newState = dataReducer(oldState, action);

        expect(newState.customers.all_ids.length).toEqual(oldState.customers.all_ids.length + 1);
      });
    });

    describe('REMOVE_CUSTOMER', () => {
      beforeEach(() => {
        type = 'REMOVE_CUSTOMER';
        action = {type, customerId: 1};

        oldState = sampleState1;
        newState = dataReducer(oldState, action);
      });

      test('removes customer from state', () => {
        expect(newState.customers.by_id[action.customerId]).toBeUndefined();
      });

      test("removes customer's certificates from state", () => {
        expect(Object.keys(newState.certificates).length)
          .toEqual(Object.keys(oldState.certificates).length -
                     oldState.customers.by_id[action.customerId].certificate_ids.length);
      });
    });
    //
    describe('RECEIVE_CERTIFICATE', () => {
      beforeEach(() => {
        type = 'RECEIVE_CERTIFICATE';
        data = {id: 2, body: 'Basic', 'active?': true, user_id: 1};
        action = {type, certificate: data};

        oldState = sampleState1;
        newState = dataReducer(oldState, action);
      });

      test('adds certificate to new state', () => {
        expect(newState.certificates[action.certificate.id]).not.toBeUndefined();
      });

      test("adds id to customer's certificate ids", () => {
        expect(newState.customers.by_id[action.certificate.user_id].certificate_ids)
          .toContain(action.certificate.id);
      });
    });

    describe('UPDATE_CERTIFICATE', () => {
      test("updates certificate's active status", () => {
        type = 'UPDATE_CERTIFICATE';
        data = {id: 1, body: 'Basic', 'active?': false, user_id: 1};
        action = {type, certificate: data};

        oldState = sampleState1;
        newState = dataReducer(oldState, action);

        expect(oldState.certificates[action.certificate.id]['active?'])
          .not.toEqual(newState.certificates[action.certificate.id]['active?']);
      });
    });
  });
});
