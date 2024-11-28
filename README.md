# Winter Webhook Proxy

I've seen lots of discord webhook proxies for Roblox, but none of them implemented
authentication so if someone found your proxy url, they could abuse it. I have
added authentication to this proxy, so that only you can use it.

## How to use

### Deploy

1. Fork this repo to your personal account.
2. Deploy so somewhere like [Vercel](https://vercel.com) ([Read their guide here](https://nextjs.org/learn-pages-router/basics/deploying-nextjs-app/deploy))
3. During deployment, make sure to set the correct environment variables:

```env
API_TOKEN="" # this is what you'll use to authenticate
AUTH_ENABLED="true" # true/false. set to false if you want to disable auth.
```

4. Wait for deployment to finish, and done!

### Usage

Simply replace `discord.com` in the webhook URL with the URL your website is hosted
on. When you're making your request to roblox, include this in the body of your request:

```json
"winterapitoken": "<PUT_YOUR_API_TOKEN_HERE>"
```

There is also a convenient web interface to quickly convert links.

### Self-deployment (Docker)

It is possible to self-deploy this project, but it is not recommended unlesss you
know what you are doing. This guide below is just a quick guide on how to self-deploy
this project. Please read the [docker docs](https://docs.docker.com/get-started/overview/)
if you want to know more.

Clone the repo and cd into the directory:

```
git clone https://github.com/wintertechnologies/proxy.git
cd proxy
```

Build the NextJS app:

```bash
pnpm run build
```

Build the docker image (this will take a while):

```bash
docker build -t winter-webhook-proxy .
```

Run the docker image:

```bash
docker run -p 3000:3000 -e API_TOKEN=<YOUR_API_TOKEN> -e AUTH_ENABLED=true winter-webhook-proxy
```

Remove -e AUTH_ENABLED=true if you want to disable authentication.

Instead of running the docker image using the command, you can also use docker compose:

```yaml
services:
  proxy:
    image: winter-webhook-proxy
    ports:
      - 3000:3000 # expose port 3000 on the host machine, change the first number to whatever port you want to use (before the colon)
    environment:
      - API_TOKEN=<YOUR_API_TOKEN>
      - AUTH_ENABLED=true
```

### Updating

If you are using vercel, make sure your fork of the repo is updated by going to
your repo on github and clicking the "Sync Fork" button.

If you are using docker, you can update the image by running the following commands:

```bash
# inside of the repo on your server
git pull
docker build -t winter-webhook-proxy .
```

Then restart any of the containers that are running the image.
