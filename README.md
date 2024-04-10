<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

# Book Store Application

This is a simple Book Store application built using Node.js, Nest.js, Nodecron for schedule the mails, Nodemailer to send Mails, MongoDB, and RabbitMQ for sending the mails in bulks ammount.

## Table of Contents

- [Features](#features)
- [Technologies Used](#TechnologiesUsed)
- [Installation](#installation)
- [Usage](#usage)
- [Logic](#Logics)

## Features

- Users Can Signup,Login,GetProfile.
- Users can Purchase book, and get purchase History
- Users can add your books 
- Message queuing and producing mails and bulk sending using RabbitMQ.


## Technologies Used

    Node.js
    Nest.js
    RabbitMQ
    MongoDB
    HTML and CSS for Email Templates

## Installation

1. Install dependencies:
```typescript
npm install
```

2. Set up environment variables:
```typescript
DB_URL
SECRET_KEY
PORT 
STRIPE_SECRET_KEY
AUTH_EMAIL
AUTH_PASSWORD
```

## Usage

Start the server:
```typescript
npm run local
```
## API EndPoints
```typescript
User :    /Signup --> For users account creation 

          /login  --> Used for login to the Application
          /getProfile ---> Used for get the user profile details

Books:    /addNewBook --> Used for Add new Book in the Book Collection
          /getBookbyId --> Used for get the details of book 

Purchase: /bookPurchase --> Used to buy the book 
          /purchaseHistory -->used to get the user purchase details and History

Review:   /review --> used to write the review of book and also give the rating to the book (out of 5) 

Revenue : --> Used to send every Months of Revenue to the books Authers
```

## SellCount logic
- when book is added in the Database at that time sellcount of the book is zero by default.
- When a user purchase the book, the system retrieves the details of the book using its unique bookId from the Database. 
- Upon successfully finding the book details, the sellCount of that book is incremented by one to reflect the purchase and sellCount will update.

## MongoDB Usage
- Flexible document-based data model allows for dynamic schema evolution and accommodates diverse data types effortlessly.
- Horizontal scalability ensures seamless scaling to handle growing data volumes and user loads without sacrificing performance.
- Distributed architecture ensures high availability and fault tolerance, minimizing downtime and ensuring uninterrupted service.
- Powerful querying capabilities and indexing support enable fast data retrieval and efficient analytics.
- Native integration with popular programming languages and frameworks simplifies development workflows, enhancing developer productivity and agility.
- Overall, MongoDB empowers organizations to build robust, scalable, and agile applications that adapt to evolving business needs with ease.

## Email Notification Mechanism
- The application utilizes the Nodemailer service for sending email notifications. Nodemailer, a widely-used module for Node.js, simplifies email message sending by offering various transport methods such as SMTP, sendmail, or transport plugins. In this application, SMTP is utilized, operating on port 587, with Transport Layer Security (TLS) to ensure communication privacy and integrity.
```typescript
$ npm install nodemailer
```
## Background Job or Message Queue for Asynchronous Email Notifications
- RabbitMQ serves as the message broker to handle email notifications asynchronously.
- The system comprises producers and consumers, utilizing a queue for message exchange.
- Producers push purchase data into the queue.
- Consumers retrieve data from the queue and manage email dispatching operations, ensuring independent email sending processes without affecting other system functionalities.

## Feature for Sending Bulk Email Notifications to Retail Users on New Book Releases
- The Node cron library is employed to schedule tasks for this feature.
- A cron job runs every minute for an hour duration.
- During each execution, the system checks for new book entries in the book collection.
- If new books are detected, Nodemailer sends email notifications to all users, informing them about the latest additions.

