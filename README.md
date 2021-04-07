# rr-todo
[![Heroku](https://heroku-badge.herokuapp.com/?app=reactive-rails-todo)](https://reactive-rails-todo.herokuapp.com/)
## A React-On-Rails TODO fullstack application

## Dependencies
### 1. Backend - click [here](https://github.com/Shannarra/rr-todo/blob/master/Gemfile) for details
1. Ruby - 2.6.6 or higher  
2. Rails - 6.1.3.1 or higher
3. Additional gem dependencies  
3.1 Faker  
3.2 Devise  
   
### 2. Front-end - click [here](https://github.com/Shannarra/rr-todo/blob/master/package.json) for details
1. Node v.10+, React + prop-types
2. axios
3. lodash
4. bootstrap + jquery

### 3. Database
1. Postgresql 13


## Running the app

After installing all gems successfully using `bundle install` and running the database setup (below)
we can run the app by typing `rails s` and navigating to [localhost](http://localhost:3000/)

```rails
rake db:setup
rake db:migrate
rake db:seed /*(optional)*/
```