import {AppConfig} from "../types";


export const config: AppConfig = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  appName: import.meta.env.VITE_APP_NAME || 'React App'
}
