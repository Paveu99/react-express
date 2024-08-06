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

#### Application - front-end side:

1. Clone the repository:
    ```bash
    git clone = https://github.com/Paveu99/investment-portfolio-front
    cd investment-portfolio-front
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the application in development mode:
    ```bash
    npm run dev
    ```
**Main route: http://localhost:5173**

4. If you want to build the production version:
    ```bash
    npm run build
    ```

# Tech stack
Application was created using:
**Dev dependencies**:
- @types/react: ^18.3.3,
- @types/react-dom": ^18.3.0,
- @typescript-eslint/eslint-plugin: ^7.15.0,
- @typescript-eslint/parser: ^7.15.0,
- @vitejs/plugin-react-swc: ^3.5.0,
- eslint: ^8.57.0,
- eslint-plugin-react-hooks": ^4.6.2,
- eslint-plugin-react-refresh": ^0.4.7,
- typescript": ^5.2.2,
- vite: ^5.3.4.

**Dependencies**:
- @tanstack/react-query: ^5.51.18,
- react: ^18.3.1,
- react-dom: ^18.3.1,
- react-router-dom: ^6.25.1.