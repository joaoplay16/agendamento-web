import React, { useState } from "react"
import styled from "styled-components"
import {
  AccountCircle,
  ShoppingCart,
} from "@material-ui/icons"
import {
  AppBar,
  IconButton,
  Toolbar as MaterialToobar,
  Menu,
  MenuItem,
  Typography,
  Badge,
} from "@material-ui/core"
import { Button } from "ui"
import { useAuth } from "hooks"
import { Link } from "react-router-dom"
import { navigationRoutes as navRoutes } from "routes"

const Header = () => {
  const { userInfo, logout } = useAuth()
  const [anchorElement, setAnchorElement] = useState(null)

  const handleOpenMenu = (e) => {
    setAnchorElement(e.target)
  }

  const handleClose = () => {
    setAnchorElement(null)
  }
  return (
    <AppBar>
      <Toolbar>
        <LogoContainer>
          {/* <LinkLogo to={}>
            <Logo />
          </LinkLogo> */}
        </LogoContainer>
        {userInfo.user && (
          <>
            <IconButton color="inherit">
              <LinkIcon to={navRoutes.CHECKOUT}>
              <Badge badgeContent={0} color="secondary">
                <ShoppingCart/>
              </Badge>
              </LinkIcon>
            </IconButton>
            <Typography color="inherit">
              Olá {userInfo.user.firstName}
            </Typography>
            <IconButton color="inherit" onClick={handleOpenMenu}>
              <AccountCircle />
            </IconButton>
            <Menu
              open={Boolean(anchorElement)}
              onClose={handleClose}
              anchorEl={anchorElement}>
              <MenuItem onClick={logout}>Sair</MenuItem>
            </Menu>
          </>
        )}

        {!userInfo.user && (
          <Button to="/login" color="inherit">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

const Toolbar = styled(MaterialToobar)`
  && {
    margin: 0 auto;
    max-width: ${({ theme }) => theme.breakpoints.values.lg}px;
    width: 100%;
  }
`

// flex-grow crescer o maximo que puder
const LogoContainer = styled.div`
  flex-grow: 1;
`

const LinkIcon = styled(Link)`
  text-decoration: none;
  color: unset;
`

/* const Logo = styled(MainLogo)`
  height: 50px;
  width: 200px;

  & path {
    fill: ${({ theme }) => theme.palette.common.white};
  }

  & line {
    stroke: ${({ theme }) => theme.palette.common.white};
  }
` */

export default Header
