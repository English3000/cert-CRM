import * as Api from '../utils/api';
import { receiveErrors, RECEIVE_ERRORS } from './sessionActions';

export const RECEIVE_CERTIFICATE = 'RECEIVE_CERTIFICATE';
export const UPDATE_CERTIFICATE = 'UPDATE_CERTIFICATE';

export const receiveCertificate = certificate => ({
  type: RECEIVE_CERTIFICATE,
  certificate
});
export const patchCertificate = certificate => ({
  type: UPDATE_CERTIFICATE,
  certificate
});

// export const fetchCertificate = privateKey => dispatch => (
//   Api.fetchCertificate(privateKey)//.then(//return to admin whether cert was found in DB);
// );
export const createCertificate = certificate => dispatch => (
  Api.createCertificate(certificate)
    .then(newCertificate => dispatch(receiveCertificate(newCertificate)),
          err => {
            dispatch(receiveErrors(err.responseJSON));
            return err.responseJSON;
          })
);
export const updateCertificate = certificate => async (dispatch) => dispatch(
  patchCertificate( await Api.updateCertificate(certificate) )
);
