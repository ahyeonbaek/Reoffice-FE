import { instance } from "@/apis/axiosInterceptor";
import { ReservationForm } from "@/types/type";
import useUserStore from "@/zustand/userStore";
import { Modal } from "ahyeon-react-ui-kit";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ModalComponentProps {
  isOpen: boolean;
  reservationForm: ReservationForm;
  capacity: number;
  location: string;
  handleCloseModal: () => void;
}

const ModalComponent = ({
  isOpen,
  reservationForm,
  capacity,
  location,
  handleCloseModal,
}: ModalComponentProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const { user, addReservation } = useUserStore();
  const navigate = useNavigate();

  const handleChangeCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  const handleSubmit = async () => {
    try {
      const response = await instance.post("/reservation", reservationForm);
      if (response.status === 201) {
        const newReservation = response.data.reservation;
        addReservation(newReservation);
        alert("회의실 예약이 완료되었습니다.");
        navigate(0);
      }
    } catch (err: any) {
      if (err.response?.status === 409) {
        alert("이미 예약된 시간입니다. 다시 시도해주세요.");
        handleCloseModal();
      } else {
        console.error(err, "예약 생성 실패");
      }
    }
  };

  return (
    <div>
      <Modal
        open={isOpen}
        onCloseModal={handleCloseModal}
        className="relative z-[9999]"
      >
        <Modal.Backdrop className="z-[9998] bg-black opacity-50 fixed inset-0" />
        <Modal.Content
          className="
      fixed z-[9999] 
      top-1/2 left-1/2 
      -translate-x-1/2 -translate-y-1/2 
      bg-white rounded-lg 
      w-[90%] h-[70%]
      overflow-hidden p-16 shadow-lg
      sm:w-[70%]
      max-h-screen 
    "
        >
          <div>
            <h1 className="font-extrabold text-[30px] border-b-2 py-5">
              회의실 예약
            </h1>
          </div>
          <div className="">
            <ul className="py-10">
              <li className="flex items-center gap-3 pb-5">
                <img
                  src="/img/Location.png"
                  alt="위치 아이콘"
                  className="w-[20px]"
                />
                <p className="text-[17px]">
                  위치 : {location} {reservationForm.roomName}
                </p>
              </li>
              <li className="flex items-center gap-3 pb-5">
                <img
                  src="/img/Check.png"
                  alt="체크 아이콘"
                  className="w-[20px]"
                />
                <p className="text-[17px]">
                  회의 제목 : {reservationForm.title}
                </p>
              </li>
              <li className="flex items-center gap-3 pb-5">
                <img
                  src="/img/Calendar.png"
                  alt="달력 아이콘"
                  className="w-[20px]"
                />
                <p className="text-[17px]">날짜 : {reservationForm.date}</p>
              </li>
              <li className="flex items-center gap-3 pb-5">
                <img
                  src="/img/clock.png"
                  alt="시계 아이콘"
                  className="w-[20px]"
                />
                <p className="text-[17px]">
                  회의 시간 : {reservationForm.startTime}:00 ~{" "}
                  {reservationForm.endTime}:00
                </p>
              </li>
              <li className="flex items-center gap-3 pb-5">
                <img
                  src="/img/User.png"
                  alt="유저 아이콘"
                  className="w-[20px]"
                />
                <p className="text-[17px]">참여 원 :</p>
                {reservationForm.participant?.map((email, index) => (
                  <p key={index} className="text-[17px]">
                    {email},
                  </p>
                ))}
              </li>
            </ul>
            <div className="flex justify-end gap-5">
              <div className="flex gap-3 items-center">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleChangeCheck}
                />
                <p>위 내용을 확인했습니다.</p>
              </div>
              <div>
                <button
                  disabled={!isChecked}
                  onClick={handleSubmit}
                  className="bg-[#3071F5] p-5 rounded"
                >
                  예약하기
                </button>
              </div>
            </div>
          </div>
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default ModalComponent;
