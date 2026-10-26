
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Ulasan } from './entities/ulasan.entity';
import { CreateUlasanInput } from './dto/create-ulasan.input';
import { PrismaService } from '../prisma/prisma.service';

@Resolver(() => Ulasan)
export class UlasanResolver {
    constructor(private readonly prisma: PrismaService) { }

    @Mutation(() => Ulasan, { name: 'tambahUlasan' })
    async tambahUlasan(
        @Args('input', { type: () => CreateUlasanInput })
        input: Record<string, unknown>,
    ): Promise<Ulasan> {
        console.log('INPUT GRAPHQL:', input);

        const destinasiId = Number(input['destinasiId']);
        const rating = Number(input['rating']);
        const komentar =
            typeof input['komentar'] === 'string'
                ? input['komentar'].trim()
                : '';

        if (!Number.isInteger(destinasiId) || destinasiId <= 0) {
            throw new Error(
                'destinasiId harus berupa bilangan bulat positif.',
            );
        }

        if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
            throw new Error(
                'rating harus berupa bilangan bulat antara 1 sampai 5.',
            );
        }

        if (!komentar) {
            throw new Error(
                'Komentar wajib diisi dan tidak boleh kosong.',
            );
        }

        return this.prisma.ulasan.create({
            data: {
                destinasiId,
                rating,
                komentar,
            },
        });
    }
}
