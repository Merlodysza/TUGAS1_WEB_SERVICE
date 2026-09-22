import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';

import {
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';

import { CreateDestinasiDto } from './dto/create-destinasi.dto';
import { UpdateDestinasiDto } from './dto/update-destinasi.dto';
import { DestinasiService } from './destinasi.service';

@ApiTags('Destinasi')
@Controller('destinasi')
export class DestinasiController {
    constructor(
        private readonly destinasiService: DestinasiService,
    ) { }

    // GET /destinasi
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

    // GET /destinasi/:id
    @Get(':id')
    @ApiOperation({
        summary: 'Menampilkan detail destinasi wisata',
    })
    @ApiResponse({
        status: 200,
        description: 'Detail destinasi berhasil diambil',
    })
    @ApiResponse({
        status: 404,
        description: 'Destinasi tidak ditemukan',
    })
    findOne(@Param('id') id: string) {
        return this.destinasiService.findOne(Number(id));
    }

    // POST /destinasi
    @Post()
    @ApiOperation({
        summary: 'Menambahkan destinasi baru',
    })
    @ApiResponse({
        status: 201,
        description: 'Destinasi berhasil dibuat',
    })
    @ApiResponse({
        status: 400,
        description: 'Data tidak valid',
    })
    create(@Body() dto: CreateDestinasiDto) {
        return this.destinasiService.create(dto);
    }

    // PATCH /destinasi/:id
    @Patch(':id')
    @ApiOperation({
        summary: 'Memperbarui destinasi berdasarkan ID',
    })
    @ApiResponse({
        status: 200,
        description: 'Destinasi berhasil diperbarui',
    })
    @ApiResponse({
        status: 404,
        description: 'Destinasi tidak ditemukan',
    })
    update(
        @Param('id') id: string,
        @Body() dto: UpdateDestinasiDto,
    ) {
        return this.destinasiService.update(Number(id), dto);
    }

    // DELETE /destinasi/:id
    @Delete(':id')
    @ApiOperation({
        summary: 'Menghapus destinasi berdasarkan ID',
    })
    @ApiResponse({
        status: 200,
        description: 'Destinasi berhasil dihapus',
    })
    @ApiResponse({
        status: 404,
        description: 'Destinasi tidak ditemukan',
    })
    remove(@Param('id') id: string) {
        return this.destinasiService.remove(Number(id));
    }
}