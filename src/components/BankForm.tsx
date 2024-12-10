import { useEffect, useState } from "react";
import { Form } from "./BankForm.style";
import { DiamondRounded } from "@mui/icons-material";
import { warmupApi } from "../modules/api/FarmBank";
import { MuiTelInput } from "mui-tel-input";
import Pix from "./Pix";
import CreditCard from "./CreditCard";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { initMercadoPago } from "@mercadopago/sdk-react";

export type PaymentMethod = 'pix' | 'creditCard';

const BankForm = () => {
  initMercadoPago(process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY ?? '');

  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false)
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [phoneNumberError, setPhoneNumberError] = useState<boolean>(false)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pix' as PaymentMethod);

  useEffect(() => {
    const fetchData = async () => await warmupApi();
    fetchData()
  })

  const handleRootError = (): boolean => {
    let hasError = false
    if (email.length < 6 || !email.includes("@") || !email.includes(".com")) {
      setEmailError(true)
      hasError = true
    } else setEmailError(false)
    const phone: string = phoneNumber.replaceAll(" ", "",).replace("+55", "")
    if (phone.length != 11) {
      setPhoneNumberError(true)
      hasError = true
    } else setPhoneNumberError(false)

    return hasError
  }

  const handlePhoneNumberChange = (value: string) => {
    if (value.replaceAll(" ", "").length > 14) {
      return
    }
    setPhoneNumber(value)
  }

  const handlePaymentMethod = (e: SelectChangeEvent<PaymentMethod>) => {
    setPaymentMethod(e.target.value as PaymentMethod);
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
          onChange={e => setEmail(e.target.value)}
          error={emailError}
          helperText={emailError ? "Informe um email válido" : null} />
        <FormControl fullWidth>
          <InputLabel id="payment-method-label">Forma de Pagamento</InputLabel>
          <Select
            labelId="payment-method-label"
            value={paymentMethod}
            label="Forma de Pagamento"
            onChange={handlePaymentMethod}
          >
            <MenuItem value={'pix'}>Pix</MenuItem>
            <MenuItem value={'creditCard'}>Cartão de Crédito</MenuItem>
          </Select>
        </FormControl>
        {paymentMethod === 'pix' && (
          <Pix email={email} phoneNumber={phoneNumber} handleRootError={handleRootError} />
        )}
        {paymentMethod === 'creditCard' && (
          <CreditCard email={email} phoneNumber={phoneNumber} handleRootError={handleRootError} />
        )}
      </Form>
  );
};

export default BankForm