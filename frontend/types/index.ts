// ─── Roles & Enums ───────────────────────────────────────────────────────────

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

export const PAYMENT_STATUS = {
  PENDING: "pending",
  PAID: "paid",
  OVERDUE: "overdue",
} as const;
export type PaymentStatus = (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];

export const EXPENSE_CATEGORY = {
  RENT: "rent",
  UTILITIES: "utilities",
  EQUIPMENT: "equipment",
  SALARIES: "salaries",
  MARKETING: "marketing",
  MAINTENANCE: "maintenance",
  OTHER: "other",
} as const;
export type ExpenseCategory = (typeof EXPENSE_CATEGORY)[keyof typeof EXPENSE_CATEGORY];

export const WOD_TYPE = {
  GENERAL: "general",
  PROGRAMMING: "programming",
} as const;
export type WodType = (typeof WOD_TYPE)[keyof typeof WOD_TYPE];

export const RESULT_CATEGORY = {
  RX: "rx",
  SCALED: "scaled",
  BEGINNER: "beginner",
} as const;
export type ResultCategory = (typeof RESULT_CATEGORY)[keyof typeof RESULT_CATEGORY];

// ─── Entities ────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  gymId: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface MemberUser {
  name: string;
  email: string;
}

export interface Member {
  id: string;
  gymId: string;
  userId: string;
  phone: string | null;
  birthDate: string | null;
  height: number | null;
  weight: number | null;
  level: MemberLevel;
  qrCode: string;
  createdAt: string;
  user: MemberUser;
}

export interface Membership {
  id: string;
  gymId: string;
  name: string;
  price: number;
  durationDays: number;
  description: string | null;
  isActive: boolean;
}

export interface MembershipRef {
  name: string;
}

export interface MemberRef {
  id: string;
  level: MemberLevel;
  user: Pick<User, "name">;
}

export interface Payment {
  id: string;
  gymId: string;
  memberId: string;
  membershipId: string;
  amount: number;
  paymentDate: string;
  dueDate: string;
  method: PaymentMethod;
  status: PaymentStatus;
  notes: string | null;
  member: { user: Pick<User, "name"> };
  membership: MembershipRef;
}

export interface Expense {
  id: string;
  gymId: string;
  category: ExpenseCategory;
  amount: number;
  date: string;
  description: string | null;
}

export interface AttendanceMember {
  user: Pick<User, "name">;
}

export interface Attendance {
  id: string;
  gymId: string;
  memberId: string;
  checkinDate: string;
  checkinTime: string;
  member: AttendanceMember;
}

export interface Wod {
  id: string;
  gymId: string;
  title: string;
  description: string;
  date: string;
  type: WodType;
  _count: { results: number };
}

export interface WodResult {
  id: string;
  wodId: string;
  memberId: string;
  score: string;
  category: ResultCategory;
  notes: string | null;
  member: MemberRef;
}

export interface Leaderboard {
  rx: WodResult[];
  scaled: WodResult[];
  beginner: WodResult[];
}

export interface BlogPostAuthor {
  name: string;
}

export interface BlogPost {
  id: string;
  gymId: string;
  title: string;
  slug: string;
  content: string;
  coverImage: string | null;
  published: boolean;
  publishedAt: string | null;
  author: BlogPostAuthor;
}

// ─── Dashboard ───────────────────────────────────────────────────────────────

export interface DashboardStats {
  totalMembers: number;
  activeMembers: number;
  monthlyRevenue: number;
  monthlyExpenses: number;
  monthlyProfit: number;
  attendanceToday: number;
  wodsThisMonth: number;
  recentAttendance: Attendance[];
  recentPayments: Payment[];
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export interface AuthResponse {
  accessToken: string;
  user: User;
}
