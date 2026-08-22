# Setting Up Tailwind

Tailwind is a utility-first CSS framework for rapidly building custom user interfaces.

- Published: 2019-11-16
- Language: en
- Tags: Tailwind, PostCSS, CSS, Programming Notes
- Canonical: https://sirwan.info/blog/en/Setting-Up-Tailwind

---

# Setup

1. Create a directory then:

`npm init -y`

2. Install these dependencies:

`npm install tailwindcss postcss-cli autoprefixer`

3. `npx tailwind init` (It creates an empty **tailwind.config.js** file in the project root):

```
module.exports = {
  theme: {
    extend: {}
  },
  variants: {},
  plugins: []
}

```

4. Create a **postcss.config.js** in the root of the project:

```
module.exports = {
  plugins: [
      require("tailwindcss"),
      require("autoprefixer")
  ]
};
```

5. Create a CSS file that runs through the above process: `css/tailwind.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

6. Create a script to process the CSS through our list of PostCSS plugins:

```json
"scripts": {
    "build": "postcss css/tailwind.css -o public/build/tailwind.css"
},
```

7. Run the command: `npm run build`; A new CSS file is generated that has been processed through the PostCSS.

8. Add an HTML file in `public/index.html` and use the tailwind classes:

```html
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Tailwindcss</title>
    <link rel="stylesheet" href="./build/tailwind.css" />
  </head>
  <body>
    <h1 class="text-4xl font-bold text-center text-blue-400">Hello World!</h1>
  </body>
</html>
```

[Tailwind CSS Intellisense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) for intelligent auto-completion in VS Code

## Hover

```html
<a class="bg-indigo-500 hover:bg-indigo-400" href="#">Book your escape</a>
```

## Responsive design:

Out of the box Tailwind ships with four default breakpoints:

- `sm` which kicks in at 640
- `md` which kicks in at 768
- `lg` which kicks in at 1024
- `xl` which kicks in at 1280

```html
<div class="mt-4 sm:mt-6 md:mt-4"></div>
```

## Composing Utilities with `@apply`:

Change `tailwind.css` file:

```css
@tailwind base;
@tailwind components;

.btn {
  @apply inline-block bg-indigo-500 text-white px-5 py-3 rounded-lg shadow-lg uppercase tracking-wider font-semibold text-sm;
}
.btn:hover {
  @apply bg-indigo-400;
}
.btn:focus {
  @apply outline-none shadow-outline;
}
.btn:active {
  @apply bg-indigo-600;
}
@screen sm {
  .btn {
    @apply text-base;
  }
}

@tailwind utilities;
```

## Add watch script for CSS files:

```json
"scripts": {
  "watch": "postcss css/tailwind.css -o public/build/tailwind.css --watch"
},
```

# Adding Tailwind to a React project

1. `npx create-react-app tailwind`

2. `cd tailwind`

3. `npm install tailwindcss postcss-cli autoprefixer`

4. `touch postcss.config.js`:

```js
module.exports = {
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
```

5. `touch tailwind.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

6. Add build script:

```json
"scripts": {
    "build:css": "postcss ./tailwind.css -o src/css/style.css",
},
```

7. Update `public/index.html`:

```js
<body class="w-full bg-purple-100">
```

8. Install `concurrently` for watching `tailwind.css` changes:

```json
"scripts": {
    "dev": "concurrently \"yarn watch:css\" \"yarn start\"",
    "start": "react-scripts start",
    "build": "react-scripts build",
    "watch:css": "onchange 'tailwind.css' -- yarn build:css",
    "build:css": "postcss ./tailwind.css -o src/css/style.css",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
```
