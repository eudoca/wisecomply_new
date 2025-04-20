# WiseComply UI Component Library

This directory contains reusable UI components designed to provide a consistent look and feel across the WiseComply application.

## Core Components

### Button
```tsx
import { Button } from '@/components/ui/button';

<Button variant="primary" size="md">Click Me</Button>
```

**Available Variants:**
- `primary` - Brand primary color, used for primary actions
- `secondary` - Grey background, used for secondary actions
- `outline` - White with border, used for less prominent actions
- `ghost` - No background, used for the least prominent actions
- `link` - Appears as a text link
- `success` - Green, indicates successful or positive actions
- `danger` - Red, indicates destructive or dangerous actions
- `warning` - Yellow, indicates actions that need caution

**Available Sizes:**
- `xs` - Extra small
- `sm` - Small
- `md` - Medium (default)
- `lg` - Large

**Additional Props:**
- `leftIcon` / `rightIcon` - Add icons to either side
- `isLoading` - Shows a loading spinner
- `fullWidth` - Makes the button take up 100% width

### Card
```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Optional description</CardDescription>
  </CardHeader>
  <CardContent>
    Main content goes here
  </CardContent>
  <CardFooter>
    Footer content
  </CardFooter>
</Card>
```

**Available Variants:**
- `default` - Standard card with light border
- `bordered` - Card with more prominent border
- `elevated` - Card with shadow
- `ghost` - Card with light grey background

**Additional Props:**
- `padding` - Controls internal spacing (`none`, `sm`, `md`, `lg`)
- `clickable` - Adds hover effects for interactive cards
- `selected` - Highlights the card as selected

### Badge
```tsx
import { Badge } from '../components/ui/Badge';

<Badge variant="success">Completed</Badge>
```

**Available Variants:**
- `default` - Grey
- `success` - Green
- `warning` - Yellow
- `error` - Red
- `info` - Blue
- `outline` - Bordered

**Available Sizes:**
- `sm` - Small
- `md` - Medium (default)

**Additional Props:**
- `rounded` - Controls border radius (`full` or `md`)
- `icon` - Option to include an icon

### Tooltip
```tsx
import { Tooltip } from '../components/ui/Tooltip';

<Tooltip text="This is a helpful tooltip">
  <InfoIcon />
</Tooltip>
```

**Available Options:**
- `position` - Where tooltip appears (`top`, `bottom`, `left`, `right`)
- `variant` - Styling (`default`, `info`, `warning`)
- `maxWidth` - Controls max width in pixels
- `delay` - Milliseconds before tooltip appears on hover

### Input
```tsx
import { Input } from '../components/ui/Input';

<Input
  label="Email"
  placeholder="Enter your email"
  helperText="We'll never share your email"
  error={errors.email}
/>
```

**Available Props:**
- `label` - Input label text
- `helperText` - Explanatory text below the input
- `error` - Error message (also styles the input as invalid)
- `leftIcon` / `rightIcon` - Add icons to either side
- `isSuccess` - Styles the input as valid/successful
- `fullWidth` - Makes the input take up 100% width

### Typography
```tsx
import { H1, H2, H3, H4, Paragraph, SmallText, Label, InlineCode } from '../components/ui/Typography';

<H1>Page Title</H1>
<H2>Section Heading</H2>
<Paragraph>This is a paragraph of text that provides information to the user.</Paragraph>
<SmallText>Additional information in smaller text</SmallText>
```

**Available Components:**
- `H1`, `H2`, `H3`, `H4` - Heading elements with appropriate sizing and weights
- `Paragraph` - Standard paragraph text
- `SmallText` - Smaller text for secondary information
- `Label` - Form labels with consistent styling
- `InlineCode` - For displaying code snippets inline

All typography components accept standard HTML attributes plus a `className` prop for additional customization.

## Design Principles

1. **Consistency** - Use the provided components rather than creating custom UI elements
2. **Typography** - DM Sans is our primary font family:
   - Font weights: 400 (regular), 500 (medium), 700 (bold)
   - Default body text: 16px (1rem)
   - Use appropriate heading sizes: h1 (1.5rem), h2 (1.25rem), h3 (1.125rem)
3. **Hierarchy** - Use appropriate text sizes and UI elements to establish visual hierarchy
4. **Feedback** - Provide clear feedback for user actions (hover/focus states, etc.)
5. **Accessibility** - Ensure UI is accessible (proper contrast, focus indicators, etc.)

## CSS Utilities

Leverage Tailwind's utility classes for layout and spacing:

- Use `space-y-N` and `space-x-N` for consistent spacing between items
- Use `gap-N` for grid and flex layouts
- Use standard sizing increments (0.5, 1, 2, 3, 4, 6, 8, etc.)
- Use standard color scales from the Tailwind palette

## Color System

- `purple-600` (`brand-primary`) - Primary actions, active states
- `gray-100` to `gray-900` - Text, borders, backgrounds
- `green-*` - Success states, completed items
- `red-*` - Error states, destructive actions
- `yellow-*` - Warning states, items needing attention
- `blue-*` - Information states

## Best Practices

1. Always use the correct semantic element for its purpose
2. Maintain consistent spacing throughout your UIs
3. Use appropriate colors based on the color system
4. Test your UI for both desktop and mobile
5. Consider keyboard users and ensure proper tab order 