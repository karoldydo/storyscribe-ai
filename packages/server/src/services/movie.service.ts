import { dataSource } from '../core/database';
import { IMovie, Movie } from '../entities';

export class MovieService {
  private repository = dataSource.getRepository(Movie);

  create({ filename, mimetype, size }: Pick<IMovie, 'filename' | 'mimetype' | 'size'>): Promise<Movie> {
    const transcription = this.repository.create({ filename, mimetype, size });
    return this.repository.save(transcription);
  }

  getAll(): Promise<Movie[]> {
    return this.repository.find();
  }

  getOne({ id }: Pick<IMovie, 'id'>): Promise<Movie> {
    return this.repository.findOneByOrFail({ id });
  }

  async delete({ id }: Pick<IMovie, 'id'>): Promise<void> {
    await this.repository.delete(id);
  }
}
