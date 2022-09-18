import {
  Avatar,
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Select,
  Snackbar,
} from "@material-ui/core"
import { Delete as DeleteIcon } from "@material-ui/icons"
import { Alert } from "@material-ui/lab"
import { useDatabase } from "hooks"
import React, { useEffect, useRef, useState } from "react"
import { Navigate } from "react-router-dom"
import { ADMIN_PROCEDURES } from "routes"
import { Content, H5, PaperContainer, Spacer, TextField } from "ui"
import { toMoney } from "utils"

function UpdateProcedure({ location, history }) {
  if (!location.state) {
    return <Navigate to={ADMIN_PROCEDURES} />
  }

  const procedureToUpdate = location.state.procedure

  const { updateProcedure } = useDatabase()

  const [procedure, setProcedure] = useState(() => ({
    name: "",
    time: "",
  }))
  const [professionalsPrices, setProfessionalsPrices] = useState(
    () => procedureToUpdate.price
  )
  const { professionals: professionalsObject, fetchProfessionals } =
    useDatabase()
  const [professionalsArray, setProfessionalsArray] = useState(() => [])
  const [selectedProfessional, setSelectedProfessional] = useState(() => "")
  const inputPriceRef = useRef()

  useEffect(() => {
    fetchProfessionals()
    setProcedure({
      id: procedureToUpdate.id,
      name: procedureToUpdate.name,
      time: procedureToUpdate.time,
    })
  }, [])

  useEffect(() => {
    setProfessionalsArray([
      ...Object.keys(professionalsObject).map((key) => ({
        id: key,
        ...professionalsObject[key],
      })),
    ])
  }, [professionalsObject, location])

  const [snackBar, setSnackbar] = useState(() => ({
    open: false,
    success: false,
    message: "",
  }))

  const hasError = () => {
    let errors = 0
    if (Object.keys(professionalsPrices).length < 1) {
      errors++
    }
    if (procedure.name === "" || procedure.time === "") {
      errors++
    }

    return errors > 0
  }

  const clearFields = () => {
    setProcedure({
      name: "",
      time: "",
    })
    setProfessionalsPrices([])
  }

  const handleAddProfessionalPrice = (e) => {
    e.preventDefault()

    const inputValue = inputPriceRef.current.value
    if (selectedProfessional) {
      setProfessionalsPrices((prices) => ({
        ...prices,
        [selectedProfessional]: inputValue,
      }))
      inputPriceRef.current.value = null
    }
  }

  const handleDelete = (professionalID) => () => {
    const { [professionalID]: removed, ...remainder } = professionalsPrices
    setProfessionalsPrices(remainder)
  }

  const handleCloseSnackbar = () => {
    setSnackbar({
      open: false,
      message: "",
    })
  }

  const handleProfessionalChanges = (e) => {
    setSelectedProfessional(e.target.value)
  }

  const handleProceduresChanges = (e) => {
    const { name, value } = e.target
    setProcedure((state) => ({
      ...state,
      [name]: value,
    }))
    console.log(procedure)
  }

  const handleUpdate = async () => {
    console.log("erro? ", hasError())
    if (!hasError()) {
      const proc = {
        ...procedure,
        price: professionalsPrices,
      }
      const res = await updateProcedure(proc)
      setSnackbar({
        open: true,
        success: res.success,
        message: res.message,
      })

      setTimeout(() => {
        history.goBack()
      }, 1800)
      clearFields()
    }
  }

  return (
    <Content>
      <PaperContainer>
        <Grid container spacing={1} justify="center" alignItems="center" lg={10}>
          <Grid item>
            <H5>Atualizar procedimento</H5>
          </Grid>
          <Grid item xs={12}>
            {hasError() && (
              <Alert variant="filled" severity="error">
                Preencha todos os campos e adicione valores
              </Alert>
            )}
          </Grid>
          <Grid item sm={8} xs={12}>
            <TextField
              value={procedure.name}
              name="name"
              onChange={handleProceduresChanges}
              variant="outlined"
              label="Procedimento"
            />
          </Grid>

          <Grid item sm={4} xs={12}>
            <TextField
              value={procedure.time}
              name="time"
              onChange={handleProceduresChanges}
              variant="outlined"
              label="Tempo"
            />
          </Grid>
          <Grid item xs={12}>
            <H5>Valores</H5>
          </Grid>

          <Grid item lg={4} md={4} sm={10} xs={12}>
            <List>
              {Object.keys(professionalsObject) !== 0 &&
                Object.keys(professionalsPrices).map((key) => {
                  const currentProfessional = professionalsObject[key]
                  const price = professionalsPrices[key]
                  return (
                    <ListItem key={key}>
                      <ListItemAvatar>
                        <Avatar
                          alt={currentProfessional?.name.toUpperCase()}
                          src={currentProfessional?.photo}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={currentProfessional?.name}
                        secondary={toMoney(price)}
                      />
                      <ListItemSecondaryAction>
                        <IconButton onClick={handleDelete(key)}>
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  )
                })}
            </List>
          </Grid>
          {professionalsArray.length > 0 && (
            <Grid item container spacing={1}>
              <Grid item sm xs={12}>
                <Select
                  labelId="simple-select-label"
                  value={selectedProfessional}
                  displayEmpty
                  label="asds"
                  fullWidth
                  variant="outlined"
                  onChange={handleProfessionalChanges}>
                  <MenuItem value="" disabled>
                    <em>Selecione um profissional</em>
                  </MenuItem>
                  {professionalsArray.map((professional) => (
                    <MenuItem key={professional.id} value={professional.id}>
                      {professional.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item sm={4} xs={12}>
                <TextField
                  required
                  inputRef={inputPriceRef}
                  inputProps={{ type: "number", min: 0 }}
                  label="valor"
                />
              </Grid>
              <Grid item sm={2} xs={12}>
                <Button
                  onClick={handleAddProfessionalPrice}
                  to="#"
                  variant="contained"
                  color="secondary">
                  Definir
                </Button>
              </Grid>
            </Grid>
          )}
          <Spacer />
          <Divider />
          <Spacer />
          <Grid container item justify="center">
            <Button onClick={handleUpdate} variant="contained" color="primary">
              Atualizar
            </Button>
          </Grid>
        </Grid>
      </PaperContainer>
      <Snackbar
        open={snackBar.open}
        onClose={handleCloseSnackbar}
        autoHideDuration={3000}
        key={snackBar.message}>
        <Alert
          variant="filled"
          severity={snackBar.success ? "success" : "error"}>
          {snackBar.message}
        </Alert>
      </Snackbar>
    </Content>
  )
}

export default UpdateProcedure
