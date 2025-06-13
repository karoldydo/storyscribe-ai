import { dataSource } from '../core/database';
import { createHttpError } from '../core/utils';
import { IPrompt, Prompt } from '../entities';

export class PromptService {
  private repository = dataSource.getRepository(Prompt);

  async create({ content, type }: Pick<IPrompt, 'content' | 'type'>): Promise<Prompt> {
    const prompt = this.repository.create({ content, type });
    const result = await this.repository.save(prompt);
    if (!result) {
      throw createHttpError(500, 'Failed to create prompt.');
    }
    return result;
  }

  async update({ active, content, id, type }: Omit<IPrompt, 'created' | 'modified'>): Promise<Prompt> {
    if (active) {
      const result = await this.repository.update({ type }, { active: false });
      if (!result.affected) {
        throw createHttpError(404, `Prompt with type ${type} not found.`);
      }
    }
    const result = await this.repository.update(id, { active, content, type });
    if (!result.affected) {
      throw createHttpError(404, `Prompt with uuid ${id} not found.`);
    }
    return this.getOne({ id });
  }

  async activate({ id, type }: Pick<IPrompt, 'id' | 'type'>): Promise<Prompt> {
    const outcome = await this.repository.update({ type }, { active: false });
    if (!outcome.affected) {
      throw createHttpError(404, `Prompt with type ${type} not found.`);
    }
    const result = await this.repository.update(id, { active: true });
    if (!result.affected) {
      throw createHttpError(404, `Prompt with uuid ${id} not found.`);
    }
    return this.getOne({ id });
  }

  getAll(): Promise<Prompt[]> {
    return this.repository.find();
  }

  async getOne({ id }: Pick<IPrompt, 'id'>): Promise<Prompt> {
    const result = await this.repository.findOneBy({ id });
    if (!result) {
      throw createHttpError(404, `Prompt with uuid ${id} not found.`);
    }
    return result;
  }

  async getActiveByType({ type }: Pick<IPrompt, 'type'>): Promise<Prompt> {
    const result = await this.repository.findOneBy({ active: true, type });
    if (!result) {
      throw createHttpError(404, `Active prompt with type ${type} not found.`);
    }
    return result;
  }

  async delete({ id }: Pick<IPrompt, 'id'>): Promise<void> {
    const result = await this.repository.delete(id);
    if (!result.affected) {
      throw createHttpError(404, `Prompt with uuid ${id} not found.`);
    }
  }
}
