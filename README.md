# Ensake Rewards App

A modern, production-ready Next.js application for user authentication and rewards management, featuring localization, robust API integration, and a clean, modular codebase.

---

## 🚀 Features

- **User Authentication**: Secure login with email and password, token storage with TTL, and device fingerprinting.
- **Rewards Dashboard**: View user points, total rewards, and a list of available and claimable rewards.
- **Claim Rewards**: Claim rewards with client-side validation and real-time UI updates.
- **Localization**: Switch between English and German for all static text (frontend only).
- **Sorting**: Sort rewards by points (ascending/descending) with a simple toggle.
- **Responsive UI**: Clean, accessible, and responsive design using Tailwind CSS.
- **Robust Error Handling**: Toast notifications for all API and validation errors.
- **State Management**: Uses React state and localStorage for tokens, user info, and points.
- **Device Header**: Dynamically generates a unique device header for all API requests.

---

## 🏗️ Folder Structure

```
├── src/
│   ├── components/         # Reusable React components (LoginForm, Rewards, Sidebar, RewardCard, LanguageToggle)
│   ├── lib/                # Utility libraries (api, auth, device, i18n, LanguageContext, utils)
│   ├── pages/              # Next.js pages (index.tsx, rewards.tsx, _app.tsx)
│   ├── types/              # TypeScript type definitions (rewards.ts)
│   └── app/                # Global styles (globals.css)
├── public/                 # Static assets (logos, avatars, etc.)
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
├── next.config.js          # Next.js configuration (API proxy, image domains)
└── README.md               # This file
```

---

## ⚙️ Setup & Running Locally

1. **Clone the repository:**

   ```bash
   git clone https://github.com/lope1999/ensake.git
   cd ensake
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000)

---

## 🧩 Key Architectural Choices

### **Next.js**

- Used for its hybrid static/server rendering, routing, and API integration.
- Pages are in `src/pages/` for easy routing.

### **State Management**

- **React state** for UI and session data (points, rewards, loading, etc.).
- **localStorage** for persisting tokens and user info with TTL (5 minutes).
- **LanguageContext** for global language selection.

### **API Integration**

- All API requests use a centralized `apiRequest` utility in `src/lib/api.ts`.
- Headers include `Content-Type`, `Authorization`, and a dynamically generated `Ensake-Device` header (UUID, platform, browser/version).
- API errors and session expiry are handled globally with toasts and redirects.

### **Localization (i18n)**

- Language selection is managed via a React context (`LanguageContext`).
- All static text is translated using a dictionary (`src/lib/i18n.ts`).
- Users can switch between English and German via a dropdown in the UI.

### **UI & UX**

- Built with Tailwind CSS for rapid, consistent styling.
- Responsive layouts, accessible forms, and clear feedback (toasts, disabled buttons, etc.).
- Sidebar and header components for navigation and user info.

### **Rewards Logic**

- Rewards are fetched and displayed in two lists: available and claimable.
- Users can sort rewards by points (ascending/descending).
- Claiming a reward updates points and disables the button.
- All reward cards are rendered via a reusable `RewardCard` component.

---

## 📝 Customization & Extensibility

- **Add more languages**: Extend the `translations` object in `src/lib/i18n.ts`.
- **Add more sorting/filtering**: Enhance the sort logic in `Rewards.tsx`.
- **Add more user info**: Store and display additional fields in the user object.
- **API endpoints**: Update `BASE_URL` and endpoints in `src/lib/api.ts` as needed.

---

## 🛠️ Dependencies

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [react-toastify](https://fkhadra.github.io/react-toastify/)
- [ua-parser-js](https://github.com/faisalman/ua-parser-js) (for device header)
- [lucide-react](https://lucide.dev/) (for icons)

---

## 📄 License

This project is for demonstration and assessment purposes.

---

## 🙏 Acknowledgements

- Ensake Loyalties API and design mockups
- All open-source libraries used

---

## 💡 Questions?

If you have any questions or suggestions, please open an issue or contact the maintainer.
