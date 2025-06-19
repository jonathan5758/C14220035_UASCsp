# Next.js Dashboard Application with Supabase

A comprehensive Next.js application featuring role-based authentication and product management system using Supabase as the backend.

## Features

### Authentication System
- **Sign-in Page**: Secure login with username and password
- **Session Management**: Cookie-based user sessions
- **Role-based Access**: Different dashboards for users and admins
- **Route Protection**: Automatic redirection for unauthorized access

### User Dashboard
- View product catalog with details
- Display product name, unit price, and quantity
- Stock status indicators
- Responsive design

### Admin Dashboard
- Full CRUD operations for products
- Add, edit, and delete products
- Modal-based forms for product management
- Real-time data updates

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **Authentication**: Custom auth with Supabase
- **State Management**: React hooks
- **Notifications**: React Hot Toast

## Setup Instructions

### 1. Supabase Setup

1. **Create a Supabase Account**
   - Go to [supabase.com](https://supabase.com)
   - Sign up for a free account
   - Create a new project

2. **Get Your Supabase Credentials**
   - In your Supabase dashboard, go to Settings > API
   - Copy your Project URL and anon public key

3. **Set Up Environment Variables**
   - Update `.env.local` with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run Database Migration**
   - In your Supabase dashboard, go to SQL Editor
   - Copy and run the SQL from `supabase/migrations/create_initial_schema.sql`
   - This will create the necessary tables and sample data

### 2. Local Development

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Access the Application**
   - Open [http://localhost:3000](http://localhost:3000)
   - You'll be redirected to the sign-in page

## Demo Credentials

### User Account
- **Username**: user1
- **Password**: password123
- **Access**: View-only product catalog

### Admin Account
- **Username**: admin1
- **Password**: adminpassword
- **Access**: Full CRUD operations on products

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'admin'))
);
```

### Products Table
```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  nama_produk TEXT NOT NULL,
  harga_satuan INTEGER NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 0
);
```

## Project Structure

```
├── app/
│   ├── dashboard/          # Protected dashboard page
│   ├── signin/            # Authentication page
│   ├── layout.tsx         # Root layout with global styles
│   └── page.tsx           # Home page with auto-redirect
├── components/
│   ├── AdminDashboard.tsx # Admin-specific dashboard
│   ├── UserDashboard.tsx  # User-specific dashboard
│   ├── Navbar.tsx         # Navigation component
│   └── ProtectedRoute.tsx # Route protection wrapper
├── lib/
│   ├── supabase.ts        # Supabase client configuration
│   └── auth.ts            # Authentication utilities
└── supabase/
    └── migrations/        # Database migration files
```

## Key Features Explained

### Authentication Flow
1. User enters credentials on sign-in page
2. System validates against Supabase users table
3. On success, user data is stored in cookies
4. Protected routes check authentication status
5. Users are redirected based on their role

### Role-based Access Control
- **Users**: Can only view the product catalog
- **Admins**: Can perform full CRUD operations on products
- Route protection ensures users can't access admin features

### Product Management (Admin Only)
- **Create**: Add new products with name, price, and quantity
- **Read**: View all products in a table format
- **Update**: Edit existing product details
- **Delete**: Remove products with confirmation

## Security Features

- **Row Level Security (RLS)**: Enabled on all Supabase tables
- **Input Validation**: Client-side and server-side validation
- **Route Protection**: Automatic redirection for unauthorized access
- **Session Management**: Secure cookie-based sessions

## Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile devices

## Error Handling

- Toast notifications for user feedback
- Loading states for better UX
- Error boundaries for graceful failure handling
- Form validation with helpful error messages

## Future Enhancements

- Password hashing for better security
- Email verification for new users
- Advanced product filtering and search
- Export functionality for product data
- User profile management
- Audit logs for admin actions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational purposes and is part of a university assignment.