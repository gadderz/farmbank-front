import './styles/App.css'
import { BankContainer } from "./components/BankForm.style";
import BankForm from "./components/BankForm";

const App = () => {

  return (
    <BankContainer>
      <BankForm />
    </BankContainer>
  )
}

export default App
