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
- **[NestJS v11](https://nestjs.com/)** - Progressive Node.js framework
- **[TypeScript v5.7](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[GraphQL v16.11](https://graphql.org/)** with **[@apollo/server v4.12](https://www.apollographql.com/docs/apollo-server/)** - API query language
- **[@nestjs/graphql v13.1](https://docs.nestjs.com/graphql/quick-start)** - NestJS GraphQL integration

### Database & ORM
- **[PostgreSQL v17](https://www.postgresql.org/)** - Robust relational database
- **[Prisma v6.9](https://www.prisma.io/)** - Next-generation ORM
- **[Redis v8.0](https://redis.io/)** - In-memory data store & caching

### Authentication & Security
- **[Argon2 v0.44](https://github.com/P-H-C/phc-winner-argon2)** - Modern password hashing
- **[Passport v0.7](https://www.passportjs.org/)** - Authentication middleware
- **[@nestjs/jwt v11](https://github.com/nestjs/jwt)** - JWT authentication
- **[class-validator v0.14](https://github.com/typestack/class-validator)** - Input validation

### Development Tools
- **[ESLint v9.18](https://eslint.org/)** - Code linting
- **[Prettier v3.4](https://prettier.io/)** - Code formatting
- **[Jest v29.7](https://jestjs.io/)** - Testing framework
- **[Docker](https://www.docker.com/)** & **[Docker Compose](https://docs.docker.com/compose/)** - Containerization

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v20 or higher)
- **Yarn** package manager (v1.22 or higher)
- **PostgreSQL** (v17)
- **Redis** (v8.0)
- **Docker** (v24 or higher) & **Docker Compose** (v2.20 or higher)
- **Git** (v2.40 or higher)

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/hoang-nguyen-st/crypto-backend.git
cd crypto-backend
```

### 2. Install Dependencies

```bash
# Install all dependencies
yarn install

# Install global tools (if needed)
npm install -g @nestjs/cli prisma
```

### 3. Environment Setup

```bash
# Copy environment file
cp .env.example .env

# Generate a secure JWT secret
openssl rand -base64 32 > .jwt-secret
```

Update `.env` with your configuration (see Environment Variables section below).

### 4. Database Setup

#### Using Docker (Recommended)
```bash
# Start PostgreSQL and Redis
docker-compose up -d db redis

# Wait for services to be ready
sleep 5

# Setup database
yarn db:generate     # Generate Prisma client
yarn db:migrate      # Run database migrations
yarn db:seed        # (Optional) Seed sample data
```

#### Manual Setup
If you prefer to use existing PostgreSQL and Redis instances:
1. Update `.env` with your database and Redis credentials
2. Run the database setup commands as above

### 5. Start Development Server

```bash
# Development mode with hot reload
yarn dev

# Or using Docker (includes all dependencies)
docker-compose up -d
```

The API will be available at `http://localhost:6002`

### 6. Access GraphQL Playground

- Development: Visit `http://localhost:6002/graphql`
- Production: Visit `https://server.enderio.site/graphql`

Both endpoints provide interactive GraphQL playgrounds where you can explore and test the API.

### 7. API Health Check

```bash
# Check API status
curl http://localhost:6002/health

# Test GraphQL endpoint
curl -X POST http://localhost:6002/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ __typename }"}'
```

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

### GraphQL Endpoints

- **Development**: `http://localhost:6002/graphql`
- **Production**: `https://server.enderio.site/graphql`

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

### Example Operations

#### Authentication
```graphql
# Sign In
mutation SignIn {
  signIn(signInInput: {
    email: "user@example.com"
    password: "yourpassword"
  }) {
    token
    user {
      id
      name
      email
    }
  }
}

# Create User
mutation CreateUser {
  createUser(createUserDto: {
    name: "John Doe"
    email: "john@example.com"
    password: "securepassword"
    bio: "Crypto enthusiast"
  }) {
    id
    name
    email
    bio
    createdAt
  }
}
```

#### Content Operations
```graphql
# Get All Posts with Filtering
query GetPosts {
  posts(
    filter: { published: true }
    orderBy: { createdAt: DESC }
    take: 10
    skip: 0
  ) {
    id
    title
    content
    slug
    published
    thumbnail
    user {
      name
      avatar
    }
    comments {
      content
      user {
        name
      }
      createdAt
    }
    likes {
      user {
        name
      }
    }
    tags {
      name
    }
    createdAt
  }
}

# Create Post
mutation CreatePost {
  createPost(
    input: {
      title: "Understanding Blockchain"
      content: "Detailed content about blockchain..."
      slug: "understanding-blockchain"
      published: true
      tagIds: ["tag1", "tag2"]
    }
  ) {
    id
    title
    slug
    published
    createdAt
  }
}

# Add Comment
mutation AddComment {
  createComment(
    input: {
      content: "Great post!"
      postId: "post-id"
    }
  ) {
    id
    content
    createdAt
    user {
      name
    }
  }
}
```

#### Social Interactions
```graphql
# Toggle Like
mutation ToggleLike {
  toggleLike(postId: "post-id") {
    id
    post {
      id
      likes {
        id
        user {
          name
        }
      }
    }
  }
}

# Get User Profile with Activity
query UserProfile {
  user(id: "user-id") {
    id
    name
    email
    bio
    avatar
    posts {
      id
      title
      likes {
        id
      }
    }
    comments {
      id
      content
      post {
        title
      }
    }
    likes {
      id
      post {
        title
      }
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

- **API Server**: NestJS application (port 6002)
- **PostgreSQL**: Database server (port 5432)
- **Redis**: Caching and session store (port 6379)
- **Prisma Studio**: Database management UI (port 5555)

### Container Configuration

```yaml
services:
  api:
    build: 
      context: .
      dockerfile: ./docker/dockerFile
    ports: 
      - ${APP_PORT}:${APP_PORT}
    volumes:
      - .:/app
      - /app/node_modules
    depends_on:
      - db
      - redis

  db:
    image: postgres:17
    environment:
      POSTGRES_USER: ${DB_POSTGRES_USERNAME}
      POSTGRES_PASSWORD: ${DB_POSTGRES_PASSWORD}
      POSTGRES_DB: ${DB_POSTGRES_DATABASE}
    ports:
      - ${DB_POSTGRES_PORT}:${DB_POSTGRES_PORT}
    volumes:
      - db-data:/var/lib/postgresql/data

  redis:
    image: redis:8.0
    ports:
      - ${REDIS_PORT}:${REDIS_PORT}
    environment:
      REDIS_PASSWORD: ${REDIS_PASSWORD}
    volumes:
      - redis-data:/data
```

### Docker Commands

```bash
# Build and start all services
docker-compose up -d

# View service logs
docker-compose logs -f api    # API logs
docker-compose logs -f db     # Database logs
docker-compose logs -f redis  # Redis logs

# Stop and remove containers
docker-compose down

# Rebuild specific service
docker-compose up -d --build api

# Clean up volumes
docker-compose down -v
```

### Environment Configuration

The Docker setup uses environment variables from `.env` file:

```env
# Application
APP_PORT=6002
NODE_ENV=development

# Database
DATABASE_URL=postgresql://${DB_POSTGRES_USERNAME}:${DB_POSTGRES_PASSWORD}@db:5432/${DB_POSTGRES_DATABASE}
DB_POSTGRES_USERNAME=postgres
DB_POSTGRES_PASSWORD=your_secure_password
DB_POSTGRES_DATABASE=crypto_db
DB_POSTGRES_PORT=5432

# Redis
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password

# JWT
JWT_SECRET=your_secure_jwt_secret
JWT_EXPIRES_IN=7d

# File Upload
MAX_FILE_SIZE=10485760  # 10MB
UPLOAD_PATH=./uploads
```

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