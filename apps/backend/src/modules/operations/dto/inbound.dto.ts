import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Min } from 'class-validator';

export class InboundDto {
  @ApiProperty({ example: 'KANBAN-001' })
  @IsString()
  localKanbanId!: string;

  @ApiProperty({ example: 'A-01-01' })
  @IsString()
  storeAddress!: string;

  @ApiProperty({ example: 'P001-MOTOR' })
  @IsString()
  customerPartNo!: string;

  @ApiProperty({ example: 20 })
  @IsInt()
  @Min(1)
  quantity!: number;
}
