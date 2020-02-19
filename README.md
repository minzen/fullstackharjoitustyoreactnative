# Project work "Memory tracks" for the course Full Stack Web Development at University of Helsinki

See [https://courses.helsinki.fi/en/aytkt21010/129098202](https://courses.helsinki.fi/en/aytkt21010/129098202) and [https://github.com/fullstackopen-2019/misc/blob/master/projekti.md](https://github.com/fullstackopen-2019/misc/blob/master/projekti.md) for the reference regarding the course information.

The project has been implemented in three different git repositories: [the first one contains the backend implementation on top of NodeJS and GraphQL](https://github.com/minzen/fullstack_harjoitustyo_backend), [the second repository has the React JS based frontend implementation](https://github.com/minzen/fullstack_harjoitustyo_frontend) and [the third one has the experimental React Native implementation for iOS and Android mobile devices](https://github.com/minzen/fullstackharjoitustyoreactnative).

## General

The application "Memory tracks" is designated for a user who utilizes Internet services with multiple devices and wants to easily access the previously store data. The application enables an easy way of storing/linking meaningful content (e.g. important notes, links to web resources that the user wants to have a look at a bit later). The notes can be stored, classified and searched by using keywords. The frontend takes care of fetching and presenting the information obtained from the API provided by the backend.

The use of the application requires a user account. You can register one by using the instructions listed on the landing page of the application.

## React Native Mobile App implementation

A simple frontend for iOS and Android based devices is provided by React Native. The mobile app uses the backend implementation and its API to fetch, store, change the notes in the document database as well as for managing and authenticating the users.

The implementation relies on React, React Native, ApolloServer and ApolloClient related libraries and frameworks. To enhance the UI, normal CSS styling and react-native-elements are utilized as well as a set of existing icons.

## Build and execution

### System requirements

- nodejs (e.g. v.10.19.0), yarn/npm installed
- Expo
- The backend implementation has to be running on a server (e.g. on localhost)

### Building the application

- execute the command _yarn install_ to install the required dependencies
- Currently there is no production version of the React native app, but only a development version executed in Expo.io.
- By executing the command _expo start_ an Expo server instance is started locally and the app can be tested in a simulator or on a real device.

## Used technologies

- React JS
- React Native
- GraphQL + Apollo Client and other Apollo related libraries
- React Native Elements
- React Navigation

## Time keeping

[Time keeping for the project work](https://github.com/minzen/fullstack_harjoitustyo_backend/blob/master/tyokirjanpito.md)
