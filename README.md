# Mauerwinzer Website

Powered by [Remix](https://remix.run) and [PayloadCMS](https://payloadcms.com).

## Development

```sh
docker compose up -d
```

...or

1. make sure you have a mongodb running on port 27017
1. create a `.env` file in the root of the project and add the following environment variables:
    ```sh
    PAYLOAD_SECRET=secret
    MONGODB_URI=mongodb://localhost:27017/app
    ```
2. run `pnpm dev`

## Production

1. have your MongoDB running somewhere
1. have your S3 bucket for the media uploads ready
1. deploy this repo with railway.app with the variables from `.env.example`