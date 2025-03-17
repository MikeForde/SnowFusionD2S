# SnowFusion - D2S SNOMED Review Application

SnowFusion is a web application designed to facilitate the review, mapping, and classification of **DMS Local Codes** in relation to **SNOMED CT UK and International** codes. 

The application is part of the **D2S SNOMED Project**, supporting the transition from **DMICP Read Codes** to **SNOMED CT** while maintaining **business-critical** and **clinically essential** codes.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Setup](#setup)
- [Data Processing Workflow](#data-processing-workflow)
- [API Documentation](#api-documentation)
- [Client-Side Pages](#client-side-pages)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Overview

SnowFusion enables:
- **Review of DMS Local Codes** (40,000+ codes filtered down to ~9,000 for analysis).
- **Categorization of codes** into three primary fates:
  1. **DMSCreate** – Codes to be retained as local codes in a new system.
  2. **Mapped** – Codes that align with existing SNOMED CT UK/International concepts.
  3. **Inactivate** – Codes that are obsolete, redundant, or unnecessary.
- **Integration with SNOMED API** to support mapping and validation.
- **Detailed Review Tracking**, allowing reviewers to annotate and process each code systematically.

## Features

- **Search & Filter**: Review and analyze DMS Local Codes using multiple filtering options.
- **Mapping to SNOMED CT**: Automated and manual SNOMED mapping via **SnowStorm API**.
- **Data Visualization**: Categorization and review progress tracking.
- **Download Data as TSV**: Filtered views can be exported in a tab-separated format.
- **Historical Review Context**: Tracks previous mapping and review decisions.

## Setup

### Prerequisites

- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/SnowFusionD2S.git
   cd SnowFusionD2S
