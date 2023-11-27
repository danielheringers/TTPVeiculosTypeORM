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

    @Column({ name: 'reasonForUse', type: 'text' })
    reasonforuse: string;

    @ManyToOne(() => Drivers, { nullable: false })
    @JoinColumn({ name: 'driverId' })
    driver: Drivers;

    @ManyToOne(() => Cars, { nullable: false })
    @JoinColumn({ name: 'carId' })
    car: Cars;
}
