import { UserEntity } from "./user.entity";

export type UserDto = Omit<UserEntity, 'id'>