import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Usuarios {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  nome: string;

  @Column("integer")
  idade: number;
}
