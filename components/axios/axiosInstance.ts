import axios from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  withCredentials: true,
})
