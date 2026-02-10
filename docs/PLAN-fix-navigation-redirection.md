# PLAN-fix-navigation-redirection.md

## Overview
The user reported that clicking the "edit" (atualizar) icon in the "Contas a Pagar" section redirects the application to the landing page. This is caused by an incorrect navigation path that lacks the `/app` prefix, triggering the catch-all redirect in `App.tsx`.

## Proposed Changes
Fix the `navigate` calls in the following files:

### Financial Pages

#### [MODIFY] [Payables.tsx](file:///f:/webvaledoboi/src/pages/Payables.tsx)
- Update line 174 (approx.) to include `/app` prefix.
```diff
-   onClick={() => navigate(`/payables/${p.id}`)}
+   onClick={() => navigate(`/app/payables/${p.id}`)}
```

#### [MODIFY] [Receivables.tsx](file:///f:/webvaledoboi/src/pages/Receivables.tsx)
- Update line 174 (approx.) to include `/app` prefix.
```diff
-   onClick={() => navigate(`/receivables/${r.id}`)}
+   onClick={() => navigate(`/app/receivables/${r.id}`)}
```

#### [MODIFY] [Suppliers.tsx](file:///f:/webvaledoboi/src/pages/Suppliers.tsx)
- Update line 75 (approx.) to include `/app` prefix.
```diff
-   onClick={() => navigate(`/suppliers/${s.id}`)}
+   onClick={() => navigate(`/app/suppliers/${s.id}`)}
```

## Verification Plan

### Automated
- Run `npm run tsc --noEmit` to ensure no regressions in types.

### Manual Verification
1. Log in to the application.
2. Navigate to "Contas a Pagar".
3. Click the pencil icon for any record.
4. Verify it opens the `PayableForm` instead of redirecting to the landing page.
5. Repeat for "Contas a Receber" and "Fornecedores".
