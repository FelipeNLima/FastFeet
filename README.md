<h1 align="center">
    <img alt="Bootcamp GoStack" src="https://user-images.githubusercontent.com/26943148/77071668-3499e580-69cb-11ea-9d20-ac7be243ca96.png" />
    <br />
    Bootcamp GoStack - FastFeet
</h1>

<h3 align="center">
    A challenge to get Rocketseat GoStack Bootcamp certification. 👨🏻‍🚀🚀
</h3>
<h2 align="center"> Overview </h2>
<h4> The application that was developed is an app for a fictional carrier, FastFeet. </h4>
    <img alt="Bootcamp GoStack" src="https://user-images.githubusercontent.com/26943148/78579175-e710db80-7806-11ea-8b43-0e55a7fb6e77.png" width="30%" align="left"/>
    <img alt="Bootcamp GoStack" src="https://user-images.githubusercontent.com/26943148/78579182-e8da9f00-7806-11ea-9ad9-d3ebed21a8db.png" width="30%" />
    <img alt="Bootcamp GoStack" src="https://user-images.githubusercontent.com/26943148/78579176-e7a97200-7806-11ea-8553-e2858a720214.jpg" width="30%" />
    <img alt="Bootcamp GoStack" src="https://user-images.githubusercontent.com/26943148/78579179-e8420880-7806-11ea-9652-79765be95e70.jpg" width="30%" />
    <img alt="Bootcamp GoStack" src="https://user-images.githubusercontent.com/26943148/78579180-e8420880-7806-11ea-94b0-d82a76e3746a.jpg" width="30%" />
    <img alt="Bootcamp GoStack" src="https://user-images.githubusercontent.com/26943148/78579181-e8da9f00-7806-11ea-83e5-183d5e1aa9a7.jpg" width="30%" />

## Table of contents

- :sunglasses: [Technologies](#technologies)
- :floppy_disk: [Installation](#installation)

## Technologies

:hammer: In this project the following technologies were used:

### Backend

- [Node.js](https://nodejs.org)
- [express](https://expressjs.com/)
- [nodemon](https://nodemon.io/)
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js/tree/master/dist)
- [bee-queue](https://bee-queue.com/)
- [date-fns](https://date-fns.org/)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [multer](https://github.com/expressjs/multer)
- [sequelize](https://sequelize.org/)
- [pg](https://node-postgres.com/)
- [youch](https://github.com/poppinss/youch)
- [yup](https://github.com/jquense/yup)
- [sucrase](https://sucrase.io/)
- [nodemailer](https://nodemailer.com/about/)
- [redis](https://redis.io/)
- [docker](https://www.docker.com/docker-community)

### Frontend

- [ReactJS](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Redux-Saga](https://redux-saga.js.org/)
- [rocketseat/unform](https://github.com/Rocketseat/unform)
- [Polished](https://polished.js.org/)
- [Immer](https://github.com/immerjs/immer)
- [React-toastify](https://fkhadra.github.io/react-toastify/)
- [Reactotron](https://infinite.red/reactotron)
- [history](https://www.npmjs.com/package/history)
- [Redux Persist](https://github.com/rt2zz/redux-persist)
- [React Icons](https://react-icons.netlify.com/#/)
- [Styled Components](https://www.styled-components.com/)
- [yup](https://github.com/jquense/yup)
- [Prop-types](https://www.npmjs.com/package/prop-types)
- [React-bootstrap](https://react-bootstrap.github.io/)
- [React-input-mask](https://www.npmjs.com/package/react-input-mask)
- [date-fns](https://date-fns.org/)
- [axios](https://github.com/axios/axios)

### Mobile

- [React Native](https://facebook.github.io/react-native/)
- [react-native-gesture-handler](https://kmagiera.github.io/react-native-gesture-handler/docs/getting-started.html)
- [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)

## Installation

First of all, to run this application you'll need to install [Node.js v10.15](https://nodejs.org) or higher, [Yarn v1.17](https://yarnpkg.com/lang/en/) or higher, [Docker](https://www.docker.com/docker-community), [Genymotion](https://www.genymotion.com/) for emulate device and [Android Studio SDK](https://developer.android.com/studio) on your computer.

### How to use:

```bash
# Clone this repository
$ git clone https://github.com/FelipeNLima/FastFeet.git
```

#### Backend

P.S.: After running seeds, by default the password for to login is: 123456

```bash
# Go into the repository
$ cd FastFeet/backend

# Install dependencies
$ yarn install

# Created docker container postgree
$ docker run --name database -e POSTGRES_PASSWORD=docker -e POSTGRES_DB=meetapp -p 5432:5432 -d postgres

# Created docker container redis
$ docker run --name redisbaber -p 6379:6379 -d -t redis:alpine

# Run migrates
$ yarn migrate

# Run seeds in that order
$ yarn sequelize seed:generate --name admin-user
$ yarn sequelize db:migrate

# Run the Backend
$ yarn dev

#Run the Queue for sending email
$ yarn queue
```

#### Frontend

```bash
# Go into the repository
$ cd FastFeet/frontend

# Install dependencies
$ yarn install

# Run the Frontend
$ yarn start
```

#### Mobile

Access Genymotion and open an emulate device.
P.S.: Tested on Android system only.

```bash
# Go into the repository
$ cd FastFeet/mobile

# Install dependencies
$ yarn install

# Run the Mobile
$ react-native start

# Open another window in terminal and run
$ react-native run-android
```

---

Made with by Felipe Lima :smiley: [Get in touch!](https://www.linkedin.com/in/felipe-lima-00bb62171/)
