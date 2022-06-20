import {Controller, Get, Post} from '@nestjs/common';
import {BoilerplateService} from "./boilerplate.service";
import {Boilerplate} from "../schemas/boilerplate.schema";
import {CreateBoilerplateDto} from "../dto/create-boilerplate.dto";

@Controller('boilerplate')
export class BoilerplateController {
    constructor(private readonly boilerplateService: BoilerplateService) {}

    //@UseGuards(JwtGuard)
    @Get()
    getAll(): Promise<Boilerplate[]> {
        return this.boilerplateService.findAll();
    }

    @Post()
    postName(): Promise<Boilerplate> {
        let bp:  Boilerplate = new CreateBoilerplateDto()
        bp.name = 'test'
        return this.boilerplateService.create(bp)
    }

}
