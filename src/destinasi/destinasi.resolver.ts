
import {
    Resolver,
    Query,
    Mutation,
    Args,
    Int,
    Float,
    ResolveField,
    Parent,
} from '@nestjs/graphql';

import { Destinasi } from './entities/destinasi.entity';
import { DestinasiService } from './destinasi.service';
import { PrismaService } from '../prisma/prisma.service';
import { Ulasan } from '../ulasan/entities/ulasan.entity';
import { Fasilitas } from '../fasilitas/entities/fasilitas.entity';

@Resolver(() => Destinasi)
export class DestinasiResolver {
    constructor(
        private readonly destinasiService: DestinasiService,
        private readonly prisma: PrismaService,
    ) { }

    @Query(() => Destinasi, { name: 'destinasi' })
    findOne(@Args('id', { type: () => Int }) id: number) {
        return this.destinasiService.findOne(id);
    }

    @Query(() => [Destinasi], { name: 'cariDestinasi' })
    findAll(@Args('kategori', { nullable: true }) kategori?: string) {
        return this.destinasiService.findAll(kategori);
    }

    @Mutation(() => Destinasi, { name: 'tambahDestinasi' })
    async tambahDestinasi(
        @Args('nama') nama: string,
        @Args('kategori') kategori: string,
        @Args('hargaTiket', { type: () => Float }) hargaTiket: number,
        @Args('lokasi', { nullable: true }) lokasi?: string,
    ): Promise<Destinasi> {
        const hasil = await this.prisma.destinasi.create({
            data: {
                nama,
                kategori,
                hargaTiket,
                lokasi: lokasi ?? null,
            },
        });

        return {
            ...hasil,
            lokasi: hasil.lokasi ?? undefined,
        };
    }

    @ResolveField('ulasan', () => [Ulasan])
    async getUlasan(@Parent() destinasi: Destinasi) {
        return this.prisma.ulasan.findMany({
            where: { destinasiId: destinasi.id },
            orderBy: { createdAt: 'desc' },
            take: 3,
        });
    }

    @ResolveField('fasilitas', () => [Fasilitas])
    async getFasilitas(@Parent() destinasi: Destinasi) {
        return this.prisma.fasilitas.findMany({
            where: { destinasiId: destinasi.id },
        });
    }
}
