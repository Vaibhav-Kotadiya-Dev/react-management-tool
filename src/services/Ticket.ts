import { CreateTicketParams, DeleteTicketsParams, FetchTicketsParams, FetchTicketSummaryParams, UpdateTicketParams } from 'types/types';
import api from 'services/api'
import Request from 'utils/Request'

const fetchTickets = (params: FetchTicketsParams) => {
  let url = 'ticket'

  if (params) {
    url += '?' + Request.toRequestParams(params)
  }
  return api.get(url)
}

const fetchTicketSummary = (params: FetchTicketSummaryParams) => {
  let url = `ticket/${params.ticketId}`
  return api.get(url)
}

const createTicket = (params: CreateTicketParams) => {
  return api.post(
    'ticket/create',
    params,
  )
}

const updateTicket = (params: UpdateTicketParams) => {
  return api.put(
    'ticket/update',
    params,
  )
}

const deleteTicket = (params: DeleteTicketsParams) => {
  let url = 'ticket/delete'

  if (params) {
    url += `/${params?.ticketId}`
  }
  return api.delete(url)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { fetchTickets, createTicket, deleteTicket, fetchTicketSummary, updateTicket }
