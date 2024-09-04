export type LoginParams = {
  email: string;
  password: string;
}

export type SignUpParams = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export type Project = {
  id: number;
  name: string;
  description: string;
}

export type CreateProjectParams = {
  name: string;
  description: string;
}

export type CreateTicketParams = {
  startDate: string;
  title: string; 
  description: string;
  endDate: string;
  status: string;
  projectId: number;
}

export type UpdateTicketParams = {
  ticketId: number;
  startDate: string;
  title: string; 
  description: string;
  endDate: string;
  status: string;
  projectId: number;
}

export type FetchTicketsParams = {
  projectId: number;
}

export type DeleteTicketsParams = {
  ticketId: number;
}

export type FetchTicketSummaryParams = {
  ticketId: number;
}

export type TicketProps = {
  startDate: string;
  title: string; 
  description: string;
  endDate: string;
  status: string;
  projectId: number;
  id: number
}