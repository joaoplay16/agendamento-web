import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  Box,
  Grid,
  Paper
} from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns'
import { isToday, lightFormat } from 'date-fns'
import * as dateFns from 'date-fns'
import brLocale from 'date-fns/locale/pt-BR'
import {
  DatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'
import {
  Button,
  Content,
  Divider,
  H4, H6
} from 'ui'
import { CHECKOUT } from 'routes'
import scheduleConfigs from 'fake-data/schedule-configs'
import { useShoppingCart } from 'hooks'
const ChooseDate = ({ location }) => {
  const currentDate = new Date()

  const { schedules, addScheduleToShoppingCart } = useShoppingCart()

  const { procedure, professional } = location.state
  const [selectedDate, setSelectedDate] = useState(currentDate)
  const { timeTable, disabledDays } = scheduleConfigs
  const handleDateChange = (date) => {
    setSelectedDate(date);
  }

  useEffect(() => {
    window.horas = DateFnsUtils
    window.datefns = dateFns
    console.log("time", professional);
  }, [])

  function disableDay (date) {
    const day = date.getDay()
    const dateString = lightFormat(date, "dd/MM/yyyy")
    return disabledDays.week.includes(day)
      || disabledDays.specificDate.includes(dateString)
  }
  
  function isPastTime (timeString) {
    if (isToday(selectedDate)) {
      let [hour, minute] = timeString.split(':')
      let date = new Date()
      date.setHours(hour, minute, 0, 0)
      return currentDate > date
    }
    return false
  }

  function getTimeTable () {
    const currentWeekDay = selectedDate.getDay()
    const dateString = selectedDate.toLocaleDateString()
    const time_table = professional.timeTable 
    if (time_table.specificDate.hasOwnProperty(dateString)) {
      return time_table.specificDate[dateString]
    }
    return time_table.week[currentWeekDay]
  }

  const addSchedule = (time) => (_) => {
    addScheduleToShoppingCart({
      procedure,
      professional,
      selectedDate,
      selectedTime: time
    })
  }

  return (
    <Content>
      <Grid container justify='center'>
        <Grid item xs={12} sm={10} md={8} >
          <H4>Escolher data</H4>

          <PaperContainer>
            <Grid container alignItems='center' direction='column'>
              <Grid item xs={6}>
                <MuiPickersUtilsProvider
                  utils={DateFnsUtils}
                  locale={brLocale}>
                  <DatePicker
                    id="date-picker-dialog"
                    inputVariant='outlined'
                    format="dd/MM/yyyy"
                    disablePast
                    value={selectedDate}
                    shouldDisableDate={disableDay}
                    onChange={handleDateChange}
                    cancelLabel='Cancelar'
                    color='secondary'/>
                </MuiPickersUtilsProvider>
              </Grid>
              <Divider />
              <Grid item>
                <H6>Horários</H6>
                <TimeTable>
                  {getTimeTable().map((time) => (
                    <Box p={2}>
                      <Button 
                      onClick={addSchedule(time)}
                      to={{
                        pathname: CHECKOUT,
                      }}
                      disabled={isPastTime(time)} 
                      variant='outlined' 
                      color='secondary'>
                        {time}
                      </Button>
                    </Box>
                  ))}
                </TimeTable>
              </Grid>
            </Grid>
          </PaperContainer>
        </Grid>
      </Grid>
    </Content>
  )
}

const PaperContainer = styled(Paper)`
  margin-bottom: ${({ theme }) => theme.spacing(5)}px;
  padding: ${({ theme }) => theme.spacing(2)}px;
`

const TimeTable = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 400px;
  justify-content: space-between ;
  margin-top: ${({ theme }) => theme.spacing(3)}px;
`

export default ChooseDate