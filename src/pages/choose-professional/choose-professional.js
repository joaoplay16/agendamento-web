import React, { useEffect, useState } from "react"
import styled from "styled-components"
import {
  Avatar,
  List as MaterialList,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Grid as MaterialGrid,
} from "@material-ui/core"
import { toMoney } from "utils/index"
import { Button, H4, H6 } from "ui"
import { CHOOSE_DATE, SCHEDULE } from "routes"
import { useDatabase } from "hooks"
import { useLocation } from "react-router-dom"
const ChooseProfessional = () => {
  const location = useLocation()

  const [professionals, setProfessionals] = useState(() => [])
  const procedure = location.state || {}

  const { professionals: fetchedProfessionals, fetchProfessionals } =
    useDatabase()

  useEffect(() => {
    fetchProfessionals()
    console.log("location ", location)
  }, [])

  useEffect(() => {
    // procedure.price is an object with an id of the professional and a amount e.g. { Kajhfsaa4gfd : 200 }
    const professionalsKeys = Object.keys(procedure?.price || {})

    const result = professionalsKeys?.map((professionalID) => ({
      id: professionalID,
      ...fetchedProfessionals[professionalID],
      price: procedure?.price[professionalID],
    }))
    setProfessionals(result)
  }, [fetchedProfessionals])

  return (
    <ProfessionalsContainer>
      <Grid>
        <H4>{procedure?.name}</H4>
        <H6> Escolha um profissional</H6>
        <List element="nav">
          {professionals?.map((professional) => (
            <ListItem key={professional.id} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={professional.photo} />
              </ListItemAvatar>
              <ListItemText
                primary={professional.name}
                secondary={toMoney(professional.price)}
              />

              <ListItemSecondaryAction>
                <Button
                  to={`/${SCHEDULE}/${CHOOSE_DATE}`}
                  state = {{
                    procedure,
                    professional
                  }}
                  variant="outlined"
                  color="primary">
                  Escolher
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Grid>
    </ProfessionalsContainer>
  )
}

const ProfessionalsContainer = styled.main`
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing(3)}px;
`

const Grid = styled(MaterialGrid).attrs({
  container: true,
  xs: 12,
  sm: 8,
})`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const List = styled(MaterialList)`
  width: 100%;
`

export default ChooseProfessional
