import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Movie } from './movie';

export interface ITranscription {
  content: string;
  created: Date;
  id: string;
  modified: Date;
  movieId: string;
  status: 'completed' | 'failed' | 'in-progress' | 'pending';
}

@Entity({ name: 'transcription', orderBy: { modified: 'DESC' } })
export class Transcription implements ITranscription {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Movie, (movie) => movie.transcriptions, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'movieId' })
  movie!: Movie;

  @Column({ name: 'movieId', nullable: false, type: 'uuid' })
  movieId!: string;

  @Column({ nullable: true, type: 'text' })
  content!: string;

  @Column({ enum: ['completed', 'failed', 'in-progress', 'pending'], nullable: false, type: 'enum' })
  status!: 'completed' | 'failed' | 'in-progress' | 'pending';

  @CreateDateColumn({ nullable: false, type: 'timestamp with time zone' })
  created!: Date;

  @UpdateDateColumn({ nullable: false, type: 'timestamp with time zone' })
  modified!: Date;
}
