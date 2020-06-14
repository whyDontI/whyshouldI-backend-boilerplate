# Express API Boilerplate

## The folder structure looks like this

```jsx
├── config
│   ├── local.json
│   ├── prod.json
│   └── test.json
├── dataAdapter
│   └── mongo
│       ├── connection.js
│       ├── models
│       │   └── user.model.js
│       └── query
│           └── user.query.js
├── init
│   ├── cluster.js
│   └── modelInit.js
├── lib
│   └── logger
│       └── bunyan.js
├── logs
│   └── reqRes.log
├── middlewares
│   ├── auth
│   │   ├── auth.js
│   │   ├── decryptor.js
│   │   └── encryptor.js
│   └── validators
│       ├── id.validator.js
│       └── user.validator.js
├── package.json
├── package-lock.json
├── README.md
├── routes
│   ├── index.js
│   └── user.routes.js
├── server.js
├── services
│   └── user.service.js
└── util
    ├── genericFunctions.util.js
        └── response.util.js
        `````````
