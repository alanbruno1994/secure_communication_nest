import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { SecureMasterService } from '../security_master/secure.master.service';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(private readonly secureService: SecureMasterService) {}
  async create() {
    const instance = axios.create({
      baseURL: process.env.URL_CHILDREN,
    });
    instance.defaults.headers.common['access-token'] =
      'Bearer ' + (await this.secureService.generateTokenMaster());
    const resp = await instance.post('/todo');
    return resp.data;
  }

  findAll() {
    return `This action returns all todo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
