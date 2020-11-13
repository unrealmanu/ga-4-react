# GA4React

### Google Analytics 4 React

Example

```

const ga4react = new GA4React('YOUR GA CODE');
ga4react.initialize().then((ga4) => {
  ga4.pageview('path')
  ga4.gtag('event','pageview','path') // or your custiom gtag event
},(err) => {
  console.error(err)
})

```
