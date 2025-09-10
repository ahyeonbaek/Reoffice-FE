import { instance } from "@/apis/axiosInterceptor";
import { MeetingRoom, Reservation, ReservationForm } from "@/types/type";
import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import CalendarComponent from "./component/CalendarComponent";
import ModalComponent from "./component/ModalComponent";
import useUserStore from "@/zustand/userStore";
import { set } from "zod";

//회의실 가데이터
const meetingRoom = [
  {
    id: "68bbc8d281189e6bafd34fab",
    name: "회의실A",
    capacity: 10,
    location: "본관 1층",
  },
  {
    id: "2",
    name: "회의실B",
    capacity: 10,
    location: "본관 2층",
  },
  {
    id: "3",
    name: "회의실C",
    capacity: 10,
    location: "본관 3층",
  },
];

//회의시간 선택 버튼에 쓰이는 배열
const times = [10, 11, 12, 13, 14, 15, 16, 17, 18];

const MainPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const [currentRoom, setCurrentRoom] = useState<MeetingRoom>(meetingRoom[0]);
  const [inputValue, setInputValue] = useState({ title: "", participant: "" });
  const [participantArr, setParticipantArr] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const { user } = useUserStore();
  const reservationForm = useMemo<ReservationForm>(
    () => ({
      userEmail: user?.email || "",
      roomId: currentRoom.id,
      date: date.toLocaleDateString(),
      startTime: startTime,
      endTime: endTime,
      title: inputValue.title,
      participant: participantArr,
      roomName: currentRoom.name,
    }),
    [
      user?.email,
      currentRoom.id,
      date,
      startTime,
      endTime,
      inputValue.title,
      participantArr,
      currentRoom.name,
    ]
  );

  // useEffect (() => {
  //   const getMeetingRoom = async() => {
  //     try{

  //     }catch(err) {

  //     }
  //   }
  // },[])

  const handleClickRoom = (room: MeetingRoom) => {
    setCurrentRoom(room);
  };

  const handleClickStart = (time: number) => {
    setStartTime(time);
  };

  const handleClickEnd = (time: number) => {
    setEndTime(time);
  };

  const handleChange = (name: string, value: string) => {
    setInputValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setParticipantArr((prev) => [...prev, inputValue.participant]);
      setInputValue((prev) => ({ ...prev, participant: "" }));
    }
  };

  const handleDelete = (index: number) => {
    const newParticipantArr = participantArr.filter((_, i) => i !== index);
    setParticipantArr(newParticipantArr);
  };

  const handleOpenModal = () => {
    if (startTime === 0 || endTime === 0 || !inputValue.title.trim()) {
      alert("입력되지 않은 항목이 있습니다.");
      return;
    }

    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  //날짜,회의실이 바뀔때마다  예약 리스트 가져오기
  // const getList = async () => {
  //   try {
  //     const response = await instance.get(`/reservation/?date=${date}`);
  //     if (response.status === 200) {
  //       console.log(response.data);
  //       return response.data;
  //     }

  //     return;
  //   } catch (err) {
  //     console.error(err, "예약목록 가져오기 실패");
  //   }
  // };

  // useEffect(() => {
  //   getList();
  // },[date]);

  // const query = useQuery<Reservation[]>({
  //   queryKey: ["reservationOfDate", date],
  //   queryFn: getList,
  //   staleTime: 1000 * 10,
  // });
  // console.log("query.data", query.data);

  return (
    <div className="flex w-full flex-col gap-[20px]">
      <CalendarComponent
        date={date}
        setDate={setDate}
        meetingRoom={currentRoom.id}
      />
      <div>
        <div className="flex gap-[20px]">
          {meetingRoom.map((room) => (
            <div key={room.id} className="w-[100px]">
              <button
                onClick={() => handleClickRoom(room)}
                className={`shadow-md rounded-lg ${
                  currentRoom === room &&
                  "border-[#3071F5] border-solid border-2"
                }`}
              >
                {room.name}
              </button>
            </div>
          ))}
        </div>
        <div className="pt-[10px] pb-[10px]">
          {meetingRoom.map((room) => (
            <div key={room.id}>
              {currentRoom.name === room.name && (
                <div className="flex gap-5">
                  <p className="bg-[#f5f5f5] p-2">최대 인원: {room.capacity}</p>
                  <p className="bg-[#f5f5f5] p-2">위치 : {room.location}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-10">
        <div className="flex items-center  w-full h-[30px] bg-[#3071F5] pl-2">
          <p>시작 시간</p>
        </div>
        <div className="flex gap-2">
          {times.map((time, index) => (
            <button
              key={index}
              onClick={() => handleClickStart(time)}
              className={`shadow-md rounded-lg ${
                reservationForm.startTime === time
                  ? "border-[#3071F5] border-solid border-2"
                  : "bg-[#fff]"
              }`}
            >
              {time} : 00
            </button>
          ))}
        </div>
        <div className="flex items-center w-full h-[30px] bg-[#3071F5] pl-2">
          <p>종료 시간</p>
        </div>
        <div className="flex gap-2">
          {times.map((time, index) => (
            <button
              key={index}
              onClick={() => handleClickEnd(time)}
              disabled={startTime >= time}
              className={`shadow-md rounded-lg ${
                reservationForm.endTime === time
                  ? "border-[#3071F5] border-solid border-2"
                  : ""
              } ${
                startTime >= time ? "bg-[#cdcdcd] text-[#f5f5f5]" : "bg-[#fff]"
              }`}
            >
              {time} : 00
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-between gap-10 w-full">
        <div className="flex flex-col w-full">
          <label className="border-b-2 flex items-center h-[30px]">
            회의 제목
          </label>
          <input
            name="title"
            value={inputValue.title}
            onChange={(e) => handleChange("title", e.currentTarget.value)}
            className="shadow-sm h-[30px]"
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="border-b-2 flex items-center h-[30px]">
            회의 참여자
          </label>
          <input
            name="participant"
            value={inputValue.participant}
            placeholder="이메일 입력 후 Enter"
            className="shadow-sm h-[30px]"
            onChange={(e) => handleChange("participant", e.currentTarget.value)}
            onKeyDown={(e) => handleEnter(e)}
          />
        </div>
      </div>
      <div>
        <div>
          {participantArr.map((participant, index) => (
            <div key={index} className="flex items-center">
              <p>{participant}</p>
              <button
                onClick={() => handleDelete(index)}
                className="cursor-pointer"
              >
                x
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end">
        <button onClick={handleOpenModal} className="bg-[#3071F5] p-5 rounded">
          예약하기
        </button>
      </div>
      <ModalComponent
        isOpen={isOpen}
        capacity={currentRoom.capacity}
        location={currentRoom.location}
        reservationForm={reservationForm}
        handleCloseModal={handleCloseModal}
      />
    </div>
  );
};

export default MainPage;
