# Installation Guide - Tawasaa Arabic Theme

This guide will help you install and configure the Tawasaa Arabic Theme on your e-commerce platform.

## Prerequisites

- Tawasaa platform installed and running
- Twig template engine (version 3.0 or higher)
- Web server with PHP support
- Modern web browser for testing

## Installation Steps

### Step 1: Download and Extract Theme Files

1. Download the Tawasaa Arabic Theme package
2. Extract the files to your Tawasaa installation directory
3. Ensure the following directory structure exists:

```
your-tawasaa-installation/
├── assets/
│   ├── css/
│   │   ├── rtl.css
│   │   ├── slider.css
│   │   └── modern-ui.css
│   └── js/
│       ├── slider.js
│       └── modern-ui.js
└── views/
    ├── layout/
    │   └── master.twig
    ├── home/
    │   ├── slider.twig
    │   └── index-new.twig
    └── products/
        └── product-card.twig
```

### Step 2: Install Twig (if not already installed)

If Twig is not installed, run the following command in your project directory:

```bash
composer require "twig/twig:^3.0"
```

### Step 3: Configure Your Layout Template

Update your main layout template to include the Arabic theme assets:

```html
<!DOCTYPE html>
<html lang="{{ app.getLocale() }}" dir="{{ app.getLocale() == 'ar' ? 'rtl' : 'ltr' }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Google Fonts for Arabic -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700;800;900&family=Noto+Sans+Arabic:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    
    <!-- Bootstrap CSS (if using) -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    
    <!-- Theme CSS Files -->
    <link rel="stylesheet" href="{{ asset('assets/css/slider.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/modern-ui.css') }}">
    
    <!-- RTL CSS for Arabic -->
    {% if app.getLocale() == 'ar' %}
    <link rel="stylesheet" href="{{ asset('assets/css/rtl.css') }}">
    {% endif %}
</head>
<body class="{{ app.getLocale() == 'ar' ? 'rtl' : 'ltr' }}">
    <!-- Your content here -->
    
    <!-- JavaScript Files -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="{{ asset('assets/js/slider.js') }}"></script>
    <script src="{{ asset('assets/js/modern-ui.js') }}"></script>
</body>
</html>
```

### Step 4: Configure Language Settings

Ensure your application can detect and set the Arabic locale:

```php
// In your application configuration
if ($userLanguage === 'ar' || $userLanguage === 'arabic') {
    $app->setLocale('ar');
    // Set RTL direction
    $app->setDirection('rtl');
}
```

### Step 5: Update Your Home Page Template

Replace or update your home page template to use the new Arabic-enhanced version:

```twig
{% extends "layout/master.twig" %}

{% block content %}
    <!-- Include the slider component -->
    {% include 'home/slider.twig' %}
    
    <!-- Your other home page content -->
{% endblock %}
```

### Step 6: Configure the Slider

Add slider content to your home page or CMS:

```twig
<!-- In your home/slider.twig or directly in templates -->
<div class="slider-container" data-slider data-autoplay="true" data-interval="5000">
    <div class="slider-slide" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
        <div class="slider-content">
            <h1 class="slider-title">مرحباً بكم في منصة توسع</h1>
            <p class="slider-description">اكتشف عالماً من المنتجات المميزة والعروض الحصرية</p>
            <a href="#" class="slider-cta">ابدأ التسوق الآن</a>
        </div>
    </div>
    <!-- Add more slides as needed -->
</div>
```

## Configuration Options

### Slider Configuration

You can customize the slider behavior by modifying the data attributes:

```html
<div class="slider-container" 
     data-slider 
     data-autoplay="true" 
     data-interval="5000"
     data-loop="true"
     data-dots="true"
     data-nav="true">
    <!-- Slides here -->
</div>
```

Available options:
- `data-autoplay`: Enable/disable auto-play (true/false)
- `data-interval`: Auto-play interval in milliseconds (default: 5000)
- `data-loop`: Enable/disable infinite loop (true/false)
- `data-dots`: Show/hide dot indicators (true/false)
- `data-nav`: Show/hide navigation arrows (true/false)

