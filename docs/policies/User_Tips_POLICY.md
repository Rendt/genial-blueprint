# User Tips

Version 13-Apr-2026

## Policy
All functional areas of the application must include "User Tips" to guide the user on *how* to use the feature effectively, rather than just explaining *what* it is.

## Implementation Guidelines
1.  **Visual Representation**: Use a small, discrete question mark icon (`?`) button next to the section header or action button.
2.  **Interaction**: Clicking (or hovering on desktop) the icon should reveal a floating popover/tooltip.
3.  **Content Style**:
    *   **Do not** state the obvious (e.g., "This button saves the form").
    *   **Do** explain the strategic value or best practice (e.g., "Use this to capture raw thoughts; we'll refine them into tasks later").
    *   **Typography**: All tip text must be rendered in *italics* to distinguish it from functional UI text.
4.  **Visibility**: These tips should be tied to the global `showHints` setting where applicable, or remain unobtrusive if always visible.

## Examples
*   **Area Status**: Don't say "Change status here." Say *"Move to 'Review' when you need to reassess goals, or 'On Hold' to clear mental space."*
*   **Daily Log**: Don't say "Write log." Say *"Focus on wins and blockers. What moved the needle today?"*