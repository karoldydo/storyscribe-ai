import { dataSource } from '../core/database';
import { PartialExcept } from '../core/types';
import { createHttpError } from '../core/utils';
import { IMarkdown, Markdown, Prompt, Summary } from '../entities';

export class MarkdownService {
  private markdownRepository = dataSource.getRepository(Markdown);
  private promptRepository = dataSource.getRepository(Prompt);
  private summaryRepository = dataSource.getRepository(Summary);

  async create({ promptId, summaryId }: Pick<IMarkdown, 'promptId' | 'summaryId'>): Promise<Markdown> {
    const [promptResult, summaryResult] = await Promise.all([
      this.promptRepository.findOneBy({ id: promptId }),
      this.summaryRepository.findOneBy({ id: summaryId }),
    ]);
    if (!promptResult || !summaryResult) {
      throw createHttpError(404, `Prompt with uuid ${promptId} or Summary with uuid ${summaryId} not found.`);
    }
    const markdown = this.markdownRepository.create({ promptId, status: 'pending', summaryId });
    const result = await this.markdownRepository.save(markdown);
    if (!result) {
      throw createHttpError(500, 'Failed to create markdown.');
    }
    return result;
  }

  async update({ content, id, status }: PartialExcept<IMarkdown, 'id'>): Promise<Markdown> {
    const result = await this.markdownRepository.update(id, { content, status });
    if (!result.affected) {
      throw createHttpError(404, `Markdown with uuid ${id} not found.`);
    }
    return this.getOne({ id });
  }

  getAll(): Promise<Markdown[]> {
    return this.markdownRepository.find();
  }

  async getOne({ id }: Pick<IMarkdown, 'id'>): Promise<Markdown> {
    const result = await this.markdownRepository.findOneBy({ id });
    if (!result) {
      throw createHttpError(404, `Markdown with uuid ${id} not found.`);
    }
    return result;
  }

  async delete({ id }: Pick<IMarkdown, 'id'>): Promise<void> {
    const result = await this.markdownRepository.delete(id);
    if (!result.affected) {
      throw createHttpError(404, `Markdown with uuid ${id} not found.`);
    }
  }
}
