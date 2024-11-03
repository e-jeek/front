// types/ChallengeDTO.ts

export interface Member {
  id: number;
  email: string;
  name: string;
  nickname: string;
  status: string;
  role: string;
}

export interface Challenge {
  id: number;
  member: Member;
  name: string;
  type: string;
  capacity: string;
  dueDate: string;
  startDate: string;
  endDate: string;
  rule: string;
  hidden: boolean;
  content: string;
  status: string;
  hashtags: string[];
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}
