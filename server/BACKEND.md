# GyanSetu Backend & API

The Node.js backend is the durable, authenticated gateway for the React frontend. It owns MongoDB state, JWT sessions, curriculum/quiz/diagnostic records, analytics, sync de-duplication, operational workflows, and all calls to the Python AI helper.

Base URL: `http://127.0.0.1:5000/api`

---

## 1. Stack

| Layer | Technology |
| --- | --- |
| HTTP gateway | Express 4, Helmet, CORS, Morgan, express-rate-limit |
| Validation | Zod schemas shared per route |
| Database | MongoDB via Mongoose 9 |
| Auth | bcryptjs password hashing + signed access/refresh JWTs |
| AI | Python helper at `http://127.0.0.1:8000`, with built-in safe fallback |
| Seed | `src/scripts/seed.js`, mirrors the frontend data banks |

The frontend never calls MongoDB or the AI helper directly; it only calls this gateway.

---

## 2. Local setup

Prerequisites: Node.js 18+, MongoDB reachable at `mongodb://127.0.0.1:27017`, and optionally Python 3 for the AI helper.

```bash
# Frontend dependencies
cd rural-learning-platform
npm install
npm audit fix

# Backend dependencies
cd server
npm install
cp .env.example .env      # PowerShell: Copy-Item .env.example .env
npm run seed

# Terminal A: AI helper (optional; backend falls back automatically)
python ai-service/server.py

# Terminal B: API gateway
cd server
npm run dev               # or: npm start

# Terminal C: React UI
cd rural-learning-platform
npm run dev -- --host 127.0.0.1 --port 5173
```

Useful scripts:

```bash
npm start          # node server.js
npm run dev        # node --watch server.js
npm run seed       # idempotent demo seed
npm run seed:force # clears and recreates all demo collections
```

`SEED_ON_START=true` in `.env` also runs the idempotent seed on every backend start.

---

## 3. Configuration

Copy `server/.env.example` to `server/.env`. Defaults are developer-friendly:

| Variable | Default | Purpose |
| --- | --- | --- |
| `PORT` / `HOST` | `5000` / `127.0.0.1` | Gateway bind address |
| `MONGO_URI` | `mongodb://127.0.0.1:27017/gyansetu` | MongoDB database |
| `JWT_SECRET` | development placeholder | Set a long random value in production |
| `JWT_ACCESS_TTL` | `2h` | Access token lifetime |
| `JWT_REFRESH_TTL_DAYS` | `7` | Refresh token lifetime |
| `DEFAULT_DEMO_PASSWORD` | `demo1234` | Password for seeded demo users |
| `AI_SERVICE_URL` | `http://127.0.0.1:8000` | Python helper |
| `AI_SERVICE_TOKEN` | empty | Optional `X-Service-Token` sent upstream |
| `AI_TIMEOUT_MS` | `8000` | AI request timeout before local fallback |
| `AI_RATE_LIMIT_MAX` | `30` | AI requests/minute |
| `CORS_ORIGIN` | `http://127.0.0.1:5173` | Comma-separated allowed origins |
| `RATE_LIMIT_WINDOW_MS` / `RATE_LIMIT_MAX` | `900000` / `300` | General API limiter |
| `LOG_REQUESTS` | `true` | Morgan request logging |
| `SEED_ON_START` | `false` | Run idempotent seed on boot |

---

## 4. Response and error contracts

Successful responses are flattened:

```json
{ "success": true, "course": { "...": "..." }, "message": "Optional message" }
```

Created resources use HTTP `201`. Paginated responses include a `pagination` object with `page`, `limit`, `total`, `totalPages`, `hasNext`, and `hasPrev`.

Errors use:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [{ "field": "score", "message": "Required" }]
  }
}
```

Legacy frontend fields are deliberately preserved where the UI expects them, including `success`, `earnedXP`, `weakTopics`, and `recommendations`.

---

## 5. Authentication

Real JWT auth is enabled for student, teacher, parent, and admin routes. Passwords are hashed with bcryptjs; refresh tokens are stored hashed with per-token revocation.

`POST /api/auth/login` accepts only an existing, active account and requires the correct password. There is no silent demo fallback for unknown identifiers or missing passwords. Registration is limited to `student` and `parent`; teacher/admin accounts are provisioned by the school admin. Duplicate email/phone registration is rejected with `409`. The explicit `quick-login` shortcut remains available only for the seeded evaluator accounts.

```bash
# Real login
curl -X POST http://127.0.0.1:5000/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"identifier":"rohan.verma@gyansetu.local","password":"demo1234","role":"student"}'

