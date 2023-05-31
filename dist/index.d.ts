import React from 'react';
import styled from 'styled-components';
/**
 * The props type for the components that are passed to and returned by styledWithProp.
 */
type PassedProps<BaseProps, T extends string> = BaseProps & {
    className?: string;
} & {
    [property in T]?: string;
};
/**
 * Mimics the effects of styled components' `styled` function, but using a different property name
 * instead of `className`.
 *
 * @param Component the component to style
 * @param prop the name of the property to use instead of `className`
 */
export default function styledWithProp<P, T extends string>(Component: React.ComponentType<PassedProps<P, T>>, prop: T): (...templateParams: Parameters<typeof styled.div>) => React.ComponentType<PassedProps<P, T>>;
export {};
//# sourceMappingURL=index.d.ts.map