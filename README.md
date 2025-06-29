# Bitcoin Soft Forks UI

This is a website skin for the bitcoin.softforks.org project. It is forked from the Bitcoin Layers website. 

# Running Bitcoin Soft forks Locally

## Local Development Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Visit `http://localhost:3000`

That's it! The site should now be running locally with all the opcode functionality and hover interactions.

## Additional Commands

- **Build for production:** `npm run build`
- **Start production build:** `npm run start` 
- **Lint code:** `npm run lint`
- **Format code:** `npm run format`

## What you'll see:

- **Bitcoin Softforks** branding instead of Bitcoin Layers
- **Opcode-focused interface** with the table as the main feature
- **Hover interactions** on all table buttons (Components, Primitives, Tech Analysis, Applications, Associated Networks)
- **Developer sentiment chart** showing preference data for 9 opcodes
- **Responsive design** that works on desktop and mobile

The site uses Next.js 15 with React 19, so it should start up quickly with hot-reloading for any changes you make!
