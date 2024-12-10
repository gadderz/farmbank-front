import { useState } from "react";
import { CheckCircleOutline } from "@mui/icons-material";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { CreatePayment } from "../modules/api/FarmBank";

interface PixProps {
  email: string;
  phoneNumber: string;
  handleRootError: () => boolean;
}

const Pix = ({email, phoneNumber, handleRootError}: PixProps) => {

  const [amount, setAmount] = useState<number>(0);
  const [amountError, setAmountError] = useState<boolean>(false)
  const [copied, setCopied] = useState<boolean>(false);
  const paymentMutation = CreatePayment()

  const data = paymentMutation.data
  const isLoading = paymentMutation.isLoading
  const qrcode = paymentMutation.data?.data?.pixCopyPaste
  const qrcode64 = paymentMutation.data?.data?.pixBase64

  const handleSubmit = () => {
    let hasError = handleRootError()
    if (amount < 10) {
      setAmountError(true)
      hasError = true
    } else setAmountError(false)
    if (!hasError) {
      const phone: string = phoneNumber.replaceAll(" ", "",).replace("+55", "")
      paymentMutation.mutate({
        amount: amount,
        email: email,
        phoneNumber: phone,
        paymentMethod: "pix",
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
    <>
      <TextField
        label="R$"
        variant="outlined"
        size="small"
        sx={{ minWidth: '19rem' }}
        type="number"
        onChange={e => setAmount(parseFloat(e.target.value))}
        error={amountError}
        helperText={amountError ? "Digite um valor acima de R$ 10" : null} />
      <Button variant="contained" color="secondary" onClick={handleSubmit}>Gerar QR Code</Button>
      {qrcodeBox}
    </>
  );
};

export default Pix