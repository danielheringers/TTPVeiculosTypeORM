import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Cars')
export class Cars {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', unique: true})
    licenseplate: string;

    @Column({ type: 'text'})
    color: string;

    @Column({ type: 'text'})
    brand: string;

    @Column({ type: 'text'})
    model: string;

    @Column({ type: 'int' })
    year: number;

    @Column({ type: 'boolean', default: false })
    deleted: boolean;
}
