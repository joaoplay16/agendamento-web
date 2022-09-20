import {
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core"
import { Delete as DeleteIcon, Edit as EditIcon } from "@material-ui/icons"
import { Alert } from "@material-ui/lab"
import { useDatabase } from "hooks"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { adminNavigationRoutes as navRoutes } from "routes"
import { Button, H5, PaperContainer, Snackbar } from "ui"
function ProceduresList() {
  const [procedures, setProcedures] = useState(() => [])
  const {
    procedures: fetchedProcedures,
    fetchProcedures,
    deleteProcedure,
  } = useDatabase()
  const [selectedProcedure, setSelectedProcedure] = useState(() => {})

  useEffect(() => {
    fetchProcedures()
  }, [])

  const [snackBar, setSnackBar] = useState(() => ({
    open: false,
    success: false,
    message: "",
  }))

  const [dialogOpen, setDialogOpen] = useState(false)

  const handleDialogOpen = (procedure) => (e) => {
    setDialogOpen(true)
    setSelectedProcedure(procedure)
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
  }

  useEffect(() => {
    if (fetchedProcedures) {
      setProcedures([
        ...Object.keys(fetchedProcedures).map((key) => ({
          id: key,
          ...fetchedProcedures[key],
        })),
      ])
    }
  }, [fetchedProcedures])

  useEffect(() => {
    // console.log("procedimentos", procedures)
  })

  const handleDelete = async (e) => {
    const result = await deleteProcedure(selectedProcedure)
    if (result.success) {
      setProcedures(() =>
        procedures.filter((pro) => pro.id !== selectedProcedure.id)
      )
      setSnackBar({
        open: true,
        success: result.success,
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
          <H5>Procedimentos</H5>
        </Grid>
        <Grid item xs={11}>
          <Grid container justify="flex-end" direction="row">
            <Button
              to={navRoutes.ADMIN_PROCEDURES_ADD}
              variant="contained"
              color="primary">
              Novo
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {procedures.length == 0 && <H5>Nenhum procedimento encontrado</H5>}
          <List>
            {procedures.map((procedure) => (
              <ListItem key={procedure.id}>
                <ListItemText primary={procedure.name} secondary={null} />
                <ListItemSecondaryAction>
                  <IconButton
                    onClick={handleDialogOpen(procedure)}
                    color="secondary">
                    <DeleteIcon />
                  </IconButton>
                  <Link
                    to={navRoutes.ADMIN_PROCEDURES_UPDATE}
                    state={procedure}>
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
            Remover "{!!selectedProcedure && selectedProcedure.name}"?
          </DialogTitle>

          <DialogActions>
            <Button to="#" onClick={handleDialogClose} color="secondary">
              Cancelar
            </Button>
            <Button to="#" onClick={handleDelete} color="secondary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </PaperContainer>
  )
}

export default ProceduresList
