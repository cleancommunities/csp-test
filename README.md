## Server driven styles with experimental csp

This repo uses a type assertion (Astro as any), so that the style-src-attr could be used, to allow style element hashes to be used in combination with dynamic data brought into the client from define:vars and data-*. 

Not really sure if there is a native way to do this currently, or if this is discouraged as its not included in ALLOWED_DIRECTIVES.

BaseLayout.astro
```js
(Astro as any).csp.insertDirective("style-src-attr 'self' 'unsafe-inline'")
```

PerInstAttr.astro - Destructures Astro.props then uses define:vars

PerInstAttrData.astro  - Destructures Astro.props then sets hostStyles string via data-*

---

## Update: Avoiding unsafe-inline while maintaining per instance styles

New layout and component demonstrate common pattern using setProperty() with data attributes to negate the use of, unsafe-inline.

CssomLayout.astro
```js
(Astro as any).csp.insertDirective("style-src-attr 'none'");
// Policy defaults to style-src regardless, styles are blocked without this directive
```
DataAttrCssom.astro
```js
<script>
  document.querySelectorAll<HTMLElement>('.data-attr-cssom').forEach(element => {
    const da = element.dataset;
    if (da.color) element.style.setProperty('--color', da.color);
    if (da.underline) element.style.setProperty('--text-decoration', da.underline);
  });
</script>
// Apply styles from components server side data attributes to style object.
```
#### Config.... 

Updated to include compresseHTML and build.inlineStylesheets

#### Summary...

Style element is set external via inlineStylesheets or uses hash.

style-src-attr 'none' blocks style="", but individual CSSOM writes, like da.style.setProperty are allowed once allowed JS runs.
