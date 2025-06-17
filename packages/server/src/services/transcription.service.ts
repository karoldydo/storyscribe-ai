import { dataSource } from '../core/database';
import { PartialExcept } from '../core/types';
import { createHttpError } from '../core/utils';
import { ITranscription, Movie, Transcription } from '../entities';

export class TranscriptionService {
  private transcriptionRepository = dataSource.getRepository(Transcription);
  private movieRepository = dataSource.getRepository(Movie);

  async create({ movieId }: Pick<ITranscription, 'movieId'>): Promise<Transcription> {
    const [movieResult] = await Promise.all([this.movieRepository.findOneBy({ id: movieId })]);
    if (!movieResult) {
      throw createHttpError(404, `Movie with uuid ${movieId} not found.`);
    }
    const transcription = this.transcriptionRepository.create({ movieId, status: 'pending' });
    const result = await this.transcriptionRepository.save(transcription);
    if (!result) {
      throw createHttpError(500, 'Failed to create transcription.');
    }
    return result;
  }

  async update({ content, id, movieId, status }: PartialExcept<ITranscription, 'id'>): Promise<Transcription> {
    const result = await this.transcriptionRepository.update(id, { content, movieId, status });
    if (!result.affected) {
      throw createHttpError(404, `Transcription with uuid ${id} not found.`);
    }
    return this.getOne({ id });
  }

  getAll(): Promise<Transcription[]> {
    return this.transcriptionRepository.find();
  }

  async getOne({ id }: Pick<ITranscription, 'id'>): Promise<Transcription> {
    const result = await this.transcriptionRepository.findOneBy({ id });
    if (!result) {
      throw createHttpError(404, `Transcription with uuid ${id} not found.`);
    }
    return result;
  }

  async delete({ id }: Pick<ITranscription, 'id'>): Promise<void> {
    const result = await this.transcriptionRepository.delete(id);
    if (!result.affected) {
      throw createHttpError(404, `Transcription with uuid ${id} not found.`);
    }
  }
}
