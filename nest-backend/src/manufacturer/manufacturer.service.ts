import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DELETE_SUCCESS } from 'src/constants/text.constant';
import { ManufacturerEntity } from './manufacturer.entity';
import { ManufacturerRepository } from './manufacturer.repository';

@Injectable()
export class ManufacturerService {
  constructor(
    @InjectRepository(ManufacturerRepository)
    private manufacturerRepository: ManufacturerRepository,
  ) {}

  async getAllManufacturer(): Promise<ManufacturerEntity[]> {
    return await this.manufacturerRepository.find();
  }

  async getManufacturerByName(name: string): Promise<ManufacturerEntity> {
    const found = await this.manufacturerRepository.findOne({ name });

    if (!found) {
      throw new NotFoundException(`Manufacturer ${name} not found`);
    }
    return found;
  }

  async createManufacturer(name: string): Promise<ManufacturerEntity> {
    return this.manufacturerRepository.createManufacturer(name);
  }

  async deleteManufacturer(name: string): Promise<string> {
    const result = await this.manufacturerRepository.delete(name);
    if (result.affected === 0) {
      throw new NotFoundException(`Manufacturer ${name} not found`);
    }
    return DELETE_SUCCESS;
  }
}
