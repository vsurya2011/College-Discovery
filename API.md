# REST API

## Public
- `GET /api/health`
- `GET /api/colleges?q=&city=&minRating=&minFees=&maxFees=&page=&limit=`
- `GET /api/colleges/:slug`
- `GET /api/colleges/compare?ids=id1,id2,id3`
- `GET /api/predictor?exam=JEE%20Main&rank=5000`
- `GET /api/discussions`
- `GET /api/discussions?id=<discussionId>`

## Authentication
- `POST /api/auth/signup` `{ name, email, password }`
- `POST /api/auth/login` `{ email, password }`
- `POST /api/auth/logout`
- `GET /api/auth/me`

## Authenticated
- `GET/POST/DELETE /api/saved-colleges`
- `GET/POST /api/saved-comparisons`
- `POST /api/colleges/:slug/reviews` `{ title, body, rating }`
- `POST /api/discussions` `{ title, body, tags[] }`
- `POST /api/discussions/:id/answers` `{ body }`
