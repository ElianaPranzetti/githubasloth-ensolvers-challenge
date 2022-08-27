import { PrismaClient } from '@prisma/client';
import * as argon from 'argon2';

const prisma = new PrismaClient()

async function main() {
    const hash = await argon.hash("421091");

    const sbenel = await prisma.user.create({
        data: {
            name: "sbenel",
            password: hash
        }
    })

    const notes = await prisma.note.createMany({
        data: [{
            title: "Mi nueva nota",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            authorId: sbenel.id
        }, {
            title: "Mi nota 2",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            authorId: sbenel.id
        }, {
            title: "Mi nota 3",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            authorId: sbenel.id
        }, {
            title: "Mi nota 4",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            authorId: sbenel.id,
            isArchived: true,
        }, {
            title: "Mi nota 5",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            authorId: sbenel.id,
            isArchived: true,
        }, {
            title: "Mi nota 6",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            authorId: sbenel.id,
            isArchived: true,
        }]
    })

    console.log({ sbenel })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })