🤖 **Applying knowledge of @project-planner...**

# PLAN-frontend-landing.md

## Overview
Transform the Vale do Boi landing page and company-specific pages into a dynamic system where content is managed via Supabase. Additionally, implement support for video backgrounds in the Hero section of the landing page.

- **Objective:** Centralize content management and enhance visual appeal with video.
- **Scope:** `Landing`, `Transportadora`, `Distribuidora`, `Acougue` pages.
- **Backend:** Supabase (Postgres).

## Project Type
**WEB** (React + TypeScript + Vite)

## Success Criteria
- [ ] Supabase schema `site_content` implemented.
- [ ] Landing page hero supports and plays a background video.
- [ ] All text, images, and links on the landing page are fetched from Supabase.
- [ ] Company pages (`Transportadora`, `Distribuidora`, `Acougue`) are dynamic.
- [ ] Content is cached correctly with React Query.

## Tech Stack
- **Frontend:** React, TypeScript, Lucide React (icons).
- **Styling:** CSS (existing `landing.css` / `index.css`).
- **Data:** Supabase Client + TanStack Query (React Query).
- **Media:** HTML5 Video / Supabase Storage for video hosting.

## Proposed File Structure
- `src/types/content.ts` [NEW] - Type definitions for dynamic content.
- `src/hooks/useContent.ts` [NEW] - Custom hook for fetching content.
- `src/pages/Landing.tsx` [MODIFY] - Refactor to use dynamic content & video hero.
- `src/components/VideoHero.tsx` [NEW] - Reusable video hero component.
- `src/pages/CompanyPage.tsx` [NEW/MODIFY] - Generic template if possible, or individual refactors.

## Task Breakdown

### Phase 1: Foundation (P0)
| Task ID | Name | Agent | Skills | Priority | Dependencies |
|---------|------|-------|--------|----------|--------------|
| T1 | Create Supabase `site_content` table | `database-architect` | database-design | P0 | None |
| T2 | Define TypeScript interfaces for content | `frontend-specialist` | plan-writing | P0 | T1 |
| T3 | Implement `useContent` hook with React Query | `frontend-specialist` | react-best-practices | P0 | T2 |

**INPUT→OUTPUT→VERIFY (T1):**
- Input: SQL Schema for `site_content` (id, page_slug, section_key, content jsonb, updated_at).
- Output: Migration applied to Supabase.
- Verify: Run a test query to insert and retrieve mock content.

---

### Phase 2: Media & Components (P1)
| Task ID | Name | Agent | Skills | Priority | Dependencies |
|---------|------|-------|--------|----------|--------------|
| T4 | Implement `VideoHero` component | `frontend-specialist` | frontend-design | P1 | None |
| T5 | Update `Landing.tsx` structure for dynamic sections | `frontend-specialist` | react-best-practices | P1 | T3, T4 |

**INPUT→OUTPUT→VERIFY (T4):**
- Input: Video file path/URL support, fallback image, overlay controls.
- Output: `src/components/VideoHero.tsx`.
- Verify: Component renders and plays video with correctly styled overlay (red bar adaptation).

---

### Phase 3: Page Refactoring (P2)
| Task ID | Name | Agent | Skills | Priority | Dependencies |
|---------|------|-------|--------|----------|--------------|
| T6 | Refactor `Landing.tsx` to fetch data | `frontend-specialist` | react-best-practices | P2 | T5 |
| T7 | Refactor Company pages for dynamic content | `frontend-specialist` | react-best-practices | P2 | T3 |

**INPUT→OUTPUT→VERIFY (T6):**
- Input: Content fetched via `useContent('landing')`.
- Output: Dynamic rendering of Hero, Companies, and About sections.
- Verify: No hardcoded text remaining in `Landing.tsx`.

---

## Phase X: Verification
- [ ] Run `npm run lint` and `npx tsc --noEmit`.
- [ ] Verify Supabase RLS policies for `site_content` (public read).
- [ ] Manual check: Video hero loads and plays across different browsers.
- [ ] Manual check: Content changes in Supabase are reflected on the site.

---
[OK] Plan created: docs/PLAN-frontend-landing.md

Next steps:
- Review the plan
- Run `/create` to start implementation
- Or modify plan manually
