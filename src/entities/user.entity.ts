import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Post } from "./post.entity";
import { Role } from "./role.entity";

@Entity({})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string
    @Column()
    username: string
    @Column()
    password: string
    @OneToMany(() => Post, (post) => post.user)
    posts: Post[]
    @OneToOne(() => Role, (role) => role.user)
    @JoinColumn()
    role: Role
    @UpdateDateColumn({ name: "updated_at", default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date
    @CreateDateColumn({ name: "created_at", default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date
}