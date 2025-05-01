# 🚒 RapidPlan

**Mission-focused, when seconds matter.**

RapidPlan is a fast, mobile-first emergency response app designed for field responders to quickly complete and submit a Site Safety and Control Plan during a hazardous materials incident or refinery emergency.

## 📋 Features

- Mobile-first responsive design for in-field use
- Section 3: Hazard and Risk Analysis with dropdown selector  
  -- Top 30 Refinery-Related Chemicals so field responders won't waste time scrolling weird chemicals. Making it manageable and super-fast to search.
  -- Data is based on NIOSH Pocket Guide and OSHA chemical datasheets 
  -- Properties include(see Description abbr): Physical State, pH, IDLH, Flash Point (FP), Ignition Point (IP), Vapor Pressure (VP), Vapor Density (VD), Specific Gravity (SG), LEL  
- Auto-population of chemical hazard fields from local JSON data
- Fast lookup — no internet required
- Save as draft (via LocalStorage)
- Email or export final plan (EmailJS or Firebase integration planned)

## 🧪 Chemical Library (Top 30 Refinery Chemicals)

The RapidPlan app provides quick-access hazard data for the most commonly encountered refinery chemicals, covering over 90% of likely field incidents. The following substances are included in this focused hazard dataset:

- Ammonia
- Benzene
- Butane
- Carbon Monoxide
- Carbon Dioxide
- Chlorine
- Diesel Fuel
- Ethanol
- Ethylene
- Gasoline
- Hydrogen
- Hydrogen Sulfide (H₂S)
- Methane
- Methanol
- Naptha
- Nitrogen
- Nitrogen Dioxide (NO₂)
- Oxygen
- Pentane
- Phenol
- Propane
- Propylene
- Sodium Hydroxide (Caustic)
- Sulfur Dioxide (SO₂)
- Sulfuric Acid
- Toluene
- Xylene
- Hydrofluoric Acid
- Asphalt Vapors
- Emtonium

## Physical Description (Abbreviations)
- MW Molecular weight: 
-- greater than 29 will SINK
-- less than 29 will RISE

- BP Boiling Point
-- High BP have a low Vapor Pressure (VP)
-- Low BP have a high vapor Pressure (VP)

- Sol Solubility
-- More than 10% soluble in water
-- Less than 10% unsoluble in water

- Fl.P Flash Point
-- High Fl.P have a low Vapor Pressure (VP)
-- Low Fl.P have a high Vapor Pressure (VP)

- Sp Gr Specific Gravity
-- Water = 1.0 (8.42 lbs)

- VP Vapor Pressure
-- 760 mmHg = 14.7 psi = 1 ATM
-- 40 mmHg, Vapors begin to escape container
-- 100 mmHg, High VP more volatile
-- 400 mmHg, Vapors will migrate long distances

- FRZ Freezeig Point

- UEL Upper Explosive Limit
-- TOO ruch to ignite, not enought oxygen, too much product
-- Wider the range, the more hazardous it

-LEL Lower Explosive Limit
-- Lowest amount of product in air that  can cause an explosing
-- ABOVE 10% LEL = IDLH

- IDLH Immediatelly Dangerous to Life and Health

## 🚧 Roadmap

### MVP
- [x] Mobile-first form layout
- [x] Dropdown for top 30 refinery chemicals
- [x] Auto-fill hazard data fields
- [ ] Save as Draft (localStorage)
- [ ] Email form (EmailJS)

### Future Features Advanced Version
- Signature capture

- Voice input (Web Speech API): Talk instead of typing (e.g., say "Entry Team Leader: Captain Johnson")

- Auto-Timestamping: Record when sections are completed

- Pre-filled Templates: Save time for common incidents (e.g., "Refinery Fire," "Chlorine Leak")

- Combine with FoamCalc app under QuickCommand suite

## 🛠 Tech Stack

- **React** (frontend framework)
- **JavaScript** for form logic and data
- **CSS** (mobile-first layout)
- **Local JSON data** (`chemicalData.js`) for offline hazard info

### Tech Choices
- Frontend: React.js (responsive web app for tablet/phone field use)
- Backend: Firebase (for storage and email sending)
- Data for Chemicals: Preload NIOSH chemical info into JSON or Firebase Database
- Voice Input (optional upgrade): Use Web Speech API for voice-to-text
- Offline Capabilities: Use service workers if needed, in case of poor signal

## 📁 Project Structure

```
/src
  /components
    Section3Hazard.js
  /data
    chemicalData.js
  styles.css
  App.js
```
## Mains Sections of App
0. Incident Information - Text Fields
1. Site Description - Text Fields
2. Organization	Text fields for IC, Safety Officer, etc.
3. Hazard and Risk Analysis (dropdown auto-populate)
4. Hazard Monitoring	Checkboxes
5. Decontamination Procedures	Yes/No toggle + comments
6. Site Communications	Command, Tactical, Entry frequencies
7. Medical Assistance	Yes/No toggles + comments
8. Site Map	Upload image or draw basic map
9. Entry Objectives	Text field
10. SOPs and Work Practices	Yes/No toggle + comments
11. Emergency Procedures	Text field
12. Safety Briefing	Digital Signatures (or typed names)

## App Work Flow
``` Login (optional) 
  ↓
Select Incident → Fill Sections 1-10 → 
Section 3: Pick Chemical (Dropdown) → Fields auto-fill
  ↓
Review Full Plan
  ↓
Send as Email / Save PDF / Upload to Command Center ```

## 🚀 Getting Started

1. Clone the repo and install dependencies:
   ```bash
   git clone https://github.com/your-username/rapidplan.git
   cd rapidplan
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open in browser:
   ```
   http://localhost:3000
   ```

## 👨‍🚒 Maintainer

Created by **Emmett Pennington**  
Built for emergency responders and safety officers working in refinery and hazardous material environments.

---
