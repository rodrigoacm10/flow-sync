import prisma from '@/lib/prisma'

// model Client {
//   id         String      @id @default(uuid())
//   name       String
//   useChip    Boolean
//   saved      Boolean
//   synced     Boolean     @default(false)
//   userId     String
//   groupId    String?
//
//   user        User         @relation(fields: [userId], references: [id])
//   group       Group?        @relation(fields: [groupId], references: [id])
//   clientChips ClientChip[]
//   orders      Order[]
// }

interface CreateClient {
  name: string
  // remover
  saved: boolean
  synced: boolean
  userId: string
  // vai ser opicional
  groupId?: string
}

interface ListClient {
  userId: string
  groupId?: string
}

export class CLientService {
  constructor(private readonly prismaClient = prisma) {}

  async create(data: CreateClient) {
    return await this.prismaClient.client.create({ data })
  }

  async find(clientId: string) {
    return await this.prismaClient.client.findUnique({
      where: { id: clientId },
    })
  }

  async list(data: ListClient) {
    return await this.prismaClient.client.findMany({
      where: { userId: data.userId, groupId: data.groupId },
      include: { group: true },
    })
  }

  async delete(clientId: string) {
    return await this.prismaClient.client.delete({ where: { id: clientId } })
  }
}
