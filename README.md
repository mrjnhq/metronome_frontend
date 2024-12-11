
# Metronome - Class Routine Management System

A modern web application built with React and TypeScript for managing academic class routines and schedules.

## Features

- 📅 Interactive class routine management
- 👥 Teacher-specific schedule search
- 🏛️ Room allocation tracking
- 🔐 Secure authentication system
- 🎯 Department-wise course organization
- 📱 Responsive design with modern UI

## Tech Stack

- Frontend:
  - React 18 with TypeScript
  - Vite for build tooling
  - Tailwind CSS for styling
  - Shadcn UI components
  - React Hook Form for form management
  - Zod for validation

- Backend Integration:
  - RESTful API integration
  - JWT authentication

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend server running on `http://127.0.0.1:8080`

## Getting Started

1. Clone the repository:
```bash
git clone "https://github.com/mrjnhq/metronome_frontend.git"
cd metronome
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── components/    # Reusable UI components
├── Dashboard/     # Dashboard view
├── LoginSignup/   # Authentication
├── Routine/       # Class routine management
├── hooks/         # Custom React hooks
└── lib/          # Utility functions
```

## Configuration

The project uses several configuration files:

- 

components.json

 - Shadcn UI configuration
- 

tailwind.config.js

 - Tailwind CSS settings
- 

vite.config.ts

 - Vite bundler configuration
- 

tsconfig.json

 - TypeScript configuration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

[MIT License](LICENSE)

## Acknowledgments

- [Shadcn UI](https://ui.shadcn.com) for the component library
- [Lucide Icons](https://lucide.dev) for the icon set

For more information or issues, please open a GitHub issue.