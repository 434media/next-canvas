# Digital Canvas

Welcome to the Digital Canvas project! This is a modern, interactive web application for San Antonio's creative tech community. It serves as a hub for designers, developers, photographers, and other digital artists to connect, learn, and showcase their work. The platform features an event series, "Prompt to Product", and a visual representation of the "Creative Journey" from ideation to reality.

## Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/) (with App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Animation**: [Motion](https://www.motion.dev/)
-   **Icons**: [Remix Icon](https://remixicon.com/)

## Project Structure

The project uses the Next.js App Router, with the main directories organized as follows:

-   `app/`: Core application directory.
    -   `page.tsx`: The home page component, which renders the [`HeroSection`](app/components/hero-section.tsx) and [`CreativeJourney`](app/components/creative-journey.tsx).
    -   `layout.tsx`: The root layout, including the [`Navbar`](app/components/Navbar.tsx) and [`Footer`](app/components/footer.tsx).
    -   `globals.css`: Global CSS styles, importing Tailwind CSS.
    -   `components/`: Contains all reusable React components.
    -   `data/`: Holds static data used across the application, such as `prompt-to-product.ts`.
    -   `events/`: Contains pages and components related to specific events, like the [Prompt to Product page](app/events/prompt-to-product/page.tsx).

## Getting Started (Local Development)

Follow these steps to get the project running on your local machine.

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/next-canvas.git
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd next-canvas
    ```

3.  **Install dependencies:**
    The project uses `npm` for package management.
    ```sh
    npm install
    ```

4.  **Run the development server:**
    This command starts the Next.js development server with Turbopack.
    ```sh
    npm run dev
    ```

5.  **Open the application:**
    Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## GitHub Workflow (Contributing)

To contribute to the project, please follow this standard GitHub workflow:

1.  **Create a New Branch:**
    Create a new branch from the `main` branch for your feature or bug fix.
    ```sh
    git checkout -b feature/your-new-feature
    ```

2.  **Make Changes:**
    Modify the code to implement your changes.

3.  **Commit Your Changes:**
    Stage and commit your changes with a descriptive message.
    ```sh
    git add .
    git commit -m "feat: Add new feature"
    ```

4.  **Push to Your Branch:**
    Push your new branch to the remote repository.
    ```sh
    git push origin feature/your-new-feature
    ```

5.  **Create a Pull Request (PR):**
    Go to the repository on GitHub and open a new pull request. Set your branch as the source and `main` as the target. Provide a clear title and description for your PR.

6.  **Merge the PR:**
    Once the pull request has been reviewed and approved by the maintainers, it will be merged into the