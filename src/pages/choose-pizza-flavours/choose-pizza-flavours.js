import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import t from 'prop-types'
import {
  Card as MaterialCard,
  Grid,
  Typography
} from '@material-ui/core'
import {
  CardLink,
  Content,
  Divider,
  Footer,
  H4,
  HeaderContent,
  PizzasGrid
} from 'ui'
import { singularOrPlural, toMoney } from 'utils'
import { HOME, CHOOSE_PIZZA_QUANTITY } from 'routes'
import pizzasFlavours from 'fake-data/pizza-flavours'
const ChoosePizzaFlavours = ({ location }) => {
  const [checkBoxes, setCheckboxes] = useState(() => ({}))
  if (!location.state) {
    return <Redirect to={HOME} />
  }
  const { flavours, id } = location.state.pizzaSize

  const handleChangeCheckBox = (pizzaId) => (e) => {
    if (checkboxesChecked(checkBoxes).length === flavours &&
      e.target.checked === true) {
      return
    }
    setCheckboxes((checkboxes) => {
      return {
        ...checkboxes,
        [pizzaId]: e.target.checked
      }
    })
  }

  return (
    <>
      <Content>
        <HeaderContent>
          <H4>
            Escolha até {flavours} {' '}
            {singularOrPlural(flavours, 'sabor', 'sabores')}:
        </H4>
        </HeaderContent>

        <PizzasGrid>
          {pizzasFlavours.map((pizza) => (
            <Grid item key={pizza.id} xs>
              <Card checked={!!checkBoxes[pizza.id]}>
                <Label>
                  <Checkbox
                    checked={!!checkBoxes[pizza.id]}
                    onChange={handleChangeCheckBox(pizza.id)}
                  />
                  <Img src={pizza.image} alt={pizza.name} />

                  <Divider />
                  <Typography>{pizza.name}</Typography>
                  <Typography>{toMoney(pizza.value[id])}</Typography>
                </Label>
              </Card>
            </Grid>
          ))}
        </PizzasGrid>
      </Content>
      <Footer buttons={{
        back: {
          children: 'Mudar tamanho'
        },
        action: {
          to: {
            pathname: CHOOSE_PIZZA_QUANTITY,
            state: {
              ...location.state, // pizzaSize
              pizzaFlavours: getFlavoursNameAndId(checkBoxes)
            }
          },
          children: 'Quantas pizzas?',
          disabled: checkboxesChecked(checkBoxes).length === 0
        }
      }} />
    </>
  )
}

const Label = styled(CardLink).attrs({
  component: 'label'
})``

const Checkbox = styled.input.attrs({
  type: 'checkbox'
})`
  display: none;
`

function checkboxesChecked (checkboxes) {
  return Object.values(checkboxes).filter(Boolean)
}

function getFlavoursNameAndId (checkboxes) {
  return Object.entries(checkboxes) // Object.entries retorna um array de arrays
    .filter(([, value]) => Boolean(value))
    .map(([id]) => ({
      id,
      name: pizzasFlavours.find((flavour) => flavour.id === id).name
    }))
}

const Card = styled(MaterialCard)`
  border: 2px solid transparent;
  border-color: ${({ theme, checked }) => checked ? theme.palette.secondary.light : ''}
`

const Img = styled.img`
  width: 200px;
`

ChoosePizzaFlavours.propTypes = {
  location: t.object.isRequired
}

export default ChoosePizzaFlavours
