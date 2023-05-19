import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Owner } from "src/owners/entities/owner.entity";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Pet {
    
    @PrimaryGeneratedColumn()
    @Field(type => Int)
    id: number;
    
    @Column()
    @Field()
    name: string;
    
    @Column({nullable: true})
    @Field({nullable: true})
    type?: string;

    @ManyToOne(() => Owner, owner => owner.pets)
    @Field({nullable: true})
    owner: Owner;
}