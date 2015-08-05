![GA Logo](https://raw.github.com/generalassembly/ga-ruby-on-rails-for-devs/master/images/ga.png)

## WDI Instructor Code Challenge

[![Code Climate](https://codeclimate.com/github/rachelslurs/instructor-code-challenge/badges/gpa.svg)](https://codeclimate.com/github/rachelslurs/instructor-code-challenge)

### GOAL 

> Create a single page application that will utilize an external API to request movie data. The client side application will be served by a back-end which will have the ability to persist data.

[View deployed app on Heroku](https://gachallenge.herokuapp.com)

#### If I had more time to work on this...

- Make favorites match the rest of the interface (this is an easy one)
- Currently results are only persistent in terms of stored JSON
- Figure out how to cross reference search results and already favorited movies (perhaps use LocalStorage?)
- Use an MVC to have data binding support
- Be able to remove favorites

#### Back-end

- This was my first time using Ruby after just doing an hour of CodeAcademy acclimation.
- Had some issues deploying to heroku, realized require 'json' was a requirement on heroku, but not locally