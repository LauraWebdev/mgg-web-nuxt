import axios from 'axios';
import * as ex from './exceptions';

class MGGApi {
    apiBase = "";

    constructor() {
        if(process.env.VUE_APP_API_ENV === 'development') {
            this.apiBase = "http://localhost:1337/v1/";
        } else {
            this.apiBase = "https://api.mygarage.games/v1/";
        }
    }

    async authLogin(username, password) {
        try {
            const response = await axios.post(this.apiBase + 'auth/login', {
                "username": username,
                "password": password
            });

            return response.data;
        } catch(error) {
            switch(error.response.data.name) {
                case "USER_NOT_FOUND":
                    throw new ex.UserNotFoundException(error.response.data.text);
                case "AUTHENTICATION_WRONG":
                    throw new ex.AuthenticationWrongException(error.response.data.text);
                case "AUTHENTICATION_BANNED":
                    throw new ex.AuthenticationBannedException(error.response.data.reason);
                default:
                    throw new Error(error.response.data.text);
            }
        }
    }

    async authVerify(jwtToken) {
        try {
            const response = await axios.post(this.apiBase + 'auth/verify', {
                "token": jwtToken,
            });

            return response.data;
        } catch(error) {
            switch(error.response.data.name) {
                case "AUTHENTICATION_WRONG":
                    throw new ex.AuthenticationWrongException(error.response.data.text);
                case "AUTHENTICATION_BANNED":
                    throw new ex.AuthenticationBannedException(error.response.data.text);
                default:
                    throw new Error(error.response.data.text);
            }
        }
    }

    async authRegister(username, password, email) {
        try {
            const response = await axios.post(this.apiBase + 'users', {
                "username": username,
                "password": password,
                "email": email
            });

            return response.data;
        } catch(error) {
            switch(error.response.data.name) {
                case "USERNAME_INVALID":
                    throw new ex.UsernameInvalidException(error.response.data.text);
                case "USERNAME_EMAIL_CONFLICT":
                    throw new ex.UsernameEmailConflictException(error.response.data.text);
                default:
                    throw new Error(error.response.data.text);
            }
        }
    }

    async authUpdate(userID, securityPayload, jwtToken) {
        try {
            const response = await axios.put(this.apiBase + 'auth/update/' + userID, securityPayload, {
                headers: {
                    "x-access-token": jwtToken
                }
            });

            return response.data;
        } catch(error) {
            switch(error.response.data.name) {
                case "EMAIL_INVALID":
                    throw new ex.EmailInvalidException(error.response.data.text);
                case "USERNAME_EMAIL_CONFLICT":
                    throw new ex.UsernameEmailConflictException(error.response.data.text);
                case "USER_NOT_FOUND":
                    throw new ex.UserNotFoundException(error.response.data.text);
                case "AUTHENTICATION_WRONG":
                    throw new ex.AuthenticationWrongException(error.response.data.text);
                case "AUTHENTICATION_NEEDED":
                    throw new ex.AuthenticationNeededException(error.response.data.text);
                default:
                    throw new Error(error.response.data.text);
            }
        }
    }

    async oauthDiscordGetUrl() {
        try {
            const response = await axios.get(this.apiBase + 'oauth/discord');

            return response.data;
        } catch(error) {
            switch(error.response.data.name) {
                default:
                    throw new Error(error.response.data.text);
            }
        }
    }

    async oauthDiscordCallback( callbackCode ) {
        try {
            const response = await axios.post(this.apiBase + 'oauth/discord/callback', {
                "callbackCode": callbackCode,
            });

            return response.data;
        } catch(error) {
            switch(error.response.data.name) {
                default:
                    throw new Error(error.response.data.text);
            }
        }
    }

    async getDiscoveryGames(route = "", page = 0) {
        try {
            const response = await axios.get(this.apiBase + 'discovery/' + route + '/' + page);

            return response.data;
        } catch(error) {
            switch(error.response.data.name) {
                default:
                    throw new Error(error.response.data.text);
            }
        }
    }

