const messages = {
    "header": {
        "nav": {
            "discover": "Découvrir",
            "channels": "Chaînes",
            "find": "Rechercher",
            "talk": "Discuter"
        },
        "actions": {
            "join": "Nous rejoindre !",
            "login": "Se connecter"
        }
    },
    "login": {
        "header": "Se connecter",
        "banned": {
            "message": "Vous avez été banni. Si vous pensez qu'il s'agit d'une erreur, vous pouvez contester votre bannissement.",
            "appealLinkText": "Formulaire de contestation"
        },
        "form": {
            "usernamePlaceholder": "Nom d'utilisateur",
            "passwordPlaceholder": "Mot de passe",
            "loginButton": "Se connecter"
        },
        "snackbar": {
            "welcomeBack": "Heureux de vous revoir, {username}",
            "error": {
                "fillOut": "Tous les champs doivent être remplis.",
                "serverError": "Une erreur s'est produite au niveau du serveur. Veuillez réessayer ultérieurement.",
                "userDoesntExist": "Cet utilisateur n'existe pas.",
                "passwordWrong": "Le mot de passe est incorrect.",
                "banned": "Votre compte à été banni. Motif : {reason}"
            }
        }
    },
    "logout": {
        "header": "Au revoir",
        "text": "Vous êtes désormais déconnecté !<br />Merci de votre visite sur myGarage.games!",
        "snackbar": {
            "successful": "Vous êtes désormais déconnecté."
        }
    },
    "oauthDiscordCallback": {
        "header": "Se connecter avec Discord",
    },
    "register": {
        "header": "Créer un compte",
        "form": {
            "usernamePlaceholder": "Nom d'utilisateur",
            "usernameRequirements": "Caractères autorisés : a-z, A-Z, 0-9, tirets et tirets bas",
            "passwordPlaceholder": "Mot de passe",
            "passwordAgainPlaceholder": "Confirmer le mot de passe",
            "emailPlaceholder": "Email",
            "registerButton": "Créer un compte"
        },
        "snackbar": {
            "success": "Votre compte a été créé avec succès.",
            "error": {
                "emailInvalid": "Veuillez entrer une adresse email valide.",
                "passwordNotEqual": "Les mots de passe ne correspondent pas.",
                "registerServerError": "Une erreur s'est produite au niveau du serveur. Veuillez réessayer ultérieurement.",
                "inUse": "Ce nom d'utilisateur ou cette adresse email est déjà utlisée."
            }
        }
    },
    "index": {
        "welcome": "Bienvenue sur la bêta de MyGarage.games !<br />Merci de nous faire part de votre avis ou de signaler des bugs sur Discord !",
        "support": "Salut, si vous souhaitez nous soutenir ou nous aider à financer nos serveurs, vous pouvez contribuer à notre cagnotte PayPal, ou acheter un de nos jeux sur itch.io ! Nous voulons tenir MyGarage.games à l'écart des publicités et des systèmes d'abonnements premium. <i>&dash; Laura</i>",
        "newestHeader": "Nouveaux jeux",
        "popularHeader": "Jeux populaires"
    },
    "find": {
        "header": "Rechercher",
        "searchboxPlaceholder": "Entrez un terme de recherche...",
        "noresults": "Aucun résultat trouvé pour ces termes de recherche.<br />Essayez-en d'autres !"
    },
    "talk": {
        "header": "Discuter",
        "explaination": "La communauté de l'Atelier du jeu vidéo est immense ! Voici quelques projets communautaires et lieux de discussion, où vous pourrez rencontrer des créateurs et en apprendre plus sur l'Atelier du jeu vidéo !",
        "missing": "Il manque des projets ? Faites-le-nous savoir sur Discord !"
    },
    "channelOverview": {
        "header": "Liste des chaînes",
        "explaination": "Découvrez de nouveaux jeux selon des thèmes, styles ou concepts particuliers."
    },
    "channelDetail": {
        "snackbar": {
            "serverError": "Une erreur s'est produite au niveau du serveur. Veuillez réessayer ultérieurement",
            "notFound": "Aucune chaîne n'a été trouvée selon ces critères."
        }
    },
    "gameAdd": {
        "header": "Publier un jeu",
        "explaination": "Vous avez créé un jeu dans l'Atelier du jeu vidéo ?<br />Publiez-le sur MyGarage.games pour le partager avec le monde entier !",
        "rules": {
            "header": "Règles de publication",
            "maynot": "Votre jeu <strong>ne peut</strong>",
            "ruleHateful": "inclure du contenu haineux, inapproprié, sexiste ou queerphobe. Cela inclut le contenu visant des groupes ethniques, des identités sexuelles ou des minorités.",
            "ruleIP": "enfreindre les droits d'auteurs et les propriétés intellectuelles d'autrui.",
            "ruleExplicit": "inclure du contenu pour adultes, tels que la nudité, la violence extrême, ou tout autre imagerie dérangeante. Cela s'applique au contenu du jeu, aux médias additionnels, et à la description.",
            "ruleLowEffort": "Ne soumettez pas le même jeu plusieurs fois. Ne soumettez pas de contenu créé sans effort créatif.",
            "ruleContentNotice": "Veuillez signaler si votre jeu contient des effets lumineux forts ou répétés afin de protéger les personnes qui y sont sensibles.",
            "ruleModeration": "L'équipe de modération peut masquer voire retirer les contenus soumis qui enfreignent les règles ci-dessus. En cas d'infractions répétées, l'accès à certaines fonctionnalités du site peut être restreint.",
            "ruleDiscretion": "Cette liste n'est pas exhaustive. Les modérateurs agissent toujours selon leur propre jugement. Nous nous réservons le droit d'ajuster ces règles et de leur faire exception si besoin."
        },
        "general": {
            "header": "Informations de base",
            "form": {
                "title": "Nom de votre jeu",
                "titlePlaceholder": "Mon jeu super génial",
                "description": "Décrivez votre jeu, à quoi le joueur doit-il s'attendre, et la façon d'y jouer",
                "ingameID": "Entrez l'identifiant du jeu fourni après avoir partagé votre jeu",
                "ingameIDPlaceholder": "G-000-000-000"
            }
        },
        "discoverability": {
            "header": "Visibilité",
            "form": {
                "displayStatus": "Qui peut voir votre jeu ?",
                "displayStatus0": "Tout le monde",
                "displayStatus1": "Caché - Seules les personnes disposant du lien peuvent le voir",
                "displayStatus2": "Privé - Seul vous pouvez le voir",
                "channels": "Sélectionnez les chaînes de votre jeu (Maintenez Ctrl pour en sélectionner plusieurs)",

            }
        },
        "media": {
            "header": "Médias additionnels",
            "form": {
                "coverFile": "Photo de couverture (Fichier JPEG ou PNG au format 16/9)",
                "youtubeUrl": "Vous avez publié une bande-annonce du jeu sur YouTube ? Entrez le lien ici !"
            }
        },
        "done": {
            "success": {
                "header": "Et voilà !",
                "text": "Bien joué, votre jeu a été publié avec succès. Vous pouvez ajouter des captures d'écran, ajuster le thème, et partager votre jeu depuis sa page.",
                "coverWrongFormat": "La photo de couverture n'est pas un fichier valide. Seuls les fichiers JPEG et PNG sont acceptés."
            },
            "error": {
                "header": "Oups !",
                "text": "Une erreur s'est produite. Veuillez réessayer ultérieurement."
            }
        },
        "requiredNotice": "* = requis",
        "action": {
            "backButton": "Retour",
            "agreeButton": "Accepter",
            "continueButton": "Continuer",
            "goToGameButton": "Page du jeu"
        },
        "snackbar": {
            "fillOut": "Tous les champs requis doivent être remplis pour continuer.",
            "gameIDInvalid": "Votre identifiant de jeu est invalide. Assurez-vous que le format est correct : G-000-000-000"
        }
    },
    "gameDelete": {
        "header": "Supprimer un jeu",
        "explaination": "Cette action est irréversible, faites attention !",
        "confirm": {
            "header": "Êtes-vous sûr(e) ?",
            "text": "Vous êtes sur le point de supprimer <strong>{gameTitle}</strong> de MyGarage.games. Les commentaires et captures d'écran seront également supprimés. Cette action est irréversible.",
            "nevermindButton": "Annuler",
            "yesButton": "Supprimer"
        },
        "snackbar": {
            "success": "Le jeu a été supprimé.",
            "error": "Une erreur s'est produite. Veuillez réessayer ultérieurement."
        }
    },
    "gameDetail": {
        "action": {
            "edit": "Modifier",
            "delete": "Supprimer"
        },
        "comments": {
            "form": {
                "notLoggedIn": "Connectez-vous pour<br />partager votre avis !",
                "commentButton": "Commenter"
            },
            "noComments": "Aucun commentaire pour l'instant."
        },
        "trailerOverlay": {
            "closeButton": "Fermer"
        },
        "snackbar": {
            "error": {
                "serverError": "Une erreur s'est produite au niveau du serveur. Veuillez réessayer ultérieurement.",
                "notFound": "Aucun jeu ne correspond à ces critères.",
                "private": "Vous n'avez pas l'autorisation de voir ce jeu."
            },
            "comments": {
                "success": {
                    "posted": "Commentaire posté.",
                    "deleted": "Commentaire supprimé"
                },
                "error": {
                    "serverError": "Une erreur s'est produite au niveau du serveur. Veuillez réessayer ultérieurement.",
                    "postedServerError": "Une erreur s'est produite au niveau du serveur. Veuillez réessayer ultérieurement.",
                    "deletedServerError": "Une erreur s'est produite au niveau du serveur. Veuillez réessayer ultérieurement.",
                    "notEmpty": "Le commentaire ne peut pas être vide."
                }
            }
        }
    },
    "gameEdit": {
        "header": "Modifier le jeu",
        "explaination": "Modifiez la description, ajoutez des captures du jeu, et modifiez les paramètres de visibilité.",
        "media": {
            "form": {
                "fileHint": "PNG ou JPEG",
                "deleteCoverButton": "Supprimer la photo"
            }
        },
        "screenshots": {
            "header": "Captures d'écran"
        },
        "backToGamePageButton": "Retour à la page du jeu",
        "saveButton": "Enregistrer",
        "snackbar": {
            "success": {
                "screenshotDeleted": "Capture d'écran supprimée.",
                "coverUpdated": "Photo de couverture mise à jour.",
                "coverDeleted": "Photo de couverture supprimée.",
                "screenshotUploaded": "Captures d'écrans téléchargées avec succès.",
                "saved": "Modifications enregistrées."
            },
            "error": {
                "loadServerError": "Une erreur s'est produite au niveau du serveur. Veuillez réessayer ultérieurement.",
                "loadNotFound": "Aucun jeu ne correspond à ces critères.",
                "loadPrivate": "Vous n'avez pas l'autorisation de voir ce jeu.",
                "notAllowed": "Vous n'avez pas l'autorisation de modifier ce jeu.",
                "screenshotDeleted": "Impossible de supprimer la capture d'écran. Veuillez réessayer ultérieurement.",
                "coverWrongFormat": "La photo de couverture n'est pas un fichier valide. Seuls les fichiers JPEG et PNG sont acceptés.",
                "coverServerError": "Impossible de mettre à jour la photo de couverture. Veuillez réessayer ultérieurement.",
                "coverDeleteServerError": "Impossible de supprimer la photo de couverture. Veuillez réessayer ultérieurement.",
                "screenshotWrongFormat": "Une ou plusieurs captures d'écran ne sont pas des fichiers valides. Seuls les fichiers JPEG et PNG sont acceptés.",
                "screenshotUploadServerError": "Une erreur s'est produite au niveau du serveur. Veuillez réessayer ultérieurement.",
                "requiredEmpty": "Tous les champs requis doivent être remplis pour continuer.",
                "gameIDInvalid": "Votre identifiant de jeu est invalide. Assurez-vous que le format est correct : G-000-000-000",
            }
        }
    },
    "playlistDetail": {
        "header": "Liste de jeux",
        "nogames": "Cette liste ne contient aucun jeu.",
        "snackbar": {
            "error": {
                "notFound": "Une erreur s'est produite au niveau du serveur. Veuillez réessayer ultérieurement.",
                "notAllowed": "Vous n'avez pas l'autorisation de voir cette liste de jeux."
            }
        }
    },
    "userDetail": {
        "meta": {
            "pronouns": "Pronoms",
            "ingameID": "Identifiant de créateur",
            "joinedDate": "A rejoint le",
            "teamVerified": "Cet utilisateur est un membre de l'équipe MyGarage.games."
        },
        "action": {
            "edit": "Modifier",
            "ban": "Bannir cet utilisateur"
        },
        "nogames": "Cet utilisateur n'a pas encore publié de jeu."
    },
    "userEdit": {
        "header": "Mettre à jour votre profil",
        "explaination": "Ajoutez un avatar et modifiez vos informations.",
        "tabs": {
            "general": "Infos générales",
            "avatar": "Avatar",
            "security": "Securité"
        },
        "form": {
            "username": "Nom d'utilisateur",
            "pronouns": "Pronoms",
            "ingameID": "Identifiant de créateur",
            "ingameIDPlaceholder": "P-000-000-000",
            "avatarImage": "Avatar (Fichier JPEG ou PNG au format carré)",
            "deleteAvatarButton": "Supprimer l'avatar",
            "email": "Email",
            "password": "Mot de passe",
            "passwordAgain": "Confirmer le mot de passe"
        },
        "backToProfileButton": "Retour au profil",
        "saveButton": "Enregistrer",
        "snackbar": {
            "success": {
                "avatarUpdated": "Avatar mis à jour.",
                "avatarDeleted": "Avatar supprimé.",
                "saved": "Modifications enregistrées."
            },
            "error": {
                "notAllowed": "Vous n'avez pas l'autorisation de modifier ce profil.",
                "avatarWrongFormat": "L'avatar n'est pas un fichier valide. Seuls les fichiers JPEG et PNG sont acceptés.",
                "avatarServerError": "Impossible de modifier l'avatar. Veuillez réessayer ultérieurement.",
                "avatarDeleteServerError": "Impossible de supprimer l'avatar. Veuillez réessayer ultérieurement.",
                "usernameForbidden": "Ce nom d'utilisateur contient des caractères non-autorisés. Les caractères autorisés sont a-z, A-Z, 0-9, tirets et tirets bas.",
                "saveServerError": "Une erreur s'est produite au niveau du serveur. Veuillez réessayer ultérieurement.",
                "saveIngameIDInvalid": "Votre identifiant de créateur est invalide. Assurez-vous que le format est correct : P-000-000-000",
                "saveUsernameConflict": "Ce nom d'utilisateur est déjà utilisé",
                "securityNotIdentical": "Les mots de passe de correspondent pas.",
                "securityEmailInvalid": "Cette adresse email est déjà utilisée."
            }
        }
    },
    "comment": {
        "deleteButton": "Supprimer"
    },
    "game": {
        "snackbar": {
            "success": {
                "addToPlaylist": "{gameTitle} a été ajouté à votre liste de jeux.",
                "deleteFromPlaylist": "{gameTitle} a été supprimé de votre liste de jeu."
            },
            "error": {
                "addToPlaylistServerError": "Une erreur s'est produite au niveau du serveur. Veuillez réessayer ultérieurement.",
                "deleteFromPlaylistServerError": "Une erreur s'est produite au niveau du serveur. Veuillez réessayer ultérieurement."
            }
        }
    },
    "footer": {
        "disclaimer": "MyGarage.games est une plateforme gratuite, créée par la communauté, et n'est en aucune façon affiliée à Nintendo.<br />L'Atelier du jeu vidéo est une marque déposée de Nintendo.",
        "legalLink": "Informations légales",
        "apiLink": "API"
    }
}

export default messages;