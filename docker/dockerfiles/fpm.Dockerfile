#https://oralytics.com/2021/10/01/oracle-21c-xe-database-and-docker-setup/
#https://pastebin.com/RTPWt1XK

# PHP Vendor
# FROM composer:2.7 as composer
# WORKDIR /tmp/composer-vendors/
# COPY ./src ./
# RUN cp .env.example .env
# RUN ["composer", "install", "--no-interaction", "--no-progress", "--optimize-autoloader"]
# RUN rm .env

# Node modules
# FROM node:18.13.0-alpine AS node_build

# WORKDIR /app

# COPY ./src ./
# COPY --from=composer /tmp/composer-vendors/vendor ./vendor

# RUN rm -rf package-lock.json && npm install
# RUN npm run build

FROM php:8.2.4-fpm-bullseye

# Arguments defined in docker-compose.yml
ARG user=cellarvinhos
ARG uid=1000

#Envs 
ENV APP_HOME /app


# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libonig-dev \
    libpng-dev \
    libxml2-dev \
    libzip-dev \
    libssl-dev \
    zip \
    sudo \
    wget \
    libaio1 \
    libaio-dev \
    net-tools \
    libpq-dev \
    poppler-utils \
    nodejs 


# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install gd mbstring bcmath zip sockets pdo_mysql

#RUN pecl install xdebug  && docker-php-ext-enable xdebug

# Configure Redis
RUN pecl install igbinary

RUN pecl bundle redis && cd redis && phpize && \ 
    ./configure \
    --enable-redis-igbinary \
    && make \
    && make install

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer && chmod +x /usr/local/bin/composer 

# Create system user to run Composer and Artisan Commands
RUN useradd -G www-data,root -u $uid -d /home/$user $user && echo "$user:$user" | chpasswd && usermod -aG sudo $user
RUN mkdir -p /home/$user/.composer && \
    chown -R $user:$user /home/$user
    #  && \
    # chown -R $user:$user $APP_HOME

WORKDIR /usr/local/etc/php/

ADD docker/configs/php/php.ini /usr/local/etc/php/

# Add application
WORKDIR $APP_HOME

# COPY --from=node_build /app ./


# RUN chown -R $user:$user $APP_HOME
# RUN ["chown", "-R", "www-data:www-data", "/app/storage"]
# RUN ["chmod", "-R", "775", "/app/storage"]

USER $user

# # Configure a healthcheck to validate that everything is up&running
# HEALTHCHECK --timeout=10s CMD curl --silent --fail http://127.0.0.1:9000
