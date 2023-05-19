import { Field, InputType } from "@nestjs/graphql";
import { IsAlpha, Max } from "class-validator";

@InputType()
export class CreatePetInput {
    
    @IsAlpha()
    @Field()
    name: string;

    @Field({nullable: true})
    type?: string;
}