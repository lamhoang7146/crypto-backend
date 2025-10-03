# 🚀 Crypto Backend API

<div align="center">

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

**A modern, scalable backend API built with NestJS, GraphQL, and PostgreSQL**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Quick Start](#-quick-start) • [API Documentation](#-api-documentation) • [Database Schema](#-database-schema) • [Development](#-development)

</div>

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Development](#-development)
- [Testing](#-testing)
- [Docker Deployment](#-docker-deployment)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🔐 Authentication & Authorization
- User registration and authentication
- Secure password hashing with Argon2
- JWT-based authentication system
- User profile management

### 📝 Content Management
- **Posts**: Create, read, update, and delete blog posts
- **Comments**: Interactive commenting system
- **Tags**: Flexible tagging system for content categorization
- **Likes**: Social engagement features

### 🎯 Advanced Features
- **GraphQL API**: Type-safe, efficient data fetching
- **Real-time subscriptions**: Live updates for comments and likes
- **File uploads**: Support for post thumbnails and user avatars
- **Search & Filtering**: Advanced content discovery
- **Pagination**: Optimized data loading

### 🛡️ Security & Performance
- Input validation with class-validator
- CORS configuration
- Database indexing for optimal performance
- Environment-based configuration

---

## 🛠 Tech Stack

### Backend Framework
- **[NestJS](https://nestjs.com/)** - Progressive Node.js framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[GraphQL](https://graphql.org/)** - Query language for APIs

### Database & ORM
- **[PostgreSQL](https://www.postgresql.org/)** - Robust relational database
- **[Prisma](https://www.prisma.io/)** - Next-generation ORM
- **[Redis](https://redis.io/)** - In-memory data store

### Authentication & Security
- **[Argon2](https://github.com/P-H-C/phc-winner-argon2)** - Password hashing
- **[bcrypt](https://github.com/kelektiv/node.bcrypt.js)** - Additional security layer
- **[JWT](https://jwt.io/)** - JSON Web Tokens

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[Jest](https://jestjs.io/)** - Testing framework
- **[Docker](https://www.docker.com/)** - Containerization

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **Yarn** package manager
- **PostgreSQL** (v13 or higher)
- **Redis** (v6 or higher)
- **Docker** & **Docker Compose** (optional)

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/crypto-backend.git
cd crypto-backend
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Environment Setup

```bash
cp .env.example .env
# Edit .env with your configuration
```

### 4. Database Setup

```bash
# Generate Prisma client
yarn db:generate

# Run database migrations
yarn db:migrate

# (Optional) Seed the database
yarn db:seed
```

### 5. Start Development Server

```bash
# Development mode with hot reload
yarn dev

# Or start normally
yarn start
```

The API will be available at `http://localhost:6002`

### 6. Access GraphQL Playground

Visit `http://localhost:6002/graphql` to explore the API interactively.

---

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Application
APP_PORT=6002
NODE_ENV=development

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/crypto_db"
DB_POSTGRES_USERNAME=postgres
DB_POSTGRES_PASSWORD=password
DB_POSTGRES_DATABASE=crypto_db
DB_POSTGRES_PORT=5432

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads
```

---

## 📚 API Documentation

### GraphQL Schema Overview

Our API provides a comprehensive GraphQL schema with the following main types:

#### Queries
```graphql
type Query {
  users: [User!]!
  posts: [Post!]!
  comments: [Comment!]!
  tags: [Tag!]!
  likes: [Like!]!
}
```

#### Mutations
```graphql
type Mutation {
  createUser(createUserDto: CreateUserDto!): User!
  # More mutations coming soon...
}
```

#### Types
- **User**: User profile and authentication
- **Post**: Blog posts with rich content
- **Comment**: User comments on posts
- **Tag**: Content categorization
- **Like**: Social engagement

### Example Queries

#### Get All Users
```graphql
query {
  users {
    id
    name
    email
    avatar
    bio
    createdAt
  }
}
```

#### Get Posts with Comments and Likes
```graphql
query {
  posts {
    id
    title
    content
    slug
    published
    user {
      name
      avatar
    }
    comments {
      content
      user {
        name
      }
    }
    likes {
      user {
        name
      }
    }
    tags {
      name
    }
  }
}
```

---

## 🗄 Database Schema

Our PostgreSQL database includes the following main entities:

```mermaid
erDiagram
    User ||--o{ Post : creates
    User ||--o{ Comment : writes
    User ||--o{ Like : gives
    Post ||--o{ Comment : has
    Post ||--o{ Like : receives
    Post }o--o{ Tag : tagged_with
    
    User {
        string id PK
        string name
        string email UK
        string avatar
        string bio
        string password
        datetime createdAt
        datetime updatedAt
    }
    
    Post {
        string id PK
        string title
        string content
        string slug UK
        string thumbnail
        boolean published
        string userId FK
        datetime createdAt
        datetime updatedAt
    }
    
    Comment {
        string id PK
        string content
        string postId FK
        string userId FK
        datetime createdAt
        datetime updatedAt
    }
    
    Tag {
        string id PK
        string name UK
        datetime createdAt
        datetime updatedAt
    }
    
    Like {
        string id PK
        string userId FK
        string postId FK
        datetime createdAt
        datetime updatedAt
    }
```

### Key Relationships
- **Users** can create multiple **Posts**
- **Posts** can have multiple **Comments** and **Likes**
- **Posts** can be tagged with multiple **Tags**
- **Users** can like multiple **Posts**

---

## 💻 Development

### Available Scripts

```bash
# Development
yarn dev          # Start with hot reload
yarn start        # Start production server
yarn debug        # Start with debugging

# Building
yarn build        # Build for production
yarn prod         # Run production build

# Database
yarn db:generate  # Generate Prisma client
yarn db:migrate   # Run database migrations
yarn db:studio    # Open Prisma Studio
yarn db:seed      # Seed database with sample data

# Code Quality
yarn lint         # Run ESLint
yarn format       # Format code with Prettier

# Testing
yarn test         # Run unit tests
yarn test:watch   # Run tests in watch mode
yarn test:cov     # Run tests with coverage
yarn test:e2e     # Run end-to-end tests
```

### Project Structure

```
src/
├── modules/                 # Feature modules
│   ├── app/                # Main application module
│   ├── auth/               # Authentication module
│   ├── user/               # User management
│   ├── post/               # Post management
│   ├── comment/            # Comment system
│   ├── like/               # Like system
│   ├── tag/                # Tag management
│   ├── graphql/            # GraphQL configuration
│   ├── prisma/             # Database service
│   └── config/             # Configuration module
├── main.ts                 # Application entry point
└── ...

prisma/
├── migrations/             # Database migrations
├── schema.prisma           # Database schema
└── seeds/                  # Database seeding

docker/
└── dockerFile              # Docker configuration

dist/                       # Compiled JavaScript
coverage/                   # Test coverage reports
```

### Code Style

This project follows:
- **ESLint** configuration for code quality
- **Prettier** for consistent formatting
- **TypeScript** strict mode
- **NestJS** architectural patterns

---

## 🧪 Testing

### Running Tests

```bash
# Unit tests
yarn test

# Watch mode
yarn test:watch

# Coverage report
yarn test:cov

# End-to-end tests
yarn test:e2e
```

### Test Structure

```
test/
├── unit/                   # Unit tests
├── integration/            # Integration tests
└── e2e/                    # End-to-end tests
```

---

## 🐳 Docker Deployment

### Using Docker Compose

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Services Included

- **API Server**: NestJS application
- **PostgreSQL**: Database server
- **Redis**: Caching and session store

### Environment Configuration

The Docker setup uses environment variables from `.env` file. Make sure to configure:

- Database credentials
- Redis settings
- Application port
- JWT secrets

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass
- Use conventional commit messages

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [NestJS](https://nestjs.com/) - The amazing Node.js framework
- [Prisma](https://www.prisma.io/) - The next-generation ORM
- [GraphQL](https://graphql.org/) - The query language for APIs
- [PostgreSQL](https://www.postgresql.org/) - The reliable database

---

<div align="center">

**Made with ❤️ by the Crypto Backend Team**

[Report Bug](https://github.com/your-username/crypto-backend/issues) • [Request Feature](https://github.com/your-username/crypto-backend/issues) • [Documentation](https://github.com/your-username/crypto-backend/wiki)

</div>