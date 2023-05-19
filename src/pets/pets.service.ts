import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OwnersService } from 'src/owners/owners.service';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/create-pet-input';
import { Pet } from './pet.entity';

@Injectable()
export class PetsService {

    constructor(@InjectRepository(Pet) private petsRepository: Repository<Pet>, private ownerServices: OwnersService){}

    createPet(createPetInput: CreatePetInput): Promise<Pet> {
        //shortcut to // newPet = new pet(); new.name = createPetInput.name;
        const newPet =  this.petsRepository.create(createPetInput); 
        
        return this.petsRepository.save(newPet);
    }

    async findAll(): Promise<Pet[]> {
        return this.petsRepository.find();
    }

    findOne(id: number): Promise<Pet> {
        return this.petsRepository.findOneOrFail({ where : {"id": id} });
    }

    getOwner(ownerId: number): Promise<Owner> {
        return this.ownerServices.findOne(ownerId);
    }
}
