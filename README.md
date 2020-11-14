# GA4React

## Google Analytics 4 React

Example without components

```

const ga4react = new GA4React('YOUR GA CODE');
ga4react.initialize().then((ga4) => {
  ga4.pageview('path')
  ga4.gtag('event','pageview','path') // or your custiom gtag event
},(err) => {
  console.error(err)
})

```

---

## Inject GA4React function in props of childrens

Example with custom components 'GA4R'

```
const Test: React.FC<any> = ({ ga4 }) => {
  return <>{ga4 && console.log(ga4)}</>;
};


<GA4R code="CODICE">
    <Test></Test>
</GA4R>
```

## RENDER:

`{pageview: ƒ, gtag: ƒ}`