    async getQueryGames(query, jwtToken = undefined) {
        try {
            const response = await axios.post(this.apiBase + 'discovery/find', {
                query: query
            }, {
                headers: {
                    "x-access-token": jwtToken
                }
            });

            return response.data;
        } catch(error) {
            switch(error.response.data.name) {
                default:
                    throw new Error(error.response.data.text);
            }
        }
    }

    async getAllChannels() {
        try {
            const response = await axios.get(this.apiBase + 'gameChannels');

            return response.data;
        } catch(error) {
            switch(error.response.data.name) {
                default:
                    throw new Error(error.response.data.text);
            }
        }
    }

    async getChannelDetail(channelID, jwtToken = undefined) {
        try {
            const response = await axios.get(this.apiBase + 'gameChannels/' + channelID, {
                headers: {
                    "x-access-token": jwtToken
                }
            });

            return response.data;
        } catch(error) {
            switch(error.response.data.name) {
                case "GAMECHANNEL_NOT_FOUND":
                    throw new ex.GameChannelNotFoundException(error.response.data.text);
                default:
                    throw new Error(error.response.data.text);
            }
        }
    }

    async getGameDetail(gameID, jwtToken = undefined) {
        try {
            const response = await axios.get(this.apiBase + 'games/' + gameID, {
                headers: {
                    "x-access-token": jwtToken
                }
            });

            return response.data;
        } catch(error) {
            switch(error.response.data.name) {
                case "GAME_NOT_FOUND":
                    throw new ex.GameNotFoundException(error.response.data.text);
                case "GAME_PRIVATE":
                    throw new ex.GamePrivateException(error.response.data.text);
                default:
                    throw new Error(error.response.data.text);
            }
        }
    }

    async postGame(gamePayload, jwtToken) {
        try {
            const response = await axios.post(this.apiBase + 'games', gamePayload, {
                headers: {
                    "x-access-token": jwtToken
                }
            });

            return response.data;
        } catch(error) {
            switch(error.response.data.name) {
                case "GAME_INGAMEID_WRONGFORMAT":
                    throw new ex.IngameIDWrongFormatException(error.response.data.text);
                case "AUTHENTICATION_WRONG":
                    throw new ex.AuthenticationWrongException(error.response.data.text);
                case "AUTHENTICATION_NEEDED":
                    throw new ex.AuthenticationNeededException(error.response.data.text);
                default:
                    throw new Error(error.response.data.text);
            }
        }
    }

    async updateGame(gameID, gamePayload, jwtToken) {
        try {
            const response = await axios.put(this.apiBase + 'games/' + gameID, gamePayload, {
                headers: {
                    "x-access-token": jwtToken
                }
            });

            return response.data;
        } catch(error) {
            switch(error.response.data.name) {
                case "GAME_INGAMEID_WRONGFORMAT":
                    throw new ex.IngameIDWrongFormatException(error.response.data.text);
                case "GAME_NOT_FOUND":
                    throw new ex.GameNotFoundException(error.response.data.text);
                case "AUTHENTICATION_WRONG":
                    throw new ex.AuthenticationWrongException(error.response.data.text);
                case "AUTHENTICATION_NEEDED":
                    throw new ex.AuthenticationNeededException(error.response.data.text);
                default:
                    throw new Error(error.response.data.text);
            }
        }
    }

    async updateGameCover(gameID, coverFile, jwtToken) {
        try {
            let formData = new FormData();
            formData.append('cover', coverFile);

            const response = await axios.put(this.apiBase + 'games/' + gameID + '/cover', formData, {
                headers: {
                    "x-access-token": jwtToken,
                    "Content-Type": "multipart/form-data"
                }
            });

            return response.data;
        } catch(error) {
            switch(error.response.data.name) {
                case "GAME_NOT_FOUND":
                    throw new ex.GameNotFoundException(error.response.data.text);
                case "GAME_COVER_WRONGFORMAT":
                    throw new ex.FileWrongFormatException(error.response.data.text);
                case "AUTHENTICATION_WRONG":
                    throw new ex.AuthenticationWrongException(error.response.data.text);
                case "AUTHENTICATION_NEEDED":
                    throw new ex.AuthenticationNeededException(error.response.data.text);
                default:
                    throw new Error(error.response.data.text);
            }
        }
    }

