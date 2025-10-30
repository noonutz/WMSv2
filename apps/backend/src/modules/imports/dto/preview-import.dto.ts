import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ImportRowDto {
  @ApiProperty({ example: 'P999-EXAMPLE' })
  partNumber!: string;

  @ApiProperty({ example: 'Sample Part Description' })
  description!: string;

  @ApiProperty({ example: 'Electrical' })
  category!: string;

  @ApiProperty({ example: 100 })
  minStock!: number;

  @ApiProperty({ example: 300 })
  maxStock!: number;

  @ApiProperty({ example: 120 })
  currentStock!: number;
}

export class PreviewImportDto {
  @ApiProperty({ type: [ImportRowDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImportRowDto)
  records!: ImportRowDto[];

  @ApiProperty({ type: Object, example: { partNumber: 'Part Number', description: 'Description' } })
  @IsObject()
  mapping!: Record<string, string>;
}
