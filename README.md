# CRM Service

REST API to manage customer data for a small shop.

## Tech Stack

### Low-level request handling

- **HTTP Module**: Handle HTTP request

### Routing, Server logic

- **Express**: Parse response + routing
- **BodyParser**: Help parse incoming HTTP request
- **Morgan**: Login

### Database

- **MongoDB**: Storing Data
- **Mongoose**: Working with MongoDB

### Authentication

- **Passport JS**: User authentication ecosystem
- - **Passport-Local**: Authenticationg users with email/password
- - **Passport-JWT**: Authenticationg users with JSON Web Tokens
- **Bcrypt**: Storing users password safely

## Routes

\* means that it is a required field.

**Permissions**:

- 0: Anyone
- 1: User authentication
- 2: Admin authentication

### Already implemented

| Type | Route  | Description                | Fields                      | Permissions | Return    |
| ---- | ------ | -------------------------- | --------------------------- | ----------- | --------- |
| POST | /users | Create a user              | email*, password*, role = 1 | 2 (not yet) |           |
| POST | /login | Allow user and admin login | email*, password*           | 0           | JWT Token |

### Needs to be implemented

| Type   | Route                  | Description                   | Fields                     | Permissions | Return                                 |
| ------ | ---------------------- | ----------------------------- | -------------------------- | ----------- | -------------------------------------- |
| POST   | /customers             | Create a customer             | name*, surname*, id, photo | 1           |                                        |
| PUT    | /users/:userId         | Update a user                 | email, password, role      | 2           |                                        |
| PUT    | /customers/:customerId | Update a customer             | name, surname, photo       | 1           |                                        |
| DELETE | /users/:userId         | Delete a user                 |                            | 2           |                                        |
| DELETE | /customers/:customerId | Delete a customer             |                            | 1           |                                        |
| GET    | /users                 | List all users                |                            | 2           | All users (email and id)               |
| GET    | /customers             | List all customers            |                            | 1           | All customers (name, surname and id)   |
| GET    | /customers/:customerId | Get full customer information |                            | 1           | Customer (name, surname, id and photo) |

## Getting Started

### Prerequisites

This project has been developed with the following versions:

- v9.10.0 NodeJS
- v4.0.1 mongodb

### Installing NodeJS

_[Official Documentation](https://nodejs.org/)_

### Installing MongoDB

_[macOS tutorial](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x)_

We need to give permission to the data directory, in normal cases: `sudo chown -R $USER /data/db`.

I recommend [Robo 3T](https://robomongo.org/) to work with MongoDB. Robo 3T is a native mongoDB management tool.

### Running the project

With `yarn start` or `npm run start` you can start a server in your machine.

## Deployment

You can deploy the project to https://crm-service-nkjrlocled.now.sh/ with `yarn deploy` or `npm run deploy`.

## Authors

- **Jorge Marrero** - _Initial work_ - [jorgemarrero](https://github.com/jorgemarrero)
