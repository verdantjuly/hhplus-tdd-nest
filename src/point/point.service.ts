import { BadRequestException, Injectable } from '@nestjs/common';
import { PointHistoryTable } from 'src/database/pointhistory.table';
import { UserPointTable } from 'src/database/userpoint.table';
import { TransactionType } from './point.model';

@Injectable()
export class PointService {
  constructor(
    private readonly userDb: UserPointTable,
    private readonly historyDb: PointHistoryTable,
  ) {}
  async selectById(id: number) {
    return await this.userDb.selectById(id);
  }

  async insertOrUpdate(
    id: number,
    amount: number,
    transactionType: TransactionType,
  ) {
    const origin = await this.userDb.selectById(id);
    if (transactionType === TransactionType.USE) {
      amount = -amount;
    }
    const result = await this.userDb.insertOrUpdate(id, origin.point + amount);
    await this.historyDb.insert(
      id,
      amount,
      transactionType,
      result.updateMillis,
    );
    return await this.selectById(id);
  }
}
