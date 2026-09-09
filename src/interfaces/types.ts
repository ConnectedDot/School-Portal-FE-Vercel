import type { JSX } from "react";

export type NavItem = {
  id: string;
  label: string;
  icon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  href?: string;
  active?: boolean;
};

export type User = {
  id: string;
  name: string;
  role?: string;
  email?: string;
  phone?: string;
  avatarUrl?: string;
};

export type Message = {
  id: string;
  from: User;
  to: User;
  text: string;
  time: string;     // e.g. '9:33 PM'
  date?: string;    // e.g. 'Apr 17'
  attachments?: { id: string; type: 'image' | 'file'; url: string; name?: string }[];
};