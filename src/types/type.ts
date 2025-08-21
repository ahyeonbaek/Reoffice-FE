export interface User {
  email: string;
  name: string;
  profileImg?: string;
  reservations?: Reservation[];
}

export interface MeetingRoom {
  id: string;
  name: string;
  capacity: number;
  rocation: string;
  reservations: [
    {
      id: string;
      user: { id: string; name: string; email: string };
      date: Date;
      startTime: Date;
      endTime: Date;
      participant: [string];
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
  participant: string;
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
