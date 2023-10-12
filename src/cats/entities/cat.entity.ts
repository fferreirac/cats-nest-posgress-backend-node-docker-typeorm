import { Breed } from "src/breeds/entities/breed.entity";
import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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
}
