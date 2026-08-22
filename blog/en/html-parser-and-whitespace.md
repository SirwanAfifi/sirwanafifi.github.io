# HTML Parser and Whitespace

The HTML parser treats whitespace characters between elements as text nodes

- Published: 2024-10-20
- Language: en
- Tags: Browsers, HTML, Web Components
- Canonical: https://sirwan.info/blog/en/html-parser-and-whitespace

---

Consider the following code:

```html
<script type="module">
  class MyElement extends HTMLElement {
    connectedCallback() {
      console.log(this.children[0].childNodes.length);
    }
  }
  customElements.define("my-element", MyElement);
</script>

<my-element>
  <ul class="users">
    <li>User 1</li>
    <li>User 2</li>
    <li>User 3</li>
    <li>User 4</li>
  </ul>
</my-element>
```

> In this example, `my-element` is defined after the script tag. If, for some reason, we omit the `type="module"` attribute, it throws an error.
> `Uncaught TypeError: Cannot read properties of undefined (reading 'getElementsByTagName')
at MyElement.connectedCallback`
> This is because when `connectedCallback` runs, `children[0]` does not exist yet. But with
> `type="module"`, the script is deferred until the document is parsed, so `children[0]` is available.

You might expect `this.children[0].childNodes.length` to return 4, corresponding to the four `<li>` elements. However, it actually returns 9! This is because the DOM parser treats whitespace characters (spaces, newlines, tabs) between elements as text nodes. In this case, we get:

1. A text node (newline and spaces before `<li>User 1</li>`)
2. The `<li>User 1</li>` element node
3. Another text node (newline and spaces)
4. The `<li>User 2</li>` element node
5. Another text node
6. The `<li>User 3</li>` element node
7. Another text node
8. The `<li>User 4</li>` element node
9. A final text node (newline and spaces after the last `<li>`)

This behaviour can lead to unexpected results when traversing or manipulating the DOM. To avoid dealing with whitespace nodes, you can use properties like `children` instead of `childNodes`, or methods like `getElementsByTagName()`. For example, `this.children[0].children.length` or `this.children[0].getElementsByTagName('li').length` would both return 4 in this case.
