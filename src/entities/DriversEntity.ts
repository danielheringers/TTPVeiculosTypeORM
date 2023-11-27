import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Drivers')
export class Drivers {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', nullable: false })
    name: string;

    @Column({ type: 'text', nullable: false, unique: true })
    cnh: string;

    @Column({ type: 'boolean', default: false })
    deleted: boolean;
}
