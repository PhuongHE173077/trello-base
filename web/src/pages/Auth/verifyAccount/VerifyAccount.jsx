import { useEffect, useState } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom'
import { verifyUserAPI } from '~/apis';
import { PageLoading } from '~/components/Loading/PageLoading';

export const VerifyAccount = () => {
  let [searchParams] = useSearchParams()
  const { email, token } = Object.fromEntries([...searchParams]);

  const [Verified, setVerified] = useState(false)

  //call APT to verify account
  useEffect(() => {
    if (email && token) {
      verifyUserAPI({ email, token })
        .then(() => setVerified(true))
    }
  }, [email, token])

  //check email and token not exist
  if (!email || !token) return <Navigate to="/403" />

  //
  if (Verified) return <PageLoading caption='Loading ...' />

  return <Navigate to={`/login?verifyEmail=${email}`} />
}
