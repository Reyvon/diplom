import { ApiProperty } from "@nestjs/swagger";

export class UpdatePostDto {
  @ApiProperty({ required: false })
  readonly title?: string;

  @ApiProperty({ required: false })
  readonly author?: string;

  @ApiProperty({ required: false })
  readonly content?: string;

  @ApiProperty({ type: [String], required: false })
  readonly images?: string[];
}