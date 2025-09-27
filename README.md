**Frontend:**: Angular + Bootstrap
**Backend:** Node.js + Express
**Database:** MongoDB + Mysql

# install Angular CLI 
npm install -g @angular/cli

# create frontend
ng new website --routing --style=scss

cd website

# install UI libs the project uses
npm install @ng-bootstrap/ng-bootstrap @popperjs/core
npm install ngx-toastr @angular/animations
# also typical extras
npm install bootstrap

# start frontend 
### how to run website 
cd website
npm install
ng s -o
# shorthand used by you: ng s -o
# Initialize Git in your project (if not already done)
git init  

# Add your GitHub repo as remote (replace with your repo link)
git remote add origin https://github.com/At-Drive/webSite.git 

# Add all files
git add .  

# Commit changes
git commit -m "Angular + Node CRUD app"  

# Push to GitHub master branch
git pull origin master 
git push -u origin master 

# What we created (summary)

Login and Register forms with validation in Angular
User data stored in MySQL (Sequelize + mysql2). Passwords hashed with bcrypt
Product CRUD stored in MongoDB (Mongoose)
click on the card to create the order
Order CRUD stored in MongoDB (Order and get userId from MySQL)
JWT token issued by backend on login, stored in localStorage on frontend, attached to HTTP header for protected endpoints
Auth guard(s) in Angular to protect routes
UI libs: @ng-bootstrap/ng-bootstrap, @popperjs/core, ngx-toastr for notifications and UI

## Folder structure (frontend)

src
  app
    // features folder contains page-level modules/components
    features
      all-validation
         <!-- // comment: common validation configs for forms used across login/register/product -->
        // e.g. PRODUCT_FORM, LOGIN_FORM
      auth-layout
        <!-- // // comment: module for authentication layout + routing -->
        components
          login
            <!-- // login.component.ts/html/scss -->
          register
            <!-- // register.component.ts/html/scss -->
      confirm-delete
        <!-- // confirm-delete.component.ts/html - reusable modal -->
      product
        <!-- // product.component.ts/html - single product create/edit -->
      product-list
        // product-list.component.ts/html - list of products with create/update/delete
      order-list
        <!-- // order-list.component.ts/html - see user orders and totals -->
    <!-- // service-guard folder contains re-usable guards and form helpers -->
    service-guard
      auth.guard.ts        // // comment: protects authenticated routes
      guest.guard.ts       // // comment: prevents logged-in users from visiting auth pages
      product.guard.ts     // // comment: optional, page-level guard
      form-validation.ts   // // comment: utility to check validators and show messages
    <!-- // services folder contains API services -->
    services
      auth.service.ts      // // comment: login/register, token save/get
      product.service.ts   // // comment: product CRUD calls
      order.service.ts     // // comment: order CRUD calls
    app-routing.module.ts
    app.module.ts
    <!-- app.component.ts/html  // // comment: global spinner -->




## API Used third party api
API: OpenWeatherMap Current Weather API
API Documentation
API Key: 

## How it Works
The user enters a city name in an input field.
On clicking "Get Weather," Angular calls the backend Weather service.
The backend fetches the weather data from OpenWeather API and returns it to the frontend.
The frontend displays:
City name
Temperature (°C)
Humidity (%)
Weather condition description





### server
cd server
npm install
npm run dev






# Website

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.9.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
