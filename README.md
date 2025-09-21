# Next.js E-Commerce Demo

A simple e-commerce demo built with **Next.js 13+**, **TypeScript**, and **shadcn/ui**.  
It demonstrates product listing, search, filters, cart management, and a checkout flow — all without a backend.

---

## Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/troyboy/minishop-test.git
cd minishop-test

npm install
npm run dev
```
Visit http://localhost:3000/

# Features

Product Listing & Filters
Grid layout with skeleton loading, “load more”, search by name, filter by category, and sort by price.

Product Detail Pages
Dynamic routes (/product/[id]) showing description, image, rating, and Add to Cart.

Cart Management
Slide-over cart (shadcn Sheet) with increment, decrement, remove, and subtotal/tax/total calculations.

Checkout Flow
Simple checkout form with validation (react-hook-form + zod). Confirmation screen + success toast (Sonner).

# Tech Stack & Why

Next.js 15.3 App Router → File-based routing, fast builds

TypeScript → Type-safety and self-documenting code.

shadcn/ui → Headless + styled components (Sheet, Button, Card, Skeleton, etc.) for consistency and flexibility.

react-hook-form + zod → Minimal, performant form handling with schema validation.

Zustand for cart state → Keeps logic centralized and predictable.
