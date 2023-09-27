import { useState } from "react";
import { Form } from "./BankForm.style";
import { CheckCircleOutline, DiamondRounded } from "@mui/icons-material";
import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { createPayment } from "../modules/api/MercadoPago";

const BankForm = () => {

  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false)
  const [amount, setAmount] = useState<number>(0);
  const [amountError, setAmountError] = useState<boolean>(false)
  const [copied, setCopied] = useState<boolean>(false);
  const paymentMutation = createPayment()

  let data = paymentMutation.data
  let isLoading = paymentMutation.isLoading
  let qrcode = paymentMutation.data?.data.point_of_interaction.transaction_data.qr_code
  let qrcode64 = paymentMutation.data?.data.point_of_interaction.transaction_data.qr_code_base64

  const handleSubmit = () => {
    let hasError = false
    if(email.length < 6 || !email.includes("@") || !email.includes(".com")) {
      setEmailError(true)
      hasError = true
    } else setEmailError(false)
    if(amount < 10) {
      setAmountError(true)
      hasError = true
    } else setAmountError(false)

    if(!hasError) {
      paymentMutation.mutate({
        amount: amount,
        email: email,
      })
      setCopied(false)
    }
  }

  const handleCopyButton = () => {
    if (!copied) {
      setCopied(true)
      navigator.clipboard.writeText(qrcode)
    }
  }

  let qrcodeBox;
  if (isLoading && !data) {
    qrcodeBox = <CircularProgress color="secondary" />
  }
  else if (data) {
    qrcodeBox = (
      <>
        <Box
          component="img"
          sx={{
            width: 250,
            height: 250
          }}
          src={`data:image/png;base64, ${qrcode64}`}
        />
        <Button color="secondary" endIcon={copied ? <CheckCircleOutline /> : null} onClick={handleCopyButton}>
          {copied ? 'Copiado' : 'Copiar'}
        </Button>
      </>
    )
  }
  else {
    qrcodeBox = null
  }

  return (
    <Form boxShadow={3}>
      <DiamondRounded color="secondary" sx={{ fontSize: 60 }} />
      <Typography variant="h3" color={'#505050'}>
        farmbank
      </Typography>
      {/* <TextField id="outlined-basic" label="Telefone" variant="outlined" size="small" sx={{ minWidth: '19rem' }} type="tel" /> */}
      <TextField 
        label="Email" 
        variant="outlined" 
        size="small" 
        sx={{ minWidth: '19rem' }} 
        type="email" 
        onChange={e=>setEmail(e.target.value)}
        error={emailError}
        helperText={emailError ? "Informe um email válido" : null}/>
      <TextField 
        label="R$" 
        variant="outlined" 
        size="small" 
        sx={{ minWidth: '19rem' }} 
        type="number"
        onChange={e=>setAmount(parseFloat(e.target.value))}
        error={amountError}
        helperText={amountError ? "Digite um valor acima de R$ 10" : null}/>
      <Button variant="contained" color="secondary" onClick={handleSubmit}>Gerar QR Code</Button>
      {qrcodeBox}
    </Form>
  );
};

export default BankForm