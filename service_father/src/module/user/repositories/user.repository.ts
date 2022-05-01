import { Injectable } from '@nestjs/common';
import { User } from 'src/shared/database/postgres/entities/user';
import { EntityRepository, Repository } from 'typeorm';

@Injectable()
@EntityRepository(User)
class UserRepository extends Repository<User> {}

export { UserRepository };
