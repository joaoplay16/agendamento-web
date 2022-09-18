import React, { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  Container,
  IconButton as MaterialIconButton
} from '@material-ui/core'

import styled from 'styled-components'
import { useApplication } from 'hooks'
import { HOME } from 'routes'
import pathStartWith from 'utils/path-comparator'

function Footer () {
  const { appState } = useApplication()
  const location = useLocation()
  const currentPathName = location.pathname

  useEffect(() => {
    console.log('location', location)
  })

  function isActiveItem (itemPathname) {
    if (itemPathname === HOME) {
      return itemPathname === currentPathName
    }

    return pathStartWith(itemPathname, currentPathName)
  }

  return (
    <FooterContent>
      <ToolbarContainer>
        {appState.toolbarItems.map((item, index) => {
          const isActive = isActiveItem(item.to.pathname)
          return (
            <ToolbarItem
              active={isActive}
              to={item.to.pathname}
              key={index}
            >
              <IconButton active={isActive}>
                {item.icon}
              </IconButton>
              <IconLabel>
                {item.label}
              </IconLabel>
            </ToolbarItem>
          )
        })}
      </ToolbarContainer>
    </FooterContent>
  )
}

const FooterContent = styled.footer`
  background: ${({ theme }) => theme.palette.common.white};
  bottom: 0;
  left: 0;
  position: fixed;
  width: 100%;
  z-index: 3;
  box-shadow: 0 0 3px ${({ theme }) => theme.palette.grey[400]};
`

const ToolbarContainer = styled(Container)`
  display: flex;
  justify-content: space-around;
`

const ToolbarItem = styled(NavLink).attrs(({ active, theme }) => ({
  activeStyle: {
    color: active ? theme.palette.primary.main : ''
  }
}))`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  color: ${({ theme }) => theme.palette.grey[800]};
  text-decoration: none;
  text-decoration-color: none;
`

const IconButton = styled(MaterialIconButton)`
  padding: 5px;
  span {
      svg{
        path {
          fill: ${({ active, theme }) => active
    ? theme.palette.primary.main : ''};
        }
      }
    };
`
const IconLabel = styled.span`
  font-family: ${({ theme }) => theme.typography.caption.fontFamily};
  font-weight: ${({ theme }) => theme.typography.caption.fontWeight};
  line-height: ${({ theme }) => theme.typography.caption.lineHeight};
  letter-spacing: ${({ theme }) => theme.typography.caption.letterSpacing};
`

export default Footer
