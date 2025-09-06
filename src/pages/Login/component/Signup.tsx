import { instance } from "@/apis/axiosInterceptor";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const signupSchema = z
  .object({
    name: z.string().min(1, "한글자 이상 입력해주세요."),
    email: z.email("유효한 이메일 주소를 입력해주세요."),
    password: z
      .string()
      .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
      .regex(/[a-zA-Z]/, "비밀번호는 영문으로 입력해주세요.")
      .regex(
        /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
        "비밀번호에 특수문자가 포함되어야 합니다."
      ),
    passwordConfirm: z
      .string()
      .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
      .regex(/[a-zA-Z]/, "비밀번호는 영문으로 입력해주세요.")
      .regex(
        /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
        "비밀번호에 특수문자가 포함되어야 합니다."
      ),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  });

type SignupSchema = z.infer<typeof signupSchema>;

const signupDefaultValue = {
  email: "",
  name: "",
  password: "",
  passwordConfirm: "",
};

const Signup = () => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupSchema>({
    defaultValues: signupDefaultValue,
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: SignupSchema) => {
    if (submitting) return;
    setSubmitting(true);
    try {
      const { passwordConfirm, ...signupData } = data;

      const response = await instance.post("/auth/signup", signupData);

      if (response.status === 201) {
        alert("회원가입이 완료되었습니다.");
      } else {
        alert("회원가입 실패, 다시 시도해주세요.");
      }
    } catch (err) {
      console.error(err, "회원가입 실패");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-[300px]">
        <ul className="flex flex-col gap-[20px] w-full">
          <li>
            <input
              placeholder="이름을 입력해주세요."
              {...register("name")}
              className="p-3 w-[300px] rounded-sm"
            />
            <p className="text-[#fff]">{errors.name?.message}</p>
          </li>
          <li>
            <input
              placeholder="이메일을 입력해주세요."
              {...register("email")}
              className="p-3 w-[300px] rounded-sm"
            />
            <p className="text-[#fff]">{errors.email?.message}</p>
          </li>
          <li>
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요."
              {...register("password")}
              className="p-3 w-[300px] rounded-sm"
            />
            <p className="text-[#fff]">{errors.password?.message}</p>
          </li>
          <li>
            <input
              type="password"
              placeholder="비밀번호를 재입력해주세요."
              {...register("passwordConfirm")}
              className="p-3 w-[300px] rounded-sm"
            />
            <p className="text-[#fff]">{errors.passwordConfirm?.message}</p>
          </li>
          <div>
            <button
              type="submit"
              disabled={submitting}
              className="bg-[#3071F5] w-full rounded-sm"
            >
              회원가입
            </button>
          </div>
        </ul>
      </form>
    </div>
  );
};

export default Signup;
