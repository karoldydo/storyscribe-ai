import { dataSource } from '../core/database';
import { createHttpError } from '../core/utils';
import { IPrompt, Prompt } from '../entities';

export class PromptService {
  private repository = dataSource.getRepository(Prompt);

  async create({ content, transcriptionId }: Pick<IPrompt, 'content' | 'transcriptionId'>): Promise<Prompt> {
    const prompt = this.repository.create({ content, transcriptionId });
    const result = await this.repository.save(prompt);
    if (!result) {
      throw createHttpError(500, 'Failed to create prompt.');
    }
    return result;
  }

  async update({ active, content, id, transcriptionId }: Omit<IPrompt, 'created' | 'modified'>): Promise<Prompt> {
    if (active) {
      const result = await this.repository.update({ transcriptionId }, { active: false });
      if (!result.affected) {
        throw createHttpError(404, `Transcription with uuid ${transcriptionId} not found.`);
      }
    }
    const result = await this.repository.update(id, { active, content, transcriptionId });
    if (!result.affected) {
      throw createHttpError(404, `Prompt with uuid ${id} not found.`);
    }
    return this.getOne({ id });
  }

  async activate({ id, transcriptionId }: Pick<IPrompt, 'id' | 'transcriptionId'>): Promise<Prompt> {
    const outcome = await this.repository.update({ transcriptionId }, { active: false });
    if (!outcome.affected) {
      throw createHttpError(404, `Transcription with uuid ${transcriptionId} not found.`);
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

  async getAllActive({ transcriptionId }: Pick<IPrompt, 'transcriptionId'>): Promise<Prompt[]> {
    return this.repository.findBy({ active: true, transcriptionId });
  }

  async delete({ id }: Pick<IPrompt, 'id'>): Promise<void> {
    const result = await this.repository.delete(id);
    if (!result.affected) {
      throw createHttpError(404, `Prompt with uuid ${id} not found.`);
    }
  }
}
