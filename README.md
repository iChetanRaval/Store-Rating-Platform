# 🏪 Store Rating Platform

A full-stack web application for rating stores with role-based authentication and management system. Built with React.js, Express.js, and MySQL.

![Store Rating Platform](https://img.shields.io/badge/React-19.1.1-blue) ![Express.js](https://img.shields.io/badge/Express-4.19.2-green) ![MySQL](https://img.shields.io/badge/MySQL-8.0-orange) ![Node.js](https://img.shields.io/badge/Node.js-18+-brightgreen)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [User Roles](#-user-roles)
- [Installation & Setup](#-installation--setup)
- [Database Setup](#-database-setup)
- [Environment Configuration](#-environment-configuration)
- [Running the Application](#-running-the-application)
- [API Endpoints](#-api-endpoints)
- [Form Validations](#-form-validations)
- [Screenshots](#-screenshots)
- [Development](#-development)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 🔐 Authentication & Authorization
- **JWT-based authentication** with secure token management
- **Role-based access control** (RBAC) with three user types
- **Password hashing** using bcrypt for security
- **Protected routes** based on user roles

### 👥 User Roles

#### 🛡️ System Administrator
- Add new stores and users
- View comprehensive dashboard with statistics
- Manage all users and stores
- View detailed user information including ratings
- Full system access and control

#### 👤 Normal User
- Browse and search stores
- Submit and update ratings (1-5 stars)
- View store information and overall ratings
- Update personal profile and password

#### 🏪 Store Owner
- View dashboard with store analytics
- See list of users who rated their stores
- View average ratings for owned stores
- Manage store information

### 🎨 User Interface
- **Modern dark theme** with gradient backgrounds
- **Responsive design** for all device sizes
- **Real-time form validation** with instant feedback
- **Smooth animations** and hover effects
- **Accessible design** with proper focus states

### 📊 Data Management
- **Search and filtering** for stores and users
- **Sorting capabilities** across all data tables
- **Real-time updates** for ratings and statistics
- **Normalized database schema** for efficient queries

## 🛠️ Tech Stack

### Frontend
- **React.js 19.1.1** - Modern UI library
- **React Router DOM 7.8.2** - Client-side routing
- **Axios 1.12.0** - HTTP client for API calls
- **Joi 18.0.1** - Client-side validation
- **Vite 7.1.2** - Build tool and dev server

### Backend
- **Express.js 4.19.2** - Web framework
- **MySQL2 3.11.0** - Database driver
- **JWT 9.0.2** - Authentication tokens
- **bcrypt 5.1.1** - Password hashing
- **Joi 17.13.3** - Server-side validation
- **CORS 2.8.5** - Cross-origin resource sharing
- **Helmet 7.1.0** - Security headers
- **Morgan 1.10.0** - HTTP request logger

### Database
- **MySQL 8.0+** - Relational database
- **Normalized schema** with proper relationships
- **Foreign key constraints** for data integrity

## 📁 Project Structure

```
store-rating-platform/
├── client/                     # React frontend
│   ├── public/                # Static assets
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   └── UI.jsx        # Custom UI components
│   │   ├── routes/           # Page components
│   │   │   ├── Admin.jsx     # Admin dashboard
│   │   │   ├── Home.jsx      # Landing page
│   │   │   ├── Login.jsx     # Login form
│   │   │   ├── Owner.jsx     # Store owner dashboard
│   │   │   ├── Profile.jsx   # User profile
│   │   │   ├── Signup.jsx    # Registration form
│   │   │   ├── Stores.jsx    # Store listing
│   │   │   └── Protected.jsx # Route protection
│   │   ├── state/            # State management
│   │   │   └── auth.jsx      # Authentication context
│   │   ├── App.jsx           # Main app component
│   │   ├── main.jsx          # App entry point
│   │   ├── theme.css         # Global styles
│   │   └── index.css         # Base styles
│   ├── package.json          # Frontend dependencies
│   └── vite.config.js        # Vite configuration
├── server/                    # Express backend
│   ├── sql/
│   │   └── schema.sql        # Database schema
│   ├── src/
│   │   ├── lib/              # Utility libraries
│   │   │   ├── db.js         # Database connection
│   │   │   └── validators.js # Validation schemas
│   │   ├── middleware/       # Express middleware
│   │   │   └── auth.js       # JWT authentication
│   │   ├── routes/           # API routes
│   │   │   ├── admin.js      # Admin endpoints
│   │   │   ├── auth.js       # Authentication endpoints
│   │   │   ├── owner.js      # Store owner endpoints
│   │   │   └── stores.js     # Store endpoints
│   │   └── index.js          # Server entry point
│   ├── package.json          # Backend dependencies
│   └── .env                  # Environment variables
└── README.md                 # Project documentation
```

## 👥 User Roles

### 🛡️ System Administrator
- **Dashboard**: View total users, stores, and ratings
- **User Management**: Add new users, view user lists, filter by role
- **Store Management**: Add new stores, assign owners, manage store data
- **Analytics**: Comprehensive system statistics and insights

### 👤 Normal User
- **Store Browsing**: Search and filter stores by name/address
- **Rating System**: Submit ratings (1-5 stars) for stores
- **Profile Management**: Update password and personal information
- **Rating History**: View and modify previously submitted ratings

### 🏪 Store Owner
- **Store Analytics**: View average ratings for owned stores
- **Customer Feedback**: See list of users who rated their stores
- **Performance Tracking**: Monitor store rating trends
- **Profile Management**: Update password and store information

## 🚀 Installation & Setup

### Prerequisites

- **Node.js** (v18.0.0 or higher)
- **MySQL** (v8.0 or higher)
- **npm** or **yarn** package manager

### 1. Clone the Repository

```bash
git clone <repository-url>
cd store-rating-platform
```

### 2. Install Dependencies

#### Backend Dependencies
```bash
cd server
npm install
```

#### Frontend Dependencies
```bash
cd ../client
npm install
```

## 🗄️ Database Setup

### 1. Create MySQL Database

```sql
CREATE DATABASE store_rating;
USE store_rating;
```

### 2. Import Database Schema

```bash
# Navigate to server directory
cd server

# Import the schema
mysql -u your_username -p store_rating < sql/schema.sql
```

### 3. Database Schema Overview

The database consists of three main tables:

#### Users Table
```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(60) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    address VARCHAR(400),
    role ENUM('admin','user','owner') NOT NULL
);
```

#### Stores Table
```sql
CREATE TABLE stores (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    address VARCHAR(400),
    owner_id INT,
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE SET NULL
);
```

#### Ratings Table
```sql
CREATE TABLE ratings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    store_id INT,
    rating INT CHECK(rating BETWEEN 1 AND 5),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE,
    UNIQUE KEY uniq_user_store (user_id, store_id)
);
```

## ⚙️ Environment Configuration

### 1. Create Environment File

Create a `.env` file in the `server` directory:

```bash
cd server
touch .env
```

### 2. Configure Environment Variables

Add the following variables to `server/.env`:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=store_rating

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=24h

# Server Configuration
PORT=5000
NODE_ENV=development
```

### 3. Frontend Configuration

The frontend is configured to proxy API requests to the backend. Update `client/vite.config.js` if needed:

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
```

## 🏃‍♂️ Running the Application

### 1. Start the Backend Server

```bash
cd server
npm run dev
```

The server will start on `http://localhost:5000`

### 2. Start the Frontend Development Server

```bash
cd client
npm run dev
```

The frontend will start on `http://localhost:5173`

### 3. Access the Application

Open your browser and navigate to `http://localhost:5173`

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /signup` - User registration
- `POST /login` - User login
- `PUT /update-password` - Update user password

### Admin Routes (`/api/admin`)
- `GET /dashboard` - Get admin dashboard statistics
- `POST /add-user` - Add new user
- `POST /add-store` - Add new store
- `GET /users` - Get all users with filtering
- `GET /stores` - Get all stores with filtering

### Store Routes (`/api/stores`)
- `GET /list` - Get all stores
- `GET /search` - Search stores by name/address
- `POST /rate` - Submit store rating
- `PUT /update-rating` - Update existing rating
- `GET /my-ratings` - Get user's ratings

### Owner Routes (`/api/owner`)
- `GET /dashboard` - Get store owner dashboard

## ✅ Form Validations

### User Registration/Update
- **Name**: 20-60 characters, required
- **Email**: Valid email format, unique, required
- **Password**: 8-16 characters, 1 uppercase, 1 special character
- **Address**: Maximum 400 characters, optional

### Store Creation
- **Name**: Maximum 100 characters, required
- **Email**: Valid email format, unique, optional
- **Address**: Maximum 400 characters, optional
- **Owner ID**: Valid user ID with 'owner' role, optional

### Rating Submission
- **Rating**: Integer between 1-5, required
- **Store ID**: Valid store ID, required
- **User ID**: Valid user ID, required

## 📸 Screenshots

### Home Page
- Modern landing page with role-based navigation
- Responsive design with dark theme

### Login/Signup
- Centered forms with real-time validation
- Beautiful UI with smooth animations

### Admin Dashboard
- Comprehensive statistics overview
- User and store management tables
- Add user/store forms with validation

### Store Listing
- Search and filter functionality
- Rating submission interface
- Responsive grid layout

### Store Owner Dashboard
- Store analytics and customer feedback
- Rating insights and trends

## 🛠️ Development

### Available Scripts

#### Backend Scripts
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
```

#### Frontend Scripts
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

### Code Style
- **ESLint** configuration for consistent code style
- **Prettier** for code formatting
- **Component-based architecture** for maintainability

### Security Features
- **Helmet.js** for security headers
- **CORS** configuration for cross-origin requests
- **Input validation** on both client and server
- **SQL injection protection** with parameterized queries
- **XSS protection** with proper data sanitization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all validations work correctly

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🆘 Troubleshooting

### Common Issues

#### Database Connection Error
- Verify MySQL is running
- Check database credentials in `.env`
- Ensure database `store_rating` exists

#### Port Already in Use
- Change PORT in `.env` file
- Kill existing processes on ports 5000/5173

#### CORS Issues
- Verify backend CORS configuration
- Check frontend proxy settings in `vite.config.js`

#### Authentication Issues
- Verify JWT_SECRET is set in `.env`
- Check token expiration settings
- Ensure proper role assignments

### Getting Help

If you encounter any issues:
1. Check the console for error messages
2. Verify all environment variables are set
3. Ensure all dependencies are installed
4. Check database connection and schema

## 🎯 Future Enhancements

- [ ] Email notifications for new ratings
- [ ] Advanced analytics and reporting
- [ ] Store image uploads
- [ ] Rating comments and reviews
- [ ] Mobile app development
- [ ] Social media integration
- [ ] Advanced search filters
- [ ] Rating trends and insights

---

**Built with ❤️ using React, Express, and MySQL**
