const messages = {
    "header": {
        "nav": {
            "discover": "탐색",
            "channels": "채널",
            "find": "찾아보기",
            "talk": "커뮤니티"
        },
        "actions": {
            "join": "계정 만들기",
            "login": "로그인"
        }
    },
    "login": {
        "header": "로그인",
        "banned": {
            "message": "당신은 벤 당했습니다. 이게 저희 실수라고 생각하신다면, 벤 철회 신청을 해주세요.",
            "appealLinkText": "벤 철회 신청서"
        },
        "form": {
            "usernamePlaceholder": "유저 닉네임",
            "passwordPlaceholder": "비밀번호",
            "loginButton": "로그인"
        },
        "snackbar": {
            "welcomeBack": "돌아오신 것을 환영합니다, {username}",
            "error": {
                "fillOut": "모든 항목을 채워주세요.",
                "serverError": "로그인 중 서버 에러가 발생했습니다. 조금 후 시도해주세요.",
                "userDoesntExist": "해당 유저는 존재하지 않습니다.",
                "passwordWrong": "비밀번호가 틀렸습니다.",
                "banned": "당신은 벤당했습니다. 이유는: {reason}"
            }
        }
    },
    "logout": {
        "header": "잘 가세요",
        "text": "성공적으로 로그아웃 했습니다!<br /> MyGarage.games를 방문해주셔서 감사합니다!",
        "snackbar": {
            "successful": "성공적으로 로그아웃 했습니다."
        }
    },
    "oauthDiscordCallback": {
        "header": "Discord를 통해 로그인",
    },
    "register": {
        "header": "계정 만들기",
        "form": {
            "usernamePlaceholder": "유저 닉네임",
            "usernameRequirements": "가능한 문자들: a-z, A-Z, 0-9, 하이픈, 밑줄",
            "passwordPlaceholder": "비밀번호",
            "passwordAgainPlaceholder": "한 번만 더 비밀번호",
            "emailPlaceholder": "이메일 주소",
            "registerButton": "가입하기"
        },
        "snackbar": {
            "success": "성공적으로 계정을 만들었습니다.",
            "error": {
                "emailInvalid": "유효한 이메일 주소를 사용해주세요.",
                "passwordNotEqual": "입력한 주소가 서로 일치하지 않습니다.",
                "registerServerError": "서버 에러로 인해 실패했습니다. 조금 뒤 시도해주세요.",
                "inUse": "이 닉네임 또는 메일 주소는 이미 사용중입니다!"
            }
        }
    },
    "index": {
        "welcome": "MyGarage.games BETA!에 오신 것을 환영합니다!<br />버그 리포트는 디스코드에 해주세요, 감사합니다!",
        "support": "안녕하세요, 만약 저희 서버 유지비를 지원해주고 싶다면, PayPal moneypool 이나, itch.io에서 저희 게임들을 구매해주십시오. 저희 MyGarage.games는 광고 없이 전면 무료로 유지할려해요. \"프리미엄 멤버십\" 따위도 없이요. <i>&dash; Laura</i>",
        "newestHeader": "최신 게임",
        "hotThisWeekHeader": "이번주 인기",
        "randomHeader": "랜덤",
        "popularHeader": "초인기 게임",
        "previousPage": "이전 페이지",
        "nextPage": "다음 페이지"
    },
    "find": {
        "header": "검색",
        "searchboxPlaceholder": "검색할 내용을 적어주세요...",
        "noresults": "해당 검색어로 아무것도 안 떠요<br />다른 걸로 시도하세요!"
    },
    "talk": {
        "header": "커뮤니티",
        "explaination": "Game Builder Garage 커뮤니티는 엄청 큽니다! 저희에 대해 알아보고 싶거나, 또 다른 커뮤니티 프로젝트를 한 번 봐보세요!",
        "missing": "저희가 빠뜨린 프로젝트가 있을까요? 디스코드 채널에서 알려주세요!"
    },
    "channelOverview": {
        "header": "채널 둘러보기",
        "explaination": "특정 주제, 스타일, 컨셉트로 새로운 게임 찾아보기."
    },
    "channelDetail": {
        "snackbar": {
            "serverError": "서버 에러로 채널 로딩이 실패했습니다. 조금 뒤 시도해보세요",
            "notFound": "해당 기준을 만족시키는 채널을 못 찾았습니다."
        }
    },
    "gameAdd": {
        "header": "새로운 게임 추가",
        "explaination": "Game Builder Garage에서 새 게임을 만드셨나요?<br />MyGarage.games에 추가해서 세상 사람들이 플레이하게 해보세요!",
        "rules": {
            "header": "제출시 규칙",
            "maynot": "당신의 제출이 <strong>가 아니라, </strong>일 수 있습니다",
            "ruleHateful": "혐오, 부적절, 성적 문란 관련 콘텐츠. 특히, 인종차별적인, 성차별적인, 소수차별적인 콘텐츠.",
            "ruleIP": "저작권이나 IP를 침해하지 않는 콘텐츠.",
            "ruleExplicit": "성인 관련, 고어물, 혐오 유발 그래픽을 포함하는 콘텐츠. 게임 내부 또는 설명란에 게제되는 것을 포함합니다.",
            "ruleLowEffort": "한 게임을 여러번 중복해서 제출하지 마십시오. 그리고 지나치게 대충 만든 게임도 지양바랍니다.",
            "ruleContentNotice": "당신의 게임에 섬광 효과 등, 심약자에게 해가 되는 내용이 있다면 설명란에 적어주세요.",
            "ruleModeration": "관리자들이 필요한 경우에 스크린샷이나 비디오를 제거할 수 있습니다. 만약 저희 규칙을 계속 어긴다면 더 이상 업로드를 못하게 하거나 계정을 해체할 수 있습니다.",
            "ruleDiscretion": "이 규칙이 다가 아닙니다. 관리자들이 자율적으로 판단할 수도 있습니다. 규칙이 바뀔 때 공지를 하겠습니다. 그리고 예외적 상황이 일어날 때도 잘 판단하겠습니다."
        },
        "general": {
            "header": "대략적 정보",
            "form": {
                "title": "제출할 제목",
                "titlePlaceholder": "나의 킹왕짱 게임",
                "description": "제출한 게임을 설명해주세요. 어떤 경험을 할 수 있나요? 어떻게 플레이 하나요?",
                "ingameID": "업로드 후, Game Builder Garage 에 뜨는 ID를 입력해주세요",
                "ingameIDPlaceholder": "G-000-000-000"
            }
        },
        "discoverability": {
            "header": "열람 가능자",
            "form": {
                "displayStatus": "당신이 올리신 걸 누가 볼 수 있게 할래요?",
                "displayStatus0": "모두",
                "displayStatus1": "숨김 - 링크를 가진 사람만 볼 수 있음",
                "displayStatus2": "개인용 - 당신만 볼 수 있음",
                "channels": "제출할 채널을 골라주세요(CTRL을 길게 누르면 여러 채널 선택가능)",

            }
        },
        "media": {
            "header": "추가 미디어",
            "form": {
                "coverFile": "커버 이미지 (16:9 형식 .jpg 또는 .png)",
                "youtubeUrl": "유투브에 트레일러 올리셨나요? 그렇다면 URL도 주세요!"
            }
        },
        "done": {
            "success": {
                "header": "바로 그거죠!",
                "text": "수고하셨어요, 게임이 성공적으로 업로드됐어요. 이제 스크린샷을 올리거나, 테마를 변경하거나, 공유하기 기능을 쓸 수 있어요.",
                "coverWrongFormat": "커버 이미지가 업로드에 실패했습니다. 유효한 파일이 아니군요. 오로지 PNG 또는 JPEG 파일만 가능합니다."
            },
            "error": {
                "header": "어이쿠야!",
                "text": "게임 업로드 중에 문제가 발생했어요. 조금 뒤 다시 시도해주세요."
            }
        },
        "requiredNotice": "* = 필수",
        "action": {
            "backButton": "뒤로가기",
            "agreeButton": "동의하기",
            "continueButton": "계속하기",
            "goToGameButton": "게임 페이지로 이동"
        },
        "snackbar": {
            "fillOut": "모든 항목을 채워주세요.",
            "gameIDInvalid": "당신의 게임 ID 형식이 요상하네요 (형식: G-000-000-000)."
        }
    },
    "gameDelete": {
        "header": "게임 삭제",
        "explaination": "되돌릴 수 없으니 신중하게 해주세요!",
        "confirm": {
            "header": "확실하신가요?",
            "text": "당신은 MyGarage.games. 에서 이 게임을 삭제하려합니다 <strong>{gameTitle}</strong> . 모든 스크린샷과 댓글을 함께 제거됩니다. 되돌릴 수 없습니다.",
            "nevermindButton": "음, 그렇다면 취소각",
            "yesButton": "예, 확신합니다!"
        },
        "snackbar": {
            "success": "게임이 삭제되었습니다.",
            "error": "게임 삭제 불가."
        }
    },
    "gameDetail": {
        "action": {
            "edit": "수정하기",
            "delete": "삭제하기"
        },
        "comments": {
            "form": {
                "notLoggedIn": "댓글을 쓰려면 로그인 해주세요<br />",
                "commentButton": "댓글"
            },
            "noComments": "이 게임에는 댓글이 없어요."
        },
        "trailerOverlay": {
            "closeButton": "닫기"
        },
        "snackbar": {
            "error": {
                "serverError": "서버 에러로 인해 게임 로딩에 실패했습니다. 조금 뒤 시도해주세요.",
                "notFound": "해당 범주 내의 게임을 찾지 못했습니다.",
                "private": "해당 게임을 볼 권한이 없습니다."
            },
            "comments": {
                "success": {
                    "posted": "댓글을 올렸습니다.",
                    "deleted": "댓글이 삭제되었습니다."
                },
                "error": {
                    "serverError": "서버 에러로 인해 댓글을 읽어올 수 없습니다. 조금 뒤 시도해주세요.",
                    "postedServerError": "서버 에러로 인해 댓글을 올릴 수 없습니다. 조금 뒤 시도해주세요. ",
                    "deletedServerError": "서버 에러로 인해 댓글을 지울 수 없습니다. 조금 뒤 시도해주세요.",
                    "notEmpty": "댓글을 비운 채 올릴 수 없습니다."
                }
            }
        }
    },
    "gameEdit": {
        "header": "게임 편집하기",
        "explaination": "설명란 편집하기, 스크린샷 추가하기, 트레일러 추가하기, 업로드하기 / 내리기.",
        "media": {
            "form": {
                "fileHint": ".png / .jpg",
                "deleteCoverButton": "커버 삭제하기"
            }
        },
        "screenshots": {
            "header": "스크린샷"
        },
        "backToGamePageButton": "게임 페이지로 돌아가기",
        "saveButton": "저장하기",
        "snackbar": {
            "success": {
                "screenshotDeleted": "스크린샷 삭제하기.",
                "coverUpdated": "커버 업데이트 완료.",
                "coverDeleted": "커버 삭제 완료.",
                "screenshotUploaded": "스크린샷 업로드 완료.",
                "saved": "저장 완료."
            },
            "error": {
                "loadServerError": "서버 에러로 인해 게임 로딩이 안됩니다. 조금 뒤 다시 시도하세요.",
                "loadNotFound": "해당 범주내의 게임을 못 찾았습니다.",
                "loadPrivate": "해당 게임을 볼 권한이 없습니다..",
                "notAllowed": "해당 게임을 수정할 권한이 없습니다.",
                "screenshotDeleted": "스크린샷을 삭제할 수 없습니다.",
                "coverWrongFormat": "커버 사진을 업데이트할 수 없습니다. 파일 유형이 잘못된것 같습니다. .png 또는 .jpg 파일만 가능합니다!",
                "coverServerError": "커버 업데이트 실패. 다시 시도하세요.",
                "coverDeleteServerError": "커버 삭제 실패. 다시 시도하세요.",
                "screenshotWrongFormat": "몇 스크린샷이 유형이 잘못되었습니다.  .png 또는 .jpg 파일만 가능합니다!",
                "screenshotUploadServerError": "서버 에러 때문에 스샷 업로드에 실패했습니다. 조금 뒤 시도해보세요!",
                "requiredEmpty": "필수 항목을 채워주세요!",
                "gameIDInvalid": "당신의 게임ID 형식이 잘못 되었습니다 (형식: G-000-000-000).",
            }
        }
    },
    "playlistDetail": {
        "header": "플레이리스트",
        "nogames": "해당 플레이리스트 내 게임이 없습니다.",
        "snackbar": {
            "error": {
                "notFound": "서버 에러로 인해 플레이리스트 로딩 실패. 조금 뒤 시도해주세요.",
                "notAllowed": "이 플레이리스트를 볼 권한이 없습니다."
            }
        }
    },
    "userDetail": {
        "meta": {
            "pronouns": "대명사",
            "ingameID": "인게임ID",
            "joinedDate": "가입완료",
            "teamVerified": "이 유저는 MyGarage.games에서 인증한 회원입니다."
        },
        "action": {
            "edit": "수정하기",
            "ban": "유저 벤"
        },
        "snackbar": {
            "notFound": "유저를 찾을 수 없습니다.",
            "serverError": "서버 에러로 인해 유저 로딩 실패. 조금 뒤 시도하세요",
            "banned": "이 유저는 벤 당했습니다."
        },
        "nogames": "이 유저는 업로드한 게임이 없습니다."
    },
    "userEdit": {
        "header": "프로필 업데이트 완료",
        "explaination": "아바타 업로드 중. 자기 소개 및 비밀번호 변경 중.",
        "tabs": {
            "general": "일반",
            "avatar": "아바타",
            "security": "보안"
        },
        "form": {
            "username": "유저 닉네임",
            "pronouns": "대명사",
            "ingameID": "인게임ID",
            "ingameIDPlaceholder": "P-000-000-000",
            "avatarImage": "아바타 사진 (1 : 1 비율, .jpg 또는 .png)",
            "deleteAvatarButton": "아바타 삭제",
            "email": "이메일 주소",
            "password": "비밀번호",
            "passwordAgain": "비밀번호 재입력"
        },
        "backToProfileButton": "프로필로 돌아가기",
        "saveButton": "저장하기",
        "snackbar": {
            "success": {
                "avatarUpdated": "아바타 업데이트 완료.",
                "avatarDeleted": "아바타 삭제 완료.",
                "saved": "변경사항 저장 완료."
            },
            "error": {
                "notAllowed": "해당 유저를 편집할 권한이 없습니다.",
                "avatarWrongFormat": "아바타 업데이트 불가. 파일 유형 중에서 .png 와 .jpg 만 가능함!",
                "avatarServerError": "아바타 업데이트 불가 재시도 바람.",
                "avatarDeleteServerError": "아바타 삭제 불가 재시도 바람.",
                "usernameForbidden": "아바타 이름에 사용 불가능한 문자 포함. a-z, A-Z, 0-9, 하이픈, 밑줄만 사용 가능.",
                "saveServerError": "서버 에러로 인해 변경사항 저장 불가. 다시 시도하세요!",
                "saveIngameIDInvalid": "프로필 ID 유효하지 않음 (유형: P-000-000-000).",
                "saveUsernameConflict": "해당 유저명은 이미 사용중입니다!",
                "securityNotIdentical": "입력한 비밀번호가 일치하지 않습니다.",
                "securityEmailInvalid": "당신의 이메일 주소는 유효하지 않습니다!",
                "socialDiscordInvalid": "디스코드 태그가 유효하지 않습니다. ID와 함께 다시 제공해주세요  (예시#0000)."
            }
        }
    },
    "comment": {
        "deleteButton": "삭제"
    },
    "game": {
        "snackbar": {
            "success": {
                "addToPlaylist": "{gameTitle} 은 당신의 플레이리스트에 추가되었습니다.",
                "deleteFromPlaylist": "{gameTitle} 가 당신의 플레이리스트에서 삭제되었습니다."
            },
            "error": {
                "addToPlaylistServerError": "서버 에러로 인해 플레이리스트에 추가되지 못했습니다. 다시 시도하세요",
                "deleteFromPlaylistServerError": "서버 에러로 인해 플레이리스트에서 삭제되지 않았습니다. 다시 시도하세요"
            }
        }
    },
    "footer": {
        "disclaimer": "MyGarage.games 는 커뮤니티가 자발적으로 만든 무료 커뮤니티입니다. 닌텐도사와는 관련이 없습니다./>Game Builder Garage 는 닌텐도가 등록한 상표입니다.",
        "legalLink": "법률 정보",
        "apiLink": "API"
    }
}

export default messages;
