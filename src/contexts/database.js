import React, { createContext, useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import firebase from 'services/firebase'
const DatabaseContext = createContext()

const PROFESSIONALS = 'admin/scheduling/professionals'
const PROCEDURES = 'admin/scheduling/procedures'
const SCHEDULES = 'schedules'

function DatabaseProvider ({ children }) {
  const db = firebase.firestore()
  const [procedures, setProcedures] = useState(() => [])
  const [schedules, setSchedules] = useState(() => [])
  const [professionals, setProfessionals] = useState(() => ({}))
  const [userSchedules, setUserSchedules] = useState(() => [])

  const fetchUserSchedules = useCallback((userInfo) => {
    const schedulesRef = db.collection(SCHEDULES)
    const query = schedulesRef.where('userEmail', '==', userInfo.user.email)

    query.onSnapshot((snapshot) => {
      const uSchedules = snapshot.docs.map(doc => doc.data())
      console.log('uSchedules', uSchedules)
      setUserSchedules(uSchedules)
    })
  }, [])

  const fetchProcedures = useCallback(() => {
    db.collection(PROCEDURES)
      .get()
      .then((querySnapshot) => {
        const procedures = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        setProcedures(procedures)
      })
  }, [])

  const addProcedure = useCallback((procedure) => {
    const res = db
      .collection(PROCEDURES)
      .add(procedure)
      .then((docRef) => {
        return {
          success: true,
          message: 'Procedimento adicionado!'
        }
      })
      .catch(function (error) {
        return {
          success: false,
          message: 'Houve um erro.'
        }
      })
    return res
  }, [])

  const fetchSchedules = useCallback(() => {
    db.collection(SCHEDULES).onSnapshot((snapshot) => {
      const schedules = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setSchedules(schedules)
    })
  }, [])

  const submitSchedule = useCallback((transation) => {
    const res = db
      .collection(SCHEDULES)
      .add(transation)
      .then((docRef) => {
        return {
          success: true,
          message: 'Pagamento salvo!'
        }
      })
      .catch(function (error) {
        return {
          success: false,
          message: 'Houve um erro.'
        }
      })
    return res
  }, [])

  const updateProcedure = useCallback((procedure) => {
    const { id, ...procedureWithoutID } = procedure

    const procedureRef = db.collection(PROCEDURES).doc(id)
    const res = procedureRef
      .update({
        ...procedureWithoutID
      })
      .then(() => {
        return {
          success: true,
          message: 'Procedimento atualizado!'
        }
      })
      .catch(function (error) {
        console.log('updateProcedure error', error)
        return {
          success: false,
          message: 'Houve um erro ao atualizar.'
        }
      })

    return res
  }, [])

  const fetchProfessionals = useCallback(() => {
    return db
      .collection(PROFESSIONALS)
      .get()
      .then((querySnapshot) => {
        const objects = {}
        querySnapshot.forEach((doc) => {
          Object.assign(objects, {
            [doc.id]: doc.data()
          })
        })
        setProfessionals(objects)
      })
  }, [])

  const deleteProcedure = useCallback((procedure) => {
    const procedureRef = db.collection(PROCEDURES).doc(procedure.id)
    const res = procedureRef
      .delete()
      .then(() => {
        return {
          success: true,
          message: `${procedure.name} excluido(a)!`
        }
      })
      .then((data) => {
        return data
      })
      .catch(() => {
        return {
          success: true,
          message: 'Houve um erro ao excluir.'
        }
      })
    return res
  }, [])

  const addProfessional = useCallback((professional) => {
    const res = db
      .collection(PROFESSIONALS)
      .add(professional)
      .then((docRef) => {
        return {
          success: true,
          message: 'Profissional adicionado!'
        }
      })
      .catch(function (error) {
        return {
          success: false,
          message: 'Houve um erro.'
        }
      })
    return res
  }, [])

  const updateProfessional = useCallback((professional) => {
    const { id, ...professionalWithoutID } = professional
    const professionalRef = db.collection(PROFESSIONALS).doc(id)
    const res = professionalRef
      .update({
        ...professionalWithoutID
      })
      .then(() => {
        return {
          success: true,
          message: 'Profissional atualizado!'
        }
      })
      .catch(function (error) {
        console.log('updateProfessional error', error)
        return {
          success: false,
          message: 'Houve um erro ao atualizar.'
        }
      })

    return res
  }, [])

  const deleteProfessional = useCallback((professional) => {
    const professionalRef = db.collection(PROFESSIONALS).doc(professional.id)
    const res = professionalRef
      .delete()
      .then(() => {
        return {
          success: true,
          message: `${professional.name} excluido(a)!`
        }
      })
      .then((data) => {
        return data
      })
      .catch(() => {
        return {
          success: true,
          message: 'Houve um erro ao excluir.'
        }
      })
    return res
  }, [])

  return (
    <DatabaseContext.Provider
      value={{
        procedures,
        addProcedure,
        schedules,
        fetchSchedules,
        submitSchedule,
        updateProcedure,
        fetchProcedures,
        deleteProcedure,
        professionals,
        fetchProfessionals,
        addProfessional,
        updateProfessional,
        deleteProfessional,
        userSchedules,
        fetchUserSchedules
      }}
    >
      {children}
    </DatabaseContext.Provider>
  )
}

DatabaseProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export { DatabaseProvider, DatabaseContext }
