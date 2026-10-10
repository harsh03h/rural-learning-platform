# GyanSetu (ज्ञानसेतु) — Digital Learning Platform for Rural School Students

>   
> **Domain:** EdTech, Offline-First PWA, AI-Assisted Adaptive Learning, Human-Computer Interaction for Low-Resource Environments

---

## 🌟 1. Project Overview & Motivation

Most mainstream e-learning platforms (BYJU'S, Unacademy, Khan Academy, Coursera) assume:
- ❌ High-speed continuous broadband or 4G/5G
- ❌ Personal smartphone or laptop for each student
- ❌ English fluency and uniform baseline grade competency
- ❌ Continuous internet connectivity

**In Indian rural schools, these assumptions fail.**  
**GyanSetu** is designed from the ground up with a **rural-first, local-first philosophy**:
1. **Multilingual Vernacular Engine (10 Regional Languages):**
   - 🇮🇳 **हिन्दी (Hindi)**, 🇬🇧 **English**, 🇮🇳 **मराठी (Marathi)**, 🇮🇳 **বাংলা (Bengali)**, 🇮🇳 **తెలుగు (Telugu)**, 🇮🇳 **தமிழ் (Tamil)**, 🇮🇳 **ગુજરાતી (Gujarati)**, 🇮🇳 **ಕನ್ನಡ (Kannada)**, 🇮🇳 **ਪੰਜਾਬੀ (Punjabi)**, 🇮🇳 **ଓଡ଼ିଆ (Odia)**.
   - Includes localized Web Speech API Text-to-Speech (TTS) voice narration for emerging readers in their native language!
2. **Low-Data Bandwidth Engine:** Reduces data consumption by 98% (switches from heavy 20MB video to structured &lt;40KB text + compressed audio voiceover).
3. **Offline-First Learning & IndexedDB Sync:** Students can download lessons at school or a community Wi-Fi point, study and attempt quizzes completely offline, and synchronize progress automatically when connectivity returns.
4. **Diagnostic Baseline Assessment:** Evaluates students on fundamental topics (e.g. Fractions, Decimals, Percentages) and pinpoints specific conceptual gaps.
5. **AI-Powered Remedial Recommendations:** Rather than forcing every student along an identical path, the AI enforces prerequisite mastery (e.g., *"Master Fractions Chapter 1 before advancing to Percentages"*).
6. **AI Doubt Saathi:** Vernacular AI assistant answering student queries using relatable village analogies (dividing rotis, measuring farm fields, water tanks).
7. **Teacher Analytics Dashboard:** Real-time visibility into class averages, class-wide weak topics heatmaps, and flagged *"Students Needing Immediate Attention"* with one-click remedial assignments.
8. **AI Question Generator for Teachers:** Automatically crafts classroom quiz questions with answer keys and explanations.
9. **Parent Feature-Phone Portal:** Generates automated low-tech SMS/IVR updates in regional languages for parents with basic keypad phones.
10. **Multi-Role Authentication Gateway (JWT-Powered):**
    - 🎓 **Student Dashboard:** Progress tracking, remedial recommendations, XP points, and offline downloads.
    - 👨‍🏫 **Teacher Dashboard:** Class metrics, weak topics heatmap, attention alerts, and AI quiz generator.
    - 📱 **Parent SMS View:** Simulated keypad feature-phone SMS delivery.
    - 🏛️ **School Admin / Headmaster Hub:** School edge server controls, active PWA tablets count, and district sync.
    - ⚡ **1-Click Quick Demo Accounts:** Instant evaluator shortcut for college project defense.

---

## 🏗️ 2. System Architecture

```
[ Rural Student / Teacher UI (React + Vite PWA + IndexedDB) ]
                         │
                         ▼ (REST APIs / Offline Sync Queue)
           [ Node.js / Express Backend Gateway ]
                         │
            ┌────────────┴────────────┐
            ▼                         ▼
   [ MongoDB Database ]      [ Python FastAPI AI Microservice ]
                                      │
                                      ▼
                             [ LLM Service / Gemini ]
```

> **Security & Scalability Principle:** The frontend never connects directly to the AI/LLM API. All prompts pass through the Node.js authentication gateway to the Python FastAPI microservice, securing API keys, enforcing rate limits, and sanitizing student queries.

---

## 🚀 3. How to Run Locally

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation & Launch
```bash
# Navigate to the project directory
cd rural-learning-platform

# Install dependencies
npm run install (or npm.cmd install)

# Start development server
npm run dev
```

The web application will be live at: `http://localhost:5173/`

---

## 📱 4. Key Interactive Demos to Showcase to Evaluators

1. **Role Switcher (Header):** Switch between **Student (Rohan)**, **Teacher (Mr. Sharma)**, and **Parent (Feature-Phone SMS View)** in 1 click.
2. **Rural Bandwidth Toggle (Low Data Mode):** Toggle the Low Data Mode switch in the top header to observe real-time KB footprint reduction and text-to-speech audio narration.
3. **Network Disconnection Simulation (Offline Mode):** Click **"Online / Offline"** in the top bar to simulate losing internet. Take a quiz while offline to see it saved into the local sync queue, then reconnect and click **"Sync Offline Data Now"**.
4. **Diagnostic Test & AI Path:** Click **"Start Diagnostic Test"** on the Student Dashboard to take the 6-question baseline test and watch the real-time topic mastery chart update.
5. **AI Doubt Saathi:** Click the pulsing green button in the bottom right to ask questions in Hindi or English (try: *"भिन्न क्या होते हैं?"* or *"How does photosynthesis work?"*).
6. **Teacher AI Question Generator:** Switch to Teacher View and use the AI form to generate 3 to 5 custom multiple-choice questions for Class 7 Mathematics or Science.
7. **Project Architecture Modal:** Click **"Project Architecture (Major Viva)"** in the top bar for an instant academic presentation diagram.