# One-click evaluator login
curl -X POST http://127.0.0.1:5000/api/auth/quick-login \
  -H 'Content-Type: application/json' -d '{"role":"teacher"}'
```

Use the returned token as `Authorization: Bearer <accessToken>`.

Seeded demo users (all share `demo1234`):

| Role | Name | Email |
| --- | --- | --- |
| student | Rohan Verma | `rohan.verma@gyansetu.local` |
| teacher | Mr. Arvind Sharma | `teacher.sharma@gyansetu.local` |
| parent | Ramcharan Verma | `parent.ramcharan@gyansetu.local` |
| admin | Dr. Anita Deshmukh | `principal@gyansetu.local` |

`POST /api/auth/quick-login` accepts `student`, `teacher`, `parent`, or `admin`.

---

## 6. Endpoint reference

### Health and auth

| Method | Path | Access | Notes |
| --- | --- | --- | --- |
| GET | `/api/health` | public | Liveness plus Mongo state |
| GET | `/api/health/ready` | public | Readiness probe |
| POST | `/api/auth/register` | public | Student/parent registration |
| POST | `/api/auth/login` | public | Password login for a registered account |
| POST | `/api/auth/quick-login` | public | Role-based evaluator shortcut |
| GET | `/api/auth/demo-accounts` | public | Demo profiles for modal |
| POST | `/api/auth/refresh` | public | Rotates access token using refresh token |
| POST | `/api/auth/logout` | Bearer | Revokes refresh token |
| GET | `/api/auth/me` | Bearer | Restores current user and student progress |
| PUT | `/api/auth/profile` | Bearer | Name, language, grade, avatar, preferences |
| POST | `/api/auth/change-password` | Bearer | Also revokes active refresh tokens |
| GET | `/api/auth/permissions` | Bearer | Role capability list |

### Curriculum and content

| Method | Path | Access | Notes |
| --- | --- | --- | --- |
| GET | `/api/courses` | public | Legacy grade/subject summary |
| GET | `/api/catalog` | public | 30 courses with chapter counts |
| GET | `/api/courses/grade/:grade` | public | Courses for Class 6–10 |
| GET | `/api/courses/search?q=` | public | MongoDB text search |
| GET | `/api/courses/:courseId` | public | Full course |
| GET | `/api/courses/:courseId/chapters` | public | Ordered chapters |
| GET | `/api/courses/:courseId/chapters/:chapterId` | public | Single chapter |
| GET | `/api/chapters/:chapterId/notes` | public | Localized notes |
| GET | `/api/chapters/:chapterId/quiz` | public | Curated MCQs |
| GET | `/api/timetable` | Bearer | Weekly timetable |
| PUT | `/api/timetable` | Teacher/Admin | Save timetable |
| GET/POST/DELETE | `/api/downloads` | Bearer | Chapter download inventory |
| GET | `/api/announcements` | Bearer | School announcements |
| POST/PUT | `/api/courses` | Teacher/Admin | Curriculum authoring |

### Learning flows

| Method | Path | Access | Notes |
| --- | --- | --- | --- |
| POST | `/api/quiz/submit` | Bearer | Idempotent by `clientAttemptId`, awards XP |
| GET | `/api/quiz/attempts` | Bearer | Attempt history |
| GET | `/api/quiz/leaderboard` | Bearer | XP leaderboard |
| GET | `/api/quiz/progress` | Bearer | Aggregated quiz progress |
| POST | `/api/diagnostic/submit` | Bearer | Idempotent by `clientId`, weak topics/recommendations |
| GET | `/api/diagnostic/history` | Bearer | Past diagnostics |
| GET | `/api/diagnostic/latest` | Bearer | Latest diagnostic |
| POST | `/api/sync/batch` | Bearer | Offline queue with de-duplication |
| GET | `/api/sync/records` | Bearer | Synced record log |
| GET | `/api/sync/status` | Bearer | Sync counters |
| POST | `/api/ai/doubt` | optional Bearer | Doubt Saathi via Python helper/fallback |
| GET | `/api/ai/history` | Bearer | Doubt history |
| POST | `/api/ai/feedback` | Bearer | Doubt feedback |
| GET | `/api/ai/health` | public | Upstream AI service status |

### Role dashboards

| Method | Path | Access | Notes |
| --- | --- | --- | --- |
| GET | `/api/student/dashboard` | Bearer | Score, XP, mastery, remedials, recommendations |
| GET | `/api/student/progress` | Bearer | Detailed progress |
| GET | `/api/student/mastery` | Bearer | Topic mastery map |
| GET | `/api/student/recommendations` | Bearer | Next best chapters |
| GET/POST | `/api/student/remedials` | Bearer | Assignments and completion |
| GET | `/api/student/badges` | Bearer | Achievement badges |
| GET | `/api/student/xps` | Bearer | XP ledger |
| PUT | `/api/student/preferences` | Bearer | Low-data/offline/theme settings |
| GET | `/api/teacher/overview` | Teacher/Admin | Legacy-compatible overview |
| GET | `/api/teacher/analytics` | Teacher/Admin | Trend and heatmap data |
| GET | `/api/teacher/students` | Teacher/Admin | Roster with optional search |
| POST | `/api/teacher/remedial-assign` | Teacher/Admin | Assign remedial work |
| POST | `/api/teacher/generate-questions` | Teacher/Admin | AI worksheet questions |
| POST | `/api/teacher/performance-analysis` | Teacher/Admin | Class performance analysis |
| POST | `/api/teacher/announcements` | Teacher/Admin | Publish announcement |
| GET | `/api/parent/dashboard` | Parent/Admin | Linked child summary |
| GET | `/api/parent/child` | Parent/Admin | Child profile |
| GET/POST | `/api/parent/messages` | Parent/Admin | SMS/IVR message log |
| GET | `/api/admin/overview` | Admin | School and edge stats |
| GET/PUT | `/api/admin/settings` | Admin | School settings and feature toggles |
| GET/POST/PUT/DELETE | `/api/admin/users` | Admin | User management |
| GET | `/api/admin/logs` | Admin | Audit trail |
| POST | `/api/admin/sync/district` | Admin | District sync record |

### Operations and support

| Method | Path | Access | Notes |
| --- | --- | --- | --- |
| GET | `/api/daily-challenge` | Bearer | Grade-based challenge, reward XP |
| POST | `/api/daily-challenge/answer` | Bearer | One-time XP award on correct answer |
| GET | `/api/student/rewards` | Bearer | Reward catalog and eligibility |
| POST | `/api/student/rewards/claim` | Bearer | Claim XP-gated reward |
| POST | `/api/student/certificate` | Bearer | Generate/verify merit certificate |
| GET | `/api/certificates/:certificateId` | public | Certificate verification |
| GET/POST | `/api/teacher/attendance` | Teacher/Admin | Daily attendance |
| POST | `/api/teacher/sms-broadcast` | Teacher/Admin | Parent SMS batch |
| GET/POST | `/api/parent/callbacks` | Parent/Admin | Teacher callback requests |
| GET/POST/DELETE | `/api/admin/classes` | Admin | Class sections directory |
| GET/POST/PUT | `/api/admin/faculty` | Admin | Faculty directory |
| GET | `/api/admin/fleet` | Admin | Tablet fleet |
| POST | `/api/admin/fleet/:deviceId/command` | Admin | ping/force_sync/lock/unlock |
| GET/PUT | `/api/admin/feature-flags` | Admin | Feature controls |
| POST | `/api/admin/edge/sync` | Admin | Edge/district sync heartbeat |
| GET/PUT | `/api/admin/accreditation` | Admin | Accreditation attestation |
| GET | `/api/support/faqs` | public | Searchable FAQ list |
| POST | `/api/support/tickets` | public/optional Bearer | Grievance ticket |
| GET/PATCH | `/api/support/tickets` | Admin | Ticket triage |

---

## 7. Database model map

| Collection | Purpose |
| --- | --- |
| `users`, `refreshtokens` | Roles, profiles, auth sessions |
| `courses` | 30 courses, 37 chapters, notes, quizzes |
| `studentprogresses`, `quizattempts`, `diagnosticresults` | Learning state and history |
| `remedialassignments`, `timetables`, `announcements` | Remediation and schedules |
| `doubtmessages`, `syncrecords`, `downloads` | AI, offline queue, downloads |
| `parentmessages`, `callbackrequests`, `supporttickets` | Communication and support |
| `attendances`, `challengecompletions`, `rewardclaims` | Daily operations and XP rewards |
| `classsections`, `facultymembers`, `devices` | School directory and tablet fleet |
| `schoolsettings`, `auditlogs` | Feature flags, accreditation, admin audit |

The seed loads the same curriculum banks used by the UI from `src/data/`, so course IDs, chapter IDs, notes, and quiz questions match what students see offline.

---

## 8. Frontend integration

`src/services/api.js` is the single browser client:

- Stores `accessToken` in `gyansetu_jwt` and refresh token in `gyansetu_refresh_token`.
- Sends `Authorization: Bearer ...` only for real tokens; local demo tokens beginning with `jwt_` are never sent.
- Refreshes once on `401`, then falls back to local state.
- Returns `null` on network failure so guest/offline mode keeps working.
- Exposes grouped helpers: `authApi`, `curriculumApi`, `studentApi`, `teacherApi`, `parentApi`, `adminApi`, `supportApi`, `aiApi`, `diagnosticApi`, `syncApi`, and `healthApi`.
- Preserves legacy wrappers `askAiDoubt`, `submitQuiz`, `submitDiagnostic`, `syncOfflineBatch`, and `getTeacherOverview`.

`AuthModal.jsx` uses server-verified login/quick-login/register only; it never creates a local session when the API is unavailable or returns an error. `App.jsx` starts in Guest Mode, restores the server profile via `/api/auth/me` only when a real JWT is present, discards legacy local-demo tokens, updates `/api/auth/profile` on profile edits, and calls `/api/auth/logout` on sign-out.

---

## 9. Verification

```bash
# Static checks
cd server
Get-ChildItem -Recurse -Filter *.js | Where-Object { $_.FullName -notlike '*node_modules*' } | ForEach-Object { node --check $_.FullName }

