# Cert-CRM: _a generic CRM for managing customer's certificates_

### CURRENTLY IN DEVELOPMENT
_(live demo will be provided here upon deployment)_

**STACK:** React, Rails, Postgres

## Updates

* Private keys will not appear on the frontend (or in the state); rather, a button will be provided to email a customer their key--_why expose them unnecessarily?_ If an admin needed a customer to verify their certificate, a form could be provided which checks the database to see if the entered private key matches for that certificate.

  Both of these features are beyond the scope of this MVP. (Non-functioning frontend components are provided, however, for UI purposes.)

* Clickable certificate bodies--longer bodies will not fit within a certificate's allocated space; for this reason, modal functionality will be provided to more easily view the body in full.

## Provided Features

1. Admin Sign In & Out
2. Customer Search
3. Customer CRUD
4. Certificate CRU \+ "full-view" modals
5. Production deployment

## Assumptions

_**A.** This is the administrator-side of the software, not the customer-side._

_**B.** Admin accounts are created by a webmaster. Thus, admin account_ creation _is out of scope; only admin sign-in functionality is included._

## Wireframes

### Footer of a company's homepage
At bottom so out of sight from site visitors.
![homepage](https://github.com/English3000/cert-CRM/blob/master/HomePage.png)

### Admin interface
![customersIndexPage](https://github.com/English3000/cert-CRM/blob/master/CustomersIndexPage.png)

## Schema

### `users`

attribute         | datatype | settings
-|-|-
`id`              | integer  | not null, primary key
`name`            | string   | not null
`email`           | string   | not null, unique, indexed
`password_digest` | string   | not null
`session_token`   | string   | not null, unique, indexed
`admin?`          | boolean  | not null
`created_at`      | datetime | not null
`updated_at`      | datetime | not null

### `certificates`

attribute         | datatype | settings
-|-|-
`id`              | integer  | not null, primary key
`private_key`     | string   | not null, unique, indexed
`body`            | text     | not null
`active?`         | boolean  | not null
`user_id`         | integer  | not null, foreign key, indexed
`created_at`      | datetime | not null
`updated_at`      | datetime | not null

## Sample State

```js
{
  session: {
    currentUser: `${name}`, //all that's needed for MVP
    errors: []
  },
  data: { //extra layer so can fetch customers & certificates in only 1 query
    customers: { //for faster loading upon sign in, grab X most recently created customers; then cache the rest when searched
      by_id: {
        1: {
          id: 1, //needed for RESTful deletions
          name: '_',
          email: '_@_._', //validate proper formatting
          active_certs: [1/* ... */],
          inactive_certs: [2/* ... */]
        }
      },
      all_ids: [1/* ... */]
    },
    certificates: { //`active?` columns not needed b/c distinction made in customers slice
      1: {
        id: 1, //needed for RESTful updates
        body: '...'
      },
      2: {
        id: 2,
        body: '...'
      }
    }
  }
}
```

## Order of Implementation

1. backend
2. backend tests
3. frontend
4. frontend tests
5. production deployment
6. production run-through & troubleshooting
