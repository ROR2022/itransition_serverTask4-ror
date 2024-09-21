import { PartialType } from '@nestjs/mapped-types';
import { CreateTextblockDto } from './create-textblock.dto';

export class UpdateTextblockDto extends PartialType(CreateTextblockDto) {}
