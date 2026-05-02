# Technical Specifications

*This document serves as the immutable technical contract and architectural blueprint for the application, as defined by the Master Agent Instructions. It must be updated during  any new feature workcycle.*


**Version:** 1.0.0
**Status:** Draft / Template

---

## 1. Technical Stack

### 1.1 Frontend
- **Framework:** React + Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **State Management:** [e.g., useAppCore / Context API]

### 1.2 Data Systems
- **Database:** [e.g., Supabase / PostgreSQL]
- **Auth Provider:** [e.g., Supabase Auth / Google OAuth]
- **Storage:** [e.g., localStorage / Supabase Bucket]

---

## 2. Data Architecture

### 2.1 Core Entities
```json
{
  "EntityName": {
    "id": "uuid",
    "created_at": "timestamp",
    "field": "type"
  }
}
```

### 2.2 Auth Policy
- [ ] Adaptive OAuth (Redirect for Mobile/Prod, Popup for iFrames/AI-Studio)
- [ ] Session Persistence Strategy: [e.g., Local / Cookies]

---

## 3. External API Integrations

- **Service A:** [e.g., Google Tasks API]
- **Service B:** [e.g., Gemini AI API]

---

## 4. Environment Requirements

*See `docs/GIT_SYNC_POLICY.md` for local setup instructions.*



