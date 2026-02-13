GlowFlow 
GlowFlow is a modern, high-performance e-commerce platform built with Angular 19 and Tailwind CSS v4. It features a responsive design and a streamlined deployment pipeline optimized for Vercel.

🚀 Live Demo
Link: https://glowflow-one.vercel.app/

🛠️ Tech Stack
Frontend: Angular 19 (Signals-based state management)

Styling: Tailwind CSS v4 (New utility engine)

Deployment: Vercel (CI/CD)

Runtime: Node.js

✨ Features
Modern UI: Built with Tailwind CSS v4 for ultra-fast styling and high performance.

SPA Routing: Fully functional client-side routing with fallback support for deep linking.

Production Optimized: Configured for low bundle sizes and fast page loads.

Responsive Design: Mobile-first approach for seamless use across all devices.

📦 Deployment Configuration
This project is optimized for deployment on Vercel using the following parameters, ensuring that modern Angular directory structures and routing are handled correctly:

Framework Preset: Angular

Build Command: npm run build

Output Directory: dist/glowflow/browser

Routing (vercel.json):

JSON
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
⚙️ Setup & Installation
Clone the Repository: git clone https://github.com/akhilakhil2/glowflow-angular-ui.git
Install Dependencies: npm install
Run Development Server: ng serve
Create Production Build: npm run build
