// import { CSFetch } from "@/utils/api/clientFetch"

// interface useCSFetchProps {
//   body: any
//   endPoint: string
//   method: 'POST' | 'PATCH' | 'DELETE' | 'GET',
//   key: string
// }

// export const useCSFetch({ body, endPoint, method, key }: useCSFetchProps) {

//   const fetcher = (url: string) => CSFetch(url, {
//     body,
//     method,
//   })
//   // .then(res => res)

//   const { data, error, isLoading } = useSWRConfig([endPoint, key], fetcher)

//   return {
//     data,
//     isLoading,
//     error
//   }
// }
