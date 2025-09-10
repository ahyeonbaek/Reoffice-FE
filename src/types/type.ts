export interface User {
  id?: string;
  email: string;
  name: string;
  profileImg?: string;
  reservations?: Reservation[];
}

export interface MeetingRoom {
  id: string;
  name: string;
  capacity: number;
  location: string;
  reservations?: [
    {
      id: string;
      user: { id: string; name: string; email: string };
      date: string;
      startTime: Date;
      endTime: Date;
      participant?: [string];
    }
  ];
}

export interface Reservation {
  id?: string;
  user: { id: string; name: string; email: string };
  room: string;
  date: string;
  startTime: number;
  endTime: number;
  participant?: string;
}

export interface ReservationForm {
  userEmail: string;
  roomId: string;
  roomName: string;
  date: string;
  startTime: number;
  endTime: number;
  title: string;
  participant?: string[];
}

//생성할 때
// export interface createReservation {
//   user: { id: string; name: string; email: string };
//   room: string;
//   date: Date;
//   startTime: Date;
//   endTime: Date;
//   participant: string;
// }
