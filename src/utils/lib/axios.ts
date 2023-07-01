import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://dev.ominichat.app.br/',
  // baseURL: 'https://jsonplaceholder.typicode.com/',
})

// api.defaults.headers.common['Content-Type'] = 'application/json'
api.defaults.headers.common.Authorization =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODBjYTQ0MWE0ZGE3N2QwNGYwZTljNSIsIm5hbWUiOiJsdWNhcyIsImVtYWlsIjoibGNzYmM5OEBnbWFpbC5jb20iLCJhY2NvdW50SWQiOiI2NDgwY2E0NDFhNGRhNzdkMDRmMGU5YzEiLCJjbGluaWNJZHMiOlsiNjQ4MGNhNDQxYTRkYTc3ZDA0ZjBlOWMzIl0sImlhdCI6MTY4NjE2MjA4OCwiZXhwIjoxNjg2MjQ4NDg4fQ.xkY-rje5k3dljD5IYZr72BB_6rhoolMn8UFA9drJ148'

// export const api = axios.create({
//   baseURL:
//     'https://cravo-e-canela-suplementos.myshopify.com/api/2023-01/graphql.json',
// })
