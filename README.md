# Lotus Documentation - WWW

This repository deploys a website here: https://docs.lotu.sh

### Local development

Make sure NodeJS version 10+ is installed on your machine. Then run.

```sh
npm install
npm run dev
```

### Get the latest documentation data

```sh
npm run build-all
```

### Deploy

```sh
npm run build-all
git commit -m "your commit message"
git push origin master
```

Then the site will automatically deploy and update.

