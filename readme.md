# Birthday Email Sender

Birthday Email Sender is a Node.js web application built with Express, MongoDB, TypeORM, and Cron. It allows you to manage user information and sends birthday emails to users every day at 9 AM based on the specified timezone.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Configuration](#configuration)

## Features

- **User Management**: Create, Read, Update, and Delete user profiles.
- **Scheduled Emails**: Automatically send birthday emails to users at 9 AM based on their timezone.
- **Data Persistence**: Store user information in a MongoDB database using TypeORM.
- **Customizable**: Easily configure the application's settings to match your requirements.

## Tech Stack

- **Node.js**: A runtime for executing JavaScript code on the server-side.
- **Express**: A web application framework for Node.js that simplifies building web applications.
- **MongoDB**: A NoSQL database for data storage.
- **TypeORM**: An Object-Relational Mapping (ORM) library for TypeScript and JavaScript.
- **Cron**: A time-based job scheduler to automate the birthday email sending process.

## Getting Started

To get started with Birthday Email Sender, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/raflymaulana28/birthday-email-sender.git
cd birthday-email-sender
```

2. Install dependencies:

```bash
npm install
```

3. Set up your MongoDB connection by editing the configuration files on ormconfig.json.

4. Set up your email-sender url on env.

5. Start the application:

```bash
npm start
```

## Usage

Once the application is running, you can use the API endpoints to manage user profiles and configure the birthday email settings.

## API Endpoints

The following API endpoints are available:

- **GET /user**: Get a list of all users.
- **GET /user/:id**: Get a specific user by their ID.
- **POST /user**: Create a new user.
- **PUT /user/:id**: Update a user's information.
- **DELETE /user/:id**: Delete a user.

## Configuration

You can configure the application by editing the following files:

- `ormconfig.json`: Configure your MongoDB connection details.

Make sure to check the application's documentation for more details on these configuration options.

---
