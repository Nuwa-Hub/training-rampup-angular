import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Student {
   @PrimaryGeneratedColumn()
  PersonID: number;

  @Column()
  PersonName!: string;

  @Column()
  PersonGender!: string;

  @Column()
  PersonAddress!: string;

  @Column()
  PersonMobileNo!: string;

  @Column()
  DateOfBirth!: Date;
}
