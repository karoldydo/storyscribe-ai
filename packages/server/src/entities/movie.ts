import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Transcription } from './transcription';

export interface IMovie {
  created: Date;
  filename: string;
  id: string;
  mimetype: string;
  modified: Date;
  size: number;
}

@Entity({ name: 'movie', orderBy: { modified: 'DESC' } })
export class Movie implements IMovie {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: false, type: 'varchar' })
  filename!: string;

  @Column({ nullable: false, type: 'varchar' })
  mimetype!: string;

  @Column({ nullable: false, type: 'int' })
  size!: number;

  @OneToMany(() => Transcription, (transcription) => transcription.movie)
  transcriptions!: Transcription[];

  @CreateDateColumn({ nullable: false, type: 'timestamp with time zone' })
  created!: Date;

  @UpdateDateColumn({ nullable: false, type: 'timestamp with time zone' })
  modified!: Date;
}
