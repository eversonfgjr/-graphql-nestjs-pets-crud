import { Resolver, Query, Mutation, Args, Int, Parent, ResolveField } from '@nestjs/graphql';
import { Owner } from 'src/owners/entities/owner.entity';
import { CreatePetInput } from './dto/create-pet-input';
import { Pet } from './pet.entity';
import { PetsService } from './pets.service';

@Resolver(of => Pet)
export class PetsResolver {
    constructor(private petService: PetsService){}

    @Query(returns => Pet)
    getPet(@Args('id', {type: () => Int}) id: number): Promise<Pet> {
        return this.petService.findOne(id);
    }

    @Query(returns => [Pet])
    pets(): Promise<Pet[]> {
        return this.petService.findAll();
    }

    // Explanation about @Parent:
   //https://youtu.be/geYvdbpo3cA?t=2943
    @ResolveField(returns => Owner)
    owner(@Parent() pet:Pet): Promise<Owner>{
        return this.petService.getOwner(pet.ownerId);
    }

    @Mutation(returns => Pet)
    createPet(@Args('createPetInput') createPetInput: CreatePetInput): Promise<Pet> {
        return this.petService.createPet(createPetInput);
    } 
}
