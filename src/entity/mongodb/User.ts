import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

@Entity("user")
export class User {

    @ObjectIdColumn()
    id: ObjectID

    @Column({ name: "fullName", type: "string" })
    fullName: string;

    @Column({ name: "phoneNumber", type: "string" })
    phoneNumber: string;
}
