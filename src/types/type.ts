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
      date: Date;
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
  date: Date;
  startTime: Date;
  endTime: Date;
  participant?: string;
}

export interface ReservationForm {
  userId: string;
  roomId: string;
  date: Date;
  startTime: string | Date | null;
  endTime: string | Date | null;
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
