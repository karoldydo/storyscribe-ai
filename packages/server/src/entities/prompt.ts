import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Transcription } from './transcription';

export interface IPrompt {
  active: boolean;
  content: string;
  created: Date;
  id: string;
  modified: Date;
  transcriptionId: string;
}

@Entity({ name: 'prompt', orderBy: { modified: 'DESC' } })
export class Prompt implements IPrompt {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Transcription, (transcription) => transcription.prompts, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'transcriptionId' })
  transcription!: Transcription;

  @Column({ name: 'transcriptionId', nullable: false, type: 'uuid' })
  transcriptionId!: string;

  @Column({ nullable: true, type: 'text' })
  content!: string;

  @Column({ default: false, nullable: false, type: 'boolean' })
  active!: boolean;

  @CreateDateColumn({ nullable: false, type: 'timestamp with time zone' })
  created!: Date;

  @UpdateDateColumn({ nullable: false, type: 'timestamp with time zone' })
  modified!: Date;
}
