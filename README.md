# OHSU Status Boards

Campus-wide transit status board system for Oregon Health & Science University (OHSU).

## Overview

This repository contains building-specific transit displays for OHSU's South Waterfront and Marquam Hill campuses. Each display shows real-time TriMet arrivals, MAX light rail, Portland Streetcar, and OHSU Aerial Tram information tailored to the specific building location.

## System Architecture

### Configuration-Driven Design

Each building has its own directory containing:
- `index.html` - Display page that loads configuration dynamically
- `config.json` - Building-specific stop IDs, alerts, and feature flags

### Directory Structure

```
/
├── index.html                    # Main navigation hub
├── waterfront/                   # Legacy waterfront display
├── south-waterfront/
│   ├── rlsb/                    # Robertson Life Sciences Building
│   ├── kcrb/                    # Knight Cancer Research Building
│   ├── chh/                     # Center for Health & Healing
│   ├── rpv/                     # Rood Family Pavilion
│   └── dentistry/               # School of Dentistry
└── marquam-hill/
    ├── hospital/                # OHSU Hospital
    ├── doernbecher/             # Doernbecher Children's Hospital
    ├── casey-eye/               # Casey Eye Institute
    ├── kohler/                  # Kohler Pavilion
    └── va-medical/              # VA Medical Center
```

## Building Locations

### South Waterfront Campus

| Building | Address | Transit Options |
|----------|---------|-----------------|
| Robertson Life Sciences (RLSB) | 2730 S Moody Ave | MAX Orange (City Center & Milwaukie), Streetcar |
| Knight Cancer Research (KCRB) | 2720 S Moody Ave | MAX Orange (City Center & Milwaukie), Streetcar |
| Center for Health & Healing (CHH) | 3303 S Bond Ave | Streetcar, Bus 35/40, Aerial Tram |
| Rood Family Pavilion (RPV) | 3410 S Bond Ave | Streetcar (accessibility priority) |
| School of Dentistry | 2730 S Moody Ave | MAX Orange, Streetcar |

### Marquam Hill Campus

| Building | Address | Transit Options | Notes |
|----------|---------|-----------------|-------|
| OHSU Hospital | 3181 SW Sam Jackson Park Rd | Bus 8/43/56, Aerial Tram | Main transit hub |
| Doernbecher Children's | 700 SW Campus Dr | Bus 8/43/56 | ⚠️ Construction alert |
| Casey Eye Institute | 515 SW Campus Dr | Bus 8/43/56 | ⚠️ Construction alert |
| Kohler Pavilion | 808 SW Campus Dr | Aerial Tram (priority), Bus 8/43/56 | |
| VA Medical Center | 3710 SW US Veterans Hospital Rd | Bus 8/56 | |

## Construction Alerts

**Doernbecher Children's Hospital** and **Casey Eye Institute** displays show construction alerts because primary stops at Campus Drive are closed. These displays use the alternate stop at SW Terwilliger & Campus (Stop ID 11010).

## Configuration Schema

Each `config.json` follows this structure:

```json
{
  "building_id": "unique-id",
  "display_name": "Building Name",
  "campus_region": "South Waterfront|Marquam Hill",
  "primary_stops": [
    {
      "id": 12345,
      "label": "Stop Name",
      "type": "bus|max|streetcar|tram"
    }
  ],
  "secondary_stops": [],
  "alerts": {
    "active": false,
    "message": ""
  },
  "features": {
    "show_tram_status": false,
    "accessibility_highlight": false
  }
}
```

## Usage

### Local Development

1. Clone the repository
2. Start a local web server: `python3 -m http.server 8080`
3. Open `http://localhost:8080/` in your browser
4. Select a building from the navigation hub

### Deployment

This is a static site that can be deployed to GitHub Pages or any static hosting service. Each building display has a clean URL suitable for digital signage:

- `https://your-domain.com/south-waterfront/rlsb/`
- `https://your-domain.com/marquam-hill/hospital/`

### Updating Stop IDs

To update transit stop IDs for a building:

1. Edit the `config.json` file in the building's directory
2. Update the `id` field for the relevant stop
3. For construction alerts, set `alerts.active` to `true` and provide a message
4. Commit and deploy

## Features

- **Real-time Data**: Displays live TriMet arrivals via TransitTracker API
- **Construction Alerts**: Prominent banner system for service disruptions
- **Accessibility**: Support for screen readers and mobility-focused displays
- **Weather Integration**: Hourly forecast for tram operations
- **Auto-refresh**: Updates every 15 seconds
- **Solari Animation**: Split-flap display style transitions

## Data Sources

- **TriMet API**: Bus and MAX light rail arrivals
- **Portland Streetcar**: Real-time streetcar locations
- **OHSU Aerial Tram**: Schedule and status information
- **Open-Meteo**: Weather data for tram operations

## Browser Compatibility

Optimized for:
- Chrome/Edge (recommended for digital signage)
- Firefox
- Safari

Designed for 55" 1080p displays but responsive to various screen sizes.

## License

See LICENSE file for details.
