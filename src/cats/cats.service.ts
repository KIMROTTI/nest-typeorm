import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { create } from 'domain';
import { getConnection, Repository } from 'typeorm';
import { CreateCatDto } from './dto/create-cat-dto';
import { Cat } from './entity/cats.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>,
  ) {}
  findAll(): Promise<Cat[]> {
    return this.catsRepository.find();
  }

  findOne(id: number): Promise<Cat> {
    return this.catsRepository.findOne({ where: { id } });
  }

  async create(cat: CreateCatDto): Promise<Cat> {
    // console.log(1);
    console.log(cat);
    const result = await this.catsRepository.save(cat);
    return result;
  }

  async remove(id: number): Promise<void> {
    await this.catsRepository.delete(id);
  }

  async update(id: number, cat: Cat): Promise<void> {
    console.log(id);
    console.log(cat);
    await this.catsRepository.update(
      { id },
      {
        name: cat.name,
        age: cat.age,
        breed: cat.breed,
      },
    );

    // async update(id: number, cat: Cat): Promise<void> {
    //   const existedCat = await this.findOne(id);
    //   if (existedCat) {
    //     await getConnection()
    //       .createQueryBuilder()
    //       .update(Cat)
    //       .set({
    //         name: cat.name,
    //         age: cat.age,
    //         breed: cat.breed,
    //       })
    //       .where('id = :id', { id })
    //       .execute();
    //   }
    // }
  }
}