cd ..
npm run build

# Database and server
cd server
npm run seed
npm start
```

Quick health/auth smoke test:

```bash
curl http://127.0.0.1:5000/api/health
curl -X POST http://127.0.0.1:5000/api/auth/quick-login \
  -H 'Content-Type: application/json' -d '{"role":"student"}'
curl 'http://127.0.0.1:5000/api/courses/search?q=fractions'
```

---

## 10. Vercel deployment

The live project is deployed at **[https://gyansetu-rural-learning.vercel.app](https://gyansetu-rural-learning.vercel.app)**.

Vercel-specific files:

| File | Purpose |
| --- | --- |
| `api/index.js` | Exports the Express app as the serverless `/api/*` handler |
| `vercel.json` | Rewrites `/api/*` to the serverless function; sets Vite framework |
| `src/services/api.js` | Uses relative `/api` in production, local gateway in development |
| `server/server.js` | Does not call `listen()` when imported by Vercel |
| `server/src/config/db.js` | Awaits a single shared MongoDB connection per serverless invocation |

Required Vercel environment variables (set for Production and Preview):

```text
MONGO_URI=<mongodb+srv://.../gyansetu>
JWT_SECRET=<long-random-secret>
NODE_ENV=production
AI_TIMEOUT_MS=2000
CORS_ORIGIN=*
SEED_ON_START=false
LOG_REQUESTS=false
```

MongoDB Atlas **Network Access** must allow Vercel’s egress IPs (`0.0.0.0/0` is acceptable for a demo deployment). The Atlas database was seeded with `npm run seed` before going live.

The Python AI helper is not deployed, so `/api/ai/*` routes use the deterministic localized fallback (`isFallback: true`) on Vercel.

Redeploy with:

```bash
vercel deploy --prod --yes
```

---

## 11. Implementation notes

- Language code for Odia is `od`, matching the frontend selector.
- Quiz XP is `score * 20`; daily challenge XP is `15` and can be earned once per challenge.
- Offline records use `clientId`/`clientAttemptId` for idempotent batch sync.
- If the Python helper is down, AI endpoints still return a deterministic, localized fallback response with `isFallback: true`.
- Vote/chat/analytics data are simulated from seeded records so evaluator demos are repeatable without external services.
- SMS and callback endpoints record messages in MongoDB; they do not send real carrier traffic.
