# SnowFusion - D2S SNOMED Review Application

SnowFusion is a web application designed to facilitate the review, mapping, and classification of **DMS Local Codes** in relation to **SNOMED CT UK and International** codes. 

The application is part of the **D2S SNOMED Project**, supporting the transition from **DMICP Read Codes** to **SNOMED CT** while maintaining **business-critical** and **clinically essential** codes.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Setup](#setup)
- [Data Processing Workflow](#data-processing-workflow)
- [Client-Side Pages](#client-side-pages)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Overview

SnowFusion is a **SERN (SQL, Express, React, Node.js) stack** application that enables users to **search, review, and classify** medical codes. It provides tools to map **DMS Local Codes** to **SNOMED CT** or mark them for inactivation based on business-critical assessments.

The application was developed to streamline the **transition from Read Codes to SNOMED CT** while ensuring that essential codes remain available in future electronic health record (EHR) systems.

## Features

- **Code Classification**: Identify whether a code should be mapped, inactivated, or created as a local DMS code.
- **Automated SNOMED Search**: Query the SNOMED CT database to find potential matches.
- **Business Critical Code Review**: Identify essential codes for **Occupational Medicine**, **Military Administration**, and **Clinical Needs**.
- **Filter and Search Tools**: Easily find codes using structured filters.
- **Download Capabilities**: Export filtered results as **TSV** files for analysis.
- **Hierarchical Representation**: Display parent-child relationships of codes.

## Setup

### Prerequisites

- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/SnowFusion.git
   cd SnowFusion
   ```

2. Install server dependencies:
   ```bash
   cd server
   npm install
   ```

3. Install client dependencies:
   ```bash
   cd ../client
   npm install
   ```

4. Set up environment variables:

   Create a `.env` file in the `server` directory with the following content:
   ```
   DB_HOST=
   DB_USER=
   DB_PASS=
   DB_NAME=
   ```

5. Start the development server:
   ```bash
   cd ../server
   npm run dev
   ```

6. Start the React frontend:
   ```bash
   cd ../client
   npm start
   ```

## Data Processing Workflow

The application follows a **structured review process**:

1. **Filtering Codes**  
   - Initial dataset: **~40,000 DMS Local Codes**
   - Codes are filtered based on **business-critical importance** and **usage frequency**.
   - Final dataset for review: **~9,000 codes**.

2. **Mapping to SNOMED CT**  
   - **Exact matches** are automatically suggested.
   - **Close matches** require manual review.
   - Codes that cannot be mapped retain their **DMS Local Code** status.

3. **Inactivation Review**  
   - Legacy codes and redundant entries are **marked for inactivation**.
   - Comments are recorded for each decision.

4. **Hierarchical Code Organization**  
   - Parent-child relationships between codes are preserved for structured classification.

## Client-Side Pages

| Page               | Description |
|--------------------|-------------|
| **Landing Page**  | Overview of all features, with links to key sections. |
| **SNOMED Review** | Compare DMS Local Codes with SNOMED CT. |
| **Create Page**   | List of DMS Local Codes recommended for creation. |
| **Map Page**      | Codes mapped to SNOMED CT with review status. |
| **Inactivate Page** | List of codes marked for inactivation. |
| **Review Info**   | Detailed breakdown of the **From 40,000 to 9,000** selection process. |
| **Change Log**    | Track version history and updates. |

## Technologies Used

- **Frontend**: React, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Data Processing**: Custom SNOMED CT querying and classification algorithms
- **Deployment**: Docker (optional)

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m "Description of changes"`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request.

## License

This project is licensed under the **MIT License**.

---

This updated **README.md** reflects the **SnowFusion** project more accurately.
