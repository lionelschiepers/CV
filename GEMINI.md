# Directory Overview

This directory contains a web project, likely a personal portfolio or CV, built using modern web development tools. It includes frontend assets, CI/CD configuration, and dependencies for both Node.js and Python.

# Project Structure

*   `.github/`: Contains GitHub Actions workflows for CI/CD, specifically for deploying a static site.
*   `.venv/`: A Python virtual environment, suggesting some Python-based tooling or backend components might be used.
*   `dist/`: The output directory for the build process, containing the compiled and minified assets ready for deployment.
*   `LandingPage/`: Contains the source files for a static webpage, including HTML, CSS, JavaScript, and assets.
    *   `index.html`: The main HTML file.
    *   `style.css`: Styles for the page.
    *   `script.js`: JavaScript for the page.
    *   `CV.pdf`: A curriculum vitae document.
    *   `Badge.jpg`: An image, likely a profile picture or badge.
*   `node_modules/`: Directory for Node.js dependencies.
*   `package.json`, `package-lock.json`: Defines the project's Node.js dependencies and scripts.
*   `vite.config.js`: Configuration file for Vite, a modern frontend build tool.
*   `README.md`: The main README file for the project.
*   `.gitignore`: Specifies files and directories to be ignored by Git.

# Key Files

*   `LandingPage/index.html`: The main entry point for the web application.
*   `LandingPage/CV.pdf`: A key document, likely the user's resume.
*   `vite.config.js`: Defines the build process for the frontend application.
*   `.github/workflows/static.yml`: Defines the deployment process.

# Usage

This project appears to be a personal website or portfolio. Development is likely done using a Node.js environment (e.g., `npm install` and `npm run dev`), with Vite handling the development server and build process. The site is deployed automatically via GitHub Actions.
