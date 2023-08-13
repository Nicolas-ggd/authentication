import { useState, useRef, ChangeEvent, KeyboardEvent, FormEvent } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import BeenhereIcon from "@mui/icons-material/Beenhere";

export const OTPVerification = () => {
  const { mobileNumber } = useParams();
  const numInputs = 6;
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>("");
  const [otpValues, setOtpValues] = useState<string[]>(
    Array(numInputs).fill("")
  );

  const inputRefs = Array.from({ length: numInputs }, () =>
    useRef<HTMLInputElement | null>(null)
  );

  const handleInputChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    if (!isNaN(Number(value))) {
      setOtpValues((prevValues) => {
        const newValues = [...prevValues];
        newValues[index] = value;

        if (value !== "" && index < numInputs - 1) {
          inputRefs[index + 1].current?.focus();
        }

        return newValues;
      });
    }
  };

  const handleInputKeyPress = (
    index: number,
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace" && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const verifyAccount = async(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (otpValues.some((value) => value === "")) {
      setIsEmpty(true);
      setIsError("Please fill all input fields.");
    } else {
      setIsEmpty(false);
    }
    const otpString = otpValues.join("");

    await axios.post('http://localhost:8000/verify', {
      verificationCode: otpString
    })
  };

  const resendSMSCode = async () => {
    await axios.post("http://localhost:8000/verify/resend-verification-code", {
      mobileNumber: mobileNumber,
    });
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex w-full justify-center mt-3">
            <div className="p-4 bg-blue-400 rounded-full w-25 h-25">
              <BeenhereIcon className="text-white text-xl" fontSize="large" />
            </div>
          </div>
          <div className="p-4 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex flex-col">
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Enter OTP Code
              </h1>
              <p className="text-center py-2 text-gray-400">
                Code has sent to +995{mobileNumber}{" "}
              </p>
              <p className="text-center py-2 text-gray-400">
                This is one time code and its valid during: <span className="text-gray-500">4:52</span>
              </p>
            </div>
            <form className="space-y-4 md:space-y-6" onSubmit={verifyAccount}>
              <div className="flex">
                {otpValues.map((value, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={value}
                    onChange={(event) => handleInputChange(index, event)}
                    onKeyDown={(event) => handleInputKeyPress(index, event)}
                    ref={inputRefs[index]}
                    className="mx-2 font-bold text-xl text-center bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    style={{
                      borderColor: isEmpty && isError ? "red" : "",
                      backgroundColor: isEmpty && isError ? "#ff000021" : "",
                    }}
                  />
                ))}
              </div>
              {isEmpty && (
                <p className="text-red-500 text-center">
                  You need to fill all fields.
                </p>
              )}
              <div className="flex flex-col justify-center">
                <p className="text-gray-400 text-center">
                  Haven't received the code?
                </p>
                <button
                  type="button"
                  className="text-sky-500 hover:text-sky-700"
                  onClick={resendSMSCode}
                >
                  Resend
                </button>
              </div>
              <button
                type="submit"
                className="w-full text-xl transition delay-50 border-none text-white bg-sky-500 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 outline-none"
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
