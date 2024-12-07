# Megamart eCommerce Platform

> eCommerce platform built with the MERN stack & Redux.

<img src="https://github.com/alyalsayed/MegaMart/blob/main/frontend/public/screens/1.PNG">

It is a full-featured shopping cart with PayPal & credit/debit payments.


- [Features](#features)
- [Usage](#usage)
  - [Env Variables](#env-variables)
  - [Install Dependencies (frontend & backend)](#install-dependencies-frontend--backend)
  - [Run](#run)
- [Build & Deploy](#build--deploy)
  - [Seed Database](#seed-database)

## Features

- Full featured shopping cart
- Product reviews and ratings
- Top products carousel
- Product pagination
- Product search feature
- User profile with orders
- Admin product management
- Admin user management
- Admin Order details page
- Mark orders as delivered option
- Checkout process (shipping, payment method, etc)
- PayPal / credit card integration
- Database seeder (products & users)

## Usage

- Create a MongoDB database and obtain your `MongoDB URI` - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
- Create a PayPal account and obtain your `Client ID` - [PayPal Developer](https://developer.paypal.com/)

### Env Variables

Rename the `.env.example` file to `.env` and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'
PAYPAL_CLIENT_ID = your paypal client id
PAGINATION_LIMIT = 8
```

Change the JWT_SECRET and PAGINATION_LIMIT to what you want

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```

# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```

### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```

```
Sample User Logins

admin@email.com (Admin)
1234

john@email.com (Customer)
1234

```

# ScreenShots
<img src="https://github.com/alyalsayed/MegaMart/blob/main/frontend/public/screens/2.PNG">
<img src="https://github.com/alyalsayed/MegaMart/blob/main/frontend/public/screens/3.PNG">
<img src="https://github.com/alyalsayed/MegaMart/blob/main/frontend/public/screens/4.PNG">
<img src="https://github.com/alyalsayed/MegaMart/blob/main/frontend/public/screens/5.PNG">
<img src="https://github.com/alyalsayed/MegaMart/blob/main/frontend/public/screens/6.PNG">
<img src="https://github.com/alyalsayed/MegaMart/blob/main/frontend/public/screens/7.PNG">
<img src="https://github.com/alyalsayed/MegaMart/blob/main/frontend/public/screens/8.PNG">
<img src="https://github.com/alyalsayed/MegaMart/blob/main/frontend/public/screens/9.PNG">





---
