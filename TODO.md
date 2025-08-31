# User Login System Implementation Plan

## Current State Analysis
- ✅ UserMenu.tsx: Login/logout UI already implemented
- ✅ AuthModal.tsx: Complete login/signup modal component exists
- ✅ Header.tsx: UserMenu integration in place
- ✅ User model: MongoDB schema defined
- ✅ Types: User and FormData interfaces available
- ❌ API routes: No authentication endpoints exist
- ❌ Integration: AuthModal not connected to main page

## Implementation Steps

### Phase 1: API Routes Creation
- [ ] Create `src/app/api/auth/login/route.ts` for user login
- [ ] Create `src/app/api/auth/signup/route.ts` for user registration
- [ ] Add password hashing with bcrypt
- [ ] Add JWT token generation for sessions

### Phase 2: Main Page Integration
- [ ] Update `src/app/page.tsx` to integrate AuthModal
- [ ] Add state management for auth modal (showAuthModal, authMode, formData, showPassword)
- [ ] Implement form handlers (handleInputChange, handleLogin, handleSignup)
- [ ] Update openAuthModal function to show modal
- [ ] Add API calls for authentication
- [ ] Add error handling for failed login/signup

### Phase 3: User Session Management
- [ ] Add JWT token storage in localStorage
- [ ] Add token validation on page load
- [ ] Update User interface to match MongoDB schema
- [ ] Add logout functionality with token cleanup

### Phase 4: Testing & Security
- [ ] Test login/signup flow
- [ ] Add input validation
- [ ] Add password strength requirements
- [ ] Add rate limiting for auth endpoints
- [ ] Add CSRF protection

## Files to be Modified
- `src/app/page.tsx` - Main integration and state management
- `src/app/api/auth/login/route.ts` - New API route
- `src/app/api/auth/signup/route.ts` - New API route
- `src/type.ts` - Update User interface if needed

## Dependencies
- bcryptjs for password hashing
- jsonwebtoken for JWT tokens
- @types/bcryptjs and @types/jsonwebtoken for TypeScript support
