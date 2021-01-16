import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  Avatar,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction
} from '@material-ui/core'
import {
  Delete as DeleteIcon,
  Edit as EditIcon
} from '@material-ui/icons'
import { PaperContainer, H5, Button } from 'ui'
import { useDatabase } from 'hooks'
import { Link } from 'react-router-dom'
import { ADMIN_PROFESSIONALS_UPDATE } from 'routes'
function ProfessionalsList () {
  const [professionals, setProfessionals] = useState(() => [])

  const { professionals: fetchedProfessionals, fetchProfessionals } = useDatabase()

  useEffect(() => {
    fetchProfessionals()
  }, [])

  useEffect(() => {
    if (fetchedProfessionals) {
      setProfessionals([
        ...Object.keys(fetchedProfessionals)
          .map((key) => ({
            id: key,
            ...fetchedProfessionals[key]
          }))
      ])
      console.log("proffisionais", professionals);
    }

  }, [fetchedProfessionals])

  const handleDelete = () => {
  }

  return (
    <PaperContainer>
      <Grid container justify='center'>
        <Grid item xs={12}>
          <H5>Profissionais</H5>
        </Grid>
        <Grid item xs={11}>
          <Grid
            container
            justify='flex-end'
            direction='row'>
            <Button
              variant='contained'
              color='primary'>
              Novo
            </Button>
          </Grid>

        </Grid>
        <Grid item xs={12}>
          <List>
            {professionals.map((professional) => (
              <ListItem key={professional.id}>
                <ListItemAvatar>
                  <Avatar alt={professional.name.toUpperCase()} src={professional.photo} />
                </ListItemAvatar>
                <ListItemText
                  primary={professional.name}
                  secondary={null}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    color='secondary'>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    to={{
                      pathname: ADMIN_PROFESSIONALS_UPDATE,
                      state: {
                        professional
                      }
                    }}
                    component={Link}
                    color='secondary'>
                    <EditIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Grid>

      </Grid>
    </PaperContainer>

  )
}


export default ProfessionalsList
