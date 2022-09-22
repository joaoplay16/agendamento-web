import React, { createContext, useState } from "react"
import PropTypes from "prop-types"
import { db } from "services/firebase"
import {
  collection,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
  addDoc,
  query,
  where,
} from "firebase/firestore"
const DatabaseContext = createContext()

const PROFESSIONALS = "admin/scheduling/professionals"
const PROCEDURES = "admin/scheduling/procedures"
const SCHEDULES = "schedules"

function DatabaseProvider({ children }) {
  const [procedures, setProcedures] = useState(() => [])
  const [schedules, setSchedules] = useState(() => [])
  const [professionals, setProfessionals] = useState(() => ({}))
  const [userSchedules, setUserSchedules] = useState(() => [])

  const fetchUserSchedules = async (userInfo) => {
    const schedulesRef = collection(db, SCHEDULES)
    const q = query(schedulesRef, where("userEmail", "==", userInfo.user.email))
    const querySnapshot = await getDocs(q)

    const uSchedules = querySnapshot.docs.map((doc) => doc.data())
    setUserSchedules(uSchedules)
  }

  const fetchProcedures = async () => {
    const querySnapshot = await getDocs(collection(db, PROCEDURES))

    const procedures = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    setProcedures(procedures)
  }

  const fetchSchedules = async () => {
    const querySnapshot = await getDocs(collection(db, SCHEDULES))

    const schedules = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    setSchedules(schedules)
  }

  const submitSchedule = (transation) => {
    const procedureRef = addDoc(collection(db, SCHEDULES), transation)

    const res = procedureRef
      .then(() => {
        console.log("transaction success");
        return {
          success: true,
          message: "Pagamento salvo!",
        }
      })
      .catch(function (error) {
        console.log("transaction error", error);

        return {
          success: false,
          message: "Houve um erro.",
        }
      })
    return res
  }

  const addProcedure = (procedure) => {
    const procedureRef = addDoc(collection(db, PROCEDURES), procedure)

    const res = procedureRef
      .then(() => {
        return {
          success: true,
          message: "Procedimento adicionado!",
        }
      })
      .catch(function (error) {
        return {
          success: false,
          message: "Houve um erro.",
        }
      })
    return res
  }

  const updateProcedure = (procedure) => {
    const { id, ...procedureWithoutID } = procedure

    const procedureRef = doc(collection(db, PROCEDURES), id)

    const res = updateDoc(procedureRef, procedureWithoutID)
      .then(() => {
        return {
          success: true,
          message: "Procedimento atualizado!",
        }
      })
      .catch(function (error) {
        console.log("updateProcedure error", error)
        return {
          success: false,
          message: "Houve um erro ao atualizar.",
        }
      })

    return res
  }

  const deleteProcedure = (procedure) => {
    const procedureRef = deleteDoc(
      doc(collection(db, PROCEDURES), procedure.id)
    )
    const res = procedureRef
      .then(() => {
        return {
          success: true,
          message: `${procedure.name} excluido(a)!`,
        }
      })
      .catch(() => {
        return {
          success: true,
          message: "Houve um erro ao excluir.",
        }
      })
    return res
  }

  const fetchProfessionals = async () => {
    const querySnapshot = await getDocs(collection(db, PROFESSIONALS))
    const objects = {}

    querySnapshot.forEach((doc) => {
      Object.assign(objects, {
        [doc.id]: doc.data(),
      })
    })
    setProfessionals(objects)
  }

  const addProfessional = (professional) => {
    const procedureRef = addDoc(collection(db, PROFESSIONALS), professional)

    const res = procedureRef
      .then(() => {
        return {
          success: true,
          message: "Profissional adicionado!",
        }
      })
      .catch(function (error) {
        return {
          success: false,
          message: "Houve um erro.",
        }
      })
    return res
  }

  const updateProfessional = (professional) => {
    const { id, ...professionalWithoutID } = professional

    const professionalRef = doc(collection(db, PROFESSIONALS), id)

    const res = updateDoc(professionalRef, professionalWithoutID)
      .then(() => {
        return {
          success: true,
          message: "Profissional atualizado!",
        }
      })
      .catch(function (error) {
        console.log("updateProfessional error", error)
        return {
          success: false,
          message: "Houve um erro ao atualizar.",
        }
      })

    return res
  }

  const deleteProfessional = (professional) => {
    const professionalRef = deleteDoc(
      doc(collection(db, PROFESSIONALS), professional.id)
    )
    const res = professionalRef
      .then(() => {
        return {
          success: true,
          message: `${professional.name} excluido(a)!`,
        }
      })
      .catch(() => {
        return {
          success: true,
          message: "Houve um erro ao excluir.",
        }
      })
    return res
  }

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
        fetchUserSchedules,
      }}>
      {children}
    </DatabaseContext.Provider>
  )
}

DatabaseProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { DatabaseProvider, DatabaseContext }
