#!/bin/bash

# Update the list of installable packages
apt-get update

# Install Apache2 web server and ensure it starts automatically
apt-get install -y apache2
systemctl enable apache2

# Allow PHP pages to be used alongside regular HTML pages
apt-get install -y php libapache2-mod-php

# Install MariaDB as a MySQL alternative
apt-get install -y mariadb-server
systemctl enable mariadb
systemctl start mariadb

# Install unzip since it's not included by default
apt-get install -y unzip

# Copy your own website files to the appropriate directory
cp -r /Users/elias/Documents/ap/webprogrammeren_A/Project/basis-shop/* /var/www/html

# Install the PHP extension to connect to MariaDB/MySQL
apt-get install -y php-mysqli

# Restart Apache2 after installing the extension
systemctl restart apache2
