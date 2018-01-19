export const sampleState1 = {
  certificates: {
    1: {
      id: 1,
      body: 'Basic',
      'active?': true
    },
    3: {
      id: 3,
      body: 'Gold',
      'active?': false
    }
  },
  customers: {
    all_ids: [1],
    by_id: {
      1: {
        id: 1,
        name: 'Customer',
        email: 'cust@mer.com',
        certificate_ids: [1, 3]
      }
    }
  }
};

export const customer2 = {
  id: 2, name: 'New Customer', email: 'br@nd.new', certificate_ids: []
};

export const certificate1_0 = {
  id: 1, body: 'Basic', 'active?': false, user_id: 1
};

export const certificate2 = {
  id: 2, body: 'Basic', 'active?': true, user_id: 1
};
