import { dataSource } from '../core/database';
import { PartialExcept } from '../core/types';
import { createHttpError } from '../core/utils';
import { ITranscription, Transcription } from '../entities';

export class TranscriptionService {
  private repository = dataSource.getRepository(Transcription);

  async create({ movieId }: Pick<ITranscription, 'movieId'>): Promise<Transcription> {
    const transcription = this.repository.create({ movieId, status: 'pending' });
    const result = await this.repository.save(transcription);
    if (!result) {
      throw createHttpError(500, 'Failed to create transcription.');
    }
    return result;
  }

  async update({ content, id, movieId, status }: PartialExcept<ITranscription, 'id'>): Promise<Transcription> {
    const result = await this.repository.update(id, { content, movieId, status });
    if (!result.affected) {
      throw createHttpError(404, `Transcription with uuid ${id} not found.`);
    }
    return this.getOne({ id });
  }

  getAll(): Promise<Transcription[]> {
    return this.repository.find();
  }

  async getOne({ id }: Pick<ITranscription, 'id'>): Promise<Transcription> {
    const result = await this.repository.findOneBy({ id });
    if (!result) {
      throw createHttpError(404, `Transcription with uuid ${id} not found.`);
    }
    return result;
  }

  async delete({ id }: Pick<ITranscription, 'id'>): Promise<void> {
    const result = await this.repository.delete(id);
    if (!result.affected) {
      throw createHttpError(404, `Transcription with uuid ${id} not found.`);
    }
  }
}
