🤖 **Applying knowledge of @project-planner...**

# PLAN-admin-content-management.md

## Overview
Create an internal administrative panel within the existing financial system to manage the landing page and company pages' content dynamically. This includes a single-page interface with a section selector, friendly forms for each content type, and media upload capability to Supabase Storage.

- **Objective:** Empower users to update the site without touching the database or code.
- **Scope:** CMS interface for `site_content` table and Supabase Storage integration.
- **Access:** All logged-in users (as per user request).

## Project Type
**WEB** (React + TypeScript + Vite)

## Success Criteria
- [ ] New menu item "Gerenciar Site" in the sidebar.
- [ ] Functional single-page CMS at `/app/cms`.
- [ ] Dedicated forms for:
    - Landing Hero (Text + Video/Image Upload)
    - Landing About (Text)
    - Company Hero & About
- [ ] Supabase Storage bucket `site-media` created and configured.
- [ ] File upload component for Videos and Images (Post-upload URL update in DB).

## Tech Stack
- **Frontend:** React, Lucide React (icons).
- **Backend:** Supabase (Postgres & Storage).
- **Hooks:** useContent (extended) or new `useCmsMutation`.

## Proposed File Structure
- `src/pages/ContentManagement.tsx` [NEW] - Main CMS page.
- `src/components/cms/HeroForm.tsx` [NEW] - Form for Hero sections.
- `src/components/cms/AboutForm.tsx` [NEW] - Form for About sections.
- `src/components/MediaUpload.tsx` [NEW] - Reusable component for Supabase Storage uploads.
- `src/lib/storage.ts` [NEW] - Storage helper functions.

## Task Breakdown

### Phase 1: Storage Foundation (P0)
| Task ID | Name | Agent | Skills | Priority | Dependencies |
|---------|------|-------|--------|----------|--------------|
| T1 | Create `site-media` Bucket in Supabase | `database-architect` | database-design | P0 | None |
| T2 | Implement `storage.ts` utility | `backend-specialist` | nodejs-best-practices | P0 | T1 |

**INPUT→OUTPUT→VERIFY (T1):**
- Input: Bucket name `site-media`, public access checked.
- Output: Storage bucket created.
- Verify: Test a manual upload via Supabase Dashboard.

---

### Phase 2: CMS Backend & Forms (P1)
| Task ID | Name | Agent | Skills | Priority | Dependencies |
|---------|------|-------|--------|----------|--------------|
| T3 | Implement `MediaUpload` component | `frontend-specialist` | frontend-design | P1 | T2 |
| T4 | Create CMS Forms (HeroForm, AboutForm) | `frontend-specialist` | react-best-practices | P1 | T3 |

**INPUT→OUTPUT→VERIFY (T4):**
- Input: Content interfaces from `types/content.ts`.
- Output: Form components with validation.
- Verify: UI renders correctly and handles local state.

---

### Phase 3: CMS Page & Integration (P2)
| Task ID | Name | Agent | Skills | Priority | Dependencies |
|---------|------|-------|--------|----------|--------------|
| T5 | Implement `ContentManagement.tsx` page | `frontend-specialist` | react-best-practices | P2 | T4 |
| T6 | Update `Layout.tsx` and `App.tsx` routes | `frontend-specialist` | react-best-practices | P2 | T5 |

**INPUT→OUTPUT→VERIFY (T5):**
- Input: Selector for page (`landing`, `transportadora`, etc.) and section.
- Output: Page that fetches and saves content.
- Verify: Navigate to `/app/cms`, update a field, and check if it reflects on the landing page.

---

## Phase X: Verification
- [ ] Run `npm run lint`.
- [ ] Verify Storage RLS (Allow public read, authenticated upload).
- [ ] Manual check: Upload a video via CMS and verify it plays in the Hero.
- [ ] Manual check: Update text and verify the "fade-in" still works.

---
[OK] Plan created: docs/PLAN-admin-content-management.md

Next steps:
- Review the plan
- Run `/create` to start implementation
- Or modify plan manually
