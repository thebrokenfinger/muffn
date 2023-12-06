# muffn 🧁

Tiny template engine for baking HTML in the browser and on the server

[![NPM](https://img.shields.io/npm/v/muffn.svg)](https://www.npmjs.com/package/muffn)

## Features

- Tiny (<1kb minified + gzipped)
- No dependencies
- Works in the browser and on the server
- Just enough templating: Variables, conditionals, and loops
- Written in TypeScript

## Why?

I needed a lightweight, dependency-free template engine that works in the browser and on the server. I couldn't find one, so I made one.

> It's just **50 lines** of vanilla JavaScript `¯\_(ツ)_/¯` 🍨🟨

## Installation

```bash
npm install muffn

// or

yarn add muffn

// or

pnpm add muffn
```

## Usage

```js
import muffin from 'muffn';

const template = `
<div>
  <h1>{{ title }}</h1>
  <p>{{ description }}</p>
</div>
`;

const data = {
  title: 'Hello World',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
};

const html = muffin(template, data);
```

---

## Template Syntax

### Variables

```html
<div>
  <h1>{{ title }}</h1>
  <p>{{ description }}</p>
</div>
```

### Conditionals

```html
<div>
  {@if title}
  <h1>{{ title }}</h1>
  {/if}
</div>
```

```html
<div>
  {@if title}
  <h1>{{ title }}</h1>
  {else}
  <h1>Default Title</h1>
  {/if}
</div>
```

### Loops

```html
<div>
  {@each person in people}
  <p>{{ person }}</p>
  {/each}
</div>
```

### Dot Notation Access

```html
<div>
  <h1>{{ person.name }}</h1>
  <p>{{ person.age }}</p>
</div>
```

---

## License

MIT © [yatharth](https://twitter.com/thebrokenfinger)
