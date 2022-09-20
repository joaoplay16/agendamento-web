export const LOGIN = 'login'
export const RESERVATIONS = 'reservas'
export const SCHEDULE = 'agendar'
export const MORE = 'mais'
export const CHECKOUT = `checkout`
export const CHOOSE_PROFESSIONAL = `escolher-profissional`
export const CHOOSE_DATE = `escolher-data`

export const ADMIN = 'admin'
export const ADMIN_LOGIN = `login`
export const ADMIN_PROCEDURES = `procedimentos`
export const ADMIN_PROCEDURES_ADD = `novo`
export const ADMIN_PROCEDURES_UPDATE = `atualizar`
export const ADMIN_PROFESSIONALS = `profissionais`
export const ADMIN_PROFESSIONALS_ADD = `novo`
export const ADMIN_PROFESSIONALS_UPDATE = `atualizar`
export const ADMIN_SCHEDULES = `agendamentos`
export const ADMIN_SETTINGS = `configuracoes`

export const navigationRoutes = {
  LOGIN: `/${LOGIN}`,
  SCHEDULE: `/${SCHEDULE}`,
  MORE: `/${MORE}`,
  RESERVATIONS: `/${RESERVATIONS}`,
  CHECKOUT: `/${SCHEDULE}/${CHECKOUT}`,
  CHOOSE_DATE: `/${SCHEDULE}/${CHOOSE_DATE}`,
  CHOOSE_PROFESSIONAL: `/${SCHEDULE}/${CHOOSE_PROFESSIONAL}`,
}

export const adminNavigationRoutes = {
  ADMIN: `/${ADMIN}`,
  ADMIN_LOGIN: `/${ADMIN_LOGIN}`,
  ADMIN_PROCEDURES: `/${ADMIN}/${ADMIN_PROCEDURES}`,
  ADMIN_PROCEDURES_ADD: `/${ADMIN}/${ADMIN_PROCEDURES}/${ADMIN_PROCEDURES_ADD}`,
  ADMIN_PROCEDURES_UPDATE: `/${ADMIN}/${ADMIN_PROCEDURES}/${ADMIN_PROCEDURES_UPDATE}`,
  ADMIN_PROFESSIONALS: `/${ADMIN}/${ADMIN_PROFESSIONALS}`,
  ADMIN_PROFESSIONALS_ADD: `/${ADMIN}/${ADMIN_PROFESSIONALS}/${ADMIN_PROFESSIONALS_ADD}`,
  ADMIN_PROCEDURES_UPDATE : `/${ADMIN}/${ADMIN_PROFESSIONALS}/${ADMIN_PROFESSIONALS_UPDATE}`,
  ADMIN_SCHEDULES: `/${ADMIN}/${ADMIN_SCHEDULES}`,
  ADMIN_SETTINGS: `/${ADMIN}/${ADMIN_SETTINGS}`
}