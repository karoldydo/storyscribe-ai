import { dataSource } from '../core/database';
import { createHttpError } from '../core/utils';
import { IMovie, Movie } from '../entities';

export class MovieService {
  private repository = dataSource.getRepository(Movie);

  async create({ filename, mimetype, size }: Pick<IMovie, 'filename' | 'mimetype' | 'size'>): Promise<Movie> {
    const movie = this.repository.create({ filename, mimetype, size });
    const result = await this.repository.save(movie);
    if (!result) {
      throw createHttpError(500, 'Failed to create movie.');
    }
    return result;
  }

  getAll(): Promise<Movie[]> {
    return this.repository.find();
  }

  async getOne({ id }: Pick<IMovie, 'id'>): Promise<Movie> {
    const result = await this.repository.findOneBy({ id });
    if (!result) {
      throw createHttpError(404, `Movie with uuid ${id} not found.`);
    }
    return result;
  }

  async delete({ id }: Pick<IMovie, 'id'>): Promise<void> {
    const result = await this.repository.delete(id);
    if (!result.affected) {
      throw new Error(`Movie with id ${id} not found`);
    }
  }
}
