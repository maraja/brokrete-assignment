# Brokrete Technical Assignment
> This project is aimed to develop a GitHub clone while utilizing GitHub's new GraphQL v4 API.
The project is hosted and can be found here: https://brokrete-github-clone.netlify.app/

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Notes](#notes)
* [Features](#features)
* [Contact](#contact)

## General info
This is a dummy project aimed to replicate the user search and view of GitHub using GitHub's GraphQL v4 API. This project doesn't have a backend and is deployed with only a frontend.

## Technologies
* Node.js
* Express.js
* React.js
* GraphQL


## Notes
This project is aimed to show off the capability of a full fledged Twilio based, calling application. This project leverages a messaging queue to simulate the wait time to release calls. As there is a requirement to wait 30 seconds before dispatching a call, the backend queues up the call and returns a receipt immediately. The call is then made 30 seconds afterwards. I've included a producer and consumer service which illustrates how the queue works. For the purposes of this project however, I've ommitted these two services from running and included the queue producer and consumer within the backend. 

## Features
List of features ready and TODOs for future development
* Gets list of users based on keyword search
* Allows user to view GitHub user details.

To-do list:
* Continue to fix styling and make more "replica-like"
* Work on mobile compatibility.
* Include proxy server to hide GitHub API token in the future.


## Contact
Created by [@maraja](mailto:amit.maraj@gmail.com) - feel free to contact me!