    async deleteGameCover(gameID, jwtToken) {
        try {
            const response = await axios.delete(this.apiBase + 'games/' + gameID + '/cover', {
                headers: {
                    "x-access-token": jwtToken
                }
            });

            return response.data;
        } catch(error) {
            switch(error.response.data.name) {
                case "GAME_NOT_FOUND":
                    throw new ex.GameNotFoundException(error.response.data.text);
                case "AUTHENTICATION_WRONG":
                    throw new ex.AuthenticationWrongException(error.response.data.text);
                case "AUTHENTICATION_NEEDED":
                    throw new ex.AuthenticationNeededException(error.response.data.text);
                default:
                    throw new Error(error.response.data.text);
            }
        }
    }

    async deleteGame(gameID, jwtToken) {
        try {
            const response = await axios.delete(this.apiBase + 'games/' + gameID, {
                headers: {
                    "x-access-token": jwtToken
                }
            });

            return response.data;
        } catch(error) {
            switch(error.response.data.name) {
                case "GAME_NOT_FOUND":
                    throw new ex.GameNotFoundException(error.response.data.text);
                case "AUTHENTICATION_WRONG":
                    throw new ex.AuthenticationWrongException(error.response.data.text);
                case "AUTHENTICATION_NEEDED":
                    throw new ex.AuthenticationNeededException(error.response.data.text);
                default:
                    throw new Error(error.response.data.text);
            }
        }
    }

    async uploadGameScreenshots(gameID, files, jwtToken) {
        try {
            let formData = new FormData();
            files.forEach(file => {
                formData.append('screenshots', file);
            });

            const response = await axios.post(this.apiBase + 'gameScreenshots/' + gameID, formData, {
                headers: {
                    "x-access-token": jwtToken,
                    "Content-Type": "multipart/form-data"
                }
            });

            return response.data;
        } catch(error) {
            switch(error.response.data.name) {
                case "GAME_NOT_FOUND":
                    throw new ex.GameNotFoundException(error.response.data.text);
                case "GAMESCREENSHOT_COVER_WRONGFORMAT":
                    throw new ex.FileWrongFormatException(error.response.data.text);
                case "AUTHENTICATION_WRONG":
                    throw new ex.AuthenticationWrongException(error.response.data.text);
                case "AUTHENTICATION_NEEDED":
                    throw new ex.AuthenticationNeededException(error.response.data.text);
                default:
                    throw new Error(error.response.data.text);
            }
        }
    }

    async deleteGameScreenshot(screenshotID, jwtToken) {
        try {
            const response = await axios.delete(this.apiBase + 'gameScreenshots/' + screenshotID, {
                headers: {
                    "x-access-token": jwtToken
                }
            });

            return response.data;
        } catch(error) {
            switch(error.response.data.name) {
                case "GAME_NOT_FOUND":
                    throw new ex.GameNotFoundException(error.response.data.text);
                case "GAMESCREENSHOT_NOT_FOUND":
                    throw new ex.GameScreenshotNotFoundException(error.response.data.text);
                case "AUTHENTICATION_WRONG":
                    throw new ex.AuthenticationWrongException(error.response.data.text);
                case "AUTHENTICATION_NEEDED":
                    throw new ex.AuthenticationNeededException(error.response.data.text);
                default:
                    throw new Error(error.response.data.text);
            }
        }
    }

    async getAllUsers() {
        try {
            const response = await axios.get(this.apiBase + 'users');

            return response.data;
        } catch(error) {
            switch(error.response.data.name) {
                default:
                    throw new Error(error.response.data.text);
            }
        }
    }

