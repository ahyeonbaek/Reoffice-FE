import Signup from "./component/Signup";
import Signin from "./component/Signin";
import { useState } from "react";

const LoginPage = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(1);

  const handleClickIndex = (index: number) => {
    setCurrentIndex(index);
  };
  return (
    <div className="bg-[url(/img/background.jpg)] bg-no-repeat bg-cover bg-center w-full h-full">
      <div className="bg-black bg-opacity-50 h-full w-full flex justify-center">
        <div className="flex justify-center items-center flex-col gap-[30px] h-full w-[300px]">
          <div className="flex flex-col items-start justify-start w-full">
            <h1 className="text-[#fff] text-[40px]">Reoffice</h1>
            <p className="text-[#fff] text-[15px]">회의실 예약 프로그램</p>
          </div>
          <div className="flex justify-between">
            <button
              onClick={() => handleClickIndex(1)}
              className={`text-[#fff] text-[20px] w-[150px] ${
                currentIndex === 1 ? "border-b-4 border-[#3071F5] cursor" : ""
              }`}
            >
              로그인
            </button>
            <button
              onClick={() => handleClickIndex(2)}
              className={`text-[#fff] text-[20px] w-[150px] ${
                currentIndex === 2 ? "border-b-4 border-[#3071F5] cursor" : ""
              }`}
            >
              회원가입
            </button>
          </div>
          <div className="min-h-[300px]">
            {currentIndex === 1 && <Signin />}
            {currentIndex === 2 && <Signup />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
