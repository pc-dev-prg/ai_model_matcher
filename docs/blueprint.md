# **App Name**: AI Model Matcher

## Core Features:

- Filter Form: Displays a filter form, with inputs for task type, complexity, budget, token volume, speed, and special requirements like multimodal input or Czech language support.
- Sorting Options: Provides a select box allowing users to sort the model results by input price, output price, or model name.
- JSON Data Load: Fetches model data from a static JSON file (models.json) using the fetch API.
- Model Filtering and Sorting: Filters the loaded model data based on user inputs from the form, including budget, required tags, and task complexity. Then it orders the data per user selection in a dropdown.
- Results Display: Presents the filtered and sorted AI model results in a list format. Each entry will include the model's name, provider, input/output costs, a usage description, and relevant tags.

## Style Guidelines:

- Background color: Dark grey (#121212) to support a dark mode and futuristic look.
- Primary color: Vibrant purple (#9F5BBA) for a modern and energetic feel. This choice is inspired by the cutting edge nature of modern AI.
- Accent color: Electric blue (#5BC0DE) for interactive elements and highlights. The blue provides contrast and suggests future technology.
- Body and headline font: 'Inter', a sans-serif, for a modern and clean interface.
- Use simple, outlined icons to represent task types and model features.
- Implement a responsive layout that adapts to different screen sizes, ensuring a clean and accessible interface on both desktop and mobile.
- Incorporate subtle transitions and animations, such as fade-in effects on model cards and hover effects on buttons, to enhance user engagement without being distracting.