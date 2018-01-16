import React from 'react';

import { PAGE_LOADING, RECEIVE_CUSTOMERS } from '../actions/customerActions';

const _defaultState = {
  pageLoading: false
};

export default (state = _defaultState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case PAGE_LOADING:
      return {pageLoading: true};
    case RECEIVE_CUSTOMERS:
      return {pageLoading: false};
    default:
      return state;
  }
};
