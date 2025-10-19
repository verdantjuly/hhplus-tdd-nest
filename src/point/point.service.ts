import { BadRequestException, Injectable } from '@nestjs/common';

import { UserPointTable } from 'src/database/userpoint.table';

@Injectable()
export class PointService {
  constructor(private readonly userDb: UserPointTable) {}
  async selectById(id: number) {
    return await this.userDb.selectById(id);
  }

  async insertOrUpdate(id: number, amount: number) {
    return await this.userDb.insertOrUpdate(id, amount);
  }
}