    async getUserDetail(userID, jwtToken = undefined) {
        try {
            const response = await axios.get(this.apiBase + 'users/' + userID, {
                headers: {
                    "x-access-token": jwtToken
                }
            });

            return response.data;
        } catch(error) {
            switch(error.response.data.name) {
                case "USER_NOT_FOUND":
                    throw new ex.UserNotFoundException(error.response.data.text);
                default:
                    throw new Error(error.response.data.text);
            }
        }
    }

    async updateUser(userID, userPayload, jwtToken) {
        try {
            const response = await axios.put(this.apiBase + 'users/' + userID, userPayload, {
                headers: {
                    "x-access-token": jwtToken
                }
            });

            return response.data;
        } catch(error) {
            switch(error.response.data.name) {
                case "USER_INGAMEID_WRONGFORMAT":
                    throw new ex.IngameIDWrongFormatException(error.response.data.text);
                case "USER_NOT_FOUND":
                    throw new ex.UserNotFoundException(error.response.data.text);
                case "USERNAME_INVALID":
                    throw new ex.UsernameInvalidException(error.response.data.text);
                case "USERNAME_EMAIL_CONFLICT":
                    throw new ex.UsernameEmailConflictException(error.response.data.text);
                case "USER_DISCORD_INVALID":
                    throw new ex.SocialDiscordInvalidException(error.response.data.text);
                case "AUTHENTICATION_WRONG":
                    throw new ex.AuthenticationWrongException(error.response.data.text);
                case "AUTHENTICATION_NEEDED":
                    throw new ex.AuthenticationNeededException(error.response.data.text);
                default:
                    throw new Error(error.response.data.text);
            }
        }
    }

    async updateUserAvatar(userID, avatarFile, jwtToken) {
        try {
            let formData = new FormData();
            formData.append('avatar', avatarFile);

            const response = await axios.put(this.apiBase + 'users/' + userID + '/avatar', formData, {
                headers: {
                    "x-access-token": jwtToken,
                    "Content-Type": "multipart/form-data"
                }
            });

            return response.data;
        } catch(error) {
            switch(error.response.data.name) {
                case "USER_NOT_FOUND":
                    throw new ex.UserNotFoundException(error.response.data.text);
                case "USER_AVATAR_WRONGFORMAT":
                    throw new ex.FileWrongFormatException(error.response.data.text);
                case "AUTHENTICATION_WRONG":
                    throw new ex.AuthenticationWrongException(error.response.data.text);
                case "AUTHENTICATION_NEEDED":
                    throw new ex.AuthenticationNeededException(error.response.data.text);
                default:
                    throw new Error(error.response.data.text);
            }
        }
    }

    async deleteUserAvatar(userID, jwtToken) {
        try {
            const response = await axios.delete(this.apiBase + 'users/' + userID + '/avatar', {
                headers: {
                    "x-access-token": jwtToken
                }
            });

            return response.data;
        } catch(error) {
            switch(error.response.data.name) {
                case "USER_NOT_FOUND":
                    throw new ex.UserNotFoundException(error.response.data.text);
                case "AUTHENTICATION_WRONG":
                    throw new ex.AuthenticationWrongException(error.response.data.text);
                case "AUTHENTICATION_NEEDED":
                    throw new ex.AuthenticationNeededException(error.response.data.text);
                default:
                    throw new Error(error.response.data.text);
            }
        }
    }

    async getPlaylistDetail(playlistID, jwtToken = undefined) {
        try {
            const response = await axios.get(this.apiBase + 'playlists/' + playlistID, {
                headers: {
                    "x-access-token": jwtToken
                }
            });

            return response.data;
        } catch(error) {
            switch(error.response.data.name) {
                case "PLAYLIST_NOT_FOUND":
                    throw new ex.PlaylistNotFoundException(error.response.data.text);
                case "PLAYLIST_PRIVATE":
                    throw new ex.PlaylistPrivateException(error.response.data.text);
                default:
                    throw new Error(error.response.data.text);
            }
        }
    }

