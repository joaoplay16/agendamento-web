import React, { useState } from 'react'
import {
  Button,
  Chip,
  Grid,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  Slide,
  Snackbar
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import weekDays from 'static-data/week-days'
import hours from 'static-data/hours'
import {
  Content,
  PaperContainer,
  Spacer,
  TextField,
  H5,
  Divider
} from 'ui'
import { useDatabase } from 'hooks'

function SlideTransition (props) {
  return <Slide {...props} direction="up" />;
}

function AddProfessional () {
  const { addProfessional } = useDatabase()
  const defaultTimeTable = {
    0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: []
  }
  const [timeTable, setTimeTable] = useState(() => (defaultTimeTable))
  const [professional, setProfessional] = useState({
    name: '',
    photo: ''
  })
  const [snackBar, setSnackBar] = useState(() => ({
    open: false,
    success: false,
    message: ''
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

  const resetFields = () => {
    setProfessional({
      name: '',
      photo: ''
    })
    setTimeTable(defaultTimeTable)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const pro = {
      ...professional,
      timeTable
    }
    let result = await addProfessional(pro)
    setSnackBar({
      open: true,
      success: result.success,
      message: result.message,
    })
    resetFields()
  }

  const handleCloseSnackbar = () => {
    setSnackBar({
      open: false,
      message: '',
    })
  };

  return (
    <Content>
      <Grid container spacing={1}>
        <PaperContainer>
          <Grid item xs={12}><H5>Novo profissional</H5></Grid>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <TextField
                name='name'
                variant='outlined'
                label='Nome'
                value={professional.name}
                xs={12}
                required
                onChange={handleChange} />
              <TextField
                name='photo'
                variant='outlined'
                value={professional.photo}

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
              <Divider />
              {timeTable[selectedWeek].length == 0 &&
                <Typography>
                  Nenhum horário definido
              </Typography>
              }
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
              <Divider />
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
              <Spacer />
              <Grid item xs={12}>
                <Grid container spacing={1} justify='center'>
                  <Button
                    variant='contained'
                    color='secondary'
                    type='submit'>
                    Adicionar
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </PaperContainer>
      </Grid>
      <Snackbar
        open={snackBar.open}
        onClose={handleCloseSnackbar}
        TransitionComponent={SlideTransition}
        autoHideDuration={3000}
        key={snackBar.message}>
        <Alert variant='filled' severity={snackBar.success ? 'success' : 'error'}>
          {snackBar.message}
        </Alert>
      </Snackbar>
    </Content>
  )
}

export default AddProfessional
