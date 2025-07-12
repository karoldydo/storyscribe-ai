import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Pdf } from './pdf';

export interface IStyle {
  created: Date;
  css: string;
  id: string;
  modified: Date;
}

@Entity({ name: 'style', orderBy: { modified: 'DESC' } })
export class Style implements IStyle {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: false, type: 'text' })
  css!: string;

  @OneToMany(() => Pdf, (pdf) => pdf.style)
  pdfs!: Pdf[];

  @CreateDateColumn({ nullable: false, type: 'timestamp with time zone' })
  created!: Date;

  @UpdateDateColumn({ nullable: false, type: 'timestamp with time zone' })
  modified!: Date;
}
