### First run and configuration
- create copy of `.env.example` with the name `.env` and set all the MYSQL fields
- on the command line execute the following commands:
``` 
composer install
php artisan key:generate
php artisan migrate
php artisan passport:install
```
- copy the client secret of the Password Password grant client and paste it as the value for the variable `REACT_APP_API_SECRET` in the `.env` file of the react application
- go on by executing the following commands in the api‘s project folder:
```
php artisan db:seed --class RootUsersSeeder
php artisan db:seed --class InitialDataSeeder
```
- The first command will generate test users for every existing role (admin, krempler, kressist, customer) for the application with the mail address `{roleName}@test.com` (for example for krempler: krempler@test.com) and the password `dummy`; the second command adds some test data
- with `php artisan serve --port=[PORT]` you can start the api
- replace `[PORT]` in `http://localhost:[PORT]/api` with the port the api is running on and set the result as the value for REACT_APP_API_URL in the react application