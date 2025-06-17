import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Prompt } from './prompt';
import { Transcription } from './transcription';

export interface ISummary {
  content: string;
  created: Date;
  id: string;
  modified: Date;
  promptId: string;
  status: 'completed' | 'failed' | 'in-progress' | 'pending';
  transcriptionId: string;
}

@Entity({ name: 'summary', orderBy: { modified: 'DESC' } })
export class Summary implements ISummary {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Transcription, (transcription) => transcription.summaries, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'transcriptionId' })
  transcription!: Transcription;

  @Column({ name: 'transcriptionId', nullable: false, type: 'uuid' })
  transcriptionId!: string;

  @ManyToOne(() => Prompt, (prompt) => prompt.summaries, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'promptId' })
  prompt!: Prompt;

  @Column({ name: 'promptId', nullable: false, type: 'uuid' })
  promptId!: string;

  @Column({ nullable: true, type: 'text' })
  content!: string;

  @Column({ enum: ['completed', 'failed', 'in-progress', 'pending'], nullable: false, type: 'enum' })
  status!: 'completed' | 'failed' | 'in-progress' | 'pending';

  @CreateDateColumn({ nullable: false, type: 'timestamp with time zone' })
  created!: Date;

  @UpdateDateColumn({ nullable: false, type: 'timestamp with time zone' })
  modified!: Date;
}
