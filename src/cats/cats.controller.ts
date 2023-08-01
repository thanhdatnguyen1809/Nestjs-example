import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  HttpException,
  HttpStatus,
  UseFilters,
  ForbiddenException,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  DefaultValuePipe,
  UseGuards,
  SetMetadata,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { Query } from '@nestjs/common';
// import { JoiValidationPipe } from 'src/joivalidation.pipe';
import * as Joi from 'joi';
import { JoiValidationPipe } from 'src/joivalidation.pipe';
import { RolesGuard } from 'src/roles.guard';
import { Roles } from 'src/roles.decorater';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { CacheInterceptor } from 'src/interceptors/cache.interceptor';
import { TimeoutInterceptor } from 'src/interceptors/timeout.interceptor';
import { throwError } from 'rxjs';
import { User } from 'src/user.decorator';
import { UserEntity } from 'src/cats/dto/user.dto';
import { Auth } from 'src/auth.decorator';



@Controller('cats')
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor)
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  @Roles('admin')
  @UseInterceptors(/*CacheInterceptor , */TransformInterceptor)
  findAll() {
    throw new ForbiddenException()
    return this.catsService.findAll();
    // return throwError(() => new BadRequestException());
  }

  @Get(':id')
  @UsePipes(ParseIntPipe)
  findOne(@Param('id') id: number) {
    return this.catsService.findOne(id);
  }

  @Roles('admin')
  // @Auth('admin')
  @Post()
  // @UseFilters(new HttpExceptionFilter())
  // @UsePipes(new JoiValidationPipe(createCatSchema))
  create(@Body() createCatDto: CreateCatDto, @User(new ValidationPipe( { validateCustomDecorators: true } )) user: UserEntity) {
    console.log(user.username);
    // throw new ForbiddenException();
    this.catsService.create(createCatDto);
    return 'Added successfully';
  }

}
