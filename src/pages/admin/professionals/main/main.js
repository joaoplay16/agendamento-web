import React, { useEffect, useState } from "react"
import {
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
} from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import { Delete as DeleteIcon, Edit as EditIcon } from "@material-ui/icons"
import { PaperContainer, H5, Button, H3, Snackbar } from "ui"
import { useDatabase } from "hooks"
import { Link } from "react-router-dom"
import { adminNavigationRoutes as navRoutes } from "routes"
function ProfessionalsList() {
  const [professionals, setProfessionals] = useState(() => [])
  const {
    professionals: fetchedProfessionals,
    fetchProfessionals,
    deleteProfessional,
  } = useDatabase()
  const [selectedProfessional, setSelectedProfessional] = useState(() => {})

  useEffect(() => {
    fetchProfessionals()
    console.log("fetchProfessionals")
  }, [])

  const [snackBar, setSnackBar] = useState(() => ({
    open: false,
    success: false,
    message: "",
  }))

  const [dialogOpen, setDialogOpen] = useState(false)

  const handleDialogOpen = (professional) => (e) => {
    setDialogOpen(true)
    setSelectedProfessional(professional)
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
  }

  useEffect(() => {
    if (fetchedProfessionals) {
      setProfessionals([
        ...Object.keys(fetchedProfessionals).map((key) => ({
          id: key,
          ...fetchedProfessionals[key],
        })),
      ])
      // console.log("profisionais", professionals);
    }
  }, [fetchedProfessionals])

  useEffect(() => {
    // console.log("professionals restantes", professionals)
  })

  const handleDelete = async (e) => {
    const result = await deleteProfessional(selectedProfessional)
    if (result.success) {
      setProfessionals(() =>
        professionals.filter((pro) => pro.id !== selectedProfessional.id)
      )
      setSnackBar({
        open: true,
        success: true,
        message: result.message,
      })
    } else {
      setSnackBar({
        open: true,
        success: false,
        message: result.message,
      })
    }

    setDialogOpen(false)
  }

  const handleCloseSnackbar = () => {
    setSnackBar({
      open: false,
      message: "",
    })
  }

  return (
    <PaperContainer>
      <Grid container justify="center">
        <Grid item xs={12}>
          <H5>Profissionais</H5>
        </Grid>
        <Grid item xs={11}>
          <Grid container justify="flex-end" direction="row">
            <Button
              to={navRoutes.ADMIN_PROFESSIONALS_ADD}
              variant="contained"
              color="primary">
              Novo
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {professionals.length == 0 && <H5>Nenhum profissional encontrado</H5>}
          <List>
            {professionals.map((professional) => (
              <ListItem key={professional.id}>
                <ListItemAvatar>
                  <Avatar
                    alt={professional.name.toUpperCase()}
                    src={professional.photo}
                  />
                </ListItemAvatar>
                <ListItemText primary={professional.name} secondary={null} />
                <ListItemSecondaryAction>
                  <IconButton
                    onClick={handleDialogOpen(professional)}
                    color="secondary">
                    <DeleteIcon />
                  </IconButton>
                  <Link
                    to={navRoutes.ADMIN_PROFESSIONALS_UPDATE}
                    state={professional}>
                    <IconButton color="secondary">
                      <EditIcon />
                    </IconButton>
                  </Link>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Grid>
        {/*  SNACKBAR  */}
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
        {/*  DIALOG  */}
        <Dialog
          open={dialogOpen}
          onClose={handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">
            Remover "{!!selectedProfessional && selectedProfessional.name}"?
          </DialogTitle>

          <DialogActions>
            <Button onClick={handleDialogClose} color="secondary">
              Cancelar
            </Button>
            <Button onClick={handleDelete} color="secondary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </PaperContainer>
  )
}

export default ProfessionalsList
