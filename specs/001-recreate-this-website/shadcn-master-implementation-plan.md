# shadcn Implementation Master Plan

## Project Metadata
- **Generated**: 2025-09-15
- **Based on Requirements**: shadcn-component-requirements.md v1.0
- **Total Components**: 24 components across 6 categories
- **Estimated Implementation Time**: 4-5 days
- **Project**: Verdant Café Website Recreation

## Implementation Summary

This master plan provides comprehensive implementation guidance for all 24 shadcn/ui components required for the Verdant Café luxury coffee shop website. The strategy focuses on phased implementation with emphasis on custom theming for the luxury brand aesthetic, mobile-first responsive design, and WCAG 2.1 AA accessibility compliance.

## Phase-Based Implementation Strategy

### Phase 1: Foundation Components (Days 1-2)
**Priority**: Critical - Core functionality depends on these

| Component | Registry Path | Bundle Size | Dependencies | Custom Theme Required |
|-----------|---------------|-------------|--------------|----------------------|
| Button | `@shadcn/button` | ~2KB | class-variance-authority | Gold (#C4A661) primary variant |
| Card | `@shadcn/card` | ~1KB | None | Luxury styling with subtle shadows |
| Form | `@shadcn/form` | ~3KB | react-hook-form, @hookform/resolvers | Elegant validation styling |
| Input | `@shadcn/input` | ~1KB | None | Deep green focus states |
| Label | `@shadcn/label` | ~0.5KB | @radix-ui/react-label | Typography hierarchy |

**Implementation Notes**:
- Start with Button as it's required by many other components
- Card provides the foundation for menu items and content sections
- Form components establish the foundation for newsletter and contact functionality

### Phase 2: Core Features (Day 3)
**Priority**: High - Essential for main functionality

| Component | Registry Path | Bundle Size | Dependencies | Custom Theme Required |
|-----------|---------------|-------------|--------------|----------------------|
| Sheet | `@shadcn/sheet` | ~4KB | @radix-ui/react-dialog | Mobile menu styling |
| Toast | `sonner` | ~5KB | sonner | Success/error variants |
| Alert | `@shadcn/alert` | ~1KB | None | Branded alert styling |
| Badge | `@shadcn/badge` | ~0.5KB | class-variance-authority | Category color variants |
| Separator | `@shadcn/separator` | ~0.5KB | @radix-ui/react-separator | Elegant divider styling |
| Dropdown Menu | `@shadcn/dropdown-menu` | ~4KB | @radix-ui/react-dropdown-menu | Brand-consistent styling |
| Textarea | `@shadcn/textarea` | ~1KB | None | Matching input styling |
| Checkbox | `@shadcn/checkbox` | ~2KB | @radix-ui/react-checkbox | Custom checkbox styling |

**Implementation Notes**:
- Sheet component is critical for mobile navigation
- Toast notifications provide essential user feedback
- Navigation and filtering components enhance user experience

### Phase 3: Enhancement Components (Day 4)
**Priority**: Medium - Improves user experience

| Component | Registry Path | Bundle Size | Dependencies | Custom Theme Required |
|-----------|---------------|-------------|--------------|----------------------|
| Accordion | `@shadcn/accordion` | ~3KB | @radix-ui/react-accordion | Smooth animations |
| Tooltip | `@shadcn/tooltip` | ~2KB | @radix-ui/react-tooltip | Elegant appearance |
| Skeleton | `@shadcn/skeleton` | ~0.5KB | None | Subtle loading states |
| Scroll Area | `@shadcn/scroll-area` | ~2KB | @radix-ui/react-scroll-area | Custom scrollbar styling |
| Command | `@shadcn/command` | ~8KB | cmdk | Search functionality styling |
| Collapsible | `@shadcn/collapsible` | ~1KB | @radix-ui/react-collapsible | Brand animations |

**Implementation Notes**:
- These components add polish and enhanced functionality
- Focus on smooth animations and micro-interactions
- Command component enables advanced menu search

## Component Implementation Details

### Button Component Implementation
```typescript
// Installation
npx shadcn-ui@latest add button

// Custom variants for luxury café theme
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none",
  {
    variants: {
      variant: {
        default: "bg-[#2C4A3C] text-white hover:bg-[#234336]",
        primary: "bg-[#C4A661] text-white hover:bg-[#B5956B]",
        secondary: "bg-[#F5F1E6] text-[#2C4A3C] hover:bg-[#EDE9DC]",
        ghost: "hover:bg-[#F5F1E6] text-[#2C4A3C]"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)
```

### Card Component Implementation
```typescript
// Installation
npx shadcn-ui@latest add card

// Custom card styling for menu items
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border border-[#E5E5E5] bg-[#FEFEFE] shadow-sm transition-shadow hover:shadow-md",
        className
      )}
      {...props}
    />
  )
)
```

### Form Component Implementation
```typescript
// Installation
npx shadcn-ui@latest add form

// Custom form styling with luxury theme
const formFieldStyles = {
  label: "text-sm font-medium leading-none text-[#2C4A3C] peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  description: "text-sm text-[#6B7280]",
  message: "text-sm font-medium text-red-500"
}
```

## Theme Integration Strategy

### CSS Custom Properties
```css
:root {
  /* Luxury café color palette */
  --primary: 44 74 60; /* Deep Green #2C4A3C */
  --primary-foreground: 255 255 255;
  --secondary: 196 166 97; /* Gold #C4A661 */
  --secondary-foreground: 255 255 255;
  --background: 245 241 230; /* Cream #F5F1E6 */
  --foreground: 44 74 60;

  /* Semantic colors */
  --muted: 229 229 229;
  --muted-foreground: 107 114 128;
  --accent: 245 241 230;
  --accent-foreground: 44 74 60;
  --border: 229 229 229;
  --input: 245 241 230;
  --ring: 44 74 60;

  /* Typography */
  --font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}
```

### Responsive Design System
```css
/* Mobile-first breakpoints */
.container {
  padding: 1rem;
}

@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 3rem;
  }
}

@media (min-width: 1440px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
}
```

## Cross-Component Integration Strategies

### Navigation System Integration
```typescript
// Mobile navigation using Sheet + Button
const MobileNav = () => {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav className="flex flex-col gap-4">
          {/* Navigation items */}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
```

### Form Integration Pattern
```typescript
// Newsletter form using Form + Input + Button
const NewsletterForm = () => {
  const form = useForm({
    resolver: zodResolver(newsletterSchema)
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input placeholder="your@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="primary">
          Subscribe
        </Button>
      </form>
    </Form>
  )
}
```

### Menu Card Composition
```typescript
// Menu item card using Card + Badge + Button
const MenuItemCard = ({ item }) => (
  <Card className="overflow-hidden">
    <div className="aspect-square relative">
      <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
    </div>
    <CardHeader>
      <div className="flex justify-between items-start">
        <CardTitle>{item.name}</CardTitle>
        <Badge variant="secondary">{item.category}</Badge>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground">{item.description}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="font-semibold text-lg">${item.price}</span>
        <Button size="sm">Add to Order</Button>
      </div>
    </CardContent>
  </Card>
)
```

## Development Environment Setup

### Prerequisites
- Node.js 18.17+ or 20.5+
- npm 9+ or yarn 1.22+ or pnpm 8+
- TypeScript 5.0+

### shadcn/ui Installation
```bash
# Initialize shadcn/ui
npx shadcn-ui@latest init

# Configuration selections:
# ✅ TypeScript: Yes
# ✅ Style: CSS variables
# ✅ Base color: Custom (luxury café theme)
# ✅ Global CSS file: src/app/globals.css
# ✅ CSS variables: Yes
# ✅ Tailwind config: tailwind.config.js
# ✅ Components: src/components
# ✅ Utils: src/lib/utils
```

### Required Dependencies
```json
{
  "dependencies": {
    "@hookform/resolvers": "^3.3.1",
    "@radix-ui/react-accordion": "^1.1.2",
    "@radix-ui/react-checkbox": "^1.0.4",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-scroll-area": "^1.0.5",
    "@radix-ui/react-separator": "^1.0.3",
    "@radix-ui/react-tooltip": "^1.0.7",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "cmdk": "^0.2.0",
    "lucide-react": "^0.284.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-hook-form": "^7.46.1",
    "sonner": "^1.0.3",
    "tailwind-merge": "^1.14.0",
    "tailwindcss-animate": "^1.0.7",
    "zod": "^3.22.2"
  },
  "devDependencies": {
    "@types/react": "^18.2.22",
    "@types/react-dom": "^18.2.7",
    "tailwindcss": "^3.3.3",
    "typescript": "^5.2.2"
  }
}
```

## Accessibility Implementation

### WCAG 2.1 AA Compliance Requirements
- **Color Contrast**: All text meets 4.5:1 ratio minimum
- **Keyboard Navigation**: All interactive elements accessible via keyboard
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Focus Management**: Visible focus indicators and logical tab order

### Component-Specific Accessibility
```typescript
// Button accessibility
<Button
  aria-label="Subscribe to newsletter"
  aria-describedby="newsletter-description"
>
  Subscribe
</Button>

// Form accessibility
<FormField
  control={form.control}
  name="email"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Email Address</FormLabel>
      <FormControl>
        <Input
          {...field}
          aria-required="true"
          aria-invalid={!!form.formState.errors.email}
        />
      </FormControl>
      <FormDescription id="email-description">
        We'll never share your email with anyone else.
      </FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>
```

## Performance Optimization

### Bundle Size Management
- **Total Estimated Size**: ~45KB for all components
- **Code Splitting**: Lazy load Phase 3 components
- **Tree Shaking**: Only import used component parts

### Loading Strategy
```typescript
// Lazy loading for enhancement components
const Tooltip = lazy(() => import('@/components/ui/tooltip'))
const Command = lazy(() => import('@/components/ui/command'))

// Critical components loaded immediately
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
```

## Implementation Checklist

### Phase 1 (Days 1-2)
- [ ] Environment setup complete
- [ ] Button component implemented with luxury variants
- [ ] Card component implemented with hover effects
- [ ] Form foundation with validation styling
- [ ] Input/Label components with custom theming
- [ ] Basic accessibility testing passed

### Phase 2 (Day 3)
- [ ] Mobile navigation with Sheet component
- [ ] Toast notifications for form feedback
- [ ] Alert components for system messages
- [ ] Badge components for categorization
- [ ] Separator components for visual hierarchy
- [ ] Dropdown menu for filtering functionality
- [ ] Form components (Textarea, Checkbox) implemented

### Phase 3 (Day 4)
- [ ] Accordion for content organization
- [ ] Tooltip for additional information
- [ ] Skeleton for loading states
- [ ] Scroll Area for enhanced scrolling
- [ ] Command for search functionality
- [ ] Collapsible for mobile sections

### Phase 4 (Day 5)
- [ ] Integration testing complete
- [ ] Accessibility audit passed
- [ ] Performance benchmarks met (Lighthouse >90)
- [ ] Responsive design validated across devices
- [ ] Cross-browser testing complete

## Risk Assessment and Mitigation

### High-Risk Components
1. **Sheet (Mobile Navigation)**: Complex animation requirements
   - **Mitigation**: Use default animations, customize gradually
2. **Command (Search)**: Performance with large menu datasets
   - **Mitigation**: Implement debouncing and result limiting
3. **Form Validation**: Complex validation for contact forms
   - **Mitigation**: Use battle-tested validation libraries (Zod + React Hook Form)

### Performance Risks
- **Bundle Size**: Multiple Radix UI dependencies
  - **Mitigation**: Implement code splitting and lazy loading
- **Animation Performance**: Multiple animated components
  - **Mitigation**: Use CSS transforms and limit concurrent animations

### Browser Compatibility
- **Target**: Modern browsers (Chrome 90+, Firefox 88+, Safari 14+)
- **Fallbacks**: Graceful degradation for older browsers
- **Testing**: Cross-browser testing on BrowserStack

## Success Metrics

### Technical Metrics
- **Lighthouse Score**: >90 for Performance, Accessibility, Best Practices
- **Bundle Size**: <100KB total JavaScript
- **Load Time**: <3s on 3G, <1s on WiFi
- **Accessibility**: WCAG 2.1 AA compliance (automated + manual testing)

### User Experience Metrics
- **Mobile Usability**: All interactions work on touch devices
- **Form Completion**: Smooth form submission without errors
- **Navigation**: Intuitive menu system with search functionality
- **Visual Polish**: Consistent luxury branding throughout

---

**Ready for Implementation**: This master plan provides complete guidance for implementing all 24 shadcn/ui components with custom luxury café theming, accessibility compliance, and performance optimization. The builder agent can proceed with confidence following the phase-based approach outlined above.