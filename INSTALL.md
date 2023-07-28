<p align="center">
  <div align="center">
    <img src="./images/logos/native-biodata-logo.png" alt="Logo" style="width:300px">
  </div>
</p>

# Native BioData Portal Installation

The following are instructions for installing the Native BioData Portal softare.

## Requirements

The Native BioData Portal has been designed to be relatively easy to install on standard "vanilla" hardware and software platforms. We recommend using a standard "LAMP" stack that integrates support for Apache, SQL, and PHP. To set up your own Native BioData Portal instance, you will need the following items:

### 1. PHP 8.1+

The Native BioData Portal uses Laravel10 which relies upon PHP 8.1 or later.

### 2. Web Server

This application requires Apache or another similar web server.

### 2. SQL Database

The data science map uses SQL for storing user, authentication, and academic information.

# Installing the Code

Move or copy the files located in this repository's "/src" directory to the document root of your web server.

## Setting Storage Permissions

The application may sometimes have a need to write out temporary files, for example, log files or session files. It does this in the "services/storage" directory. Make sure that this directory is writable by your web server. On a unix system, make sure that the files in the web server folder are owned by the web server process (usually "apache") and set the permissions to make the directory writeable by the web server.

```
chown -R apache:apache /var/www/html
chmod -R 755 /var/www/html/services/storage
```

## Setting Up The Database

The Native BioData Portal uses a standard SQL database. You can use any of a number of SQL databases including MySQL, MariaDB, and others. To set up your database, perform the following steps:

### Locate the SQL Database Files

Inside of the /database directory, you should see the following two SQL files:
- initialize.sql
- structure.sql

### Create a New Database

Using a database editor of your choice, create a new database named "biodata".

### Create Database Tables

Next, create the required database tables. To do this, open your new "biodata" database and execute the SQL script: "structure.sql".

### Initialize the Database

To initialize the database, open your "biodata" database and execute the SQL script: "initialize.sql".

## Configuring the Client

The client is the "front end" or "user interface" portion of the software that the user interacts with.  The client needs to be able to talk to the "back end" where data is stored and managed.  In order for this to work, the client may need to be configured.   The client configuration is stored in the file "config/config.json".

```
"servers": {
    "authentication": "/services/public/api",
    "web": "/services/public/api"
  }
```

If you have configured your software so that it is not located in the root of your DocumentRoot folder of your web server, then you may need to set the servers to point to the correct location:

```
"servers": {
    "authentication": "http://localhost/YOURFOLDERNAMEHERE/services/public/api",
    "web": "http://localhost/YOURFOLDERNAMEHERE/services/public/api"
  }
```

## Configuring the Server

To configure the server software, go to the "services" folder where you copied the web server files. Inside of this directory your should see a file called ".env.example". Copy this file to ".env" and open it in your text editor.

### Configure the app

1.  Set environment (optional)
Set the variable "APP_ENV" to either "dev" for development or "prod" for production.

```
APP_ENV=prod
```

2.  Set the app key (optional)
The app key is a unique identifier that is used to distinguish your particular application. To set the application key, go to the Sharedigm server directory and run the command "php artisan key:generate". This will fill in the "APP_KEY" parameter with a suitable random value.
```
APP_KEY=<a random string of characters>
```
Note:  This step is considered good practice, but an app key is already set to setting it to a unique value is optional.

3.  Set debugging Info (optional)
The variable "APP_DEBUG" determines whether or not detailed error messages are displayed.  For production, set this to "false". This will prevent debug messages from being shown in the case of an error.  For development, you can leave this set to "true".

```
APP_DEBUG=true
```

4.  Set user storage location (optional)

You can configure where you want your user storage to be located by setting the variable "APP_USER_STORAGE_PATH". By default, your user files will reside in the directory "storage/app" but you can have the application store user files wherever you want, even on a different disk volume.

```
APP_USER_STORAGE_PATH=/user-data
```

### Configuring the Database

The database is where your user account information and other data is stored.  Follow these steps to make sure that the application can communicate to the database properly.

1.  Set database name (optional)
Set the variable "DB_DATABASE" to the name of your database, which is most likely "biodata".  If you selected a different name for the database, then enter that name here.

2.  Set database username
Set the variable "DB_USERNAME" to your database username.  By default, databases are created with the username 'root'.

```
DB_USERNAME=root
```

3.  Set database password
Set the variable "DB_PASSWORD" to your database password.  By default, database passwords are set to 'root'.

```
DB_PASSWORD=root
```

### Configuring Email

This application uses email to verify users when they register for new accounts and to reset passwords.  It also uses email as a mechanism for sharing files and to allow user feeback.

1.  Set mail host
Set the variable "MAIL_HOST" to the host name of your mail server.

```
MAIL_HOST=mail.mydomain.com
```

2.  Set mail username
Set the variable "MAIL_USERNAME" to the user to use for sending email messages.

```
MAIL_USERNAME=myusername
```

3.  Set mail password
Set the variable "MAIL_PASSWORD" to the password of the user to use for sending email messages.
```
MAIL_PASSWORD=mypassword
```

## Installing Multimedia Support

Once you have the software up and running, you will need to make sure that your web server has the appropriate multimedia support to take advantage of the application's image and video capabilities.

## Install Image Support

The application uses the Image Magick library to perform image manipulation and scaling. This is used to generate image thumbnails and to show image previews when viewing image galleries.  Most recent version of PHP already have ImageMagick pre-installed and configured so you may not need to perform this step.  To check if ImageMagick is already installed, take a look at [phpinfo.php](https://localhost/phpinfo.php) to see if ImageMagick is listed.

1.  Install the ImageMagick library
If ImageMagick is not installed on your system, follow the instructions on [imagemagick.org](https://imagemagick.org) to install ImageMagick on your particular platform.

2.  Install ImageMagick PHP library
You will also need to install support for PHP to access the ImageMagick library. You will need to find directions for your particular platform to do this. On CentOS / Linux, you would execute the following command, where XX is the major/minor version of PHP that you have installed:

```
yum install phpXX-imagick
yum install php-pecl-imagick
```

3.  Configure PHP to use ImageMagick
If your PHP is not configured to use ImageMagick and you have just installed the library using the instructions above, you will then need to configure PHP to know about ImageMagick.   To configure your PHP installation to use ImageMagick, open up your php.ini file and under the list of extensions, add the following line:

```
extension=imagick.so
```

After adding this line, restart your web server.

## Install Video Support

For generating thumbnails for video files and for extracing video file metadata, Sharedigm uses the FFMpeg library.

1. Install the FFMpeg Framework
Follow the instructions on [https://ffmpeg.org](https://ffmpeg.org) for installing the ImageMagick library on your particular platform.

2.  Configure Your Server to Use FFMpeg
Once you have installed the FFMpeg library, you may need to configure your Sharedigm server to know where the FFMpeg executables are on your file system. There are two executables that are used:

  - ffmpeg - this is an executable used to perform video operations.
  - ffprobe - this is an executable used to query video metadata.

To configure the path to these executables, open the .env file in the root directory of your Sharedigm server directory and set the following two values:

```
APP_FFMPEG_BINARY_PATH=/usr/local/bin/ffmpeg
APP_FFPROBE_BINARY_PATH=/usr/local/bin/ffprobe
```

Some hosting providers do not allow users to install the FFMpeg framework because of the potential for high resource consumption. In that case, you will not be able to generate video file thumbnails. To disable video file thumbnails, add the following line to your .env file:

```
APP_VIDEO_THUMBNAILS_ENABLED=false
```















