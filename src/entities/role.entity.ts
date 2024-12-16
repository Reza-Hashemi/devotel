import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({})
export class Role {
    @PrimaryGeneratedColumn('increment')
    id: number
    @Column()
    name: string
    @OneToOne(() => User, (user) => user)
    user: User
    @UpdateDateColumn({ name: "updated_at", default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date
    @CreateDateColumn({ name: "created_at", default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date
}