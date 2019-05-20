import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("user")
export class User {

    @PrimaryGeneratedColumn({ name: "id", type: "bigint"})
    id: number;

    @Column({ name: "fullName", type: "varchar", length: 64, default: "" })
    fullName: string;

    @Column({ name: "createdDate", type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    createdDate: Date;

    @Column({ name: "createdBy", type: "bigint", default: null })
    createdBy: number;

    @Column({ name: "lastModifiedDate", type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    lastModifiedDate: Date;

    @Column({ name: "lastModifiedBy", type: "bigint", default: null })
    lastModifiedBy: number;

    constructor(entityDto) {
        if (entityDto && typeof entityDto === "object") {
            this.id = entityDto.id;
            this.fullName = entityDto.fullName;
            this.createdDate = entityDto.createdDate;
            this.createdBy = entityDto.createdBy;
            this.lastModifiedDate = entityDto.lastModifiedDate;
            this.lastModifiedBy = entityDto.lastModifiedBy;
        }
    }
}
