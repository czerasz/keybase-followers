# Keybase Followers Fetcher

## Usage

```
docker run --rm czerasz/keybase-followers czerasz
```

## Development

Run development container:

```
docker run -it --rm \
           --volume=$PWD/:/usr/app/ \
           --workdir=/usr/app \
           --entrypoint=bash \
           --user=1000:1000 \
           node:8.5.0
```

Install modules:

```
yarn install
```

## Test

Run linter and tests:

```
yarn lint
yarn test
```
