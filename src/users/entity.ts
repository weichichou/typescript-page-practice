import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, Length, IsEmail, MinLength } from 'class-validator'
import { Exclude } from 'class-transformer'
import * as bcrypt from 'bcrypt'

@Entity()
export default class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Length(2)
  @Column('text', {nullable:false})
  firstName: string
  
  @IsString()
  @Length(2)
  @Column('text', {nullable:false})
  lastName: string

  @IsEmail()
  @Column('text', {nullable:false})
  email: string

  @IsString()
  @Length(3)
  @Column('text')
  city: string

  @IsString()
  @MinLength(8)
  @Column('text', { nullable:true })
  @Exclude({toPlainOnly:true})
  password: string

  async setPassword(rawPassword: string) {
    const hash = await bcrypt.hash(rawPassword, 10)
    this.password = hash
  }

  checkPassword(rawPassword: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, this.password)
  }

}