import { useState } from "react";
import { Form } from "./BankForm.style";
import { CheckCircleOutline, DiamondRounded } from "@mui/icons-material";
import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { createPayment } from "../modules/api/MercadoPago";

const BankForm = () => {

  const [copied, setCopied] = useState<boolean>(false);
  const paymentMutation = createPayment()

  let data = paymentMutation.data
  let isLoading = paymentMutation.isLoading
  let qrcode = paymentMutation.data?.data.point_of_interaction.transaction_data.qr_code
  let qrcode64 = paymentMutation.data?.data.point_of_interaction.transaction_data.qr_code_base64

  const handleGenerateQRCode = async () => {
    await paymentMutation.mutateAsync({
      amount: 10,
      email: 'vinicius.gadelha@outlook.com.br',
    })
  }

  const handleCopyButton = () => {
    if (!copied) {
      setCopied(true)
      navigator.clipboard.writeText(qrcode)
    }
  }

  console.log(data)

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
      <TextField id="outlined-basic" label="Email" variant="outlined" size="small" sx={{ minWidth: '19rem' }} type="email" />
      <TextField id="outlined-basic" label="R$" variant="outlined" size="small" sx={{ minWidth: '19rem' }} />
      <Button variant="contained" color="secondary" onClick={handleGenerateQRCode}>Gerar QR Code</Button>
      {qrcodeBox}
    </Form>
  );
};

export default BankForm