# Home Page Components

This folder contains all the modular components for the landing page (Home).

## Component Structure

### 1. **HeroSection.tsx**

- **Purpose:** Main hero banner with call-to-action and registration card
- **Features:**
  - Large heading with "Master the skills to drive your career"
  - CTA buttons (Register, Watch Video)
  - Registration form card on the right
  - Background gradients and decorative elements
  - Stats display (86% success rate, 100+ courses)

### 2. **WhyChooseSection.tsx**

- **Purpose:** Showcase reasons to choose the platform
- **Features:**
  - "There's gold in them skills" heading
  - Student image on the left
  - Feature cards (Certifiably Awesome, Cloud Trainable)
  - Bottom icon strip with technology symbols

### 3. **SkillsCloudSection.tsx**

- **Purpose:** Highlight learning paths and skill-building options
- **Features:**
  - "King of the Skill" heading
  - Three-column layout with center featured card
  - "Build Skills Your Way" center card with CTA
  - Side cards for certifications and cloud training

### 4. **LearnByDoingSection.tsx**

- **Purpose:** Emphasize hands-on learning approach
- **Features:**
  - "Learn by doing - Get your own cloud" heading
  - Image with students collaborating
  - Feature list with checkmarks
  - Descriptive text about hands-on practice

### 5. **FeaturesSection.tsx**

- **Purpose:** Display platform features and stats
- **Features:**
  - "Feature Comforts" heading
  - Stats bar (86%, 97%, 100+)
  - 6-card grid layout
  - Featured "Unlimited Courses" card with CTA
  - Cards: Cloud Sandboxes, Career Paths, Curated Updates, Expert Instructors, Community Support

### 6. **TestimonialsSection.tsx**

- **Purpose:** Build trust with testimonials and social proof
- **Features:**
  - "Trusted by Partners and Customers" heading
  - Stats grid (500+ clients, 98% satisfaction, 1M+ learners, 50+ countries)
  - Large testimonial card with quote
  - Customer profile with rating
  - Company logos

### 7. **NewsletterSection.tsx**

- **Purpose:** Newsletter signup and contact information
- **Features:**
  - "Our Newsletter" heading
  - Contact information (email, phone, address)
  - Social media links
  - Newsletter subscription form
  - Dark purple gradient background

## Usage

All components are imported and rendered in `index.tsx`:

```tsx
import HeroSection from "./components/HeroSection";
import WhyChooseSection from "./components/WhyChooseSection";
// ... other imports

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <WhyChooseSection />
      <SkillsCloudSection />
      <LearnByDoingSection />
      <FeaturesSection />
      <TestimonialsSection />
      <NewsletterSection />
    </div>
  );
};
```

## Design Pattern

Each component:

- Is self-contained with its own styling
- Uses Tailwind CSS for responsive design
- Follows the design language from the reference image
- Can be easily reordered or removed
- Has clear section boundaries with proper spacing

## Customization

To customize any section:

1. Open the specific component file
2. Modify content, colors, or layout
3. Changes are isolated to that component only
4. No need to touch other sections

## Color Scheme

- **Primary:** Blue shades (blue-400 to blue-700)
- **Accent:** Yellow (yellow-400/500) for CTAs
- **Dark sections:** Indigo/purple gradients (900-800)
- **Light sections:** White to gray-50 gradients

## Responsive Design

All components are fully responsive:

- Mobile: Single column layouts
- Tablet (md): Two-column grids
- Desktop (lg): Full multi-column layouts
