const messages = {
    "header": {
        "nav": {
            "discover": "Discover",
            "channels": "Channels",
            "find": "Find",
            "talk": "Talk"
        },
        "actions": {
            "join": "Join Now!",
            "login": "Login"
        }
    },
    "login": {
        "header": "Login",
        "banned": {
            "message": "You were banned. If you believe this is a mistake, you can send us a ban appeal.",
            "appealLinkText": "Ban appeal form"
        },
        "form": {
            "usernamePlaceholder": "Username",
            "passwordPlaceholder": "Password",
            "loginButton": "Login"
        },
        "snackbar": {
            "welcomeBack": "Welcome back, {username}",
            "error": {
                "fillOut": "All fields must be filled out.",
                "serverError": "There was a server error logging you in. Please try again later.",
                "userDoesntExist": "This user does not exist.",
                "passwordWrong": "The password is incorrect.",
                "banned": "Your account was banned. Reason: {reason}"
            }
        }
    },
    "logout": {
        "header": "Goodbye",
        "text": "You were successfully logged out!<br />Thank you for visiting MyGarage.games!",
        "snackbar": {
            "successful": "You were successfully logged out."
        }
    },
    "oauthDiscordCallback": {
        "header": "Login via Discord",
    },
    "register": {
        "header": "Create a new account",
        "form": {
            "usernamePlaceholder": "Username",
            "usernameRequirements": "Allowed characters: a-z, A-Z, 0-9, hyphens, underscores",
            "passwordPlaceholder": "Password",
            "passwordAgainPlaceholder": "Password (Again)",
            "emailPlaceholder": "Email",
            "registerButton": "Register"
        },
        "snackbar": {
            "success": "Successfully created a new account.",
            "error": {
                "emailInvalid": "Please use a valid email adress.",
                "passwordNotEqual": "The entered passwords are not identical.",
                "registerServerError": "Could not create account due to a server error. Please try again later.",
                "inUse": "This username or email is already in use!"
            }
        }
    },
    "index": {
        "welcome": "Welcome to the MyGarage.games BETA!<br />Please report bugs and feedback in the Discord, thank you!",
        "support": "Hey there, if you'd like to support me or help us fund our servers, please consider donating to the PayPal moneypool or buy one of our games on itch.io! We want to keep MyGarage.games free of advertisements and any \"plus membership\" system. <i>&dash; Laura</i>",
        "newestHeader": "Newest Games",
        "hotThisWeekHeader": "Hot this Week",
        "randomHeader": "Random",
        "popularHeader": "Popular Games",
        "previousPage": "Previous Page",
        "nextPage": "Next Page"
    },
    "find": {
        "header": "Find",
        "searchboxPlaceholder": "Enter a search query...",
        "noresults": "Couldn't find any games with this search query<br />Please try a different one!"
    },
    "talk": {
        "header": "Talk",
        "explaination": "The Game Builder Garage community is big! Here are some other community projects and hangouts to find creators and learn more about Game Builder Garage!",
        "missing": "Any projects we're missing? Let us know on our Discord!"
    },
    "channelOverview": {
        "header": "Channel Overview",
        "explaination": "Discover new games by a specific topic, style or concept."
    },
    "channelDetail": {
        "snackbar": {
            "serverError": "Channel couldn't be loaded due to a server error. Please try again later",
            "notFound": "We couldn't find a channel that matches this criteria."
        }
    },
    "gameAdd": {
        "header": "Add a new game",
        "explaination": "Have you created a game in Game Builder Garage?<br />Add it to MyGarage.games to share it with the world!",
        "rules": {
            "header": "Submission rules",
            "maynot": "Your submission <strong>may not</strong>",
            "ruleHateful": "be hateful, inappropriate, sexist or queerphobic. This includes content against other ethnicities, sexualities or minorities.",
            "ruleIP": "violate the copyright or IP of other entities.",
            "ruleExplicit": "contain adult content like nudity, hard violence or otherwise graphically disturbing content. This includes the games content, media assets and description.",
            "ruleLowEffort": "Do not create multiple submissions for the same game. Do not submit content with highly low effort.",
            "ruleContentNotice": "Please provide content descriptions if your submission has fast strobing graphic effects to protect those with sensitivities.",
            "ruleModeration": "The moderation team will hide screenshots, and remove or hide videos or submissions if needed. If you continuously break our submission rules, we might prevent you from submitting further content or deactivate your account.",
            "ruleDiscretion": "These rules are not indicative of a full list. Moderators will always act at their own discretion. We reserve the right to adjust this ruleset and make exceptions to any rule if needed."
        },
        "general": {
            "header": "General Information",
            "form": {
                "title": "Title of your entry",
                "titlePlaceholder": "My super awesome game",
                "description": "Please describe your entry. What type of experience is it? How do you play?",
                "ingameID": "Enter the ID that you see on Game Builder Garage after uploading",
                "ingameIDPlaceholder": "G-000-000-000"
            }
        },
        "discoverability": {
            "header": "Discoverability",
            "form": {
                "displayStatus": "Who should be able to see your entry?",
                "displayStatus0": "Everyone",
                "displayStatus1": "Hidden - Only people with the link can access it",
                "displayStatus2": "Private - Only you can access it",
                "channels": "Select channels for your entry (Hold CTRL to select multiple channels)",

            }
        },
        "media": {
            "header": "Additional Media",
            "form": {
                "coverFile": "Cover Image (16 by 9 format, .jpg or .png)",
                "youtubeUrl": "Do you have a YouTube trailer? Add the URL in here!"
            }
        },
        "done": {
            "success": {
                "header": "That's it!",
                "text": "Well done, your game was successfully published. You can now add screenshots, adjust the theme and share your game by visiting the games page.",
                "coverWrongFormat": "The cover file couldn't be uploaded, because it was not a valid file. Please keep in mind that only PNG and JPEG files are valid cover filetypes."
            },
            "error": {
                "header": "Whoops!",
                "text": "There was an issue publishing your game. Please try again later."
            }
        },
        "requiredNotice": "* = required",
        "action": {
            "backButton": "Back",
            "agreeButton": "I agree",
            "continueButton": "Continue",
            "goToGameButton": "Go to game page"
        },
        "snackbar": {
            "fillOut": "You have to fill out all required fields to continue.",
            "gameIDInvalid": "Your game ID is invalid (format: G-000-000-000)."
        }
    },
    "gameDelete": {
        "header": "Deleting a game",
        "explaination": "All actions are irreversible, so please be careful!",
        "confirm": {
            "header": "Are you sure?",
            "text": "You are about to remove your game <strong>{gameTitle}</strong> from MyGarage.games. All screenshots and comments will be deleted with it. This action is irreversible.",
            "nevermindButton": "Nevermind",
            "yesButton": "Yes, go ahead!"
        },
        "snackbar": {
            "success": "Game was deleted.",
            "error": "Could not delete game."
        }
    },
    "gameDetail": {
        "action": {
            "edit": "Edit",
            "delete": "Delete"
        },
        "comments": {
            "form": {
                "notLoggedIn": "Login to write comments<br />and give feedback!",
                "commentButton": "Comment"
            },
            "noComments": "This game does not have any comments yet."
        },
        "trailerOverlay": {
            "closeButton": "Close"
        },
        "snackbar": {
            "error": {
                "serverError": "Game couldn't be loaded due to a server error. Please try again later",
                "notFound": "We couldn't find a game that matches this criteria.",
                "private": "You are not allowed to see this game."
            },
            "comments": {
                "success": {
                    "posted": "Your comment was posted.",
                    "deleted": "Your comment was deleted."
                },
                "error": {
                    "serverError": "Comments couldn't be loaded due to a server error. Please try again later",
                    "postedServerError": "Comment couldn't be posted due to a server error. Please try again later",
                    "deletedServerError": "Comment couldn't be deleted due to a server error. Please try again later",
                    "notEmpty": "Comments can't be empty."
                }
            }
        }
    },
    "gameEdit": {
        "header": "Edit a game",
        "explaination": "Adjust information, add screenshots or trailers and publish / unpublish your game.",
        "media": {
            "form": {
                "fileHint": ".png / .jpg",
                "deleteCoverButton": "Delete Cover"
            }
        },
        "screenshots": {
            "header": "Screenshots"
        },
        "backToGamePageButton": "Back to game page",
        "saveButton": "Save",
        "snackbar": {
            "success": {
                "screenshotDeleted": "Screenshot was deleted.",
                "coverUpdated": "Cover was updated.",
                "coverDeleted": "Cover was deleted.",
                "screenshotUploaded": "Screenshots were uploaded successfully.",
                "saved": "Saved changes."
            },
            "error": {
                "loadServerError": "Game couldn't be loaded due to a server error. Please try again later",
                "loadNotFound": "We couldn't find a game that matches this criteria.",
                "loadPrivate": "You are not allowed to see this game.",
                "notAllowed": "You are not allowed to edit this game.",
                "screenshotDeleted": "Could not delete screenshot. Please try again later.",
                "coverWrongFormat": "Cover could not be updated because they have the wrong format. Only .png and .jpg files are allowed!",
                "coverServerError": "Could not update cover. Please try again later.",
                "coverDeleteServerError": "Could not delete cover. Please try again later.",
                "screenshotWrongFormat": "One or more screenshots could not be uploaded because they have the wrong format. Only .png and .jpg files are allowed!",
                "screenshotUploadServerError": "Your screenshots couldn't be uploaded due to a server error. Please try it again later!",
                "requiredEmpty": "Required fields cannot be empty!",
                "gameIDInvalid": "Your game ID is invalid (format: G-000-000-000).",
            }
        }
    },
    "playlistDetail": {
        "header": "Playlist",
        "nogames": "There are no games in this playlist yet.",
        "snackbar": {
            "error": {
                "notFound": "Playlist couldn't be loaded due to a server error. Please try again later",
                "notAllowed": "You are not allowed to see this playlist."
            }
        }
    },
    "userDetail": {
        "meta": {
            "pronouns": "Pronouns",
            "ingameID": "Ingame-ID",
            "joinedDate": "Joined",
            "teamVerified": "This user is a verified member of the MyGarage.games team."
        },
        "action": {
            "edit": "Edit",
            "ban": "Ban User"
        },
        "snackbar": {
            "notFound": "User couldn't be found.",
            "serverError": "User couldn't be loaded due to a server error. Please try again later",
            "banned": "This user was banned."
        },
        "nogames": "This user has not uploaded any games yet."
    },
    "userEdit": {
        "header": "Updating your profile",
        "explaination": "Uploading an avatar, changing your bio or password.",
        "tabs": {
            "general": "General",
            "avatar": "Avatar",
            "security": "Security"
        },
        "form": {
            "username": "Username",
            "pronouns": "Pronouns",
            "ingameID": "Ingame-ID",
            "ingameIDPlaceholder": "P-000-000-000",
            "avatarImage": "Avatar Image (1 by 1 format, .jpg or .png)",
            "deleteAvatarButton": "Delete Avatar",
            "email": "Email",
            "password": "Password",
            "passwordAgain": "Password (again)"
        },
        "backToProfileButton": "Back to profile",
        "saveButton": "Save",
        "snackbar": {
            "success": {
                "avatarUpdated": "Avatar was updated.",
                "avatarDeleted": "Avatar was deleted.",
                "saved": "Saved changes."
            },
            "error": {
                "notAllowed": "You are not allowed to edit this user.",
                "avatarWrongFormat": "Avatar could not be updated because they have the wrong format. Only .png and .jpg files are allowed!",
                "avatarServerError": "Could not update avatar. Please try again later.",
                "avatarDeleteServerError": "Could not delete avatar. Please try again later.",
                "usernameForbidden": "This username contains forbidden characters. Allowed characters are a-z, A-Z, 0-9, hyphens and underscores.",
                "saveServerError": "Your changes couldn't be saved due to a server error. Please try it again later!",
                "saveIngameIDInvalid": "Your profile ID is invalid (format: P-000-000-000).",
                "saveUsernameConflict": "This username is already in use!",
                "securityNotIdentical": "The entered passwords are not identical.",
                "securityEmailInvalid": "Your email is invalid!",
                "socialDiscordInvalid": "Your Discord tag is invalid. Please provide it along with your ID (example#0000)."
            }
        }
    },
    "comment": {
        "deleteButton": "Delete"
    },
    "game": {
        "snackbar": {
            "success": {
                "addToPlaylist": "{gameTitle} was added to your playlist.",
                "deleteFromPlaylist": "{gameTitle} was deleted from your playlist."
            },
            "error": {
                "addToPlaylistServerError": "Game couldn't be added to your playlist due to a server error. Please try again later",
                "deleteFromPlaylistServerError": "Game couldn't be deleted from your playlist due to a server error. Please try again later"
            }
        }
    },
    "footer": {
        "disclaimer": "MyGarage.games is a free platform by the community and in no way affiliated with Nintendo.<br />Game Builder Garage is a trademark by Nintendo.",
        "legalLink": "Legal information",
        "apiLink": "API"
    }
}

export default messages;
