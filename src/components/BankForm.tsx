import { useState } from "react";
import { Form } from "./BankForm.style";
import { CheckCircleOutline, DiamondRounded } from "@mui/icons-material";
import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { createPayment } from "../modules/api/FarmBank";
import { MuiTelInput } from "mui-tel-input";

const BankForm = () => {

  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false)
  const [amount, setAmount] = useState<number>(0);
  const [amountError, setAmountError] = useState<boolean>(false)
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [phoneNumberError, setPhoneNumberError] = useState<boolean>(false)
  const [copied, setCopied] = useState<boolean>(false);
  const paymentMutation = createPayment()

  let data = paymentMutation.data
  console.log(data)
  let isLoading = paymentMutation.isLoading
  let qrcode = paymentMutation.data?.data?.pixCopyPaste
  let qrcode64 = paymentMutation.data?.data?.pixBase64

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
    let phone: string = phoneNumber.replaceAll(" ","", ).replace("+55","")
    if(phone.length != 11) {
      setPhoneNumberError(true)
      hasError = true
    }else setPhoneNumberError(false)
    if(!hasError) {
      paymentMutation.mutate({
        amount: amount,
        email: email,
        phoneNumber: phone
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

  const handlePhoneNumberChange = (value: string) => {
    if(value.replaceAll(" ","").length > 14) {
      return
    }
    setPhoneNumber(value)
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
      <MuiTelInput
        onlyCountries={["BR"]}
        defaultCountry="BR"
        sx={{ minWidth: '19rem' }}
        onChange={handlePhoneNumberChange}
        label="Zap"
        value={phoneNumber}
        error={phoneNumberError}
        helperText={phoneNumberError ? "Informe um telefone válido" : null}
      />
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