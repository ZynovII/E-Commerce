import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ManufacturerEntity } from './manufacturer.entity';
import { ManufacturerService } from './manufacturer.service';

@Controller('manufacturer')
export class ManufacturerController {
  constructor(private manufacturerService: ManufacturerService) {}

  @Get()
  getAllManufacturer(): Promise<ManufacturerEntity[]> {
    return this.manufacturerService.getAllManufacturer();
  }

  @Get('/:name')
  getManufacturerByName(
    @Param('name') name: string,
  ): Promise<ManufacturerEntity> {
    return this.manufacturerService.getManufacturerByName(name);
  }

  @Post()
  createManufacturer(@Body() name: string): Promise<ManufacturerEntity> {
    return this.manufacturerService.createManufacturer(name);
  }

  @Delete('/:name')
  deleteManufacturer(@Param('name') name: string): Promise<string> {
    return this.manufacturerService.deleteManufacturer(name);
  }
}
