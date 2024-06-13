import React from 'react'
import { auth } from "../../../../auth"
import SignOutButton from '@/components/Header/SignOutButton';

const page = async () => {
    const session = await auth();
  return (
    <div>
        {JSON.stringify(session)}
        <SignOutButton />
    </div>
  )
}

export default page