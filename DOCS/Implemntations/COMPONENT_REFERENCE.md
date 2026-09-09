# 🎨 Component Library Reference

Quick reference for using the built components in the School Portal.

---

## 🔘 Button Component

**Location**: `src/components/common/Button.tsx`

### Props

| Prop      | Type                                                           | Default     | Description             |
| --------- | -------------------------------------------------------------- | ----------- | ----------------------- |
| variant   | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'danger'` | `'primary'` | Button style variant    |
| size      | `'sm' \| 'md' \| 'lg'`                                         | `'md'`      | Button size             |
| isLoading | `boolean`                                                      | `false`     | Shows loading spinner   |
| fullWidth | `boolean`                                                      | `false`     | Makes button full width |
| children  | `ReactNode`                                                    | required    | Button content          |

### Usage Examples

```tsx
import { Button } from '../components/common/Button';

// Primary button
<Button variant="primary">Save</Button>

// Loading button
<Button isLoading>Submitting...</Button>

// Full width button
<Button fullWidth>Login</Button>

// Different variants
<Button variant="secondary">Cancel</Button>
<Button variant="outline">Edit</Button>
<Button variant="ghost">View More</Button>
<Button variant="danger">Delete</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

---

## 🎴 Card Component

**Location**: `src/components/common/Card.tsx`

### Props

| Prop      | Type                             | Default  | Description              |
| --------- | -------------------------------- | -------- | ------------------------ |
| title     | `string`                         | -        | Card title               |
| subtitle  | `string`                         | -        | Card subtitle            |
| padding   | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'`   | Card padding             |
| hoverable | `boolean`                        | `false`  | Adds hover shadow effect |
| children  | `ReactNode`                      | required | Card content             |

### Usage Examples

```tsx
import { Card } from '../components/common/Card';

// Basic card
<Card>
  <p>Content here</p>
</Card>

// Card with title
<Card title="Dashboard Stats">
  <p>Statistics content</p>
</Card>

// Card with title and subtitle
<Card
  title="Recent Activity"
  subtitle="Last 7 days"
>
  <p>Activity list</p>
</Card>

// Hoverable card
<Card hoverable>
  <p>Clickable card</p>
</Card>

// Different paddings
<Card padding="none">No padding</Card>
<Card padding="sm">Small padding</Card>
<Card padding="lg">Large padding</Card>
```

---

## 📝 Input Component

**Location**: `src/components/common/Input.tsx`

### Props

Extends all HTML input attributes plus:

| Prop       | Type     | Default | Description             |
| ---------- | -------- | ------- | ----------------------- |
| label      | `string` | -       | Input label             |
| error      | `string` | -       | Error message           |
| helperText | `string` | -       | Helper text below input |

### Usage Examples

```tsx
import { Input } from '../components/common/Input';

// Basic input
<Input placeholder="Enter name" />

// With label
<Input
  label="Email Address"
  type="email"
  placeholder="john@example.com"
/>

// With error
<Input
  label="Password"
  type="password"
  error="Password is required"
/>

// With helper text
<Input
  label="Username"
  helperText="Must be 3-20 characters"
/>

// Disabled input
<Input
  label="User ID"
  value="12345"
  disabled
/>

// In a form
<form onSubmit={handleSubmit}>
  <Input
    label="Full Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    required
  />
  <Input
    label="Email"
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
  />
  <Button type="submit">Submit</Button>
</form>
```

---

## 👤 Avatar Component

**Location**: `src/components/common/Avatar.tsx`

### Props

| Prop | Type                                   | Default | Description                |
| ---- | -------------------------------------- | ------- | -------------------------- |
| src  | `string`                               | -       | Image URL                  |
| alt  | `string`                               | -       | Alt text for image         |
| name | `string`                               | -       | Name for initials fallback |
| size | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'`  | Avatar size                |

### Usage Examples