### Color Customization

Customize the theme colors by overriding CSS custom properties:

```css
:root {
    --primary-color: #your-primary-color;
    --primary-gradient: linear-gradient(135deg, #color1 0%, #color2 100%);
    --secondary-color: #your-secondary-color;
    --accent-color: #your-accent-color;
}
```

### Font Customization

To use different Arabic fonts, update the font imports and CSS:

```css
/* Import your preferred Arabic fonts */
@import url('https://fonts.googleapis.com/css2?family=YourArabicFont:wght@400;600;700&display=swap');

/* Apply to Arabic content */
html[dir="rtl"] body {
    font-family: 'YourArabicFont', 'Cairo', Arial, sans-serif;
}
```

## Testing Your Installation

### Step 1: Test Basic Functionality

1. Open your website in a web browser
2. Switch to Arabic language (if language switching is available)
3. Verify that:
   - Text is aligned to the right
   - Navigation flows right-to-left
   - Arabic fonts are loading correctly

### Step 2: Test the Slider

1. Navigate to the home page
2. Verify the slider is working:
   - Auto-play functionality
   - Navigation arrows
   - Dot indicators
   - Touch/swipe gestures on mobile

### Step 3: Test Product Cards

1. Navigate to product listing pages
2. Verify product cards display correctly:
   - Arabic product names
   - Proper price formatting
   - Hover effects
   - Action buttons

### Step 4: Test Forms

1. Find contact or registration forms
2. Verify:
   - Arabic labels display correctly
   - Input fields are right-aligned
   - Form validation works
   - Submit buttons have Arabic text

## Troubleshooting

### Common Issues and Solutions

#### Fonts Not Loading
**Problem**: Arabic fonts are not displaying correctly
**Solution**: 
- Check that Google Fonts links are included in your HTML head
- Verify your internet connection allows external font loading
- Consider hosting fonts locally if external access is restricted

#### RTL Layout Not Working
**Problem**: Content is still left-aligned
**Solution**:
- Ensure the HTML `dir="rtl"` attribute is set
- Verify that `rtl.css` is being loaded
- Check that the locale detection is working correctly

#### Slider Not Functioning
**Problem**: Slider is not auto-playing or navigation doesn't work
**Solution**:
- Verify that `slider.js` is loaded after the DOM content
- Check browser console for JavaScript errors
- Ensure the slider HTML structure matches the expected format

#### Styling Issues
**Problem**: Elements are not styled correctly
**Solution**:
- Check that all CSS files are loading in the correct order
- Verify file paths are correct
- Clear browser cache
- Check for CSS conflicts with existing styles

### Browser Compatibility Issues

If you experience issues with specific browsers:

1. **Internet Explorer**: This theme requires modern browser features. Consider showing a browser upgrade message for IE users.

2. **Safari**: Ensure CSS Grid and Flexbox fallbacks are in place for older Safari versions.

3. **Mobile Browsers**: Test touch gestures and responsive design on actual devices.

## Performance Optimization

### CSS Optimization
- Minify CSS files for production
- Combine CSS files to reduce HTTP requests
- Use CSS compression on your web server

### JavaScript Optimization
- Minify JavaScript files
- Consider lazy loading for non-critical scripts
- Use browser caching headers

### Font Optimization
- Consider using `font-display: swap` for better loading performance
- Preload critical fonts
- Use font subsetting for Arabic fonts if possible

## Support and Maintenance

### Regular Updates
- Keep Twig updated to the latest stable version
- Monitor for theme updates and security patches
- Test thoroughly after any updates

### Backup Recommendations
- Always backup your customizations before updates
- Keep a copy of your configuration files
- Document any custom modifications

### Getting Help
- Check the theme documentation for common issues
- Review browser console for error messages
- Test in different browsers to isolate issues

---

**Installation Complete!** Your Tawasaa Arabic Theme should now be fully functional. If you encounter any issues, refer to the troubleshooting section or contact support.

