import { Test, TestingModule } from '@nestjs/testing';
import { PointService } from './point.service';
import { BadRequestException } from '@nestjs/common';
import { UserPointTable } from 'src/database/userpoint.table';

/*

TDD 순환 구조

1. **Red** (테스트 먼저 작성, 실패 상태 확인)
2. **Green** (최소한의 코드로 테스트 통과)
3. **Refactor** (리팩토링을 통한 코드 개선)

*/

describe('PointService', () => {
  let pointService: PointService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PointService, UserPointTable],
    }).compile();

    pointService = module.get<PointService>(PointService);
    await pointService.insertOrUpdate(777, 777);
  });

  it('should be defined', () => {
    expect(pointService).toBeDefined();
  });

  describe('givenUserId_whenSelectById_thenReturnUserPoint', () => {
    // userId가 int가 아니면 에러 발생
    it('userId not int should throw error', async () => {
      // @ts-ignore
      const selectById = pointService.selectById('nyx');

      await expect(selectById).rejects.toBeInstanceOf(Error);
    });

    // 특정 UserId에 대한 정확한 UserPoint 반환
    it('Exact UserPoint about specific UserId', async () => {
      const selectById = pointService.selectById(777);
      await expect(selectById).resolves.toStrictEqual({
        id: 777,
        point: 777,
        updateMillis: expect.anything(),
      });
    });
  });

  describe('givenUserId_whenInsertOrUpdate_thenReturnUserPoint', () => {
    // userId가 int가 아니면 에러 발생
    it('userId not int should throw error', async () => {
      // @ts-ignore
      const insertOrUpdate = pointService.insertOrUpdate('nyx', 77);

      await expect(insertOrUpdate).rejects.toBeInstanceOf(Error);
    });

    // amount가 int가 아니면 에러 발생
    it('amount not int should throw error', async () => {
      // @ts-ignore
      const insertOrUpdate = pointService.insertOrUpdate(77, 'nyx');

      await expect(insertOrUpdate).rejects.toBeInstanceOf(Error);
    });

    // 특정 UserId, Amount에 대한 정확한 UserPoint 반환
    it('Exact UserPoint about specific UserId', async () => {
      const insertOrUpdate = pointService.insertOrUpdate(123, 777);
      await expect(insertOrUpdate).resolves.toStrictEqual({
        id: 123,
        point: 777,
        updateMillis: expect.anything(),
      });
    });
  });
});
