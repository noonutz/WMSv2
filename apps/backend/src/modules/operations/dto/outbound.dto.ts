import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Min } from 'class-validator';

export class OutboundDto {
  @ApiProperty({ example: 'KANBAN-050' })
  @IsString()
  localKanbanId!: string;

  @ApiProperty({ example: 'A-01-02' })
  @IsString()
  storeAddress!: string;

  @ApiProperty({ example: 'P002-BEARING' })
  @IsString()
  customerPartNo!: string;

  @ApiProperty({ example: 15 })
  @IsInt()
  @Min(1)
  quantity!: number;
}
