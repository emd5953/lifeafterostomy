# Life After Ostomy

A comprehensive e-commerce platform and support community for ostomy patients, providing quality care kits, educational resources, and community support.

## 🎯 Mission

Supporting individuals with colostomy, ileostomy, and urostomy through every step of their journey with quality products, educational content, and community resources.

## ✨ Features

### 🛒 E-commerce
- **Complete Care Kits** - Everything needed for ostomy care in organized packages
- **Individual Items** - Specific supplies for personalized needs
- **Educational Books** - Guides for all age groups navigating life after ostomy
- **User Authentication** - Secure login with profile management
- **Order History** - Easy reordering for returning customers

### 📚 Content & Resources
- **Ostomy News** - Latest updates and research in ostomy care
- **Ostomy Knowledge** - Educational articles and care guides
- **Ostomy Events** - Community support groups and workshops
- **Expert Content** - Medical professionals and patient advocates

### 🔗 Integrations
- **Shopify Integration** - Complete product management
- **Amazon Storefront** - Book sales and wider reach
- **Social Media Links** - Facebook, Instagram, TikTok, YouTube
- **SEO Optimized** - Great discoverability for those who need help

## 🛠️ Tech Stack

### Frontend
- **Next.js 14+** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Lucide React** for icons

### Backend & Database
- **Supabase** for authentication and database
- **PostgreSQL** for relational data management
- **Row Level Security** for data protection

### Deployment & Hosting
- **Vercel** for frontend hosting
- **GoDaddy** domain management
- **Supabase Cloud** for backend services

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account
- GoDaddy domain (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/life-after-ostomy.git
   cd life-after-ostomy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

4. **Set up the database**
   - Go to your Supabase project
   - Navigate to SQL Editor
   - Run the setup scripts from `/database/setup.sql`

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
life-after-ostomy/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── about/              # About us page
│   │   ├── contact/            # Contact page
│   │   ├── login/              # Authentication
│   │   ├── products/           # Product catalog
│   │   ├── ostomy-news/        # News articles
│   │   ├── ostomy-knowledge/   # Educational content
│   │   ├── ostomy-events/      # Community events
│   │   └── dashboard/          # User dashboard
│   ├── components/             # Reusable React components
│   │   ├── auth/               # Authentication components
│   │   ├── navigation/         # Navigation components
│   │   ├── products/           # Product-related components
│   │   └── ui/                 # Generic UI components
│   ├── lib/                    # Utility functions and configs
│   │   └── supabase.ts         # Supabase client configuration
│   ├── types/                  # TypeScript type definitions
│   │   └── database.ts         # Database schema types
│   └── hooks/                  # Custom React hooks
├── database/                   # Database setup scripts
├── public/                     # Static assets
└── docs/                       # Documentation
```

## 🗄️ Database Schema

### Tables
- **users** - User profiles and preferences
- **products** - Ostomy care products and books
- **orders** - Purchase history and status
- **order_items** - Individual items within orders
- **content** - Blog posts, news, and educational content

### Key Features
- Row Level Security (RLS) for data protection
- Automatic timestamp updates
- User profile creation on signup
- Optimized indexes for performance

## 🔐 Authentication

- **Email/Password** authentication via Supabase Auth
- **Google OAuth** for social login
- **Protected routes** for user-specific content
- **Role-based access** for content management

## 🛒 E-commerce Features

### Product Categories
- **Care Kits**: Complete, organized ostomy care packages
- **Individual Items**: Specific supplies and accessories
- **Books**: Educational resources for all ages

### Ostomy Types Supported
- **Colostomy** - Colon-specific products and resources
- **Ileostomy** - Small intestine-specific care
- **Urostomy** - Urinary system ostomy support
- **Universal** - Products suitable for all ostomy types

### User Features
- Personal profiles with ostomy type preferences
- Order history and easy reordering
- Personalized product recommendations
- Secure checkout process

## 📱 Content Management

### Content Types
- **News**: Latest ostomy research and community updates
- **Knowledge**: Educational articles and care guides
- **Events**: Support groups, workshops, and community gatherings

### SEO Optimization
- Server-side rendering for content pages
- Optimized meta tags and descriptions
- Structured data for search engines
- Fast loading times with Next.js optimization

## 🚀 Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on every push to main branch

### Domain Setup
1. Point your GoDaddy domain to Vercel
2. Configure SSL certificates
3. Set up redirects if needed

## 🧪 Testing

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage

# E2E tests
npm run test:e2e
```

## 📈 Performance & SEO

- **Server-side rendering** for optimal SEO
- **Image optimization** with Next.js Image component
- **Code splitting** for faster load times
- **Progressive Web App** features
- **Core Web Vitals** optimization

## 🤝 Contributing

We welcome contributions from the community! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For questions, suggestions, or support:

- **Email**: support@afterostomy.com
- **Website**: [afterostomy.com](https://afterostomy.com)
- **Issues**: [GitHub Issues](https://github.com/yourusername/life-after-ostomy/issues)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Ostomy support community for inspiration and feedback
- Medical professionals who provided expert guidance
- Open source contributors who made this platform possible

## 🗺️ Roadmap

### Phase 1 (Current)
- ✅ Basic e-commerce functionality
- ✅ User authentication
- ✅ Content management system
- ✅ Responsive design

### Phase 2 (Next)
- 🔄 Shopping cart and checkout
- 🔄 Payment processing integration
- 🔄 Email notifications
- 🔄 Advanced search and filtering

### Phase 3 (Future)
- 📋 Subscription-based care kit deliveries
- 📱 Mobile app development
- 🤖 AI-powered product recommendations
- 🌍 Multi-language support

---

**Made with ❤️ for the ostomy community**