import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import { HomePage } from '@/pages/HomePage.tsx'
import { ForecastPage } from '@/pages/ForecastPage.tsx'

const routes = createRoutesFromElements(
  <>
    <Route path="/" element={<HomePage />} />
    <Route path="/forecast/:city" element={<ForecastPage />} />
  </>
)

export const router = createBrowserRouter(routes, {
  future: {
    v7_relativeSplatPath: true
  }
})
