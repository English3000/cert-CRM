import * as Api from '../utils/api';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});
export const receiveErrors = errors => ({
  type: RECEIVE_ERRORS,
  errors
});

export const signIn = user => dispatch => (
  Api.signIn(user)
    .then( u => dispatch(receiveCurrentUser(u)),
           err => dispatch(receiveErrors(err.responseJSON)) )
);
export const signOut = () => dispatch => (
  Api.signOut().then( user => dispatch(receiveCurrentUser(null)) )
);