    async createGameComment(text, gameID, jwtToken) {
        try {
            const response = await axios.post(this.apiBase + 'gameComments/' + gameID, {
                text: text
            }, {
                headers: {
                    "x-access-token": jwtToken
                }
            });

            return response.data;
        } catch(error) {
            switch(error.response.data.name) {
                case "GAME_NOT_FOUND":
                    throw new ex.GameNotFoundException(error.response.data.text);
                case "AUTHENTICATION_WRONG":
                    throw new ex.AuthenticationWrongException(error.response.data.text);
                case "AUTHENTICATION_NEEDED":
                    throw new ex.AuthenticationNeededException(error.response.data.text);
                default:
                    throw new Error(error.response.data.text);
            }
        }
    }

    async deleteGameComment(commentID, jwtToken) {
        try {
            const response = await axios.delete(this.apiBase + 'gameComments/' + commentID, {
                headers: {
                    "x-access-token": jwtToken
                }
            });

            return response.data;
        } catch(error) {
            switch(error.response.data.name) {
                case "GAMECOMMENT_NOT_FOUND":
                    throw new ex.GameCommentNotFoundException(error.response.data.text);
                case "AUTHENTICATION_WRONG":
                    throw new ex.AuthenticationWrongException(error.response.data.text);
                case "AUTHENTICATION_NEEDED":
                    throw new ex.AuthenticationNeededException(error.response.data.text);
                default:
                    throw new Error(error.response.data.text);
            }
        }
    }

    async addToPlaylist(playlistID, gameID, jwtToken) {
        try {
            const response = await axios.post(this.apiBase + 'playlists/' + playlistID + '/add/' + gameID, {}, {
                headers: {
                    "x-access-token": jwtToken
                }
            });

            return response.data;
        } catch(error) {
            switch(error.response.data.name) {
                case "PLAYLIST_NOT_FOUND":
                    throw new ex.PlaylistNotFoundException(error.response.data.text);
                case "GAME_NOT_FOUND":
                    throw new ex.GameNotFoundException(error.response.data.text);
                case "PLAYLIST_GAME_CONFLICT":
                    throw new ex.PlaylistGameConflictException(error.response.data.text);
                case "AUTHENTICATION_WRONG":
                    throw new ex.AuthenticationWrongException(error.response.data.text);
                case "AUTHENTICATION_NEEDED":
                    throw new ex.AuthenticationNeededException(error.response.data.text);
                default:
                    throw new Error(error.response.data.text);
            }
        }
    }

    async deleteFromPlaylist(playlistID, gameID, jwtToken) {
        try {
            const response = await axios.delete(this.apiBase + 'playlists/' + playlistID + '/delete/' + gameID, {
                headers: {
                    "x-access-token": jwtToken
                }
            });

            return response.data;
        } catch(error) {
            switch(error.response.data.name) {
                case "PLAYLIST_NOT_FOUND":
                    throw new ex.PlaylistNotFoundException(error.response.data.text);
                case "GAME_NOT_FOUND":
                    throw new ex.GameNotFoundException(error.response.data.text);
                case "AUTHENTICATION_WRONG":
                    throw new ex.AuthenticationWrongException(error.response.data.text);
                case "AUTHENTICATION_NEEDED":
                    throw new ex.AuthenticationNeededException(error.response.data.text);
                default:
                    throw new Error(error.response.data.text);
            }
        }
    }

    async getModerationQueue(jwtToken = undefined) {
        try {
            const response = await axios.get(this.apiBase + 'moderation/queue', {
                headers: {
                    "x-access-token": jwtToken
                }
            });

            return response.data;
        } catch(error) {
            switch(error.response.data.name) {
                default:
                    throw new Error(error.response.data.text);
                case "AUTHENTICATION_WRONG":
                    throw new ex.AuthenticationWrongException(error.response.data.text);
                case "AUTHENTICATION_NEEDED":
                    throw new ex.AuthenticationNeededException(error.response.data.text);
            }
        }
    }

