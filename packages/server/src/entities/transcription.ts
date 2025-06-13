import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Movie } from './movie';
import { Prompt } from './prompt';

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

  @Column({ nullable: false, type: 'varchar' })
  status!: 'completed' | 'failed' | 'in-progress' | 'pending';

  @OneToMany(() => Prompt, (prompt) => prompt.transcription)
  prompts!: Prompt[];

  @CreateDateColumn({ nullable: false, type: 'timestamp with time zone' })
  created!: Date;

  @UpdateDateColumn({ nullable: false, type: 'timestamp with time zone' })
  modified!: Date;
}
