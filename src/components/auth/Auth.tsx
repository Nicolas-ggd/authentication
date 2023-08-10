import { useState } from "react";

import { SignIn } from "./signIn/SignIn";
import { SignUp } from "./signUp/SignUp";

export const Auth = () => {
  const [isAuth, setIsAuth] = useState<Boolean>(true);

  const toggleAuth = () => {
    setIsAuth((prevIsAuth) => !prevIsAuth);
  };

  return (
    <>
      {isAuth ? (
        <SignIn
          closeSignIn={toggleAuth}
        />
      ) : (
        <SignUp
          closeSignUp={toggleAuth}
        />
      )}
    </>
  );
};
