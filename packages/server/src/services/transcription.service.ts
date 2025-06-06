import { dataSource } from '../core/database';
import { PartialExcept } from '../core/types';
import { ITranscription, Transcription } from '../entities';

export class TranscriptionService {
  private repository = dataSource.getRepository(Transcription);

  create({ movieId }: Pick<ITranscription, 'movieId'>): Promise<Transcription> {
    const transcription = this.repository.create({ movieId, status: 'pending' });
    return this.repository.save(transcription);
  }

  async update({ content, id, movieId, status }: PartialExcept<ITranscription, 'id'>): Promise<Transcription> {
    await this.repository.update(id, { content, movieId, status });
    return this.getOne({ id });
  }

  getAll(): Promise<Transcription[]> {
    return this.repository.find();
  }

  getOne({ id }: Pick<ITranscription, 'id'>): Promise<Transcription> {
    return this.repository.findOneByOrFail({ id });
  }

  async delete({ id }: Pick<ITranscription, 'id'>): Promise<void> {
    await this.repository.delete(id);
  }
}
