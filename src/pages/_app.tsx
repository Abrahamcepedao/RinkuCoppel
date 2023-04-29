import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import apolloClient from '../../lib/apollo'

//routes
import ProtectedRoute from '@/components/ProtectedRoute'
import { useRouter } from 'next/router'
const noAuthRequired:string[] = ['/', '/register']

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  return (
      <ApolloProvider client={apolloClient}>
        {noAuthRequired.includes(router.pathname) ? (
          <Component {...pageProps} />
        ) : (
          <ProtectedRoute>
            <Component {...pageProps}/>
          </ProtectedRoute>
        )}
        
      </ApolloProvider>
  )
}
