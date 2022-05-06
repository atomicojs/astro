# @atomico/astro

Early support for using Atomico SSR + Astro Build.

## Install

```bash
npm i -D @atomico/astro
```

## Usage

```js
import { defineConfig } from "astro/config";
import Atomico from "@atomico/astro";

export default defineConfig({
  integrations: [Atomico()],
});
```

You must associate the flag to the astro scripts in package.json#script `--experimental-integrations`, example:

```json
{
  "scripts": {
    "dev": "astro dev --experimental-integrations",
    "start": "astro dev --experimental-integrations",
    "build": "astro build --experimental-integrations",
    "preview": "astro preview --experimental-integrations"
  }
}
```

## Hydration

Atomico applies an automatic hydration, if it is required to hydrate the component on the client, you must include the component script, example:

```
---
import "./my-component.js" // SSR
---
<script src="./my-component.js"></script> <!--Hydration-->
<my-component></my-component>
```
