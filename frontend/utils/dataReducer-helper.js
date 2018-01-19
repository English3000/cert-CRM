export const sampleState1 = {
  certificates: {
    1: {
      id: 1,
      body: 'Basic',
      'active?': true
    }
  },
  customers: {
    all_ids: [1],
    by_id: {
      1: {
        id: 1,
        name: 'Customer',
        email: 'cust@mer.com',
        certificate_ids: [1]
      }
    }
  }
};
