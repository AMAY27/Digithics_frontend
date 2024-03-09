# V-Tenet Dark Pattern Detection Frontend

Welcome to the V-Tenet Dark Pattern Detection Frontend! The Frontend part for this project is created using [React](https://reactjs.org/), a popular JavaScript library for building user interfaces with [MUI](https://mui.com/) and [TailwindCSS](https://tailwindcss.com/) for creating mobile-friendly, interactive user interfaces.

## Getting Started

Follow these steps to set up the project on your local machine:

### Prerequisites

Before you begin, make sure you have the following installed on your system:

- Node.js
- npm (Node Package Manager): npm is included with Node.js installation.

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://gitlab.hrz.tu-chemnitz.de/vsr/edu/planspiel/WS2324/v-tenet.git
   ```

2. Change into project's Frontend Directory

   ```bash
   cd frontend
   ```

3. Install Project Dependencies

   ```bash
   npm install
   ```

### Environment Variables

To run the project, you need to set up environment variables. Create a .env file in the root of the frontend folder and add the following variables:

```env
REACT_APP_API_BASE_URL_CLIENT = https://api.example.com
```

Replace `https://api.example.com` with the base URL of your API and your_api_key with the actual API key required for authentication.

You can even refer to the `sample.env` file and replace the contents with actual values

## Running the Application

Once you have completed the installation and set up the environment variables, you can start the development server:

```bash
npm start
```

This command will start the development server, and you can view your React app by navigating to http://localhost:3000 in your web browser.

## Stay in Touch

Feel free to reach out to the developers for any questions or feedback. Here are some ways to stay in touch:

- Website: [V-Tenet](https://v-tenet.vercel.app/)
- LinkedIn: [LinkedIn](https://www.linkedin.com/in/v-tenet/)
