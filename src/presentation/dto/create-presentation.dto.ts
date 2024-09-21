import { UserInPresentation } from '../entities/presentation.entity';

export class CreatePresentationDto {
  author: string;
  nickname: string;
  users: UserInPresentation[];
  slides: string[];
  title: string;
  description: string;
}
