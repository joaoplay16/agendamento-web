import {
  Divider,
  FormControl,
  Grid,
  List,
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Select,
  ListItemSecondaryAction,
  IconButton,
  Snackbar
} from '@material-ui/core'
import { Delete as DeleteIcon } from '@material-ui/icons'
import { Alert } from '@material-ui/lab'
import { useDatabase } from 'hooks'
import React, { useEffect, useRef, useState } from 'react'
import { ADMIN_PROCEDURES } from 'routes'
import { Button, Content, H5, PaperContainer, Spacer, TextField } from 'ui'
import { toMoney } from 'utils'

function UpdateProcedure ({location}) {

  if (!location.state) {
    return <Redirect to={ADMIN_PROCEDURES} />
  }

  const [professionalsArray, setProfessionalsArray] = useState(() => [])
  const { addProcedure } = useDatabase()

  const [procedure, setProcedure] = useState(() => ({
    name: '',
    time: ''
  }))
  const [professionalsPrices, setProfessionalsPrices] = useState(() => { })
  const { professionals: professionalsObject, fetchProfessionals } = useDatabase()
  const [selectedProfessional, setSelectedProfessional] = useState(() => "")
  const inputPriceRef = useRef()

  useEffect(() => {
    fetchProfessionals()
  }, [])

  useEffect(() => {
    if (professionalsObject) {
      setProfessionalsArray([
        ...Object.keys(professionalsObject)
          .map((key) => ({
            id: key,
            ...professionalsObject[key]
          }))
      ])
    }
  }, [professionalsObject])



  const [snackBar, setSnackbar] = useState(() => ({
    open: false,
    success: false,
    message: ''
  }))


  const hasError = () => {
    let errors = 0
    if (professionalsPrices === undefined || Object.keys(professionalsPrices).length < 1) {
      errors++
    }
    if (procedure.name === "" || procedure.time === "") {
      errors++
    }

    return errors > 0
  }

  const clearFields = () => {
    setProcedure({
      name: '',
      time: ''
    })
    setProfessionalsPrices([])

  }

  const handleClick = () => {
    const inputValue = inputPriceRef.current.value
    if (selectedProfessional) {
      setProfessionalsPrices((prices) => ({
        ...prices,
        [selectedProfessional]: inputValue
      }))
      inputPriceRef.current.value = null
    }

  }

  const handleDelete = (professionalID) => (e) => {
    const { [professionalID]: removed, ...remainder } = professionalsPrices
    setProfessionalsPrices(remainder)
  }

  const handleCloseSnackbar = () => {
    setSnackbar({
      open: false,
      message: '',
    })
  };


  const handleProfessionalChanges = (e) => {
    setSelectedProfessional(e.target.value)
  }
  const handleProceduresChanges = (e) => {
    const { name, value } = e.target
    setProcedure((state) => ({
      ...state,
      [name]: value
    }))
    console.log(procedure)
  }




  const handleSave = async () => {
    console.log("erro? ", hasError());
    if (!hasError()) {
      const proc = {
        ...procedure,
        price: professionalsPrices
      }
      const res = await addProcedure(proc)
      setSnackbar({
        open: true,
        success: res.success,
        message: res.message
      })
    }
    clearFields()
  }

  return (
    <Content>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <PaperContainer>
            {hasError() && <Alert variant='filled' severity='error' >Preencha todos os campos e adicione valores</Alert>}
            <H5>Adicionar procedimento</H5>
            <Grid container spacing={1}>
              <TextField value={procedure.name} name='name' onChange={handleProceduresChanges} variant='outlined' label='Procedimento' sm={9} xs={12} />
              <TextField value={procedure.time} name='time' onChange={handleProceduresChanges} variant='outlined' label='Tempo' sm={3} xs={4} />
            </Grid>
            <Spacer />
            <H5>Valores</H5>
            <Divider />
            <Spacer />
            <Grid item xs={12}>
              <Grid container justify='center'>
                <Grid item lg={4} md={4} sm={10} xs={12}>

                  <List>
                    {!!professionalsPrices && Object.keys(professionalsPrices).map((key) => {
                      const currentProfessional = professionalsObject[key]
                      const price = professionalsPrices[key]
                      return (
                        <ListItem key={key}>
                          <ListItemAvatar>
                            <Avatar alt={currentProfessional.name.toUpperCase()} src={currentProfessional.photo} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={currentProfessional.name}
                            secondary={toMoney(price)} />
                          <ListItemSecondaryAction>
                            <IconButton
                              onClick={handleDelete(key)}>
                              <DeleteIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>)
                    })}
                  </List>
                </Grid>
              </Grid>
            </Grid>
            {!!professionalsArray && (
              <Grid item >
                <Grid container spacing={2} direction="row" justify='center' alignItems='center'>
                  <Grid item sm={4} xs={10}>
                    <FormControl variant='outlined' style={{ width: '100%' }}>
                      <Select
                        labelId="simple-select-label"
                        value={selectedProfessional}
                        displayEmpty
                        fullWidth
                        onChange={handleProfessionalChanges}>
                        <MenuItem value="" disabled>
                          <em>Selecione um profissional</em>
                        </MenuItem>
                        {professionalsArray.map((professional) => (
                          <MenuItem key={professional.id} value={professional.id}>{professional.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item sm={3} xs={7}>
                    <TextField
                      required
                      inputRef={inputPriceRef}
                      inputProps={{ type: 'number', min: 0 }}
                      label='valor'
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      onClick={handleClick}
                      to="#"
                      variant='contained'
                      color='secondary'>Definir</Button>
                  </Grid>
                </Grid>
              </Grid>
            )}
            <Spacer />
            <Divider />
            <Spacer />
            <Grid container item justify='center'>
              <Button
                onClick={handleSave}
                to="#"
                variant='contained'
                color='primary'>Salvar</Button>
            </Grid>
          </PaperContainer>
          <Snackbar
            open={snackBar.open}
            onClose={handleCloseSnackbar}
            autoHideDuration={3000}
            key={snackBar.message}>
            <Alert variant='filled' severity={snackBar.success ? 'success' : 'error'}>
              {snackBar.message}
            </Alert>
          </Snackbar>
        </Grid>
      </Grid>
    </Content>
  )
}

export default UpdateProcedure
