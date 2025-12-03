# Digital Canvas

## 📁 Project Structure

```
next-canvas/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with navigation
│   ├── page.tsx                 # Home page
│   ├── globals.css              # Global styles
│   ├── api/                     # API routes
│   │   ├── feed/                # Feed API endpoints
│   │   └── newsletter/          # Newsletter subscription
│   ├── events/                  # Event pages
│   │   └── prompt-to-product/   # Prompt to Product event
│   └── thefeed/                 # The Feed section
│       ├── page.tsx             # Feed listing page
│       └── [slug]/              # Individual feed items
├── components/                   # Reusable components
│   ├── thefeed/                 # Feed-specific components
│   │   ├── newsletter-template.tsx
│   │   ├── feed-list.tsx
│   │   └── feed-filters.tsx
│   ├── events/                  # Event components
│   ├── ui/                      # UI components
│   └── icons/                   # Icon components
├── data/                        # Static data and types
│   ├── feed-data.ts            # Feed item types & fallback data
│   └── prompt-to-product.ts    # Event data
├── lib/                         # Utility functions
│   ├── airtable-feed.ts        # Airtable integration
│   ├── utils.ts                # General utilities
│   └── gsap-config.ts          # Animation configuration
├── hooks/                       # Custom React hooks
└── fonts/                       # Local fonts
```

## 🔗 Integrations

### Airtable Integration
- **Base**: `thefeeds` with multiple brand tables
- **Tables**: `thefeed`, `8count`, `434blog`, `culturedeck`
- **Features**: Newsletter content, rich text (Markdown), image attachments
- **Fallback**: Static data when Airtable is unavailable

### Newsletter System
- **Mailchimp**: Email subscription management
- **Cloudflare Turnstile**: Bot protection
- **Rich Text**: Markdown to HTML conversion for formatted content

### Performance & SEO
- **Next.js Image Optimization**: With Airtable CDN support
- **Metadata Generation**: Dynamic social media previews
- **Static Generation**: ISR for optimal performance

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/434media/next-canvas.git
   cd next-canvas
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory:
   ```env
   # Airtable Configuration
   AIRTABLE_API_KEY=your_airtable_api_key
   AIRTABLE_BASE_ID=your_existing_base_id
   THEFEEDS_BASE_ID=your_thefeeds_base_id
   THEFEEDS_TABLE_NAME=thefeed
   
   # Newsletter Integration
   MAILCHIMP_API_KEY=your_mailchimp_api_key
   MAILCHIMP_AUDIENCE_ID=your_audience_id
   
   # Security
   TURNSTILE_SECRET_KEY=your_turnstile_secret
   NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_turnstile_site_key
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open the application:**
   Visit [http://localhost:3000](http://localhost:3000)

## 🔄 Git Workflow

### Creating a Feature Branch

1. **Sync with main branch:**
   ```bash
   git checkout main
   git pull origin main
   ```

2. **Create a new feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   # or for bug fixes:
   git checkout -b fix/bug-description
   ```

### Making Changes

3. **Make your changes and commit regularly:**
   ```bash
   git add .
   git commit -m "feat: add new newsletter template section"
   
   # Follow conventional commit format:
   # feat: new feature
   # fix: bug fix
   # docs: documentation
   # style: formatting
   # refactor: code restructuring
   # test: adding tests
   ```

4. **Keep your branch updated:**
   ```bash
   git fetch origin
   git rebase origin/main
   ```

### Submitting Changes

5. **Push your branch:**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request:**
   - Go to [GitHub repository](https://github.com/434media/next-canvas)
   - Click "Compare & pull request"
   - **Base branch**: `main`
   - **Compare branch**: your feature branch
   - Fill out the PR template:
     ```markdown
     ## Description
     Brief description of changes
     
     ## Type of Change
     - [ ] Bug fix
     - [ ] New feature
     - [ ] Documentation update
     - [ ] Performance improvement
     
     ## Testing
     - [ ] Tested locally
     - [ ] No console errors
     - [ ] Responsive design verified
     
     ## Screenshots (if applicable)
     ```

7. **Review Process:**
   - Wait for code review
   - Address any feedback
   - Once approved, the PR will be merged

### Branch Naming Conventions
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code restructuring
- `hotfix/` - Critical fixes

## 🧪 Testing & Quality

### Development Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

### Code Quality
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting with Next.js rules
- **Prettier**: Code formatting (recommended)
- **Husky**: Git hooks for quality checks (if configured)

## 📝 Contributing Guidelines

1. **Follow the Git workflow** outlined above
2. **Write clear commit messages** using conventional commit format
3. **Test your changes** locally before submitting
4. **Update documentation** if adding new features
5. **Keep PRs focused** - one feature/fix per PR
6. **Be responsive** to code review feedback

## 🔧 Environment Setup

### Required Environment Variables
See the `.env.example` file for all required environment variables.

### Airtable Setup
1. Create tables in your `thefeeds` base
2. Follow the schema in `AIRTABLE_IMPLEMENTATION.md`
3. Update field names to match your Airtable structure

### Deployment
The project is configured for deployment on Vercel with automatic deployments from the `main` branch.

## 📚 Additional Documentation

- `AIRTABLE_IMPLEMENTATION.md` - Detailed Airtable integration guide
- `airtable-integration-guide.md` - Schema and setup instructions

## 🤝 Support

For questions or issues:
1. Check existing [GitHub Issues](https://github.com/434media/next-canvas/issues)
2. Create a new issue with detailed description
3. Contact the 434 MEDIA development team

## 📄 License

This project is proprietary to 434 MEDIA. All rights reserved.