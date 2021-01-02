import React from 'react'
import ReactDOM from 'react-dom'
import Root from './root'
import ErrorBoundary from './error'

ReactDOM.render(
  <ErrorBoundary>
    {(hasError) => (
      <Root hasError={hasError} />
    )}
  </ErrorBoundary>,
  document.getElementById('root')
)
