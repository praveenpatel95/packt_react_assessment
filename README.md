# Packt React Assessment
 This assessment using bootstrap library for the book publisher website.

## Requirement
- Minimum Npm version : 9.4.0
- Minimum Node version : 19.5.0

## Installation

Clone the repository:

```
git clone https://github.com/praveenpatel95/packt_react_assessment.git

```

Then cd into the folder with this command:
```
cd packt_react_assessment
```

Install node modules with below command:
```
npm install
```

## Usage
In the project open .env file and update the `REACT_APP_API_BASE_URL`
<br> With your frontend API url.

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Code Explanation
`stores` : I am using Redux Saga to call the APIs and get the data.
Redux saga is managed in the `stores` folder, where you can see all the constants, actions, reducer, and Saga actions.

`utils`: In the `utils` folder one js file for managing all API  and handling the response. That is called by Saga.

`styles`: I modify and write some custom CSS in the `styles` folder.

`routes`: All routes is managed in `routes` folder.

`components`: All reusable and required components is managed in `components` folder.

`containers`: In this folder all the website pages.


