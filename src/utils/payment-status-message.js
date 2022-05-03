const getPaymentStatusMessage = (status) => {
    let paymentStatus = ""

    switch (status) {
      case "approved": {
        paymentStatus = "Pagamento aprovado!"
        break
      }
      case "in_process": {
        paymentStatus = "Pagamento pendente"
        break
      }
      case "rejected": {
        paymentStatus = "Não pudemos processar seu pagamento"
        break
      }
      default:
        paymentStatus = "Falha ao processar o pagamento"
    }
    return paymentStatus
  }

  export default getPaymentStatusMessage