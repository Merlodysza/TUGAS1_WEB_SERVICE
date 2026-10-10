import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    ParseIntPipe,
    HttpCode,
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
    findAll(@Query('kategori') kategori?: string) {
        return this.destinasiService.findAll(kategori);
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
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.destinasiService.findOne(id);
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
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateDestinasiDto,
    ) {
        return this.destinasiService.update(id, dto);
    }

    // DELETE /destinasi/:id
    @Delete(':id')
    @HttpCode(200)
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
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.destinasiService.remove(id);
    }
}