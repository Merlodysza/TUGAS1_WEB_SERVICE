import { Injectable } from '@nestjs/common';

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

    findAll() {
        return this.destinasi;
    }

    findOne(id: number) {
        return this.destinasi.find((item) => item.id === id);
    }

    create(data: any) {
        const newDestinasi = {
            id: this.destinasi.length + 1,
            ...data,
        };

        this.destinasi.push(newDestinasi);

        return newDestinasi;
    }
}