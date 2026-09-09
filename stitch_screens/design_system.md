---
name: The Botanical System
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#414846'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f1f1f1'
  outline: '#717976'
  outline-variant: '#c1c8c4'
  surface-tint: '#43655c'
  primary: '#01261f'
  on-primary: '#ffffff'
  primary-container: '#1a3c34'
  on-primary-container: '#83a69c'
  inverse-primary: '#aacec3'
  secondary: '#5f5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e5e2e1'
  on-secondary-container: '#656464'
  tertiary: '#152418'
  on-tertiary: '#ffffff'
  tertiary-container: '#2a3a2c'
  on-tertiary-container: '#91a492'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c5eadf'
  primary-fixed-dim: '#aacec3'
  on-primary-fixed: '#00201a'
  on-primary-fixed-variant: '#2b4d44'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474646'
  tertiary-fixed: '#d4e8d4'
  tertiary-fixed-dim: '#b8ccb8'
  on-tertiary-fixed: '#0f1f13'
  on-tertiary-fixed-variant: '#3a4b3c'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  display:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Montserrat
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.4'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  section-gap: 80px
---

## Brand & Style

The design system is rooted in the "Safe" visual identity, blending professional retail standards with the organic tranquility of a large-scale nursery. The brand personality is dependable, expert, and calm, designed to evoke a sense of growth and reliability. 

The aesthetic follows a **Corporate Minimalist** approach. It avoids decorative flourishes to ensure the plant photography remains the focal point. By utilizing heavy whitespace and a structured grid, the system creates a high-end "botanical gallery" experience that feels accessible to both novice gardeners and professional landscapers. The interface prioritizes clarity, legibility, and a frictionless path to purchase.

## Colors

The palette is anchored by a deep forest green, symbolizing the nursery's expertise and the vitality of nature. This primary color is used for key actions and brand moments. 

- **Primary (#1A3C34):** Used for primary buttons, active states, and brand-heavy headers.
- **Secondary (#121212):** Used for high-contrast typography and structural separators.
- **Tertiary/Accent (#708271):** A muted sage used for secondary UI elements like tags, informational chips, and progress bars.
- **Neutral/Surface:** A range of soft greys and crisp white maintain the minimal canvas. Backgrounds should remain primarily white to emphasize the natural colors of the products.

## Typography

This design system utilizes a geometric pairing to achieve professional clarity. **Montserrat** provides a confident, structured voice for headlines, reflecting the scale and authority of the nursery. **Inter** is used for all functional and body text, ensuring maximum legibility across all age groups and devices.

Line heights are intentionally generous to improve reading rhythm, especially for plant care instructions and detailed product descriptions. Labels and metadata should use slightly increased letter spacing for a refined, modern feel.

## Layout & Spacing

The layout utilizes a **12-column fixed grid** on desktop, transitioning to a fluid single-column layout on mobile. A strict 8px base unit drives all spatial decisions, ensuring a mathematical harmony across the interface.

- **Margins:** Large exterior margins (64px+) on desktop create the "minimal" breathing room required for a premium feel.
- **Sectioning:** Vertical spacing between major sections (e.g., Hero to Featured Plants) is significant (80px+) to allow the eye to rest and focus on one category at a time.
- **Grids:** Product grids should favor 3 or 4 columns on desktop to keep images large and detailed.

## Elevation & Depth

To maintain the professional and "safe" aesthetic, depth is created through **Tonal Layering** and **Low-Contrast Outlines** rather than heavy shadows.

- **Surfaces:** Use a subtle neutral background (#F5F5F5) for section backgrounds to separate them from the pure white page background.
- **Borders:** Containers and cards use a 1px solid border (#E0E0E0).
- **Interactive Elevation:** Upon hover, cards should transition to a very soft, diffused shadow (0px 4px 20px rgba(0, 0, 0, 0.05)) to provide tactile feedback without breaking the minimal aesthetic.

## Shapes

The design system employs a **Soft (1)** rounding strategy. This 4px (0.25rem) base radius provides a subtle modern touch that feels more approachable than sharp corners while remaining more professional and "standard" than heavily rounded or pill-shaped designs.

- **Primary Components:** Buttons, input fields, and small tags use the base 4px radius.
- **Container Elements:** Large product cards and imagery utilize a `rounded-lg` (8px) radius to softly frame the photography.

## Components

### Buttons
Primary buttons are solid #1A3C34 with white text, using the base roundedness. Secondary buttons use a ghost style (1px border #121212) or a light sage background. All buttons have a fixed 48px height for mobile accessibility.

### Cards
Product cards are the core component. They feature a pure white background, a 1px soft border, and no initial shadow. The plant name uses `headline-md` and the price uses `body-lg` in bold. Images must be centered and fill the top half of the card.

### Inputs & Selection
Text inputs use a 1px border (#E0E0E0) that changes to the primary green on focus. Checkboxes and radio buttons use the primary green for the active state. All inputs must include a clearly defined label using the `label-md` style.

### Chips & Tags
Used for plant categories (e.g., "Low Light", "Pet Friendly"). These should use the tertiary sage color with a 10% opacity background and 100% opacity text to provide color without visual clutter.

### Plant Care Indicators
A custom set of icon-label pairs (e.g., a sun icon for "Full Sun") used on product pages. These should be strictly monochrome (#121212) to ensure clarity.
