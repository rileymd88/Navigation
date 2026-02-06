# Navigation
A basic navigation menu for Qlik Sense

# Download
The extension can be downloaded here: https://github.com/rileymd88/Navigation/releases/download/1.0.4/sn-navigation-ext.zip

# Settings overview
The property panel is organized into two accordion areas: **Navigation** and **Appearance**.

For all color settings, you first choose **Single color** or **Expression**:
- **Single color** shows a color picker.
- **Expression** shows an expression input.

## Navigation

### Categories
| Setting label | What it does |
| --- | --- |
| Categories | Adds, removes, and organizes menu categories/sub-categories (up to 3 levels). |
| Label | Sets the text shown for the category (supports expressions). |
| Show icon | Toggles whether an icon is shown next to the label. |
| Icon | Picks the icon to display when **Show icon** is enabled. |
| Show divider | Adds a divider line for that category item. |
| Navigate | Enables navigation behavior for the category. |
| Navigation | Chooses the action type (go to sheet, go to sheet by ID, go to app, or open website/email). |
| Sheet | Selects the destination sheet when using the "go to sheet" action. |
| App ID | Sets the target app ID when using the "go to app" action. |
| Sheet | Sets the sheet ID when using "go to app" or "go to sheet by ID". |
| Website | Sets the destination URL (or email link) when using website/email navigation. |
| Same window | Opens app/website in the same tab when enabled; otherwise opens a new tab. |
| Calculation condition | Controls visibility of the category using an expression (`1` means always visible). |

## Appearance

### Header
| Setting label | What it does |
| --- | --- |
| Title | Sets the header title text. |
| Title font size | Sets the size of the title text. |
| Title font bold | Toggles bold styling for the title text. |
| Title font color | Sets title text color (single color or expression). |
| Subtitle | Sets the header subtitle text. |
| Subtitle font size | Sets the size of the subtitle text. |
| Subtitle font bold | Toggles bold styling for the subtitle text. |
| Subtitle font color | Sets subtitle text color (single color or expression). |
| Header color | Sets the header background color (single color or expression). |

### Drawer
| Setting label | What it does |
| --- | --- |
| Drawer | Enables or disables drawer mode. |
| Orientation | Sets drawer side to left or right (shown when **Drawer** is enabled). |
| Drawer width | Sets drawer width (shown when **Drawer** is enabled). |
| Drawer icon | Picks the icon used to toggle the drawer (shown when **Drawer** is enabled). |
| Icon position | Sets where the drawer icon appears (shown when **Drawer** is enabled). |

### Background
| Setting label | What it does |
| --- | --- |
| Background color | Sets the component background color (single color or expression). |

### Buttons
| Setting label | What it does |
| --- | --- |
| Button color | Sets category button background color (single color or expression). |
| Button hover color | Sets category button hover color (single color or expression). |

### Font
| Setting label | What it does |
| --- | --- |
| Font family | Sets the font family used for category text. |
| Font size | Sets category text size. |
| Font bold | Toggles bold styling for category text. |
| Font color | Sets category text color (single color or expression). |
| Font color on active sheet | Sets category text color for the active sheet (single color or expression). |

### Advanced
| Setting label | What it does |
| --- | --- |
| Custom CSS | Adds custom CSS rules. Use `&` as the selector for this extension instance. |

# CSS Documentation
The table below lists the available class names and their respective descriptions to assist with CSS customization.

| Class Name                                      | Description |
|-------------------------------------------------|-------------|
| `sn-navigation-list`                            | Container list that holds all category buttons. |
| `sn-navigation-title-subtitle-container`                            | Container for title and subtitle |
| `sn-navigation-title`                            | Title |
| `sn-navigation-subtitle`                            | Subtitle |
| `sn-navigation-drawer`                          | Represents the sidebar drawer component. |
| `sn-navigation-drawer-icon-container`           | Container holding the icon used to toggle the drawer. |
| `sn-navigation-drawer-icon`                     | The icon that toggles the drawer open or closed. |
| `sn-navigation-category-button`                 | General class for buttons enclosing category text. |
| `sn-navigation-category-button-level-${level}`  | Class for buttons at a specific hierarchical level. |
| `sn-navigation-category-button-${label}`        | Class for buttons specific to a category label. |
| `sn-navigation-category-icon`                   | General class for all category icons. |
| `sn-navigation-category-icon-level-${level}`    | Class for category icons at a specific hierarchical level. |
| `sn-navigation-category-icon-${label}`          | Class for icons specific to a category label. |
| `sn-navigation-category-text`                   | General class for all text elements within a category. |
| `sn-navigation-category-text-level-${level}`    | Class for text elements at a specific hierarchical level. |
| `sn-navigation-category-text-${label}`          | Class for text elements specific to a category label. |
| `sn-navigation-category-divider`                   | General class for all divider elements. |
| `sn-navigation-category-divider-level-${level}`    | Class for divider elements at a specific hierarchical level. |
| `sn-navigation-category-divider-${label}`          | Class for divider elements specific to a category label. |
| `sn-navigation-category-expand-icon`            | General class for all expand/collapse icons in categories. |
| `sn-navigation-category-expand-icon-level-${level}` | Class for expand/collapse icons at a specific hierarchical level. |
| `sn-navigation-category-expand-icon-${label}`   | Class for expand/collapse icons specific to a category label. |
| `sn-navigation-category-expand-less`            | Class for icons indicating a collapsible section is expanded. |
| `sn-navigation-category-expand-more`            | Class for icons indicating a collapsible section is collapsed. |



# Release history

### v1.0.4
* Fixed background color always being blue bug

### v1.0.3
* Fixed drawer icon positioning bug
* Fixed background color by expression bug

### v1.0.2
* Added formula options for colors
* Added header color options
* Added bold font options
* Added divider CSS class names
* Bug fixes

### v1.0.1
* Added show hide condition
* Added title and subtitle
* Added font family and font size properties
* Added ability to add custom css
* Added and documented CSS class names
* Minor label/translation fixes

### v1.0.0
* First release
