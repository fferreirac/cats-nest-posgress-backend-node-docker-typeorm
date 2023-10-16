import { Breed } from "../../breeds/entities/breed.entity";
import { User } from "../../users/entities/user.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cat {

    @Column({primary:true, generated:true})
    //@PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;
    
    @Column()
    age: number;
    
    // @Column()
    // breed: string;

    @DeleteDateColumn()
    deletedAt: Date;

    // hacemos la relacion con Breeds *. to 1
    @ManyToOne(()=> Breed, (breed) => breed.id, {
        eager: true, // para que traiga las razas al hacer un findOne 
    })
    breed: Breed;

    // Relacionamos la entidad Cat con su creador (email), es una relacion automatica
    // con esto no tenemos que instanciar ususrios, sino que le pasmos el email del user creador
    @ManyToOne(()=> User)
    @JoinColumn({name: 'userEmail',referencedColumnName: 'email'})
    user: User;
    // columna nueva que tendra email del usuario creador de gatos
    @Column()
    userEmail: string;

}
