# AppHub

A very simple configurable application hub built using _React_. It allows you to bring different web applications together in one place, displaying their content in an iframe.

## Rationale

I host a bunch of services on my own server, mostly monitoring and administration ones. I wanted to have a single place to manage them all, instead of opening a ton of tabs in my browser every time I wanted to check a service.

## Configure the software

The file `settings.json` file in the `public/data` folder contains all the configuration for the application.

The available settings are:

- `name`: The name of the AppHub instance displayed in the title of the page. Defaults to `AppHub`.
- `extra`: Extra configuration settings.
  - `faviconURL`: The favicon of the app, in case you want to use a different one. Leave it empty to use the default one.
  - `backgroundColor`: The background color of some parts of the UI.
    - `sidebar`: The color of the sidebar.
    - `canvas`: The color of the canvas.
  - `showAbout`: Whether to show the _about_ button, which displays the version of AppHub. Defaults to `true`.
  - `aboutIconColor`: The color of the previous button.
  - `showReset`: Whether to show the _reset_ button, which reloads the UI when pressed. Defaults to `true`.
  - `resetIconColor`: The color of the previous button.
- `apps`: An array of objects, each one containing the following properties:
  - `url`: The URL of the app.
  - `name`: The name of the app.
  - `icon`: The icon of the app to be shown. See [Font Awesome](https://fontawesome.com/icons?d=gallery) (only free + brand ones are available).
  - `iconColor`: Optional. The color of the icon.

Example:

```json
{
    "name": "AppHub",
    "extra": {
        "faviconURL": "",
        "backgroundColor": {
            "sidebar": "#dddddd",
            "canvas": "#dddddd"
        },
        "showAbout": true,
        "aboutIconColor": "",
        "showReset": true,
        "resetIconColor": ""
    },
    "apps": [
        {
            "url": "https://github.com",
            "name": "GitHub",
            "icon": "fa-brands fa-github"
        },
        {
            "url": "https://google.com/webhp?igu=1",
            "name": "Google",
            "icon": "fa-brands fa-google",
            "iconColor": "#4285F4"
        }
    ]
}
```

## How to run the app locally

**`npm run start`**

Runs the app in the development mode on `http://localhost:3000`.

## How to build the app

**`npm run build`**

Builds the app for production to the `build` folder. You can deploy it with NGinx or something like that.

## Run and deploy the app using Docker

The `docker-compose.override.yml` file is for overriding the default settings (building the image locally) and the `docker-compose.yml` file is for the "default" settings, fetching the image from the container registry (_ghcr.io_).

**`docker-compose build`**: This will build the image locally, in case you're fetching the image from the container registry it will do nothing.
**`docker-compose up`**: This will start the container and run the app.

In case you want to modify the settings and data of the app running in the container you can uncomment the following lines in the `docker-compose` file:

```yaml
# volumes:
#   - ./apphub-data:/usr/share/nginx/html/data
```

This will mount the `apphub-data` folder to the `/usr/share/nginx/html/data` folder. Then, you can modify the settings file in that folder to fit your needs. See a configuration example in the `apphub-data` folder.

## Extra info

Some pages do not allow you to access them directly via an iframe. In some cases, like self hosted apps, that issue can be fixed. In other cases this browser extension can be helpful:

- [Chrome - Ignore X-Frame-Options](https://chrome.google.com/webstore/detail/ignore-x-frame-headers/gleekbfjekiniecknbkamfmkohkpodhe)
- [Firefox - Ignore X-Frame-Options](https://addons.mozilla.org/es/firefox/addon/ignore-x-frame-options-header/)

## Some screenshots

Initial page:

![Initial page](doc/imgs/select-app.png)

GitHub example:

![GitHub example](doc/imgs/github.png)

Portainer example:

![Portainer example](doc/imgs/portainer.png)

No apps configured:

![No apps configured](doc/imgs/no-apps.png)
