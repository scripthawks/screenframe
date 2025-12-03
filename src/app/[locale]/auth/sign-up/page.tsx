'use client'

import { SingUpForm } from '@/features'
import { SignUpSchema } from '@/shared'

const SignUp = () => {
  const submit = (data: SignUpSchema) => {
    console.log(data)
  }

  return (
    <div>
      <SingUpForm onSubmitHandlerAction={submit} />
    </div>
  )
}

export default SignUp
