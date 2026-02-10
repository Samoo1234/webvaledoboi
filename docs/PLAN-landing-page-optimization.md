# PLAN-landing-page-optimization.md

## Overview
The landing page currently shows a full-page spinner while fetching dynamic content from Supabase. This creates a "slow" feeling because static elements like the navigation cards for the three companies are blocked.

## Proposed Changes

### Frontend Optimization

#### [MODIFY] [Landing.tsx](file:///f:/webvaledoboi/src/pages/Landing.tsx)
- Remove the `if (isLoading)` early return.
- Ensure `hero` and `about` variables handle undefined state gracefully using optional chaining and default values.
- Allow the page to render static content (Cards) immediately.
- The `VideoHero` and `About` sections will hydrate automatically once the data arrives from `useContent`.

```diff
-    if (isLoading) {
-        return (
-            <div className="loading-container">
-                <div className="spinner" />
-            </div>
-        )
-    }
```

## Verification Plan

### Manual Verification
1. Navigate to the landing page.
2. Verify that the "Nossas Empresas" cards appear immediately.
3. Verify that the dynamic text (Hero title, About text) updates once the loading is complete without a full-page skip/flicker (other than the content swap).
4. Simulate slow network in DevTools to ensure the experience is acceptable while waiting.
