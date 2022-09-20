export const LOGIN = 'login'
export const RESERVATIONS = 'reservas'
export const SCHEDULE = 'agendar'
export const MORE = 'mais'
export const CHECKOUT = `checkout`
export const CHOOSE_PROFESSIONAL = `escolher-profissional`
export const CHOOSE_DATE = `escolher-data`

export const ADMIN = '/admin'
export const ADMIN_LOGIN = `${ADMIN}/login`

export const ADMIN_PROCEDURES = `${ADMIN}/procedimentos`
export const ADMIN_PROCEDURES_ADD = `${ADMIN}/procedimentos/novo`
export const ADMIN_PROCEDURES_UPDATE = `${ADMIN}/procedimentos/atualizar`
export const ADMIN_PROFESSIONALS = `${ADMIN}/profissionais`
export const ADMIN_PROFESSIONALS_ADD = `${ADMIN}/profissionais/novo`
export const ADMIN_PROFESSIONALS_UPDATE = `${ADMIN}/profissionais/atualizar`
export const ADMIN_SCHEDULES = `${ADMIN}/agendamentos`
export const ADMIN_SETTINGS = `${ADMIN}/configuracoes`

export const navigationRoutes = {
  LOGIN: `/${LOGIN}`,
  SCHEDULE: `/${SCHEDULE}`,
  MORE: `/${MORE}`,
  RESERVATIONS: `/${RESERVATIONS}`,
  CHECKOUT: `/${SCHEDULE}/${CHECKOUT}`,
  CHOOSE_DATE: `/${SCHEDULE}/${CHOOSE_DATE}`,
  CHOOSE_PROFESSIONAL: `/${SCHEDULE}/${CHOOSE_PROFESSIONAL}`,
}