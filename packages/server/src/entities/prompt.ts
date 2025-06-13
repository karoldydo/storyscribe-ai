import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export interface IPrompt {
  active: boolean;
  content: string;
  created: Date;
  id: string;
  modified: Date;
  type: 'markdown' | 'summary';
}

@Entity({ name: 'prompt', orderBy: { modified: 'DESC' } })
export class Prompt implements IPrompt {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: false, type: 'text' })
  content!: string;

  @Column({ enum: ['markdown', 'summary'], nullable: false, type: 'enum' })
  type!: 'markdown' | 'summary';

  @Column({ default: false, nullable: false, type: 'boolean' })
  active!: boolean;

  @CreateDateColumn({ nullable: false, type: 'timestamp with time zone' })
  created!: Date;

  @UpdateDateColumn({ nullable: false, type: 'timestamp with time zone' })
  modified!: Date;
}
