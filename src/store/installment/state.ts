import { Installment } from 'src/interface/installment'
export interface InstallmentStateInterface {
  installment: Installment
  installments: Array<Installment>
}

function state (): InstallmentStateInterface {
  return {
    installment: {} as Installment,
    installments: [] as Array<Installment>
  }
}

export default state
