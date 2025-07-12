import { dataSource } from '../core/database';
import { createHttpError } from '../core/utils';
import { IStyle, Style } from '../entities';

export class StyleService {
  private repository = dataSource.getRepository(Style);

  async create({ css }: Pick<IStyle, 'css'>): Promise<Style> {
    const prompt = this.repository.create({ css });
    const result = await this.repository.save(prompt);
    if (!result) {
      throw createHttpError(500, 'Failed to create style.');
    }
    return result;
  }

  async update({ css, id }: Omit<IStyle, 'created' | 'modified'>): Promise<Style> {
    const result = await this.repository.update(id, { css });
    if (!result.affected) {
      throw createHttpError(404, `Style with uuid ${id} not found.`);
    }
    return this.getOne({ id });
  }

  getAll(): Promise<Style[]> {
    return this.repository.find();
  }

  async getOne({ id }: Pick<IStyle, 'id'>): Promise<Style> {
    const result = await this.repository.findOneBy({ id });
    if (!result) {
      throw createHttpError(404, `Style with uuid ${id} not found.`);
    }
    return result;
  }

  async delete({ id }: Pick<IStyle, 'id'>): Promise<void> {
    const result = await this.repository.delete(id);
    if (!result.affected) {
      throw createHttpError(404, `Style with uuid ${id} not found.`);
    }
    return;
  }
}
