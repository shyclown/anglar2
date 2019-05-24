**Setting up the project**

- install node.js
- install wampserver
- install composer
- setup host
- setup client proxy in htaccess

**Install Laravel**
```
php composer global require "laravel/installer"
php composer install
```

**Install Anguar2+**
download Angular CLI via npm 
```angular2html
npm i -g @angular/cli
```

***Install package.js in fe-frontend***
```
npm install 
``` 

**Virtual Host**
```
<VirtualHost *:80>
	ServerName landfield.localhost
	DocumentRoot "c:/wamp64/www/landfield/be-land/public/"
```
  ***Api***
```
    <Directory  "c:/wamp64/www/landfield/">
        Options +Indexes +Includes +FollowSymLinks +MultiViews
        AllowOverride All
        Require local
    </Directory>
```
	

  
  ***Proxy***
  Requires to have proxy modules enabled:
  
  ```
  ProxyPassMatch ^/(client/.*)$ http://localhost:4200/$1
  ```
Close virtual host
```
</VirtualHost>
```
