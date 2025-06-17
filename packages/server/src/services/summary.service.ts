import { dataSource } from '../core/database';
import { PartialExcept } from '../core/types';
import { createHttpError } from '../core/utils';
import { ISummary, Prompt, Summary, Transcription } from '../entities';

export class SummaryService {
  private summaryRepository = dataSource.getRepository(Summary);
  private promptRepository = dataSource.getRepository(Prompt);
  private transcriptionRepository = dataSource.getRepository(Transcription);

  async create({ promptId, transcriptionId }: Pick<ISummary, 'promptId' | 'transcriptionId'>): Promise<Summary> {
    const [promptResult, transcriptionResult] = await Promise.all([
      this.promptRepository.findOneBy({ id: promptId }),
      this.transcriptionRepository.findOneBy({ id: transcriptionId }),
    ]);
    if (!promptResult || !transcriptionResult) {
      throw createHttpError(
        404,
        `Prompt with uuid ${promptId} or Transcription with uuid ${transcriptionId} not found.`
      );
    }
    const prompt = this.summaryRepository.create({ promptId, status: 'pending', transcriptionId });
    const result = await this.summaryRepository.save(prompt);
    if (!result) {
      throw createHttpError(500, 'Failed to create summary.');
    }
    return result;
  }

  async update({ content, id, status }: PartialExcept<ISummary, 'id'>): Promise<Summary> {
    const result = await this.summaryRepository.update(id, { content, status });

    if (!result.affected) {
      throw createHttpError(404, `Summary with uuid ${id} not found.`);
    }
    return this.getOne({ id });
  }

  getAll(): Promise<Summary[]> {
    return this.summaryRepository.find();
  }

  async getOne({ id }: Pick<ISummary, 'id'>): Promise<Summary> {
    const result = await this.summaryRepository.findOneBy({ id });
    if (!result) {
      throw createHttpError(404, `Summary with uuid ${id} not found.`);
    }
    return result;
  }

  async delete({ id }: Pick<ISummary, 'id'>): Promise<void> {
    const result = await this.summaryRepository.delete(id);
    if (!result.affected) {
      throw createHttpError(404, `Summary with uuid ${id} not found.`);
    }
  }
}
