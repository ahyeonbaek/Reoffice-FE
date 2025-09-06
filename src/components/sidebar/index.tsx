import useUserStore from "@/zustand/userStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [profileImg, setProfileImg] = useState("/img/Vector.png");
  const { logout, user } = useUserStore();

  return (
    <div className="w-[250px] h-[500px] bg-blue-100 p-[20px] rounded-lg shadow-lg">
      <div className="flex justify-end">
        <img
          src="/img/Bell.png"
          alt="알림 이모티콘"
          className="w-[20px] h-[25px]"
        />
      </div>
      <div className="pt-[20px] pb-[20px] border-b">
        <div className="flex justify-center pt-[20px] pb-[20px]">
          <img
            src={user?.profileImg ? user.profileImg : profileImg}
            alt="프로필 이미지"
            className="w-[100px] h-[100px]"
          />
        </div>
        <div className="flex jusify-center items-center gap-[10px] flex-col">
          <p>{user?.name}</p>
          <p>{user?.email}</p>
        </div>
        <div className="flex justify-end ">
          <img
            src="/img/Settings.png"
            alt="설정버튼 이미지"
            onClick={() => navigate("/profile")}
            className="w-[15px] h-[15px] cursor-pointer"
          />
        </div>
      </div>
      <div>
        <ul className="pt-[20px] pb-[20px]">
          <li>
            <a href="/list">회의실 예약 목록</a>
          </li>
        </ul>
        <div>
          <button onClick={logout}>logout</button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
