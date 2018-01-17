export const signIn = user => $.ajax({
  method: 'POST',
  url: 'api/session',
  data: {user}
});
export const signOut = () => $.ajax({
  method: 'DELETE',
  url: 'api/session'
});

export const fetchCustomers = () => $.ajax({
  method: 'GET',
  url: 'api/customers'
});
export const createCustomer = customer => $.ajax({
  method: 'POST',
  url: 'api/customers',
  data: {customer}
});
export const deleteCustomer = id => $.ajax({
  method: 'DELETE',
  url: `api/customers/${id}`
});

// export const fetchCertificate = private_key => $.ajax({
//   method: 'GET',
//   url: 'api/customers',
//   data: {private_key}
// });
export const createCertificate = certificate => $.ajax({
  method: 'POST',
  url: `api/customers/${certificate.user_id}/certificates`,
  data: {certificate}
});
export const updateCertificate = certificate => $.ajax({
  method: 'PATCH',
  url: `api/certificates/${certificate.id}`,
  data: {certificate}
});
