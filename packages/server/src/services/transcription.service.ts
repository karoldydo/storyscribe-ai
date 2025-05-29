import { dataSource } from '../core/database';
import { Transcription } from '../entities';

export class TranscriptionService {
  private repository = dataSource.getRepository(Transcription);

  create(content?: string): Promise<Transcription> {
    const transcription = this.repository.create({ content, status: 'pending' });
    return this.repository.save(transcription);
  }

  async update(
    id: string,
    content?: string,
    status?: 'completed' | 'failed' | 'in-progress' | 'pending'
  ): Promise<Transcription> {
    await this.repository.update(id, { content, status });
    return this.repository.findOneByOrFail({ id });
  }

  getAll(): Promise<Transcription[]> {
    return this.repository.find();
  }

  getOne(id: string): Promise<Transcription> {
    return this.repository.findOneByOrFail({ id });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