    async deleteFromModerationQueue(gameID, jwtToken = undefined) {
        try {
            const response = await axios.delete(this.apiBase + 'moderation/queue/' + gameID, {
                headers: {
                    "x-access-token": jwtToken
                }
            });

            return response.data;
        } catch(error) {
            switch(error.response.data.name) {
                default:
                    throw new Error(error.response.data.text);
                case "GAME_NOT_FOUND":
                    throw new ex.GameNotFoundException(error.response.data.text);
                case "AUTHENTICATION_WRONG":
                    throw new ex.AuthenticationWrongException(error.response.data.text);
                case "AUTHENTICATION_NEEDED":
                    throw new ex.AuthenticationNeededException(error.response.data.text);
            }
        }
    }

    async banUser(userID, banReason, jwtToken = undefined) {
        try {
            const response = await axios.put(this.apiBase + 'moderation/ban/' + userID, {
                reason: banReason
            }, {
                headers: {
                    "x-access-token": jwtToken
                }
            });

            return response.data;
        } catch(error) {
            switch(error.response.data.name) {
                default:
                    throw new Error(error.response.data.text);
                case "USER_NOT_FOUND":
                    throw new ex.UserNotFoundException(error.response.data.text);
                case "AUTHENTICATION_WRONG":
                    throw new ex.AuthenticationWrongException(error.response.data.text);
                case "AUTHENTICATION_NEEDED":
                    throw new ex.AuthenticationNeededException(error.response.data.text);
            }
        }
    }

    async unbanUser(userID, jwtToken = undefined) {
        try {
            const response = await axios.delete(this.apiBase + 'moderation/ban/' + userID, {
                headers: {
                    "x-access-token": jwtToken
                }
            });

            return response.data;
        } catch(error) {
            switch(error.response.data.name) {
                default:
                    throw new Error(error.response.data.text);
                case "USER_NOT_FOUND":
                    throw new ex.UserNotFoundException(error.response.data.text);
                case "AUTHENTICATION_WRONG":
                    throw new ex.AuthenticationWrongException(error.response.data.text);
                case "AUTHENTICATION_NEEDED":
                    throw new ex.AuthenticationNeededException(error.response.data.text);
            }
        }
    }

    static isUsernameValid(unfilteredUsername) {
        // Allowed: az AZ 09 - _
        let usernameRegex = /^[\w-]{3,}$/g;
    
        return usernameRegex.test(unfilteredUsername);
    }
    
    static isCreatorIDValid(unfilteredCreatorID) {
        let creatorIDRegex = /^P-[a-zA-Z0-9]{3}-[a-zA-Z0-9]{3}-[a-zA-Z0-9]{3}$/g;
    
        return creatorIDRegex.test(unfilteredCreatorID);
    }
    
    static isGameIDValid(unfilteredGameID) {
        let gameIDRegex = /^G-[a-zA-Z0-9]{3}-[a-zA-Z0-9]{3}-[a-zA-Z0-9]{3}$/g;
    
        return gameIDRegex.test(unfilteredGameID);
    }

    static isSocialDiscordValid(unfilteredDiscord) {
        let discordRegex = /^.{3,32}#[0-9]{4}$/g;
    
        if(unfilteredDiscord === "") { return true; }
    
        return discordRegex.test(unfilteredDiscord);
    }
    
    static isSocialTwitterURLValid(unfilteredTwitter) {
        let twitterURLRegex = /^(?:https|http)\:\/\/(?:[\w]+\.)?twitter\.com\/?([\w-]{1,})$/g;
    
        return twitterURLRegex.test(unfilteredTwitter);
    }
    
    static isSocialTwitterAtValid(unfilteredTwitter) {
        let twitterAtRegex = /^@([\w-]{1,})$/g;
    
        return twitterAtRegex.test(unfilteredTwitter);
    }
    
    static isSocialYouTubeValid(unfilteredYouTube) {
        let youtubeRegex = /^(?:https|http)\:\/\/(?:[\w]+\.)?youtube\.com\/(?:c\/|channel\/|user\/)?([\w-]{1,})$/g;
    
        return youtubeRegex.test(unfilteredYouTube);
    }
}

export default MGGApi;