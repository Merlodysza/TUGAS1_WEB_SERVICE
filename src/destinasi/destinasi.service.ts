import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class DestinasiService {
    private destinasi = [
        {
            id: 1,
            nama: 'Pantai Kuta Mandalika',
            kategori: 'Pantai',
            hargaTiket: 15000,
        },
        {
            id: 2,
            nama: 'Bukit Merese',
            kategori: 'Bukit',
            hargaTiket: 10000,
        },
    ];

    // GET /destinasi
    findAll() {
        return this.destinasi;
    }

    // GET /destinasi/:id
    findOne(id: number) {
        const destinasi = this.destinasi.find(
            (item) => item.id === id,
        );

        if (!destinasi) {
            throw new NotFoundException(
                'Destinasi tidak ditemukan',
            );
        }

        return destinasi;
    }

    // POST /destinasi
    create(data: any) {
        const newDestinasi = {
            id: this.destinasi.length + 1,
            ...data,
        };

        this.destinasi.push(newDestinasi);

        return newDestinasi;
    }

    // PATCH /destinasi/:id
    update(id: number, data: any) {
        const index = this.destinasi.findIndex(
            (item) => item.id === id,
        );

        if (index === -1) {
            throw new NotFoundException(
                'Destinasi tidak ditemukan',
            );
        }

        this.destinasi[index] = {
            ...this.destinasi[index],
            ...data,
        };

        return this.destinasi[index];
    }

    // DELETE /destinasi/:id
    remove(id: number) {
        const index = this.destinasi.findIndex(
            (item) => item.id === id,
        );

        if (index === -1) {
            throw new NotFoundException(
                'Destinasi tidak ditemukan',
            );
        }

        const deletedDestinasi = this.destinasi[index];

        this.destinasi.splice(index, 1);

        return {
            message: 'Destinasi berhasil dihapus',
            data: deletedDestinasi,
        };
    }
}