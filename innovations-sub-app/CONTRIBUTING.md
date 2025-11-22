# Contributing to Innovana Immersive Web & AR/VR

Thank you for your interest in contributing to the Innovana Immersive Web & AR/VR ecosystem! We welcome contributions from the community to help us build the future of the immersive web.

## Development Setup

To get started with development, you'll need **Node.js** (v18 or higher) and **npm** installed on your machine.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-org/innovana-immersive-web.git
    cd innovana-immersive-web
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```

## Code Style Guidelines

We follow modern web development best practices.

### Frontend (React + Three.js)
*   **Framework:** We use **React** with **Vite** and **TypeScript**.
*   **3D Engine:** We use **@react-three/fiber** for declarative Three.js scenes.
*   **Components:** Use functional components with hooks. Keep components small and focused.
*   **Styling:** Use CSS Modules or styled-components (as configured).

### Backend (API)
*   **API Design:** Follow RESTful principles.
*   **Validation:** Ensure all inputs are validated before processing.

## Pull Request Process

1.  Fork the repository and create your branch from `main`.
2.  If you've added code that should be tested, add tests.
3.  Ensure the test suite passes.
4.  Make sure your code lints.
5.  Issue that pull request!

## License

By contributing, you agree that your contributions will be licensed under its MIT License.
