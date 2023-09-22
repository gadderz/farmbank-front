import { useState } from "react";
import { Form } from "./BankForm.style";
import { CheckCircleOutline, DiamondRounded } from "@mui/icons-material";
import { Box, Button, TextField, Typography } from "@mui/material";

const BankForm = () => {

  const [copied, setCopied] = useState<boolean>(false);

  const qrcode = "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";
  const copiaCola = "Copiou e colou";

  const handleCopyButton = () => {
    if (!copied) {
      setCopied(true)
      navigator.clipboard.writeText(copiaCola)
    }
  }

  return (
    <Form boxShadow={3}>
      <DiamondRounded color="secondary" sx={{ fontSize: 60 }} />
      <Typography variant="h3" color={'#505050'}>
        farmbank
      </Typography>
      <TextField id="outlined-basic" label="Telefone" variant="outlined" size="small" sx={{ minWidth: '19rem' }} type="tel" />
      <TextField id="outlined-basic" label="Email" variant="outlined" size="small" sx={{ minWidth: '19rem' }} type="email" />
      <TextField id="outlined-basic" label="R$" variant="outlined" size="small" sx={{ minWidth: '19rem' }} />
      <Button variant="contained" color="secondary">Gerar QR Code</Button>
      <Box
        component="img"
        sx={{
          width: 250,
          height: 250
        }}
        src={`data:image/png;base64, ${qrcode}`}
      />
      <Button color="secondary" endIcon={copied ? <CheckCircleOutline /> : null} onClick={() => handleCopyButton()}>
        {copied ? 'Copiado' : 'Copiar'}
      </Button>
    </Form>
  );
};

export default BankForm