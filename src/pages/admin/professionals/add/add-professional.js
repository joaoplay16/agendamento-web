import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  Button,
  Chip,
  Grid,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  ListItem,
  ListItemText
} from '@material-ui/core'
import weekDays from 'static-data/week-days'
import hours from 'static-data/hours'
import { Content, PaperContainer, TextField, H5 } from 'ui'

function AddProfessional () {
  const [timeTable, setTimeTable] = useState(() => ({
    0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: []
  }))
  const [professional, setProfessional] = useState(() => ({
    name: 'joao',
    photo: 'img'
  }))
  const [selectedWeek, setSelectedWeek] = useState(() => 0)
  const timeTableOfSelectedWeek = timeTable[selectedWeek]

  const handleWeekChange = (e) => {
    const selected = e.target.value
    setSelectedWeek(selected)
  }

  const addHour = (hour) => (e) => {
    setTimeTable((timeTable) => ({
      ...timeTable,
      [selectedWeek]:
        timeTableOfSelectedWeek.concat(hour).sort(orderHours)
    }))
  }

  const removeHour = (hour) => (e) => {
    setTimeTable((timeTable) => ({
      ...timeTable,
      [selectedWeek]: timeTableOfSelectedWeek.filter(h => h !== hour)
    }))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfessional((state) => ({
      ...state,
      [name]: value
    }))
  }

  const orderHours = (a, b) => {
    let [hourA, minA] = a.split(':')
    let [hourB, minB] = b.split(':')
    let dateA = new Date()
    let dateB = new Date()
    dateA.setHours(hourA, minA)
    dateB.setHours(hourB, minB)
    return dateA - dateB
  }

  const handleSubmit = () => {

  }

  return (
    <Content>
      <Grid container spacing={1}>
        <PaperContainer>
        <Grid item xs={12}><H5>Novo profissional</H5></Grid>

          <Grid container spacing={1}>
            <TextField
              name='name'
              variant='outlined'
              label='Nome'
              xs={12}
              required
              onChange={handleChange} />
            <TextField
              name='photo'
              variant='outlined'
              label='Foto'
              required
              xs={12} onChange={handleChange} />
          </Grid>
          <Grid container spacing={1} justify='center'>

            <Grid item xs={12}><H5>Horário</H5></Grid>

            <Grid item xs={12}>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="position"
                  name="position"
                  defaultValue='0'
                  onChange={handleWeekChange}>
                  {weekDays.map(day => (
                    <FormControlLabel key={day.value}
                      value={day.value}
                      control={<Radio color="secondary" />}
                      label={day.label}
                      labelPlacement="top"
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>

            {timeTable[selectedWeek].map((hour) => (
              <Grid item>
                <Chip
                  key={hour}
                  label={hour}
                  color="secondary"
                  size="small"
                  onDelete={removeHour(hour)} />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Grid container spacing={1}>
                {hours.map(hour => (
                  <Grid item >
                    <Button
                      variant='outlined'
                      color='secondary'
                      onClick={addHour(hour)}
                      disabled={
                        timeTableOfSelectedWeek.includes(hour)
                      }>
                      {hour}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </PaperContainer>
      </Grid>
    </Content>
  )
}

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing(3)}px;
`
// const Logo = styled(MainLogo)`
//   width: 100%;
// `
const LoginButton = styled(Button).attrs({
  variant: 'contained',
  fullWidth: true
})`
  &&{
    font-size: ${({ theme }) => theme.typography.h5.fontSize};;
    max-width: 480px;
    padding: ${({ theme }) => theme.spacing(2)};
    text-transform: none;
  }
`

export default AddProfessional
