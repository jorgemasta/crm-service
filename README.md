# CRM Service

REST API to manage customer data for a small shop.

[API Documentation](https://documenter.getpostman.com/view/3433945/RWaC2XKn)

## Tech Stack

### Low-level request handling

- **HTTP Module**: Handle HTTP request

### Routing, Server logic

- **Express**: Parse response + routing
- **BodyParser**: Help parse incoming HTTP request
- **multer**: Help handling `multipart/form-data`, for uploading images
- **Morgan**: Logging

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

| Type   | Route                  | Description                   | Fields                      | Permissions | Return                                 |
| ------ | ---------------------- | ----------------------------- | --------------------------- | ----------- | -------------------------------------- |
| POST   | /login                 | Allow user and admin login    | email*, password*           | 0           | JWT Token                              |
| POST   | /customers             | Create a customer             | name*, surname*, id, photo  | 1           |                                        |
| PUT    | /customers/:customerId | Update a customer             | name, surname, photo        | 1           |                                        |
| DELETE | /customers/:customerId | Delete a customer             |                             | 1           |                                        |
| GET    | /customers             | List all customers            |                             | 1           | All customers (name, surname and id)   |
| GET    | /customers/:customerId | Get full customer information |                             | 1           | Customer (name, surname, id and photo) |
| POST   | /users                 | Create a user                 | email*, password*, role = 1 | 2           |                                        |
| PUT    | /users/:userId         | Update a user                 | email, password, role       | 2           |                                        |
| DELETE | /users/:userId         | Delete a user                 |                             | 2           |                                        |
| GET    | /users                 | List all users                |                             | 2           | All users (email and id)               |

### Needs to be implemented

| Type | Route | Description | Fields | Permissions | Return |
| ---- | ----- | ----------- | ------ | ----------- | ------ |


## Getting Started

### Prerequisites

- [Install NVM and use NodeJS +v9.10.0](https://github.com/creationix/nvm#installation)
- Install MongoDB (see below)
- [Install now](https://zeit.co/now#whats-now) _- just for deployment_

#### Installing MongoDB

This project has been developed with `v4.0.1 mongodb`.
_[macOS tutorial](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x)_

We need to give permission to the data directory, in normal cases: `sudo chown -R $USER /data/db`.

I recommend [Robo 3T](https://robomongo.org/) to work with MongoDB. Robo 3T is a native mongoDB management tool.

### Installing the project

1. Clone the repo
2. Run `yarn` or `npm install` to cover any dependencies.

### Setting up the environment

To run the project you must provide some environment variables in the root.

- `.env`: to run the project locally
- `.env.production`: to deploy the project

_*NOTE:* You can follow `.env.example` to find out which variables are required._

## Running the project

With `yarn start` or `npm run start` you can start a server in your machine.
You must also remember to have an open mongodb instance with `mongod`.

## Running the tests

No test at the moment!

## Deployment

You can deploy the project to [zeit.co](https://zeit.co/) with `yarn deploy` or `npm run deploy`.

## Possible next improvements

- [ ] **Delete unnecessary stored images:** Remove the previous stored image when updating a photo customer and prevent uploading an image if the request when creating or updating a customer fails.
- [ ] **Pagination:** Pagination when all users or all customers are listed.
- [ ] **Improve update/delete method response:** Check if a customer/user has been updated or deleted before sending a success message.
- [ ] **Tests, Tests!**
- [ ] **Use Docker**

## Authors

- **Jorge Marrero** - _Initial work_ - [jorgemarrero](https://github.com/jorgemarrero)
