import Role from "./role";

export default class user
{
    userId: number; // primary key
    username: string; // not null, unique
    password: string; // not null
    firstName: string; // not null
    lastName: string; // not null
    email: string; // not null
    role: Role // not null
    
    constructor(userId : number = -1, username : string = `No Name`, password : string = `No Password`, 
                firstName: string = `No Name`, lastName : string = `No Name`, email : string = `No Email`, role : Role = new Role(-1, `No Role`))
    {
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
}

