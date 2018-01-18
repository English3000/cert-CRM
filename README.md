# Cert-CRM: _a generic CRM for managing customer's certificates_

### [live demo](http://cert-crm.herokuapp.com/#/)

**STACK:** React, Rails, Postgres

## Updates

* POTENTIAL EXTRA FUNCTIONALITY: Expandable certificates on click, for enhanced readability. _(No need for short- to medium-sized certificates.)_

* Updated [Order of Implementation](https://github.com/English3000/cert-CRM#order-of-implementation) (allows for faster workflow)

* Private keys will not appear on the frontend (or in the state); rather, a button will be provided to email a customer their key--_why expose them unnecessarily?_ If an admin needed a customer to verify their certificate, a form could be provided which checks the database to see if the entered private key matches for that certificate.

  Both of these features are beyond the scope of this MVP. (Non-functioning frontend components are provided, however, for UI purposes.)

## Provided Features

1. Admin sign in & out **(COMPLETE)**
2. Customer search **(COMPLETE)**
3. Customer creation & deletion **(COMPLETE w/ re-rendering bug)**
4. Certificate creation & updating **(COMPLETE w/ re-rendering bug)**
5. Production deployment **(COMPLETE)**

## Assumptions

_**A.** This is the administrator-side of the software, not the customer-side._

_**B.** Admin accounts are created by a webmaster. Thus, admin account_ creation _is out of scope; only admin sign-in functionality is included._

## Component Hierarchy

> **Home Page**

> **Customers Index Page**
  * Customers Index
    * Customer Detail
      * Certificate

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
          certificate_ids: [1, 2]
        }
      },
      all_ids: [1/* ... */]
    },
    certificates: {
      1: {
        id: 1, //needed for RESTful updates
        body: '...',
        active?: true
      },
      2: {
        id: 2,
        body: '...',
        active?: false
      }
    }
  }
}
```

## Order of Implementation

0. documentation **(COMPLETE)**
1. backend **(COMPLETE)**
2. frontend **(COMPLETE)**
3. production deployment **(COMPLETE)** & troubleshooting
4. tests _(at this stage, there's a working product--the tests ensure another developer doesn't accidentally break existing functionality)_
