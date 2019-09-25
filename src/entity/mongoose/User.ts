import * as mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    fullName:           { type: 'String', required: true },
    name:               { type: 'String', required: true },
    value:              { type: mongoose.Schema.Types.Mixed, required: false },
    type:               { type: 'String', required: false },
    active:             { type: 'Boolean', default: false },
    label:              { type: 'String', required: false },
    createdDate:        { type: 'Date', default: Date.now, required: false },
    createdBy:          { type: 'Number', required: false },
    lastModifiedDate:   { type: 'Date', default: Date.now, required: false },
    lastModifiedBy:     { type: 'Number', required: false },
});

UserSchema.pre("save", () => {

});

export interface IUser extends mongoose.Document {
    fullName            : string;
    name                : string;
    value               : mongoose.Schema.Types.Mixed;
    type                : string;
    active              : boolean;
    label               : string;
    createdDate         : Date;
    createdBy           : number;
    lastModifiedDate    : Date;
    lastModifiedBy      : number;
}
