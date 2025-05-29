import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'transcription', orderBy: { modified: 'DESC' } })
export class Transcription {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: true, type: 'text' })
  content?: string;

  @Column({ nullable: false, type: 'varchar' })
  status!: 'completed' | 'failed' | 'in-progress' | 'pending';

  @CreateDateColumn({ nullable: false, type: 'timestamp with time zone' })
  created!: Date;

  @UpdateDateColumn({ nullable: false, type: 'timestamp with time zone' })
  modified!: Date;
}
