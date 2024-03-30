# Mauerwinzer Website

Powered by [Remix](https://remix.run) and [PayloadCMS](https://payloadcms.com).

## Development

1. make sure you have a mongodb running on port 27017
1. create a `.env` file in the root of the project and add the following environment variables:
   ```sh
   PAYLOAD_SECRET=secret
   MONGODB_URI=mongodb://localhost:27017/app
   ```
1. run `pnpm dev`

## Production

1. have your MongoDB running somewhere
1. have your S3 bucket for the media uploads ready

### Fly.io Setup

1. Create an account on [Fly.io](https://fly.io)
1. Install the [Fly CLI](https://fly.io/docs/getting-started/installing-flyctl/)
1. Run `flyctl login` and follow the prompts
1. Run `flyctl launch` in the project root
1. Enter `y` to `copy its configuration to the new app`
1. Enter `N` to `tweak these settings`
1. The app should deploy now
1. Now you can set up the Github Action

### Github Action

1. Create a deploy token by running `flyctl tokens create deploy`
1. Create a new secret on your repository called `FLY_API_TOKEN` with your deploy token at `Settings > Secrets and Variables > Actions`

## Media Files

Media files should be stored in a S3 bucket. Create a bucket at Cloudflare, AWS, or any other provider and fill the required environment variables in the .env file. When using Cloudflare R2, specify `S3_REGION=auto`
