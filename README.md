# Meet5Dashboard

# Meet5 Web Version (Angular)

This is a **web-based desktop/iPad version** of the Meet5 mobile app, implemented in **Angular 17+** with **Angular Material**.  
It includes:

- Responsive **navbar** with location selection and notifications
- **Activities page** with search bar, filters, sorting, and dummy activity cards
- **Filter dialog** (categories, age, type, toggles, date range, language)
- **Sort dialog** (sort by relevance, participants, date/time, distance, creation date)
- Dark UI styling inspired by Meet5

---

## 🔹 Features

### Navbar

- menu
- City location display 
- Notifications badge

### Activities Page

- Search bar (title, address, location, weekday)
- Sort and Filter buttons
- Create activity button
- Activity cards with mock data, participants, images, and metadata

### Filter Dialog

- Categories 
- Age range slider
- Activity type (all / women only / weekly-monthly)
- Toggles: hide full, hide XXL, hide global
- Date range toggle
- Language selection dropdown
- Cancel / Apply buttons

### Sort Dialog

- Sort options with icons
- Reset button
- Cancel / Save buttons

---

## 🛠 Prerequisites

- Node.js >= 20
- npm >= 10
- Angular CLI >= 17

---

## ⚡ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/meet5-web.git
cd meet5-web
npm install

ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.
