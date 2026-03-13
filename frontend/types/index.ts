export const USER_ROLE = {
  ADMIN: "admin",
  COACH: "coach",
  MEMBER: "member",
} as const;

export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export const MEMBER_LEVEL = {
  BEGINNER: "beginner",
  INTERMEDIATE: "intermediate",
  ADVANCED: "advanced",
} as const;

export type MemberLevel = (typeof MEMBER_LEVEL)[keyof typeof MEMBER_LEVEL];

export const PAYMENT_METHOD = {
  CASH: "cash",
  CARD: "card",
  TRANSFER: "transfer",
  MERCADOPAGO: "mercadopago",
} as const;

export type PaymentMethod = (typeof PAYMENT_METHOD)[keyof typeof PAYMENT_METHOD];

export const RESULT_CATEGORY = {
  RX: "rx",
  SCALED: "scaled",
  BEGINNER: "beginner",
} as const;

export type ResultCategory = (typeof RESULT_CATEGORY)[keyof typeof RESULT_CATEGORY];

export interface User {
  id: string;
  gymId: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Member {
  id: string;
  gymId: string;
  userId: string;
  phone: string | null;
  level: MemberLevel;
  qrCode: string;
  user: Pick<User, "name" | "email">;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}
