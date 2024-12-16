import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({})
export class Post {
    @PrimaryGeneratedColumn('increment')
    id: number
    @Column({ length: "100" })
    title: string
    @Column({ length: "2000" })
    content: string
    @Column()
    image: string
    @ManyToOne(() => User, (user) => user.posts)
    user: User
    @UpdateDateColumn({ name: "updated_at", default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date
    @CreateDateColumn({ name: "created_at", default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date
}