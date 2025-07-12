import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Markdown } from './markdown';
import { Style } from './style';

export interface IPdf {
  created: Date;
  filename: string;
  id: string;
  markdownId: string;
  mimetype: string;
  modified: Date;
  path: string;
  size: number;
  status: 'completed' | 'failed' | 'in-progress' | 'pending';
  styleId: string;
}

@Entity({ name: 'pdf', orderBy: { modified: 'DESC' } })
export class Pdf implements IPdf {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Style, (style) => style.pdfs, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'styleId' })
  style!: Style;

  @Column({ name: 'styleId', nullable: false, type: 'uuid' })
  styleId!: string;

  @ManyToOne(() => Markdown, (markdown) => markdown.pdfs, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'markdownId' })
  markdown!: Markdown;

  @Column({ name: 'markdownId', nullable: false, type: 'uuid' })
  markdownId!: string;

  @Column({ nullable: true, type: 'varchar' })
  filename!: string;

  @Column({ nullable: true, type: 'varchar' })
  mimetype!: string;

  @Column({ nullable: true, type: 'int' })
  size!: number;

  @Column({ nullable: true, type: 'varchar' })
  path!: string;

  @Column({ enum: ['completed', 'failed', 'in-progress', 'pending'], nullable: false, type: 'enum' })
  status!: 'completed' | 'failed' | 'in-progress' | 'pending';

  @CreateDateColumn({ nullable: false, type: 'timestamp with time zone' })
  created!: Date;

  @UpdateDateColumn({ nullable: false, type: 'timestamp with time zone' })
  modified!: Date;
}
