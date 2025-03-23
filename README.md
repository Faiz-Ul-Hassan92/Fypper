# Fypper - Project Setup Guide

## Introduction
Fypper is a platform designed to streamline the Final Year Project (FYP) process by connecting students, supervisors, and industry professionals. This guide provides instructions on setting up and running the project locally.

## Prerequisites
Ensure you have the following installed before proceeding:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [MongoDB](https://www.mongodb.com/) (running locally or via a cloud service like MongoDB Atlas)
- [Git](https://git-scm.com/)
- [VS Code](https://code.visualstudio.com/) or any preferred IDE
- [Yarn](https://yarnpkg.com/) (recommended) or npm

## Installation

### Clone the Repository
```sh
git clone https://github.com/Faiz-Ul-Hassan92/Fypper
cd fypper
```

### Install Dependencies
Run the following command inside the project directory:
```sh
yarn install
```
Or, if using npm:
```sh
npm install
```

### Setup Environment Variables
Create a `.env` file in the root directory and add the following configuration:
```env
MONGODB_URI=mongodb://localhost:27017/fypper
PORT=5000
```


### Start MongoDB
If running locally, start MongoDB:
```sh
mongod
```
Or use MongoDB Compass or Atlas for cloud-based storage.

### Run the Development Server
```sh
yarn dev
```
Or, if using npm:
```sh
npm run dev
```

The application should now be running at `http://localhost:3000/`.

## Folder Structure
```
app/
│── admin/
│   ├── bots/
│   ├── chat-complaints/
│   ├── components/
│   ├── dashboard/
│   ├── forum-complaints/
│   ├── manage-recruiters/
│   ├── manage-students/
│   ├── manage-supervisors/
│   ├── index.tsx
│
│── api/
│   ├── login/
│   ├── signup/
│
│── recruiter/
│   ├── applications/
│   ├── chat/
│   ├── components/
│   ├── dashboard/
│   ├── past-fyps/
│   ├── projects/
│   ├── index.tsx
│
│── registration/
│   ├── login/
│   ├── recruiter-info/
│   ├── signup/
│   ├── student-profile/
│   ├── supervisor-profile/
│   ├── waiting-approval/
│   ├── index.tsx
│
│── student/
│   ├── bots/
│   ├── browse-fyps/
│   ├── chat/
│   ├── components/
│   ├── dashboard/
│   ├── find-recruiter/
│   ├── find-student/
│   ├── find-supervisor/
│   ├── group-formation/
│   ├── open-forum/
│   ├── request-recruiter/
│   ├── request-supervisor/
│   ├── index.tsx
│
│── supervisor/
│   ├── bots/
│   ├── chat/
│   ├── components/
│   ├── current-fyps/
│   ├── dashboard/
│   ├── fyp-repo/
│   ├── give-reference/
│   ├── manage-proposals/
│   ├── post-topic/
│   ├── schedule-meetings/
│   ├── index.tsx
│
│── globals.css
│── package.json
│── README.md
```

## Contributing
Feel free to open an issue or submit a pull request if you'd like to contribute.


## Contact
For any inquiries, contact `i220818@nu.edu.pk`.

