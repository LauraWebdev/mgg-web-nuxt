

class AuthenticationNeededException extends Error {
    constructor(message) {
        super(message);
        this.name = "AuthenticationNeededException";
    }
}

class AuthenticationWrongException extends Error {
    constructor(message) {
        super(message);
        this.name = "AuthenticationWrongException";
    }
}

class AuthenticationBannedException extends Error {
    constructor(message) {
        super(message);
        this.name = "AuthenticationBannedException";
    }
}

class UserNotFoundException extends Error {
    constructor(message) {
        super(message);
        this.name = "UserNotFoundException";
    }
}

class UsernameEmailConflictException extends Error {
    constructor(message) {
        super(message);
        this.name = "UsernameEmailConflictException";
    }
}

class UsernameInvalidException extends Error {
    constructor(message) {
        super(message);
        this.name = "UsernameInvalidException";
    }
}

class EmailInvalidException extends Error {
    constructor(message) {
        super(message);
        this.name = "EmailInvalidException";
    }
}

class SocialDiscordInvalidException extends Error {
    constructor(message) {
        super(message);
        this.name = "SocialDiscordInvalidException";
    }
}

class GameChannelNotFoundException extends Error {
    constructor(message) {
        super(message);
        this.name = "GameChannelNotFoundException";
    }
}

class GameNotFoundException extends Error {
    constructor(message) {
        super(message);
        this.name = "GameNotFoundException";
    }
}

class GamePrivateException extends Error {
    constructor(message) {
        super(message);
        this.name = "GamePrivateException";
    }
}

class GameScreenshotNotFoundException extends Error {
    constructor(message) {
        super(message);
        this.name = "GameScreenshotNotFoundException";
    }
}

class GameCommentNotFoundException extends Error {
    constructor(message) {
        super(message);
        this.name = "GameCommentNotFoundException";
    }
}

class PlaylistNotFoundException extends Error {
    constructor(message) {
        super(message);
        this.name = "PlaylistNotFoundException";
    }
}

class PlaylistPrivateException extends Error {
    constructor(message) {
        super(message);
        this.name = "PlaylistPrivateException";
    }
}

class PlaylistGameConflictException extends Error {
    constructor(message) {
        super(message);
        this.name = "PlaylistGameConflictException";
    }
}

class IngameIDWrongFormatException extends Error {
    constructor(message) {
        super(message);
        this.name = "IngameIDWrongFormatException";
    }
}

class FileWrongFormatException extends Error {
    constructor(message) {
        super(message);
        this.name = "FileWrongFormatException";
    }
}

export {
    AuthenticationNeededException,
    AuthenticationWrongException,
    AuthenticationBannedException,
    UserNotFoundException,
    UsernameEmailConflictException,
    UsernameInvalidException,
    EmailInvalidException,
    SocialDiscordInvalidException,
    GameChannelNotFoundException,
    GameNotFoundException,
    GamePrivateException,
    GameScreenshotNotFoundException,
    GameCommentNotFoundException,
    PlaylistNotFoundException,
    PlaylistPrivateException,
    PlaylistGameConflictException,
    IngameIDWrongFormatException,
    FileWrongFormatException
}