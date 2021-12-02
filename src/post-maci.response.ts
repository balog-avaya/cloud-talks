import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { PostMaciDto } from "./post-maci.dto";

@Exclude()
export class PostMaciResponse {

    @Expose()
    @ApiProperty({description: 'Laci valasz'})
    laci: string;

    @Expose()
    @ApiProperty({description: 'Buci valasz'})
    buci: number;

    setLaciName(newName: string) {
        this.laci = newName;
    }

    incBuci() {
        this.buci++;
    }

    constructor(init: Partial<PostMaciResponse>) {
        Object.assign(this, init);
    }


    static fromPostMaciDto(dto: PostMaciDto): PostMaciResponse {
        return new PostMaciResponse(
        {
            buci: dto.buci,
            laci: dto.laci
        });
    }

}