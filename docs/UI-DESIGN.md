# Blog API UI Design

## 1. Design Summary

The blog should feel like a focused writing desk: calm, readable, and quick to scan. Content is the primary visual element. Controls support three core jobs:

1. Browse published posts.
2. Create a post.
3. Edit or remove an existing post.

The current implementation is intentionally minimal. This document records the existing interface and the design direction for future refinement.

## 2. Current Screen Inventory

### Home: `/`

- Page title: `My Blog`.
- Primary action: `New Post`.
- Content: an unordered list of posts.
- Each post shows title, raw date, content, author, `Edit`, and `Delete` actions.
- Empty, loading, and error states are not currently designed in the templates.

### New post: `/new`

- Heading: `New Post`.
- Fields: title, content, author.
- Submit action: `Create Post`.
- Browser-required validation is enabled on all three fields.

### Edit post: `/edit/:id`

- Heading: `Edit Post`.
- The same three fields are prefilled from the API response.
- Submit action: `Update Post`.

## 3. Information Architecture

```text
My Blog
├── Post feed
│   ├── Post title
│   ├── Date and author metadata
│   ├── Post content
│   └── Edit / Delete actions
└── New Post
    └── Post editor
```

The home page is the single source of navigation. The editor returns to the feed after a successful create or update.

## 4. Visual Direction

### Brand character

Editorial, practical, and human. Avoid a dashboard-heavy appearance: a blog is read vertically, so the layout should reward calm reading and clear hierarchy.

### Color tokens

| Token | Suggested value | Use |
| --- | --- | --- |
| `--ink` | `#202124` | Headings and primary text |
| `--body` | `#4b5563` | Post content and secondary text |
| `--paper` | `#fffdf8` | Main reading surface |
| `--canvas` | `#f3f0e8` | Page background |
| `--line` | `#ded9ce` | Dividers and field borders |
| `--accent` | `#176b87` | Links and primary actions |
| `--accent-strong` | `#0f4f64` | Hover and focus states |
| `--positive` | `#2f7d4a` | Create and success actions |
| `--danger` | `#b4493e` | Delete actions and destructive feedback |

These tokens give the interface a warmer editorial identity than a default blue-and-white form.

### Typography

- Display and page headings: a readable serif such as Georgia or a bundled editorial font.
- Body and controls: a clean sans-serif selected consistently for the project.
- Post body: `1rem` to `1.1rem`, with a line height around `1.7`.
- Keep line length near `65ch` for comfortable reading.

## 5. Layout Specification

### Desktop

- Page canvas with a centered content column, maximum width `900px`.
- Header row aligns the `My Blog` title left and `New Post` right.
- Posts are separated by subtle horizontal rules rather than nested cards.
- Editor fields occupy the same reading column as posts.

### Mobile

- Page padding: `16px`.
- Header actions wrap below the title when needed.
- Buttons remain full-width or use tap targets at least `44px` high.
- Post actions become a two-column row below the metadata.
- Textareas retain a minimum height and never force horizontal scrolling.

### Spacing scale

Use `4px`, `8px`, `12px`, `16px`, `24px`, `32px`, and `48px`. The largest gap belongs between page sections; related metadata and actions stay closer together.

## 6. Components

### Site header

- Logo or text mark: `My Blog`.
- One clear primary action: `New Post`.
- Focus-visible outline for keyboard users.

### Post item

- Title is the strongest element and can link to a future detail view.
- Metadata is compact: `By Author | Date`.
- Body copy is readable and should not be clamped unless a “Read more” flow exists.
- `Edit` is a secondary action.
- `Delete` is a destructive action with confirmation.

### Post editor

- Visible labels: `Title`, `Content`, and `Author`.
- Required fields use both HTML and server-side validation.
- Submit states: default, submitting, success redirect, and error.
- A secondary `Cancel` link returns to the feed without changing data.

### Feedback

- Loading: show a short status near the content region.
- API unavailable: explain that the blog service could not be reached and offer retry.
- Not found: show a clear message for an invalid edit URL.
- Validation: place field-level errors next to the relevant field.
- Delete confirmation: identify the post title before the destructive action.

## 7. Interaction Rules

1. A successful create or edit redirects to `/` and places the changed post in the feed.
2. Delete requires confirmation; cancel leaves the post untouched.
3. The submit control is disabled while a request is in progress.
4. Errors preserve entered form values whenever possible.
5. Keyboard focus follows navigation logically: page heading, primary action, content, then post actions.
6. Links and buttons have visible hover and focus states, not color change alone.
7. Dates are formatted for people, such as `Aug 10, 2023`, while the API retains ISO timestamps.

## 8. Accessibility Requirements

- Use one `h1` per page and a logical heading order.
- Associate every input and textarea with a visible `label`.
- Use semantic `button` elements for actions and links for navigation.
- Provide `aria-describedby` for validation messages.
- Maintain WCAG AA contrast for normal text.
- Do not communicate destructive meaning through red color alone.
- Keep touch targets at least `44px` high on small screens.
- Make the complete workflow usable without a mouse.

## 9. Responsive Breakpoints

| Range | Behavior |
| --- | --- |
| `0-599px` | Single column, stacked header, full-width editor actions |
| `600-899px` | Single reading column with wider gutters |
| `900px+` | Centered reading column, inline header action, comfortable post spacing |

Use fluid widths and max-width constraints instead of fixed page widths.

## 10. UI-to-API Mapping

| UI action | UI route | API request | Result |
| --- | --- | --- | --- |
| Load feed | `GET /` | `GET /posts` | Render post list |
| Open create form | `GET /new` | None | Render empty editor |
| Create | `POST /api/posts` | `POST /posts` | Redirect to feed |
| Open edit form | `GET /edit/:id` | `GET /posts/:id` | Render populated editor |
| Save edit | `POST /api/posts/:id` | `PATCH /posts/:id` | Redirect to feed |
| Delete | `GET /api/posts/delete/:id` | `DELETE /posts/:id` | Redirect to feed |

The delete UI currently uses a `GET` route for convenience. A future implementation should use a state-changing `POST` or `DELETE` action to follow HTTP semantics more closely.

## 11. Acceptance Checklist

- [ ] Home page displays title, metadata, content, and actions without overlap.
- [ ] New post form labels and validates all fields.
- [ ] Edit form preserves the selected post's values.
- [ ] Successful mutations return the user to the feed.
- [ ] API failures produce understandable feedback.
- [ ] Delete has confirmation and cannot be activated accidentally.
- [ ] Layout works at mobile, tablet, and desktop widths.
- [ ] Keyboard focus and visible focus states work throughout.
- [ ] Empty feed state explains how to create the first post.
