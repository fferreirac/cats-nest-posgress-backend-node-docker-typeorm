import { Role } from "../../common/enums/role.enum";
import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {

    //@Column({ primary: true, generated: true})
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({unique:true, nullable: false})
    email: string;

    @Column({nullable: false, select:false })
    password: string;

    @Column({default: 'user', enum: Role}) // cambiamos enum a comun para usarlo en todos lasdos, ejemplo aqui
    role: string;

    @DeleteDateColumn()
    deletedAt: Date;
}


