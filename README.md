# StartupX - Landing Page for a Fake Tech Startup

A modern, responsive single-page website built with HTML, CSS, and JavaScript (no frameworks). This landing page showcases a fictional tech startup with all the essential sections and interactive features.

## 🚀 Features

### Core Sections
- **Hero Section** - Animated gradient background with call-to-action buttons
- **Features Section** - 4 key features with icons and hover effects
- **Testimonials Section** - Customer testimonials with avatars
- **Pricing Section** - 3 pricing tiers with flip animations and monthly/yearly toggle
- **About Section** - Company mission, values, and team members
- **Contact Section** - Contact form and embedded Google Maps
- **Footer** - Links and social media icons

### Interactive Features
- **Sticky Navigation** - Becomes sticky on scroll with active section highlighting
- **Smooth Scrolling** - Smooth navigation between sections
- **Light/Dark Mode Toggle** - Theme switching with localStorage persistence
- **Mobile Responsive** - Fully responsive design for all devices
- **Pricing Toggle** - Switch between monthly and yearly pricing
- **Flip Animations** - CSS 3D flip effects on pricing cards
- **Contact Form** - Form validation and submission handling
- **Scroll Animations** - Intersection Observer for scroll-triggered animations
- **Mobile Menu** - Hamburger menu for mobile devices

### Technical Features
- **CSS Custom Properties** - Theme-aware color variables
- **CSS Grid & Flexbox** - Modern layout techniques
- **CSS Animations** - Smooth transitions and keyframe animations
- **JavaScript ES6+** - Modern JavaScript features
- **Performance Optimized** - Throttled scroll events and efficient animations
- **Accessibility** - Semantic HTML and keyboard navigation support

## 🎨 Design Features

### Color Scheme
- **Light Theme**: Clean white background with purple/blue accents
- **Dark Theme**: Dark gray backgrounds with lighter text and accents
- **Gradient Animations**: Animated hero background with multiple color stops

### Typography
- Modern sans-serif font stack (Inter, system fonts)
- Responsive font sizing
- Proper contrast ratios for accessibility

### Animations
- Gradient shift animation on hero background
- Hover effects on cards and buttons
- Scroll-triggered animations using Intersection Observer
- Smooth transitions throughout the interface

## 📱 Responsive Design

The website is fully responsive and optimized for:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (320px - 767px)

### Mobile Features
- Collapsible hamburger menu
- Touch-friendly button sizes
- Optimized spacing and typography
- Simplified layouts for smaller screens

## 🛠️ Technical Implementation

### HTML Structure
- Semantic HTML5 elements (`<section>`, `<nav>`, `<main>`, etc.)
- Proper heading hierarchy
- Accessible form labels and ARIA attributes
- Clean, well-organized markup

### CSS Architecture
- CSS Custom Properties for theming
- Mobile-first responsive design
- BEM-like naming conventions
- Modular component styles
- CSS Grid and Flexbox for layouts

### JavaScript Features
- ES6+ syntax and features
- Event delegation and efficient event handling
- Local storage for theme persistence
- Form validation and submission
- Intersection Observer for animations
- Performance optimizations

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools or dependencies required

### Installation
1. Clone or download the project files
2. Open `index.html` in your web browser
3. That's it! The website is ready to use

### File Structure
```
startupx-landing/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🎯 Usage

### Navigation
- Click navigation links to smoothly scroll to sections
- Navigation highlights the current section while scrolling
- Mobile users can use the hamburger menu

### Theme Toggle
- Click the moon/sun icon in the navigation to switch themes
- Theme preference is saved in localStorage
- Automatically applies on page reload

### Pricing Toggle
- Use the toggle switch in the pricing section
- Switch between monthly and yearly pricing
- 20% discount applied for yearly plans

### Contact Form
- Fill out the contact form with name, email, and message
- Form validates input and shows success/error notifications
- Simulated form submission (no actual backend)

### Interactive Elements
- Hover over pricing cards to see flip animations
- Scroll to trigger entrance animations
- Click buttons for hover effects

## 🎨 Customization

### Colors
Modify the CSS custom properties in `styles.css`:

```css
:root {
    --primary-color: #6366f1;
    --primary-dark: #4f46e5;
    --secondary-color: #f59e0b;
    /* ... other colors */
}
```

### Content
- Update text content in `index.html`
- Replace placeholder images with your own
- Modify team member information
- Update contact details and map location

### Styling
- Adjust spacing, fonts, and colors in `styles.css`
- Modify animations and transitions
- Customize responsive breakpoints

## 🌟 Browser Support

- **Chrome** 60+
- **Firefox** 55+
- **Safari** 12+
- **Edge** 79+

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or need help with customization, please open an issue on the project repository.

---

**Built with ❤️ using HTML, CSS, and JavaScript** 