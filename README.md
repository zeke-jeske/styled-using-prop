# styled-using-prop

This package provides a lightweight function that allows you to use
[`styled-components`](https://styled-components.com/) to style a React component that uses
properties other than `className` for styling. For instance, the Dialog component in the React
component library [Blueprint](https://github.com/palantir/blueprint) uses both a `className` prop
for the dialog itself and a `portalClassName` prop for the surrounding portal. With
`styled-components`, it's difficult to add any custom CSS to the portal without making assumptions
about the DOM structure of the component. This package provides a solution to [that
issue](https://github.com/styled-components/styled-components/issues/3179).

## Usage

```typescript
import styledUsingProp from 'styled-using-prop'
import styled from 'styled-components'
import SomeComponent from 'components/SomeComponent.tsx'

const TheStyledComponent = styledUsingProp(SomeComponent, 'portalClassName')`
  margin-top: 1rem;
  border: 5px solid red;
`

// If you need to pass styles with multiple className properties, simply chain the tag template functions:

const WithMultipleStyles = styledUsingProp(styledUsingProp(styled(SomeComponent)`
  /* These styles are passed through className */
  margin-top: 1rem;

`, 'portalClassName')`
  /* These styles are passed through portalClassName */
  border: 5px solid red;

`, 'submitBtnClassName')`
  /* These styles are passed through submitBtnClassName */
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
`
```
