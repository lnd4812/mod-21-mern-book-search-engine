
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

# MOD-21-MERN-BOOK-SEARCH-ENGINE  

## Description

The purpose of this application is to refactor a fully functioning Google Books API search engine from a RESTful API to a GraphQL API built with Apollo Server, using MongoDB database, Node.js/Express.js server on the back-end, a React front end (MERN) and API.  

Output is based on the acceptance criteria outlined in the Module 20 Assignment Overview [Module-21-assignment](https://courses.bootcampspot.com/courses/1181/assignments/23393?module_item_id=467017).

A sample display of expected output is included in the Challenge outline.

![example](21-mern-homework-demo-01.gif)

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Testing](#testing)
* [Credits](#credits)
* [Questions](#questions)

## Installation

* Set up Apollo Server to use GraphQL queries and mutuations to fetch and modify data
* Modify existing Middleware to function with GraphQL API
* Create an Apollo Provider to enable requests to communicate with an Apollo Server
* Deploy application to Heroku

The React App is initiated by running "npm create-react-app"in the CLI and, once the sufficient coding has been added, may be deployed by typing "npm run start" in the CLI.  A webpage is then launched at "localhost:3000".

## Usage

This application is meant to serve as a book search engine for a Google Books API. A user can enter the name of a book in the input field to conduct a search.  Results include the book's title, author, description, image and link to that book on the Google Books site.  However, the user must be logged in to save a book or delete a book.  The application features a modal giving a user the option to login; if not yet signed up, the user may click on the signup tab in order to create and account.

Once logged in, menu options available to the user now include options to visit that user's saved books in addition to being able to save or delete a book. The login/signup menu option changes to logout.

## License

This application is covered under the MIT license.  [MIT license link](https://choosealicense.com/licenses/mit/)

## Contributing

Please visit [Contributor Covenant website](https://contributor-covenant.org) for guidance or reach out directly using the contact informtion below.

## Testing

Apollo explorer sandbox [Apollo GraphQL](https://studio.apollographql.com/sandbox/explorer) was used to test the back-end, while the continuous rendering of React as changes are made to the code does enables the developer to measure the impact of each change in the code.

## Credits

Assistance was provided in my weekly tutoring session, askBCS, Module-21 lession files and lots of Googling including the usual visits to the Stack Overflow website [https://stackoverflow.com](https://stackoverflow.com), GitHub [https://Github.com](https://Github.com), React.JS examples and several other Google searches.

## Questions?

If you have any questions, please see my contact details below:

## GitHub Username

My GitHub Username is [github.com/lnd4812](https://github.com/lnd4812)

## GitHub Repository

My GitHub repository link for this project is [github.com/lnd4812/mod-21-mern-book-search-engine](https://github.com/lnd4812/mod-21-mern-book-search-engine)

## Heroku Deployment URL

Heroku deployment URL for application is [https://pacific-harbor-26664.herokuapp.com/](https://pacific-harbor-26664.herokuapp.com/).

## Contact information

To contact me directly, please feel free to drop me an e-mail at: <a hef="mailto:laureldavid64@gmail.com">laureldavid64@gmail.com</a>
