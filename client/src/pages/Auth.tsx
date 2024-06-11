import { FC, useState } from "react"

const Auth: FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false)
  return (
    <div className="mt-40 flex flex-col justify-center items-center">
      <h1 className="text-center mb text-xl">
        {isLogin ? 'Login' : 'Registration'}
      </h1>
    </div>
  )
}

export default Auth