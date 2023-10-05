import { Children } from 'react'

export const subComponent = {
  create: (
    displayName: string,
    component: React.FunctionComponent<any> = ({ children }) => {
      return children
    },
  ) => {
    component.displayName = displayName
    return component
  },
  select: (
    children: React.ReactElement<any> | Array<React.ReactElement<any>>,
    displayName: string,
  ) => {
    return Children.map(children, (child: React.ReactElement<any, any>) => {
      if (child.type.displayName === displayName) {
        return child
      }
    })
  },
}
