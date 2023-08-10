import React, { useState, MouseEvent } from "react";
import axios from "axios";
import CheckIcon from '@mui/icons-material/Check';

interface SignUpProps {
  closeSignUp: () => void;
}

interface SignUpData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const SignUp: React.FC<SignUpProps> = ({
  closeSignUp,
}) => {
  const [isError, setIsError] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isSend, setIsSend] = useState<boolean>(false);
  const [isSuccessSend, setIsSuccessSend] = useState<boolean>(false);
  const [signUpData, setSignUpData] = useState<SignUpData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const acceptTermsCheckbox = () => {
    setIsChecked((prevIsChecked) => !prevIsChecked);
  };

  const submitSignUpData = async (event: MouseEvent<HTMLFormElement>) => {
    if (
      signUpData.name.length === 0 ||
      signUpData.email.length === 0 ||
      signUpData.password.length === 0 ||
      signUpData.confirmPassword.length === 0 ||
      signUpData.confirmPassword !== signUpData.password
    ) {
      return setIsError(true);
    }
    setIsSend(true);

    event.preventDefault();

    try {
      await axios.post("https://covid19-api-rj18.onrender.com/register", {
        name: signUpData.name,
        email: signUpData.email,
        password: signUpData.password,
      });

      setIsSend(false);
      setIsSuccessSend(true);
    } catch (error) {
      console.error(error);
      setIsSend(false);
    }
  };

  return (
    <section className="bg-grey-50 transiton duration-300 dark:bg-gray-800">
      {!isSend && !isSuccessSend && (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 text-gray-900">
              <h1 className="text-xl font-bold leading-tight dark:text-white tracking-tight md:text-2xl">
                Create an account
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={submitSignUpData}
              >
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 dark:text-white text-sm font-medium"
                  >
                    Your name
                  </label>
                  <input
                    style={{
                      borderColor:
                        isError && signUpData?.name?.length === 0 ? "red" : "",
                    }}
                    type="name"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:text-white text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5 outline-none"
                    placeholder="your name"
                    onChange={(e) => {
                      setSignUpData((prevSendData) => ({
                        ...prevSendData,
                        name: e.target.value,
                      }));
                    }}
                  />
                </div>
                {isError && signUpData?.name?.length <= 0 && (
                  <span style={{ color: "red", margin: "3px" }}>
                    Please fill the name
                  </span>
                )}

                <div>
                  <label
                    htmlFor="email"
                    className="block dark:text-white mb-2 text-sm font-medium"
                  >
                    Your email
                  </label>
                  <input
                    style={{
                      borderColor:
                        isError && signUpData?.email?.length === 0 ? "red" : "",
                    }}
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 dark:bg-gray-700 dark:text-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5 outline-none"
                    placeholder="name@company.com"
                    onChange={(e) => {
                      setSignUpData((prevSendData) => ({
                        ...prevSendData,
                        email: e.target.value,
                      }));
                    }}
                  />
                </div>
                {isError && signUpData?.email?.length <= 0 && (
                  <span style={{ color: "red", margin: "3px" }}>
                    Please fill the email
                  </span>
                )}

                <div>
                  <label
                    htmlFor="password"
                    className="block dark:text-white mb-2 text-sm font-medium"
                  >
                    Password
                  </label>
                  <input
                    style={{
                      borderColor:
                        isError && signUpData?.password?.length === 0
                          ? "red"
                          : "",
                    }}
                    type="password"
                    name="password" 
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:text-white text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5 outline-none"
                    onChange={(e) => {
                      setSignUpData((prevSendData) => ({
                        ...prevSendData,
                        password: e.target.value,
                      }));
                    }}
                  />
                </div>
                {isError && signUpData?.password?.length === 0 && (
                  <span style={{ color: "red", margin: "3px" }}>
                    Please fill in the password
                  </span>
                )}

                <div className="relative">
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium dark:text-white"
                  >
                    Confirm password
                  </label>
                  <input
                    style={{
                      borderColor:
                        (isError &&
                          signUpData?.confirmPassword !==
                            signUpData?.password) ||
                        (isError && signUpData?.confirmPassword?.length === 0)
                          ? "red"
                          : signUpData?.confirmPassword ===
                              signUpData?.password &&
                            signUpData?.confirmPassword
                          ? "green"
                          : "",
                    }}
                    type="password"
                    name="confirmedPassword"
                    placeholder="••••••••"
                    className="relative bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:text-white text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5 outline-none"
                    onChange={(e) => {
                      setSignUpData((prevSendData) => ({
                        ...prevSendData,
                        confirmPassword: e.target.value,
                      }));
                    }}
                  />
                </div>
                {isError &&
                  (signUpData?.confirmPassword !== signUpData?.password ||
                    signUpData?.confirmPassword?.length === 0) && (
                    <span style={{ color: "red", margin: "3px" }}>
                      Confirmed password is incorrect!
                    </span>
                  )}

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      checked={isChecked}
                      onChange={acceptTermsCheckbox}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="block mb-2 text-sm font-medium dark:text-white"
                    >
                      I accept the{" "}
                      <a
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                {isError && isChecked === false && (
                  <span style={{ color: "red", margin: "5px" }}>
                    You need to accept Terms and Conditions
                  </span>
                )}
                <button
                  type="submit"
                  className="w-full text-white transition dark:text-white delay-50 border-none bg-sky-400 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Create an account
                </button>

                <p className="block mb-2 text-sm font-medium dark:text-white">
                  Already have an account?{" "}
                  <a
                    onClick={closeSignUp}
                    className="font-medium text-sky-400 hover:text-sky-700 transition duration-200 text-primary-600 hover:underline dark:text-primary-500 cursor-pointer"
                  >
                    Sign in here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      )}
      {isSend && (
        <div role="status">
          <div className="flex flex-col items-center justify-center h-screen w-screen">
            <svg
              aria-hidden="true"
              className="w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
            <h2 className="p-4 dark:text-white">
              A verification link has been send to your email.
            </h2>
          </div>
        </div>
      )}
      {isSuccessSend && !isSend && (
        <div role="status">
          <div className="flex flex-col items-center justify-center h-screen w-screen">
            <CheckIcon color="success" fontSize="large" />
            <h2 className="p-3 dark:text-white">
              Please check your email and verify your account.
            </h2>
          </div>
        </div>
      )}
    </section>
  );
};
