import { EntityRepository, Repository } from 'typeorm';
import { ManufacturerEntity } from './manufacturer.entity';

@EntityRepository(ManufacturerEntity)
export class ManufacturerRepository extends Repository<ManufacturerEntity> {
  async createManufacturer(name: string): Promise<ManufacturerEntity> {
    const manufacturer = this.create({ name });
    await this.save(manufacturer);
    return manufacturer;
  }
}
