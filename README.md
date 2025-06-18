# Thamanya API

Thamanya is a powerful API designed to provide access to a wide range of media content, including TV shows, movies, and
more. Built with NestJS, it offers a robust and scalable solution for media management and retrieval.

> built with
> Web Framework [NestJS](https://docs.nestjs.com)
> Database [PostgreSQL](https://www.postgresql.org)
> ORM [TypeORM](https://typeorm.io),
> Redis [Redis](https://redis.io)
> and TypeScript [TypeScript](https://www.typescriptlang.org).
> Swagger [OpenAPI](https://swagger.io/specification/)

- [Thamanya API](#thamanya-api)
    - [Included](#included)
    - [Features](#features)
    - [Installation & Setup](#installation--setup)
    - [Code Tour](#code-tour)
    - [Endpoints](#endpoints)
    - [References](#references)

## Included

- **Media Management**: Manage TV programs, episodes and categories.
- **Search Functionality**: Full-text search capabilities for media content.
- **Rate Limiting**: Protect against abuse with rate limiting.
- **Logging**: Comprehensive logging for debugging and monitoring.
- **Caching**: In-memory caching for improved performance.
- **Environment Configuration**: Easy setup with environment variables.
- **Task Scheduling**: Scheduled tasks for periodic operations.
- **structured**: Organized codebase with clear separation of concerns.

## Features

- **Media Management**: Create, update, and delete TV programs, episodes and categories.
- **Search**: Full-text search for programs and episodes.
- **Discover**: Browse media content by categories and programs.

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/amerblackbird/thamanya.git
   cd thamanya
   ```

2. **Install dependencies**

```bash
   pnpm install
```

3. **Initialize environment variables**
    - For development:
      ```bash
      pnpm run init:env
      ```
    - For production:
      ```bash
      NODE_ENV=production pnpm run init:env
      ```
      
    >   This copies `.env.example` to `.development.env` (development) or `.env` (production).


4. **Edit your environment file**  
   Update the values in `.development.env` or `.env` as needed.


5. **Prepare database**  
   Ensure your database is set up. Before running migrations, add the `uuid-ossp` extension to your PostgreSQL database:

    ```sql
       CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    ```

    Generate the migration file:
    
    ```bash
      pnpm run typeorm migration:generate ./database/migrations/migration
    ```
    
    Then run the migrations:
    
    ```bash
       pnpm run migration:run
    ```

    Executing the above command will create the necessary tables in your database.
    
    ```sql
       create index IF NOT EXISTS episodes_search_idx ON tbl_episodes USING GIN (search_vector);
       create index IF NOT EXISTS programs_search_idx ON tbl_programs USING GIN (search_vector);
    ```

6. **Run the application**
    - Development:
      ```bash
      pnpm run start
      ```
    - Watch mode:
      ```bash
      pnpm run start:dev
      ```
    - Production:
      ```bash
      pnpm run start:prod
      ```

## Code Tour

### The codebase is organized into several directories, each serving a specific purpose:

- **`database`**: Database-related files, including migrations and entities.
- **`src`**: Contains the main application code.
    - **`modules`**: Contains following modules:
        - **`cms`**: Manages TV programs, categories, episodes including CRUD operations and search functionality.
            - **`programs`**: Handles TV programs, including CRUD operations and search functionality.
            - **`categories`**: Manages categories for TV programs, including CRUD operations.
            - **`episodes`**: Manages TV episodes, including CRUD operations and search functionality.
        - **`discover`**: Provides endpoints for discovering media content.
            - **`browser`**: Handles browsing of media content.
            - **`search`**: Implements search functionality for media content.
    - **`common`**: Contains common functionality:
        - **`config`**: Configuration files for the application.
        - **`constants`**: Constants used throughout the application.
        - **`decorators`**: Custom decorators used throughout the application.
        - **`dtos`**: Data Transfer Objects (DTOs) for validating and transforming data.
        - **`entities`**: Database entities representing the structure of the data.
        - **`errors`**: Custom error classes for handling exceptions.
        - **`filters`**: Exception filters for handling errors.
        - **`interfaces`**: Interfaces defining the structure of data used in the application.
        - **`pipes`**: Pipes for transforming and validating data.
        - **`middlewares`**: Middlewares for processing requests.
        - **`resouces`**: Contains base resources for the application such as base service.
        - **`transforms`**: Transformers for converting data between different formats.
        - **`types`**: Type definitions for various entities and data structures.
        - **`utils`**: Utility functions used throughout the application.
    - **`app.module.ts`**: The main application module that imports and configures all other modules.
    - **`main.ts`**: The entry point of the application.

### Environment Variables

| Name                      | Description                                   |
|---------------------------|-----------------------------------------------|
| NODE_ENV                  | The environment in which the app is running.  |
| PORT                      | The port to run the API on. Defaults to 3000. |
| BASE_URL                  | The base URL of the application.              |
| API_PREFIX                | The prefix for all API routes.                |
| APP_NAME                  | The name of the application.                  |
| DATABASE_URL              | The URL or host of the Postgres database.     |
| DATABASE_TYPE             | The type of database (e.g., postgres).        |
| DATABASE_HOST             | The database host.                            |
| DATABASE_NAME             | The name of the database.                     |
| DATABASE_USER             | The database user.                            |
| DATABASE_PASSWORD         | The database password.                        |
| DATABASE_PORT             | The database port.                            |
| DATABASE_CA               | Database CA certificate (if applicable).      |
| DATABASE_KEY              | Database key (if applicable).                 |
| DATABASE_CERT             | Database certificate (if applicable).         |
| RUN_MIGRATIONS            | Whether to run migrations on startup.         |
| TYPEORM_SEEDING_FACTORIES | Path to TypeORM seeding factories.            |
| TYPEORM_SEEDING_SEEDS     | Path to TypeORM seeding seeds.                |
| REDIS_HOST                | Redis host.                                   |
| REDIS_PORT                | Redis port.                                   |
| REDIS_TTL                 | Redis time-to-live (in seconds).              |
| REDIS_URL                 | Redis connection URL.                         |
| REDIS_PASSWORD            | Redis password.                               |
| REDIS_USERNAME            | Redis username.                               |
| LOG_LEVEL                 | The level of logging (e.g., info, debug).     |

## API Endpoints

### CMS Endpoints

The CMS module provides endpoints for managing TV programs, categories, and episodes. Below is a summary of the
available endpoints:

| Path                               | Description              |
|------------------------------------|--------------------------|
| POST /api/v1/cms/categories        | Create a new category.   |
| GET /api/v1/cms/categories         | Get all categories.      |
| GET /api/v1/cms/categories/{id}    | Get a category by ID.    |
| PATCH /api/v1/cms/categories/{id}  | Update a category by ID. |
| DELETE /api/v1/cms/categories/{id} | Delete a category by ID. |
| POST /api/v1/cms/programs          | Create a new program.    |
| GET /api/v1/cms/programs           | Get all programs.        |
| GET /api/v1/cms/programs/{id}      | Get a program by ID.     |
| PATCH /api/v1/cms/programs/{id}    | Update a program by ID.  |
| DELETE /api/v1/cms/programs/{id}   | Delete a program by ID.  |
| POST /api/v1/cms/episodes          | Create a new episode.    |
| GET /api/v1/cms/episodes           | Get all episodes.        |
| GET /api/v1/cms/episodes/{id}      | Get an episode by ID.    |
| PATCH /api/v1/cms/episodes/{id}    | Update an episode by ID. |
| DELETE /api/v1/cms/episodes/{id}   | Delete an episode by ID. |

### Discover Endpoints

The Discover module provides endpoints for browsing and searching media content. Below is a summary of the available
endpoints:

| Path                                                    | Description                       |
|---------------------------------------------------------|-----------------------------------|
| GET /api/v1/discover/search                             | Search media content.             |
| GET /api/v1/discover/programs                           | Discover all programs.            |
| GET /api/v1/discover/programs/{id}                      | Discover specific program         |
| GET /api/v1/discover/programs/{id}/episodes             | Discover program episodes         |
| GET /api/v1/discover/programs/{id}/episodes/{episodeId} | Discover specific program episode |
| GET /api/v1/discover/episodes                           | Discover all episodes.            |
| GET /api/v1/discover/episodes/{id}                      | Discover specific episode         |

## References

- [NestJS Documentation](https://docs.nestjs.com)
- [TypeORM Documentation](https://typeorm.io)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Redis Documentation](https://redis.io/documentation)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [OpenAPI Specification](https://swagger.io/specification/)