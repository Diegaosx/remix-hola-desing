```markdown
# Design System Document: High-End Editorial Strategy

## 1. Overview & Creative North Star: "The Noir Curator"

This design system is built to transform ¡HOLA! Design from a service provider into a high-end cultural institution. The Creative North Star is **"The Noir Curator"**—a philosophy that treats digital space as a physical gallery. We reject the "template" look by embracing intentional asymmetry, dramatic typographic scale, and a dark, monochromatic purple palette that replaces traditional grays with tonal depth.

The experience is defined by **Organic Brutalism**: the structure is rigid and geometric, but the execution is fluid. We break the grid to create "moments" rather than rows. Generous negative space isn't just "empty"; it is a luxury material used to frame content.

---

## 2. Colors: Tonal Depth & The "No-Line" Rule

We are strictly avoiding the use of grays. Every "neutral" is a derivative of our deep purple core, ensuring the brand feels rich and atmospheric.

### Palette Strategy
*   **Primary (`#1d1233`):** The foundation. Use for deep backgrounds and primary containers.
*   **Secondary (`#2d1f4a`):** For surface elevation and nested content blocks.
*   **Tertiary (`#3d2960`):** Used sparingly for highlights, active states, or subtle gradients.
*   **On-Surface (`#ffffff`):** Pure white for maximum legibility and high-fashion contrast.

### The "No-Line" Rule
Traditional 1px borders are strictly prohibited for sectioning. Boundaries must be defined through:
1.  **Background Shifts:** Use `surface-container-low` (`#1b1b1b`) against `surface` (`#131313`) to define areas.
2.  **Negative Space:** Use the spacing scale to create "islands" of content.
3.  **Tonal Transitions:** A subtle gradient from `primary` to `primary-container` creates a more sophisticated edge than a solid line.

### Glass & Texture
To achieve the "High-End Fashion" look, apply a **Grain Texture** overlay at 3% opacity across the entire viewport. For floating elements, use **Glassmorphism**: `surface-variant` (`#353535`) at 40% opacity with a `20px` backdrop-blur to create a "frosted obsidian" effect.

---

## 3. Typography: The Editorial Voice

Our typography is the primary visual asset. It is not just for reading; it is for *feeling*.

*   **Display (Baskerville):** Large, dramatic, and high-contrast. Use `display-lg` (3.5rem) and `display-md` (2.75rem) for headlines. Set these with tight letter-spacing and occasional italics to mimic high-end mastheads.
*   **Body (Montserrat Light):** Minimal and refined. Montserrat must be set with generous line-height (1.6 - 1.8) and wide letter-spacing (0.05rem) to maintain an airy, premium feel against the heavy Display type.
*   **Label (Manrope):** All-caps, small-scale labels (`label-sm`) should be used for metadata and navigation, acting as "architectural annotations" on the page.

---

## 4. Elevation & Depth: Tonal Layering

In this system, depth is not "up and down," it is "light and shadow" within the purple spectrum.

*   **The Layering Principle:** Stack surfaces to create focus. A `surface-container-highest` (`#353535`) card sitting on a `surface-container-lowest` (`#0e0e0e`) background creates a natural lift.
*   **Ambient Shadows:** Avoid black drop shadows. Use `on-primary-fixed` (`#201536`) at 15% opacity with a `60px` blur for a soft, diffused "glow" that feels like a studio light hitting a surface.
*   **The Ghost Border Fallback:** If a decorative line is required (per the user request for "thin white geometric lines"), use the `outline-variant` (`#49454d`) at 20% opacity. These should be used as structural accents (e.g., a single vertical line running through the layout) rather than boxes.

---

## 5. Components: Minimalist Primitives

### Buttons: The "Magnetic" Interaction
*   **Primary:** Solid `White (#ffffff)` text on `Primary-Container (#1d1233)` background. No rounded corners (`0px`). On hover, the button should have a "magnetic" pull toward the cursor.
*   **Secondary:** A "Ghost Border" button. White text with a 1px border at 20% opacity.
*   **Tertiary:** Underlined text only. The underline is a 1px white line that expands from the center on hover.

### Cards & Projects
*   **Structure:** No borders or dividers. Use a `surface-container-high` background. 
*   **Imagery:** Images should utilize a "smooth parallax" effect within their containers, moving slightly slower than the scroll speed.
*   **Content:** Text should be revealed via a "mask-up" animation when the card enters the viewport.

### Input Fields
*   **Style:** Minimalist bottom-border only. 
*   **State:** The label transitions from `body-md` to `label-sm` and shifts upward on focus. The border color transitions from `outline-variant` to `primary`.

---

## 6. Do's and Don'ts

### Do
*   **Use Oversized Negative Space:** If you think there is enough space, double it.
*   **Embrace Asymmetry:** Offset your columns. For example, a headline might occupy columns 1-8, while the body text starts at column 5.
*   **Horizontal Scroll:** Use horizontal scrolling for portfolio galleries to mimic the flipping of a high-end magazine.

### Don't
*   **Don't use Rounded Corners:** Every element must have a `0px` radius. Sharp edges convey authority and architectural precision.
*   **Don't use Standard Grids:** Avoid the 12-column "center-aligned" trap. Use an asymmetrical grid where the "weight" shifts from side to side as the user scrolls.
*   **Don't use Icons:** Whenever possible, use text labels. If an icon is mandatory, use ultra-thin (1pt) geometric strokes.

### Accessibility Note
While we are a "Dark/Noir" brand, ensure all body text (Montserrat Light) maintains a contrast ratio of at least 4.5:1 against the purple surfaces. Use `on-surface` (White) for all critical information.