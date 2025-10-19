import { Test, TestingModule } from '@nestjs/testing';
import { PointService } from './point.service';
import { BadRequestException } from '@nestjs/common';

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
      providers: [PointService],
    }).compile();

    pointService = module.get<PointService>(PointService);
    pointService.insertOrUpdate(id: 777, amount: 777)
  });

  it('should be defined', () => {
    expect(pointService).toBeDefined();
  });

  describe('givenUserId_whenSelectById_thenReturnUserPoint', () => {
    // userId가 int가 아니면 에러 발생
    it('userId not int should throw error', async () => {
      const selectById = pointService.selectById('nyx');
      await expect(selectById).rejects.toBeInstanceOf(BadRequestException);
    });

    // 특정 UserId에 대한 정확한 UserPoint 반환
    it('Exact UserPoint about specific UserId', async () => {
      const selectById = pointService.selectById(777);
      await expect(selectById).resolves.toBe({
        id: 777,
        point: 777,
        updateMillis: expect.anything(),
      });
    });
  });
});
