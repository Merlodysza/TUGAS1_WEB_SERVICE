
import { PartialType } from '@nestjs/swagger';
import { CreateDestinasiDto } from './create-destinasi.dto';

// Membuat seluruh field menjadi opsional untuk PATCH
export class UpdateDestinasiDto extends PartialType(
    CreateDestinasiDto,
) { }
