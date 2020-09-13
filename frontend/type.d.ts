interface IPost {
    _id: string
    title: string;
    content: string;
    reactions: Array<{
        name: string;
        count: number;
    }>;
    comments: Array<{
        author: string;
        comment: string;
    }>;
}

interface IUser {
    _id?: string;
    email: string;
    password: string;
    username?: string;
    //preferences?: Array<boolean>
    reactions?: [
        {
            id: string;
            reaction: string;
        }
    ]
}

interface IErrors {
    usernameError: string;
    emailError: string;
    passwordError: string;
}

interface IPreferences {
    nameDisplay: boolean;
    darkMode: boolean;
}

interface IComment {
    author: string;
    comment: string;
}