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
  IconButton
} from '@material-ui/core'
import { Delete as DeleteIcon } from '@material-ui/icons'
import { useDatabase } from 'hooks'
import React, { useEffect, useRef, useState } from 'react'
import { Button, Content, H5, PaperContainer, Spacer, TextField } from 'ui'
import { toMoney } from 'utils'

function ProceduresList () {
  const [professionalsPrices, setProfessionalsPrices] = useState(() => { })
  const [professionalsArray, setProfessionalsArray] = useState(() => [])
  const { professionals: professionalsObject, fetchProfessionals } = useDatabase()
  const [selectedProfessional, setSelectedProfessional] = useState(() => "")
  const inputPriceRef = useRef();

  useEffect(() => {
    fetchProfessionals()
    setProfessionalsArray(professionalsArray)
  }, [])

  useEffect(() => {
    console.log(professionalsPrices);
  }, [professionalsPrices])

  const handleClick = () => {
    const inputValue = inputPriceRef.current.value
    setProfessionalsPrices((prices) => ({
      ...prices,
      [selectedProfessional]: inputValue
    }))
    console.log(inputPriceRef);
    inputPriceRef.current.value = 0
  }

  const handleDelete = (professionalID) => (e) => {
    const {[professionalID]: removed, ...remainder} = professionalsPrices
    setProfessionalsPrices(remainder)
  }

  const handleProfessionalChanges = (e) => {
    setSelectedProfessional(e.target.value)
  }

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

  return (
    <Content>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <PaperContainer>
            <H5>Adicionar procedimento</H5>
            <Grid container spacing={1}>
              <TextField required variant='outlined' label='Procedimento' sm={9} xs={12} />
              <TextField required variant='outlined' label='Tempo' sm={3} xs={4} />
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

          </PaperContainer>
        </Grid>
      </Grid>
    </Content>
  )
}

export default ProceduresList
