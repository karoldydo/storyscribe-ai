import { dataSource } from '../core/database';
import { PartialExcept } from '../core/types';
import { createHttpError } from '../core/utils';
import { IPdf, Pdf } from '../entities';

export class PdfService {
  private repository = dataSource.getRepository(Pdf);

  async create({ markdownId, styleId }: Pick<IPdf, 'markdownId' | 'styleId'>): Promise<Pdf> {
    const pdf = this.repository.create({ markdownId, status: 'pending', styleId });
    const result = await this.repository.save(pdf);
    if (!result) {
      throw createHttpError(500, 'Failed to create pdf.');
    }
    return result;
  }

  async update({ filename, id, mimetype, path, size, status }: PartialExcept<IPdf, 'id'>): Promise<Pdf> {
    const result = await this.repository.update(id, { filename, mimetype, path, size, status });
    if (!result.affected) {
      throw createHttpError(404, `Pdf with uuid ${id} not found.`);
    }
    return this.getOne({ id });
  }

  async getOne({ id }: Pick<IPdf, 'id'>): Promise<Pdf> {
    const result = await this.repository.findOneBy({ id });
    if (!result) {
      throw createHttpError(404, `Pdf with uuid ${id} not found.`);
    }
    return result;
  }

  getAll(): Promise<Pdf[]> {
    return this.repository.find();
  }

  async delete({ id }: Pick<IPdf, 'id'>): Promise<void> {
    const result = await this.repository.delete(id);
    if (!result.affected) {
      throw createHttpError(404, `Pdf with uuid ${id} not found.`);
    }
  }
}
