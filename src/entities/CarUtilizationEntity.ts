import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Cars } from "./CarsEntity";
import { Drivers } from "./DriversEntity";

@Entity('CarUtilization')
export class CarUtilization {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp', nullable: true })
    initialdate: Date;

    @Column({ type: 'timestamp', nullable: true })
    enddate: Date;

    @ManyToOne(() => Drivers, { nullable: false })
    @JoinColumn({ name: 'driverid' })
    driver: Drivers;

    @ManyToOne(() => Cars, { nullable: false })
    @JoinColumn({ name: 'carid' })
    car: Cars;

    @Column({ type: 'text' })
    reasonforuse: string;
}
