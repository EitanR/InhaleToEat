# InhaleToEat 🥩💨

> An intuitive "sandbox" and training engine engineered to build muscle memory for Afrezza (inhaled rapid-acting insulin) meal management.

---

## 🎯 The Philosophy: Training, Not Tracking

Unlike traditional insulin pumps or rigid carb-ratio apps that demand exact gram-counting and precise input, **InhaleToEat** is designed around a simple goal: **to eventually make itself unnecessary.**

Afrezza operates on ultra-rapid kinetics and hepatic-first clearance. Managing it successfully relies less on exact math and more on understanding **digestive dynamics** — how meal composition shifts glucose arrival over time.

InhaleToEat serves as an interactive "simulator" for the "Afrezza way." By providing tactile control levers instead of rigid input fields, it helps users internalize the fluid interplay between protein, fat, and absorption speed. Over time, the app builds an intuitive mental model, enabling users to make rapid, confident dosing decisions in real life without relying on a calculator.

---

## 🎛️ The Levers: Translating "Fuzzy" Meals into Visual Math

Real-world dining is inherently imprecise. InhaleToEat translates the qualitative "fuzziness" of a plate into discrete, actionable feedback through simple levers:

* **Protein Speed (0 = Fast → 10 = Slow):** Captures how rapidly a protein source breaks down (e.g., fast whey vs. slow red meat).
* **Fat Load (0 = Lean → 10 = Buttered):** Models how fat retards gastric emptying and delays overall nutrient absorption.
* **Digestion Mode (Average vs. Fast):** Adjusts overall baseline timing multipliers based on personal metabolic variance.
* **Pizza Mode (Extended Digestion Split):** A dedicated toggle for complex, high-fat, high-carb meals. It splits carbs alongside protein and spreads follow-up doses across two staggered checkpoints (0.65× and 1.5× base delay) to match extended glycemic waves.
* **Today's Adjustment (-40% to +60%):** A quick, single-slider dampener to handle temporary physiological shifts like illness, intense activity, or stress without altering core settings.

---

## 🧮 How the Engine Models the "Afrezza Way"

Behind the intuitive UI lies a structured pipeline that quantifies digestive delays into practical 4-unit cartridge boundaries:

1. **Protein-to-Glucose Conversion (PGF):**
Calculates total protein content from portion size ($P_{\text{grams}} = \text{Weight}_{\text{grams}} \times 0.21$) and converts it into carbohydrate-equivalents based on user-calibrated gluconeogenesis rates (typically 0.60–0.80).

$$\text{Carbs}_{\text{equiv}} = P_{\text{grams}} \times \text{PGF} \times \text{PGF}_{\text{multiplier}}$$

2. **Upfront vs. Delayed Ratio:**
Calculates the fraction of insulin needed **NOW** versus later based on the combined delay penalty of fat and protein speed:

$$\text{Ratio}_{\text{pre}} = \text{Base}_{\text{pre}} - (\text{FatLoad} + \text{ProteinSpeed}) \times \text{Penalty}$$

3. **Discrete Cartridge Rounding:**
Converts theoretical insulin doses into real-world, whole 4-unit Afrezza cartridges.

---

## ✨ Features & Architecture

* **Zero-Dependency & Offline-First:** Written in pure, modern HTML/CSS/JavaScript with zero external runtime dependencies. Works completely offline as an installed PWA.
* **Multi-Profile Isolation Engine:** Supports up to 6 distinct user profiles stored entirely in local device storage, making it easy to test different baselines or share a device.
* **Proactive Service Worker (`sw.js`):** Byte-diff update checking, immediate controller acquisition (`skipWaiting`), periodic and foreground-triggered update checks, and a single automatic reload once a new version takes control — no manual cache clearing needed.
* **Minimalist FIFO Meal Logging:** Keeps a lightweight, 15-entry log per profile with post-meal outcome tags (`Low`, `On target`, `High`) — giving you the real outcome history to refine your own ACR and PGF over time. The app surfaces the data; the decision stays with you and your provider.
* **Printable Meal Reports:** One-tap, print-formatted report of the current log — plain black-on-white table, ready to hand to (or save as a PDF for) a healthcare provider.

---

## 🛠 Tech Stack

* **Core:** Vanilla JavaScript (ES6+), HTML5, CSS3.
* **PWA:** Native Web Manifest, Cache Storage API, Custom Service Worker lifecycle.
* **Storage:** Local-first schema management with seamless migration.

---

## 📄 License

This project is licensed under the **Polyform Noncommercial 1.0.0** license.

* **Free to use** for personal, non-commercial purposes and sharing within the diabetes community.
* **Commercial use**, reselling, monetization, or paid distribution is strictly prohibited.

For commercial licensing inquiries, contact: `eitan.rosa@gmail.com`.

---

*Disclaimer: InhaleToEat is an educational tool and mental simulator for understanding experimental dosing splits. It is not a substitute for professional medical advice. Always verify dosing with your healthcare provider and continuous glucose monitor (CGM).*
