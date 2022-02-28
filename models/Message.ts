import User from "./User";

export default class Massage{
    public from : User | null = null;
    public to : User | null = null;
    public message: string | null = null;
    public sentOn: Date = new Date();
}