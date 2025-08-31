## Server driven styles with experimental csp

This repo uses a type assertion (Astro as any), so that the style-src-attr could be used, to allow style element hashes to be used in combination with dynamic data brought into the client from define:vars and data-*. 

Not really sure if there is a native way to do this currently, or if this is discouraged as its not included in ALLOWED_DIRECTIVES.

BaseLayout.astro
```js
(Astro as any).csp.insertDirective("style-src-attr 'self' 'unsafe-inline'")
```

PerInstAttr.astro - Destructures Astro.props then uses define:vars

PerInstAttrData.astro  - Destructures Astro.props then sets hostStyles string via data-*

