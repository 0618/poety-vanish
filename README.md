# Poetry Vanish (古诗词消消乐)

A minimalist, "Zen" web application for collective poetry recitation and memory challenge.

## Features

- **Progressive Masking**: Challenge your memory by progressively hiding text.
  - **Level 0**: Full Text.
  - **Level 1**: Keywords Masked (Imagery words like "黄河", "白发").
  - **Level 2**: Structure Masked (Second half of couplets hidden).
  - **Level 3**: Minimalist (Title & Author only).
- **Curated Anthology**: Includes classic poems like "将进酒" (Li Bai) and "静夜思".
- **Keyboard Controls**:
  - `Space` / `Right Arrow`: Increase difficulty (vanish).
  - `Left Arrow`: Decrease difficulty (restore).
  - `m`: Toggle poem selection menu.
- **Aesthetic**: Clean, typography-focused design using Noto Serif SC.

## Tech Stack

- **Framework**: React + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Getting Started

1.  **Clone the repository**:
    ```bash
    git clone git@github.com:0618/poety-vanish.git
    cd poetry-vanish
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  **Build for production**:
    ```bash
    npm run build
    ```

## License

MIT
