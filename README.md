# AppHub

A very simple configurable application hub built using _React_. It allows you to bring different web applications together in one place, displaying their content in an iframe.

## Rationale

I host a bunch of services on my own server, mostly monitoring and administration ones. I wanted to have a single place to manage them all, instead of opening a ton of tabs in my browser every time I wanted to check a service.

## Configure the apps available

Modify the `data.json` file in the `public/data` folder. Each app has the following structure:

```json
{
    "url": "https://github.com",
    "name": "GitHub",
    "icon": "fa-brands fa-github"
}
```

- `url`: The URL of the app.
- `name`: The name of the app.
- `icon`: The icon of the app to be shown. See [Font Awesome](https://fontawesome.com/icons?d=gallery) (only free + brand ones are available).

> The `data.json` **must** contain an array of apps.

## Configure the settings of the software

Modify the `settings.json` file in the `public/data` folder. Settings available:

- `name`: The name of the app displayed in the title of the page. Defaults to `AppHub`.
- `faviconURL`: The favicon of the app, in case you want to use a different one. Leave it empty to use the default one.
- `version`: The version of the app.

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

This will mount the `apphub-data` folder to the `/usr/share/nginx/html/data` folder. Then, you can modify the files in that folder to fit your needs. See a configuration example in the `apphub-data` folder.

## Extra info

Some pages do not allow you to access them directly via an iframe. In some cases, like self hosted apps, that issue can be fixed. In other cases this browser extension can be helpful:

- [Chrome - Ignore X-Frame-Options](https://chrome.google.com/webstore/detail/ignore-x-frame-headers/gleekbfjekiniecknbkamfmkohkpodhe)
- [Firefox - Ignore X-Frame-Options](https://addons.mozilla.org/es/firefox/addon/ignore-x-frame-options-header/)
