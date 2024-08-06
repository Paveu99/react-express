# Investment Appliation

This application leverages modern technologies to provide a robust and user-friendly experience for tracking and managing your investment portfolio.

# NOTE!

Application on purpose has couple of vulnerabilities:
- when initializing a database in sqllite, we are storing the database file in tree with other files,
- existance of endpoint on back-end, which allows downloading all of the users and theirs credentials (hashed),
- credentials being stored in session storage (user id, name),
- existance of endpoint on back-end, which allows downloading all of users' investments - all of them from the database,
- a possibility to spent more than balance allows us to,
- a possibility to add investments with either negative price or quantity - lack of validation on the front-end side,
- a possibility to update user balance with negative numbers.


# Running the application

To run the application, follow these steps:

#### Application:

1. Clone the repository:
    ```bash
    git clone = https://github.com/Paveu99/investment-portfolio-back
    cd investment-portfolio-back
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Initializing database in sqllite3:
    ```bash
    npm run db
    ```
**Main route: http://localhost:3000**


4. Start the application in development mode:
    ```bash
    npm run start:dev
    ```
**Main route: http://localhost:3001**

5. If you want to build the production version:
    ```bash
    npm run build
    ```

# API references:

First of all create a database:
- an empty database.db file must be present in the project,
- init_db.ts file is responsible for creating a database in this file:
```javascript
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import { genSalt, hash } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

sqlite3.verbose();

const dbPromise = open({
    filename: './database.db',
    driver: sqlite3.Database
});

async function init() {
    const db = await dbPromise;

    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            balance REAL NOT NULL
        );
        
        CREATE TABLE IF NOT EXISTS investments (
            id TEXT PRIMARY KEY,
            user_id TEXT,
            name TEXT NOT NULL,
            quantity REAL NOT NULL,
            price REAL NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users (id)
        );
    `);

    const saltRounds = 10;

    const users = [
        { username: 'user1', password: 'password1', balance: 1000.00 },
        { username: 'user2', password: 'password2', balance: 2000.00 }
    ];

    for (const user of users) {
        const salt = await genSalt(saltRounds);
        const hashedPassword = await hash(user.password, salt);
        const userId = uuidv4();
        await db.run(
            `INSERT INTO users (id, username, password, balance) VALUES (?, ?, ?, ?)`,
            [userId, user.username, hashedPassword, user.balance]
        );
    }

    console.log('Database initialized and users added.');
}

init().catch((err) => {
    console.error('Failed to initialize the database:', err.message);
});

```
- to run this file and create a database run command below:

```bash
  npm run db
```
**Main route: http://localhost:3000**

- Get all the users:

```http
  GET /user
```

- Get user:

```http
  GET /user/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of user to fetch |

-  Log in:

```http
  POST /user/login
```
**Body**:
| Parameter  | Type     | Description                     |
| :--------- | :------- | :------------------------------ |
| `username` | `string` | **Required**. Username of user  |
| `password` | `string` | **Required**. Password          |

- Add/register user:

```http
  POST /user/register
```
**Body**:
| Parameter  | Type     | Description                             |
| :--------- | :------- | :-------------------------------------- |
| `username` | `string` | **Required**. Username of user          |
| `password` | `string` | **Required**. Password                  |
| `balance`  | `number` | **Required**. Starting balance of user  |

- Get all investments:

```http
  GET /investments
```

- Get a user investments:

```http
  GET /investments/${user_id}
```

| Parameter      | Type     | Description                                         |
| :------------- | :------- | :-------------------------------------------------- |
| `user_id`      | `string` | **Required**. Id of user to fetch their investments |

- Add a investment:

```http
  POST /investments/add
```
**Body**:
| Parameter  | Type     | Description                                          |
| :--------- | :------- | :--------------------------------------------------- |
| `user_id`  | `string` | **Required**. User id to add investment to that user |
| `quantity` | `number` | **Required**. Quantity of shares bought              |
| `price`    | `number` | **Required**. Price per one share bought             |

- Update user balance:

```http
  PUT /investments/update-balance
```
**Body**:
| Parameter | Type     | Description                                            |
| :-------- | :------- | :----------------------------------------------------- |
| `user_id` | `string` | **Required**. User id to change that user balance      |
| `amount`  | `number` | **Required**. Change in user balance (how much to add) |

- Delete investment:

```http
  DELETE /investments/${id}
```
**Body**:
| Parameter | Type     | Description                                              |
| :-------- | :------- | :------------------------------------------------------- |
| `id`      | `string` | **Required**. Id of investment which needs to be deleted |

# Tech stack
Application was created using:
**Dev dependencies**:
- @types/bcrypt: ^5.0.2,
- @types/cors: ^2.8.17,
- @types/express: ^4.17.21,
- @types/node: ^22.0.0,
- @types/sqlite3: ^3.1.11,
- @types/uuid: ^10.0.0,
- ts-node: ^10.9.2,
- ts-node-dev: ^2.0.0,
- typescript: ^5.5.4.

**Dependencies**:
- bcrypt: ^5.1.1,
- body-parser: ^1.20.2,
- cors: ^2.8.5,
- express: ^4.19.2,
- express-async-errors: ^3.1.1,
- sqlite: ^5.1.1,
- sqlite3: ^5.1.7,
- uuid: ^10.0.0.