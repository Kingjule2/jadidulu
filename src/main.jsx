import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID
if (measurementId) {
  window.dataLayer = window.dataLayer || []
  const gtag = (...args) => window.dataLayer.push(args)
  gtag('js', new Date())
  gtag('config', measurementId)

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`
  document.head.append(script)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
