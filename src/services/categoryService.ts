import prisma from '@/lib/prisma'

//model Category {
//  id       String    @id @default(uuid())
//  name     String
//  saved    Boolean
//  synced   Boolean   @default(false)
//  userId   String
//
//  user     User      @relation(fields: [userId], references: [id])
//  products Product[]
//}
//

interface CreateCategory {
  userId: string
  name: string
  saved: boolean
  synced: boolean
}

interface EditCategory {
  categoryId: string
  name: string
}

export class CategoryService {
  constructor(private readonly prismaCLient = prisma) {}

  async create(data: CreateCategory) {
    return await this.prismaCLient.category.create({ data })
  }

  async list(userId: string) {
    return await this.prismaCLient.category.findMany({ where: { userId } })
  }

  async edit(data: EditCategory) {
    return await this.prismaCLient.category.update({
      where: { id: data.categoryId },
      data: { name: data.name },
    })
  }
}
