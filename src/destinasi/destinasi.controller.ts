import {
    Body,
    Controller,
    Get,
    Param,
    Post,
} from '@nestjs/common';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateDestinasiDto } from './dto/create-destinasi.dto';
import { DestinasiService } from './destinasi.service';

@ApiTags('Destinasi')
@Controller('destinasi')
export class DestinasiController {
    constructor(
        private readonly destinasiService: DestinasiService,
    ) { }

    @Get()
    @ApiOperation({
        summary: 'Menampilkan daftar destinasi wisata',
    })
    @ApiResponse({
        status: 200,
        description: 'Daftar destinasi berhasil diambil',
    })
    findAll() {
        return this.destinasiService.findAll();
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Menampilkan detail destinasi wisata',
    })
    findOne(@Param('id') id: string) {
        return this.destinasiService.findOne(Number(id));
    }

    @Post()
    @ApiOperation({
        summary: 'Menambahkan destinasi baru',
    })
    @ApiResponse({
        status: 201,
        description: 'Destinasi berhasil dibuat',
    })
    create(@Body() dto: CreateDestinasiDto) {
        return this.destinasiService.create(dto);
    }
}