import { instance } from "@/apis/axiosInterceptor";
import useUserStore from "@/zustand/userStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const signinFields = {
  email: "",
  password: "",
};

const signinSchema = z.object({
  email: z.email("유효한 이메일 주소를 입력해주세요."),
  password: z
    .string()
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
    .regex(/[a-zA-Z]/, "비밀번호는 영문으로 입력해주세요.")
    .regex(
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
      "비밀번호에 특수문자가 포함되어야 합니다."
    ),
});

type SigninSchema = z.infer<typeof signinSchema>;

const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninSchema>({
    defaultValues: signinFields,
    resolver: zodResolver(signinSchema),
    mode: "onBlur",
  });

  const navigate = useNavigate();
  const { setUser } = useUserStore();

  const onSubmit = async (data: SigninSchema) => {
    try {
      const response = await instance.post("/auth/signin", data);
      if (response.status === 201) {
        const user = response.data.data;

        console.log(user);

        const userToStore = {
          name: user.name,
          email: user.email,
          profileImg: user?.profileImg,
          reservations: user?.reserveList,
        };

        setUser(userToStore);
        navigate("/main");
      }
    } catch (err) {
      console.error(err, "로그인 실패");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-[300px] ">
        <ul className="flex flex-col gap-[20px] w-full">
          <li>
            <input
              placeholder="이메일"
              {...register("email", { required: true })}
              className="p-3 w-[300px] rounded-sm"
            />
            {errors.email?.message}
          </li>
          <li>
            <input
              type="password"
              placeholder="비밀번호"
              {...register("password", { required: true })}
              className="p-3 w-[300px] rounded-sm"
            />
            {errors.password?.message}
          </li>
          <div className="border-b-2 border-[#000]">
            <button type="submit" className="bg-[#3071F5] w-full rounded-sm">
              로그인
            </button>
          </div>
        </ul>
      </form>
    </div>
  );
};

export default Signin;
