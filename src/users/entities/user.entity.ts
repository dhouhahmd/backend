
import {Entity,PrimaryGeneratedColumn,Column,BeforeInsert} from "typeorm";
@Entity("user")
export class User {
    @PrimaryGeneratedColumn({name: 'id'})
    id:number
    @Column("text",{name:"name",nullable:true,default:"name"})
    firstname:string
    @Column("text",{name:"username",unique:true})
    username:string
    @Column("text",{name:"password",nullable:true})
    password: string
    @Column('text',{name:"email",nullable:true})
    email: string
    @Column('integer',{name:"age",nullable:true})
    age :number
    @Column("text",{name:"role",nullable:true})
    role: string
    @Column("text",{name:"token",nullable:true})
    token: string;
    @Column("date",{nullable:true})
    createdAt: Date;
    @Column("date",{nullable:true})
    updateAt: Date;
    @BeforeInsert()
    eventCreateAT(){
        this.createdAt=new Date()
    }

    

}

