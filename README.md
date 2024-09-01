## Backend

### how to run backend(Local)?

1. Replace .env with your db configuration
```bash
    SERVER_PORT=8080
    MONGO_URL=<your-mongo-url>
    JWT_SECRET_KEY=jsdbfk3eQ1
```
2. npm i && npm start



### how to run  backend(Docker)?

```bash
    docker compose up --build
```

----
### Access apis: 
- `POST localhost:8080/users/register` firstName,lastName,email,password required

- `POST localhost:8080/users/login` email,password required

- `GET localhost:8080/users/me` x-auth-token required


## Frontend

```bash

    cd frontend
    npm i && npm start
```