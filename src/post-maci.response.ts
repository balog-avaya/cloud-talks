import { PostMaciDto } from "./post-maci.dto";

export class PostMaciResponse {

    laci: string;

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