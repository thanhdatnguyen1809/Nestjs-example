import { Controller, Get, Query } from "@nestjs/common";
import { QueryPagination } from "src/queryPagination.dto";
import { UserService } from "./users.service";


@Controller('users')
export class UsersController {
    constructor(private userService: UserService) {}

    @Get()
    // @UsePipes(new ValidationPipe({whitelist: true}))
    find(@Query() query: QueryPagination) {
        console.log(query);
        return this.userService.findAll();
    }

    @Get('/create')
    create() {
        return this.userService.create({firstName: 'Quy Nhu', lastName: 'Quy', isActive: true });
    }
}