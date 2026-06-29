# EU Talent Attractiveness Map 2026

Interactive 2026 EU Talent Attractiveness Map comparing countries by skilled-worker appeal, tax incentives, immigration pathways, innovation strength, quality of life, and recent policy direction.

This project is a self-contained browser dashboard for exploring how attractive EU countries are for highly skilled international workers. It combines a 0-100 composite score with a 5-10 year policy-change indicator, then lets users inspect the underlying tax, immigration, innovation, and quality-of-life notes country by country.

## Features

- Choropleth map of EU talent-attractiveness scores
- Toggle between composite score and recent policy trajectory
- Search and tier filtering across all 27 EU countries
- Country ranking panel with score and trend indicators
- Detailed country profiles covering tax regimes, immigration routes, policy changes, quality of life, and a short verdict
- Self-contained HTML app with inline geography and data

## Run

```bash
npm start
```

Then open:

```text
http://127.0.0.1:5173
```

The app is self-contained in `index.html`; the Node server only serves the file locally.

## Data Notes

The composite score is an author synthesis, not an official OECD or EU index. Sources referenced in the app include OECD Indicators of Talent Attractiveness 2023, INSEAD Global Talent Competitiveness Index 2023, European Innovation Scoreboard 2024, Eurostat EU Blue Card data 2023-2024, national tax-authority pages, the EU Immigration Portal, BAMF, Make-it-in-Germany, and reform tracking for 2024-2026.
