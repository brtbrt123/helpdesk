# Setup (run on your own computer with PHP 8.2+, Composer, Node)

    composer create-project laravel/laravel helpdesk && cd helpdesk
    composer require laravel/breeze --dev
    php artisan breeze:install react      # pick: no dark mode, PHPUnit, then done

Copy everything in this folder (app, database, resources, routes) over the project (overwrite when asked).
Then apply HandleInertiaRequests.snippet.txt (3 small edits). Then:

    # .env -> set DB_CONNECTION=mysql + your local MySQL (or sqlite for local testing)
    php artisan migrate --seed
    npm install && npm run build   # or: npm run dev + php artisan serve

Demo login: demo@example.com / password123

## Deploy on Railway
1. Push to a GitHub repo (.env is already in .gitignore; commit .env.example).
2. Railway -> New Project -> Deploy from GitHub repo. Add a MySQL service.
3. Variables on the app: APP_KEY (php artisan key:generate --show), APP_ENV=production, APP_DEBUG=false,
   APP_URL=<railway https url>, DB_CONNECTION=mysql, DB_HOST=${{MySQL.MYSQLHOST}}, DB_PORT=${{MySQL.MYSQLPORT}},
   DB_DATABASE=${{MySQL.MYSQLDATABASE}}, DB_USERNAME=${{MySQL.MYSQLUSER}}, DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}
4. Start command: php artisan migrate --force --seed && php artisan serve --host=0.0.0.0 --port=$PORT
   (build runs composer install + npm ci && npm run build automatically via Nixpacks)
