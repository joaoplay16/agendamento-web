import React, { createContext, useState } from "react"
import PropTypes from "prop-types"
import { getAdminToken, adminTokenLogin } from "services/admin-authentication"
const AdminAuthContext = createContext()

const ADMIN_TOKEN = "adminToken"

function AdminAuthProvider({ children }) {
  const [adminInfo, setAdminInfo] = useState({
    isLoggedIn: false,
    error: {
      errorCode: null,
      errorMessage: null,
    },
  })

  const login = (email, pass) => {
    verifyAdminIsLoggedIn()

    //if admin is not authenticated, authenticate and get a new token
    if (!adminInfo.isLoggedIn) {
      getAdminToken({ email: email, password: pass })
        .then((response) => {
          setAdminInfo((prevState) => ({
            ...prevState,
            isLoggedIn: true,
          }))

          const { token } = response.data
          localStorage.setItem(ADMIN_TOKEN, token)
        })
        .catch((e) => {
          const { error_code, error_message } = e.response.data
          setAdminInfo({
            isLoggedIn: false,
            error: {
              errorCode: error_code,
              errorMessage: error_message,
            },
          })
        })
    }
  }

  const loginWithToken = (token) => {
    adminTokenLogin({ token })
      .then((response) => {
        if (response.status == 200) {
          setAdminInfo((prevState) => ({
            ...prevState,
            isLoggedIn: true,
          }))
        }
      })
      .catch((e) => {
        const { error_code, error_message } = e.response.data
        setAdminInfo({
          isLoggedIn: false,
          error: {
            errorCode: error_code,
            errorMessage: error_message,
          },
        })
      })
  }

  const verifyAdminIsLoggedIn = () => {
    const token = localStorage.getItem(ADMIN_TOKEN)

    if (!token) {
      setAdminInfo((prevState) => ({
        ...prevState,
        isLoggedIn: false,
      }))
    } else {
      setAdminInfo((prevState) => ({
        ...prevState,
        isLoggedIn: true,
      }))
      loginWithToken(token)
    }
  }

  const logout = () => {}
  window.location.logout = logout

  return (
    <AdminAuthContext.Provider
      value={{
        login,
        logout,
        adminInfo,
        verifyAdminIsLoggedIn,
      }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

AdminAuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { AdminAuthProvider, AdminAuthContext }
