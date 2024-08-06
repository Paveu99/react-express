import { InvestmentEntity } from "./investment.entity";

export type InvestmentEntityDto = Omit<InvestmentEntity, 'id'>