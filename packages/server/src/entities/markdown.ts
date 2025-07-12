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

import { Pdf } from './pdf';
import { Prompt } from './prompt';
import { Summary } from './summary';

export interface IMarkdown {
  content: string;
  created: Date;
  id: string;
  modified: Date;
  promptId: string;
  status: 'completed' | 'failed' | 'in-progress' | 'pending';
  summaryId: string;
}

@Entity({ name: 'markdown', orderBy: { modified: 'DESC' } })
export class Markdown implements IMarkdown {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Summary, (summary) => summary.markdowns, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'summaryId' })
  summary!: Summary;

  @Column({ name: 'summaryId', nullable: false, type: 'uuid' })
  summaryId!: string;

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

  @OneToMany(() => Pdf, (pdf) => pdf.markdown)
  pdfs!: Pdf[];

  @CreateDateColumn({ nullable: false, type: 'timestamp with time zone' })
  created!: Date;

  @UpdateDateColumn({ nullable: false, type: 'timestamp with time zone' })
  modified!: Date;
}
