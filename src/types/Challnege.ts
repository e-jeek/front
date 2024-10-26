// types/ChallengeDTO.ts
export interface Challenge {
    id: number;
    //TODO:분리 필요
    member: {
      id: number;
      email: string;
      name: string;
      nickname: string;
      status: string;
      role: string;
    };
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
  