# Sorting Web App

This web app is meant to simulate two type of sorting algorithm, that is [bubble sort](https://www.geeksforgeeks.org/bubble-sort/) and [merge sort](https://www.geeksforgeeks.org/merge-sort/). This project was already deployed [here](https://sort-web.herokuapp.com).

## App Requirement

---------
This is every applications that mainly used to use and develop this project

1. [Node.js](https://nodejs.org/en/), I personally used v10.16.0
2. Browser, such as (and recommended too) latest edition of Chrome or Firefox.
3. IDE or text editor to develop the application, such as [Visual Studio Code](https://code.visualstudio.com/) and [Atom](https://atom.io/).

## Library & Buildpack Used

---------
This is library and buildpack that I used for making and deploying (in [Heroku](https://heroku.com)) this project

1. [React.js](https://reactjs.org/), as Frontend Framework
2. [heroku-cra-node](https://github.com/mars/heroku-cra-node), as buildpack/helper to deploy to Heroku

## How to Run

---------

1. Open your terminal
2. Navigate to **view** folder
3. If you haven't installed the module yet (this step only for first execution/one-time setup), execute this script

        npm build

4. Execute this script

        npm start

5. Open the link in [localhost](127.0.0.1:3000) with the specified port (the default port is 3000)

## How to Use

---------

1. Type the number that you want to sort, but you must remember this
   1. The number must in range 1 and 999, inclusive.
   2. The numbers you input at most 10 numbers, and of course it is must be greater than zero.

   with each number separated by **;** .
2. Choose the sorting method, bubble or merge.
3. Input the animation delay (in milisecond(s)), and also remember that the number must be greater that zero.
4. Click **Simulate!** button.
5. Watch the animation and explanation below the option form.
6. If you wath to change or rewatch the animation (you could interrupt the sorting process, too), repeat the step from 1 until 4.
