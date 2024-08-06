import { UserEntity } from "./user.entity";

export type UserReturned = Omit<UserEntity, 'password'>