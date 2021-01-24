import React, { useEffect, useState } from 'react'
import './style.css'
const MercadoLivreCardForm = () => {

  const [doSubmit, setDoSubmit] = useState(false)

  useEffect(() => {
    window.Mercadopago.setPublishableKey("TEST-72a91e7b-462c-4ed6-be2c-5485b30eeb3b");

    window.Mercadopago.getIdentificationTypes();

    document.getElementById('description').value = "Fonte 500w 80 plus"

  }, [])

  const handleCardChange = (e) => {
    let cardNumber = e.target.value
    console.log(cardNumber);
    guessPaymentMethod(cardNumber)
  }

  function guessPaymentMethod (cardNumber) {
    cleanCardInfo();

    if (cardNumber.length >= 6) {
      let bin = cardNumber.substring(0, 6);
      window.Mercadopago.getPaymentMethod({
        "bin": bin
      }, setPaymentMethod);
    }
  };

  function setPaymentMethod (status, response) {
    if (status == 200) {
      let paymentMethod = response[0];

      document.getElementById('paymentMethodId').value = paymentMethod.id;
      document.getElementById('cardNumber').style.backgroundImage = 'url(' + paymentMethod.thumbnail + ')';

      if (paymentMethod.additional_info_needed.includes("issuer_id")) {
        getIssuers(paymentMethod.id);

      } else {
        document.getElementById('issuerInput').classList.add("hidden");

        getInstallments(
          paymentMethod.id,
          document.getElementById('amount').value
        );
      }

    } else {
      alert(`payment method info error: ${response}`);
    }
  }

  function getIssuers (paymentMethodId) {
    window.Mercadopago.getIssuers(
      paymentMethodId,
      setIssuers
    );
  }

  function setIssuers (status, response) {
    if (status == 200) {
      let issuerSelect = document.getElementById('issuer');

      response.forEach(issuer => {
        let opt = document.createElement('option');
        opt.text = issuer.name;
        opt.value = issuer.id;
        issuerSelect.appendChild(opt);
      });

      if (issuerSelect.options.length <= 1) {
        document.getElementById('issuerInput').classList.add("hidden");
      } else {
        document.getElementById('issuerInput').classList.remove("hidden");
      }

      getInstallments(
        document.getElementById('paymentMethodId').value,
        document.getElementById('amount').value,
        issuerSelect.value
      );

    } else {
      alert(`issuers method info error: ${response}`);
    }
  }
  // updateInstallmentsForIssuer
  const handleIssuerChange = (e) => {
    window.Mercadopago.getInstallments({
      "payment_method_id": document.getElementById('paymentMethodId').value,
      "amount": parseFloat(document.getElementById('amount').value),
      "issuer_id": parseInt(document.getElementById('issuer').value)
    }, setInstallments);
  }

  function getInstallments (paymentMethodId, amount, issuerId) {
    window.Mercadopago.getInstallments({
      "payment_method_id": paymentMethodId,
      "amount": parseFloat(amount),
      "issuer_id": issuerId ? parseInt(issuerId) : undefined
    }, setInstallments);
  }

  function setInstallments (status, response) {
    if (status == 200) {
      document.getElementById('installments').options.length = 0;
      response[0].payer_costs.forEach(payerCost => {
        let opt = document.createElement('option');
        opt.text = payerCost.recommended_message;
        opt.value = payerCost.installments;
        document.getElementById('installments').appendChild(opt);
      });
    } else {
      alert(`installments method info error: ${response}`);
    }
  }



  const handleSubmit = (e) => {
    getCardToken(e)
  }

  function getCardToken (event) {
    event.preventDefault();
    
    if (!doSubmit) {
      let $form = document.getElementById('paymentForm');
    console.log("evento", event);
      console.log("form normal ", $form);
      // window.Mercadopago.createToken($form, setCardTokenAndPay);

      return false;
    }
  };

  function setCardTokenAndPay (status, response) {
    if (status == 200 || status == 201) {
      let form = document.getElementById('paymentForm');
      let card = document.createElement('input');
      card.setAttribute('name', 'token');
      card.setAttribute('type', 'hidden');
      card.setAttribute('value', response.id);
      form.appendChild(card);
      setDoSubmit(true)
      form.submit(); //Submit form data to your backend
    } else {
      alert("Verify filled data!\n" + JSON.stringify(response, null, 4));
    }
  };

  /***
   * UX functions 
   */

  function cleanCardInfo () {
    document.getElementById('cardNumber').style.backgroundImage = '';
    document.getElementById('issuerInput').classList.add("hidden");
    document.getElementById('issuer').options.length = 0;
    document.getElementById('installments').options.length = 0;
  }
  //Handle price update
  function updatePrice () {

  };
  // document.getElementById('quantity').addEventListener('change', updatePrice);
  // updatePrice();

  //Retrieve product description
  // document.getElementById('description').value = document.getElementById('product-description').innerHTML;

  return (
    <>
      <main>
        <section class="payment-form dark">
          <div class="">
            <div class="block-heading">
              <h2>Card Payment</h2>
              <p>This is an example of a Mercado Pago integration</p>
            </div>
            <div class="form-payment">
              <div class="products">
                <h2 class="title">Summary</h2>
                <div class="item">
                  <span class="price" id="summary-price"></span>
                  <p class="item-name">Book x <span id="summary-quantity"></span></p>
                </div>
                <div class="total">Total<span class="price" id="summary-total"></span></div>
              </div>
              <div class="payment-details">
                <form action="http://localhost:8080/process_payment" onSubmit={handleSubmit} method="post" id="paymentForm">
                  <h3 class="title">Buyer Details</h3>
                  <div class="row">
                    <div class="form-group col">
                      <label for="email">E-Mail</label>
                      <input id="email" name="email" type="text" class="form-control" />
                    </div>
                  </div>
                  <div class="row">
                    <div hidden class="form-group col-sm-5">
                      <label for="docType">Document Type</label>
                      <select id="docType" name="docType" data-checkout="docType" type="text" class="form-control" value="CPF"></select>
                    </div>
                    <div class="form-group col-sm-7">
                      <label for="docNumber">Document Number</label>
                      <input id="docNumber" name="docNumber" data-checkout="docNumber" type="text" class="form-control" />
                    </div>
                  </div>
                  <br />
                  <h3 class="title">Card Details</h3>
                  <div class="row">
                    <div class="form-group col-sm-8">
                      <label for="cardholderName">Card Holder</label>
                      <input id="cardholderName" data-checkout="cardholderName" type="text" class="form-control" />
                    </div>
                    <div class="form-group col-sm-4">
                      <label for="">Expiration Date</label>
                      <div class="input-group expiration-date">
                        <input type="text" class="form-control" placeholder="MM" id="cardExpirationMonth" data-checkout="cardExpirationMonth"
                          onselectstart="return false" onpaste="return false" onCopy="return false" onCut="return false" onDrag="return false" onDrop="return false" autocomplete="off" />
                        <span class="date-separator">/</span>
                        <input type="text" class="form-control" placeholder="YY" id="cardExpirationYear" data-checkout="cardExpirationYear"
                          onselectstart="return false" onpaste="return false" onCopy="return false" onCut="return false" onDrag="return false" onDrop="return false" autocomplete="off" />
                      </div>
                    </div>
                    <div class="form-group col-sm-8">
                      <label for="cardNumber">Card Number</label>
                      <input type="text" class="form-control input-background" id="cardNumber" data-checkout="cardNumber"
                        onChange={handleCardChange} onselectstart="return false" onpaste="return false" onCopy="return false" onCut="return false" onDrag="return false" onDrop="return false" autocomplete="off" />
                    </div>
                    <div class="form-group col-sm-4">
                      <label for="securityCode">CVV</label>
                      <input id="securityCode" data-checkout="securityCode" type="text" class="form-control"
                        onselectstart="return false" onpaste="return false" onCopy="return false" onCut="return false" onDrag="return false" onDrop="return false" autocomplete="off" />
                    </div>
                    <div id="issuerInput" class="form-group col-sm-12 hidden">
                      <label for="issuer">Issuer</label>
                      <select onChange={handleIssuerChange} id="issuer" name="issuer" data-checkout="issuer" class="form-control"></select>
                    </div>
                    <div class="form-group col-sm-12">
                      <label for="installments">Installments</label>
                      <select type="text" id="installments" name="installments" class="form-control"></select>
                    </div>
                    <div class="form-group col-sm-12">
                      <input type="hidden" name="transactionAmount" id="amount" value="10" />
                      <input type="hidden" name="paymentMethodId" id="paymentMethodId" />
                      <input type="hidden" name="description" id="description" />
                      <br />
                      <button type="submit" class="btn btn-primary btn-block">Pay</button>
                      <br />
                      <a id="go-back">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 10 10" class="chevron-left">
                          <path fill="#009EE3" fill-rule="nonzero" id="chevron_left" d="M7.05 1.4L6.2.552 1.756 4.997l4.449 4.448.849-.848-3.6-3.6z"></path>
                        </svg>
                  Go back to Shopping Cart
                </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

    </>
  )
}

export default MercadoLivreCardForm