import React from 'react'
import styled from 'styled-components'

/**
 * The props type of the component that is returned by classNameTranslation and passed to
 * reverseClassNameTranslation. The base styled-components `styled` method is called on this
 * component.
 */
type IntermediateProps<P> = P & {
  className?: string
  // This is the real className that will be passed to the component's className prop
  _className?: string
}

/**
 * The props type for the components that are passed to and returned by styledWithProp.
 */
type PassedProps<BaseProps, T extends string> = BaseProps & {
  className?: string
} & {
  [property in T]?: string
}

/**
 * This HOC creates a new component whose props are a little bit different from the original. The
 * `className` prop, instead of being passed directly to the old component's `className`, is passed
 * as the specified property instead. An additional `_className` prop is added to the component,
 * which allows you to still set the real `className` prop of the old component.
 */
function classNameTranslation<T extends string, P>(
  Component: React.ComponentType<PassedProps<P, T>>,
  prop: T
): React.FC<IntermediateProps<P>> {
  return ({
    className: theCustomClassName,
    _className: actualClassName,
    ...otherProps
  }: IntermediateProps<P>) => {
    const passedProps = {
      [prop]: theCustomClassName,
      className: actualClassName,
      ...otherProps,
    } as PassedProps<P, T>

    return <Component {...passedProps} />
  }
}

/**
 * This HOC essentially reverses the effect of `classNameTranslation`. It takes a component that has
 * the `className` and `_className` props, and returns a component that has the `className` and the
 * specified property instead. The specified property will be passed to the old component's
 * `className` prop, while the `className` prop will be passed to the old component's `_className`
 * prop.
 */
function reverseClassNameTranslation<T extends string, P>(
  Component: React.ComponentType<IntermediateProps<P>>,
  prop: T
): React.FC<PassedProps<P, T>> {
  return ({
    className: actualClassName,
    [prop]: theCustomClassName,
    ...otherProps
  }: PassedProps<P, T>) => {
    const intermediateProps: IntermediateProps<P> = {
      className: theCustomClassName,
      actualClassName,
      ...(otherProps as P),
    }

    return <Component {...intermediateProps} />
  }
}

/**
 * Mimics the effects of styled components' `styled` function, but using a different property name
 * instead of `className`.
 *
 * @param Component the component to style
 * @param prop the name of the property to use instead of `className`
 */
export default function styledWithProp<P, T extends string>(
  Component: React.ComponentType<PassedProps<P, T>>,
  prop: T
): (
  ...templateParams: Parameters<typeof styled.div>
) => React.ComponentType<PassedProps<P, T>> {
  return (...templateParams: Parameters<typeof styled.div>) =>
    reverseClassNameTranslation(
      styled(classNameTranslation(Component, prop))(...templateParams),
      prop
    )
}
