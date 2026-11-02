# Saveur & Aroma — Restaurant & Café

A modern, interactive restaurant and café website featuring a multilingual digital menu, product customization, shopping cart, simulated checkout, and restaurant administration dashboard.

**Live Demo:** [Visit Saveur & Aroma](https://saveur-arome-restaurant-caf-u94l.vercel.app/)

**GitHub Repository:** [View Source Code](https://github.com/mariemL123/Saveur-Arome-Restaurant-Caf-)

---

## Project Overview

Saveur & Aroma is a restaurant and café web application designed to provide customers with a smooth and engaging online experience.

Visitors can explore the menu, search for products, customize their selections, add items to a shopping cart, and test a simulated ordering process.

The application also includes an administration interface demonstrating restaurant management workflows.

The project is designed as an interactive portfolio demonstration of modern frontend development.

## Live Demo

**Try the application:**  
https://saveur-arome-restaurant-caf-u94l.vercel.app/

You can explore the customer interface and test the main interactive features directly in your browser.

### What You Can Test

- Browse the restaurant menu.
- Search and filter products by category.
- Switch between French, Arabic, and English.
- Customize products and their options.
- Add products to the shopping cart.
- Apply promotional codes.
- Explore the checkout process.
- Test the restaurant administration interface.
- Explore order management, product availability, and customer complaints.

> **Demo notice:** This is a frontend demonstration. Orders, products, and other application data are managed in client-side state and are not backed by a persistent production database. No real payment is processed. Please use fictional information when testing.

## Features

### Customer Experience

- Modern restaurant and café interface.
- Multilingual support: French, Arabic, and English.
- Arabic right-to-left layout.
- Dynamic product catalog.
- Product search and category filtering.
- Product customization:
  - Size selection.
  - Milk preferences.
  - Sweetness level.
  - Ice level.
  - Additional toppings.
- Interactive shopping cart.
- Quantity management.
- Promotional coupon support.
- Simulated checkout.
- Order confirmation interface.
- Contact and customer complaint form.

### Restaurant Administration

- Demonstration administrator login.
- Restaurant dashboard.
- Order management and status updates.
- Product creation and editing.
- Product availability management.
- Customer complaint management.

### Design and User Experience

- Responsive layout built with Tailwind CSS.
- Modern visual design.
- Interactive components.
- Smooth transitions and animations.
- Lucide icon library.

## Technology Stack

| Technology | Purpose |
|---|---|
| React 19 | User interface |
| TypeScript | Type-safe development |
| Vite 8 | Development server and build |
| Tailwind CSS 4 | Styling and responsive layouts |
| Lucide React | Icons |
| Motion | Animations |
| Vercel | Deployment and hosting |

## Project Structure

```text
Saveur-Arome-Restaurant-Caf-/
│
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── data/
│   ├── utils/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
└── vite.config.ts
```

## Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/mariemL123/Saveur-Arome-Restaurant-Caf-.git
```

### 2. Open the project directory

```bash
cd Saveur-Arome-Restaurant-Caf-
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the local URL displayed in your terminal.

### 5. Build for production

```bash
npm run build
```

### 6. Preview the production build locally

```bash
npm run preview
```

## Deployment

The application is deployed using Vercel.

**Production URL:**  
https://saveur-arome-restaurant-caf-u94l.vercel.app/

The project can be updated through GitHub and redeployed through the connected Vercel deployment workflow.

## Client Feedback

Your feedback helps improve this project.

Have you tested the website? Share your experience, report an issue, or suggest a feature.

**[Share Your Feedback — Google Forms](YOUR_GOOGLE_FORM_URL)**

*The feedback form link will be activated once the external form has been created.*

## Security and Demo Limitations

This repository currently demonstrates frontend workflows rather than a complete production restaurant platform.

- Administrator authentication is implemented on the client side and is not secure for real business use.
- Application data is stored in frontend state and is not permanently persisted.
- Checkout is simulated.
- No real payment gateway or order-processing backend is connected.

A production implementation would require secure server-side authentication, a database, backend APIs, and appropriate payment integration.

## Project Purpose

This project demonstrates practical frontend development skills, including:

- Component-based architecture.
- React state management.
- TypeScript development.
- Interactive user interfaces.
- Multilingual interface design.
- Shopping cart and checkout workflows.
- Dashboard and administration interfaces.
- Deployment using Vercel.

---

**Developed as a portfolio project by Mariem L.**

*Saveur & Aroma — A digital restaurant experience.*
