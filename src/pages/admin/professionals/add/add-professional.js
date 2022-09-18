import React, { useEffect, useState } from 'react'
import {
  Button,
  Chip,
  Grid,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography
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
  Divider,
  Snackbar
} from 'ui'
import { useDatabase } from 'hooks'

function AddProfessional () {
  const { addProfessional } = useDatabase()
  const defaultTimeTable = {
    week: {
      0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: []
    },
    specificDate: {
      0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: []
    }
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
  const timeTableOfSelectedWeek = timeTable.week[selectedWeek]

  const handleWeekChange = (e) => {
    const selected = e.target.value
    setSelectedWeek(selected)
  }

  useEffect(() => {
    console.log('select', timeTable)
  })

  const addHour = (hour) => (e) => {
    setTimeTable((timeTable) => ({
      ...timeTable,
      week: {
        ...timeTable.week,
        [selectedWeek]: timeTableOfSelectedWeek.concat(hour).sort(orderHours)
      }
    }))
  }

  const removeHour = (hour) => (e) => {
    setTimeTable((timeTable) => ({
      ...timeTable,
      week: { [selectedWeek]: timeTableOfSelectedWeek.filter(h => h !== hour) }
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
    const [hourA, minA] = a.split(':')
    const [hourB, minB] = b.split(':')
    const dateA = new Date()
    const dateB = new Date()
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
    const result = await addProfessional(pro)
    setSnackBar({
      open: true,
      success: result.success,
      message: result.message
    })
    resetFields()
  }

  const handleCloseSnackbar = () => {
    setSnackBar({
      open: false,
      message: ''
    })
  }

  return (
    <Content>
      <PaperContainer>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}><H5>Adicionar profissional</H5></Grid>
            <Grid item md={6} xs={12}>
              <TextField
                name='name'
                variant='outlined'
                label='Nome'
                value={professional.name}
                xs={12}
                required
                onChange={handleChange}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                name='photo'
                variant='outlined'
                value={professional.photo}
                label='Foto'
                required
                xs={12} onChange={handleChange}
              />
            </Grid>
            <Divider />
            <Grid item xs={12}><H5>Horário</H5></Grid>
            <Grid container item xs={12} justify='center'>
              <FormControl element='fieldset'>
                <RadioGroup
                  row
                  aria-label='position'
                  name='position'
                  defaultValue='0'
                  onChange={handleWeekChange}
                >
                  {weekDays.map(day => (
                    <FormControlLabel
                      key={day.value}
                      value={day.value}
                      control={<Radio color='secondary' />}
                      label={day.label}
                      labelPlacement='top'
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
            <Divider />
            <Grid item xs={12}>
              <Grid container justify='center' spacing={1}>
                {timeTable.week[selectedWeek].length == 0 &&
                  <Typography>
                    Nenhum horário definido
                  </Typography>}
                {timeTable.week[selectedWeek].map((hour) => (
                  <Grid item>
                    <Chip
                      key={hour}
                      label={hour}
                      color='secondary'
                      size='small'
                      onDelete={removeHour(hour)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Divider />
            <Grid container item xs={12} justify='center' spacing={1}>
              {hours.map(hour => (
                <Grid item key={hour}>
                  <Button
                    variant='outlined'
                    color='secondary'
                    onClick={addHour(hour)}
                    disabled={
                      timeTableOfSelectedWeek.includes(hour)
                    }
                  >
                    {hour}
                  </Button>
                </Grid>
              ))}
            </Grid>
            <Grid container item xs={12} justify='center' spacing={1}>
              <Spacer />
              <Button
                variant='contained'
                color='secondary'
                type='submit'
              >
                Salvar
              </Button>
              <Spacer />
            </Grid>

          </Grid>
        </form>
      </PaperContainer>
      <Snackbar
        open={snackBar.open}
        onClose={handleCloseSnackbar}
        autoHideDuration={3000}
        key={snackBar.message}
      >
        <Alert variant='filled' severity={snackBar.success ? 'success' : 'error'}>
          {snackBar.message}
        </Alert>
      </Snackbar>
    </Content>
  )
}

export default AddProfessional