```tsx
import { Avatar } from '../components/common/Avatar';

// With image
<Avatar
  src="/path/to/image.jpg"
  alt="User name"
  size="md"
/>

// With name (shows initials)
<Avatar
  name="John Doe"
  size="lg"
/>

// Different sizes
<Avatar name="AB" size="xs" />  // Extra small
<Avatar name="AB" size="sm" />  // Small
<Avatar name="AB" size="md" />  // Medium
<Avatar name="AB" size="lg" />  // Large
<Avatar name="AB" size="xl" />  // Extra large

// In a list
<div className="flex items-center space-x-3">
  <Avatar name={user.name} size="md" />
  <div>
    <p className="font-medium">{user.name}</p>
    <p className="text-sm text-gray-500">{user.email}</p>
  </div>
</div>
```

---

## 🎯 Common Patterns

### Dashboard Stats Card

```tsx
<Card hoverable>
  <div className="flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-500 font-medium">Total Students</p>
      <p className="text-3xl font-bold text-gray-800 mt-2">1,248</p>
      <p className="text-sm text-green-600 mt-1">↑ 12% from last month</p>
    </div>
    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
      <span className="text-2xl">🎓</span>
    </div>
  </div>
</Card>
```

### List Item with Avatar

```tsx
<div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
  <div className="flex items-center space-x-3">
    <Avatar name="Student Name" size="md" />
    <div>
      <p className="font-medium text-gray-800">Student Name</p>
      <p className="text-sm text-gray-500">Grade 10 - Class A</p>
    </div>
  </div>
  <Button variant="ghost" size="sm">
    View
  </Button>
</div>
```

### Form Layout

```tsx
<Card title="Add New Student">
  <form onSubmit={handleSubmit} className="space-y-4">
    <Input
      label="First Name"
      value={firstName}
      onChange={(e) => setFirstName(e.target.value)}
      required
    />
    <Input
      label="Last Name"
      value={lastName}
      onChange={(e) => setLastName(e.target.value)}
      required
    />
    <Input
      label="Email"
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />
    <div className="flex space-x-3">
      <Button variant="outline" type="button">
        Cancel
      </Button>
      <Button type="submit" isLoading={isSubmitting}>
        Create Student
      </Button>
    </div>
  </form>
</Card>
```

### Grid Layout

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  <Card>Content 1</Card>
  <Card>Content 2</Card>
  <Card>Content 3</Card>
  <Card>Content 4</Card>
</div>
```

---

## 🎨 Tailwind Utilities Quick Reference

### Colors

```tsx
// Primary colors
className = "bg-primary text-primary border-primary";
className = "bg-primary-dark text-primary-dark";
className = "bg-primary-light text-primary-light";

// Accent
className = "bg-accent text-accent";

// Grays
className = "bg-gray-50 bg-gray-100 bg-gray-200";
className = "text-gray-500 text-gray-600 text-gray-800";
```

### Spacing

```tsx
// Padding
className = "p-4"; // All sides
className = "px-4 py-2"; // Horizontal & Vertical
className = "pt-4 pb-2"; // Top & Bottom

// Margin
className = "m-4"; // All sides
className = "mx-auto"; // Center horizontally
className = "mt-4 mb-2"; // Top & Bottom

// Gap (for flex/grid)
className = "gap-4 space-x-3 space-y-4";
```

### Layout

```tsx
// Flexbox
className = "flex items-center justify-between";
className = "flex flex-col space-y-4";

// Grid
className = "grid grid-cols-3 gap-4";
className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
```

### Typography

```tsx
className = "text-sm text-base text-lg text-xl text-2xl text-3xl";
className = "font-normal font-medium font-semibold font-bold";
className = "text-left text-center text-right";
```

### Borders & Shadows

```tsx
className = "border border-2 border-gray-300";
className = "rounded rounded-lg rounded-full";
className = "shadow shadow-md shadow-lg";
```

---

## 📦 Import Paths

```tsx
// Components
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { Input } from "@/components/common/Input";
import { Avatar } from "@/components/common/Avatar";

// Contexts
import { useAuth } from "@/contexts/AuthContext";

// Types
import { User, UserRole, Student } from "@/types";

// Router
import { useNavigate, useLocation } from "react-router-dom";
```

---

Happy coding! 🚀
