import { BadRequestException, Injectable } from '@nestjs/common';

import { UserPointTable } from 'src/database/userpoint.table';

@Injectable()
export class PointService {
  constructor(private readonly userDb: UserPointTable) {}
  async selectById(id: number) {
    return await this.userDb.selectById(id);
  }

  async insertOrUpdate(id: number, amount: number) {
    if (!Number.isInteger(amount)) {
      throw new Error('Amount is not valid int');
    }
    return await this.userDb.insertOrUpdate(id, amount);
  }
}
