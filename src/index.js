import React from "react"
import ReactDOM from 'react-dom/client';
import Root from "./root"
import ErrorBoundary from "./error"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      {(hasError) => <Root hasError={hasError} />}
    </ErrorBoundary>
  </React.StrictMode>
)
