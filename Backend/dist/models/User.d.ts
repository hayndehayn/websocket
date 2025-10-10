import { Schema } from 'mongoose';
declare const _default: import("mongoose").Model<{
    email: string;
    passwordHash: string;
    createdAt: NativeDate;
    name?: string | null;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    email: string;
    passwordHash: string;
    createdAt: NativeDate;
    name?: string | null;
}, {}, import("mongoose").DefaultSchemaOptions> & {
    email: string;
    passwordHash: string;
    createdAt: NativeDate;
    name?: string | null;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    email: string;
    passwordHash: string;
    createdAt: NativeDate;
    name?: string | null;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    email: string;
    passwordHash: string;
    createdAt: NativeDate;
    name?: string | null;
}>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<{
    email: string;
    passwordHash: string;
    createdAt: NativeDate;
    name?: string | null;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
//# sourceMappingURL=User.d.ts.map