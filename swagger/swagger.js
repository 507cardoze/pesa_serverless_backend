// this file was generated by serverless-auto-swagger
            module.exports = {
  "swagger": "2.0",
  "info": {
    "title": "Pesa Serverless Backend",
    "version": "1"
  },
  "paths": {
    "/me": {
      "get": {
        "summary": "User Profile Information",
        "description": "Get the user profile information",
        "tags": [
          "Logged User"
        ],
        "operationId": "me.get.me",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "Success",
            "schema": {
              "$ref": "#/definitions/UserInfoResponse"
            }
          },
          "403": {
            "description": "Forbidden",
            "schema": {
              "$ref": "#/definitions/ErrorResponse"
            }
          },
          "500": {
            "description": "internalServerError",
            "schema": {
              "$ref": "#/definitions/ErrorResponse"
            }
          }
        },
        "security": [
          {
            "Authorization": []
          }
        ]
      }
    },
    "/player": {
      "post": {
        "summary": "Create player if does not exist",
        "description": "Create player if does not exist",
        "tags": [
          "Player"
        ],
        "operationId": "player.post.player",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "body",
            "name": "body",
            "description": "Body required in the request",
            "required": true,
            "schema": {
              "$ref": "#/definitions/PlayerInitType"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "schema": {
              "$ref": "#/definitions/PlayerResponse"
            }
          },
          "403": {
            "description": "Forbidden",
            "schema": {
              "$ref": "#/definitions/ErrorResponse"
            }
          },
          "500": {
            "description": "internalServerError",
            "schema": {
              "$ref": "#/definitions/ErrorResponse"
            }
          }
        },
        "security": [
          {
            "Authorization": []
          }
        ]
      }
    }
  },
  "definitions": {
    "UserInfoResponse": {
      "properties": {
        "message": {
          "title": "UserInfoResponse.message",
          "type": "string"
        },
        "userInfo": {
          "$ref": "#/definitions/UserInfo",
          "title": "UserInfoResponse.userInfo"
        },
        "upcomingEvents": {
          "anyOf": [
            {
              "items": {
                "$ref": "#/definitions/UpcomingEventsEntity",
                "title": "UserInfoResponse.upcomingEvents.[]"
              },
              "title": "UserInfoResponse.upcomingEvents.[]",
              "type": "array"
            },
            {
              "title": "UserInfoResponse.upcomingEvents",
              "nullable": true
            }
          ],
          "title": "UserInfoResponse.upcomingEvents"
        }
      },
      "required": [
        "message",
        "userInfo"
      ],
      "additionalProperties": false,
      "title": "UserInfoResponse",
      "type": "object"
    },
    "UserInfo": {
      "properties": {
        "uid": {
          "title": "UserInfo.uid",
          "type": "string"
        },
        "displayName": {
          "title": "UserInfo.displayName",
          "type": "string"
        },
        "email": {
          "title": "UserInfo.email",
          "type": "string"
        },
        "phoneNumber": {
          "title": "UserInfo.phoneNumber",
          "nullable": true,
          "type": "string"
        },
        "photoURL": {
          "title": "UserInfo.photoURL",
          "nullable": true,
          "type": "string"
        },
        "isAdmin": {
          "title": "UserInfo.isAdmin",
          "type": "boolean"
        },
        "teams": {
          "anyOf": [
            {
              "items": {
                "$ref": "#/definitions/TeamsEntity",
                "title": "UserInfo.teams.[]"
              },
              "title": "UserInfo.teams.[]",
              "type": "array"
            },
            {
              "title": "UserInfo.teams",
              "nullable": true
            }
          ],
          "title": "UserInfo.teams"
        },
        "invitations": {
          "anyOf": [
            {
              "items": {
                "$ref": "#/definitions/InvitationsEntity",
                "title": "UserInfo.invitations.[]"
              },
              "title": "UserInfo.invitations.[]",
              "type": "array"
            },
            {
              "title": "UserInfo.invitations",
              "nullable": true
            }
          ],
          "title": "UserInfo.invitations"
        }
      },
      "required": [
        "uid",
        "displayName",
        "email",
        "phoneNumber",
        "isAdmin"
      ],
      "additionalProperties": false,
      "title": "UserInfo",
      "type": "object"
    },
    "TeamsEntity": {
      "properties": {
        "id": {
          "title": "TeamsEntity.id",
          "type": "string"
        },
        "displayName": {
          "title": "TeamsEntity.displayName",
          "type": "string"
        },
        "logoUrl": {
          "title": "TeamsEntity.logoUrl",
          "type": "string"
        },
        "roles": {
          "anyOf": [
            {
              "items": {
                "$ref": "#/definitions/RolesEntity",
                "title": "TeamsEntity.roles.[]"
              },
              "title": "TeamsEntity.roles.[]",
              "type": "array"
            },
            {
              "title": "TeamsEntity.roles",
              "nullable": true
            }
          ],
          "title": "TeamsEntity.roles"
        },
        "inscription": {
          "$ref": "#/definitions/Inscription",
          "title": "TeamsEntity.inscription"
        }
      },
      "required": [
        "id",
        "displayName",
        "logoUrl",
        "inscription"
      ],
      "additionalProperties": false,
      "title": "TeamsEntity",
      "type": "object"
    },
    "RolesEntity": {
      "properties": {
        "id": {
          "title": "RolesEntity.id",
          "type": "string"
        },
        "name": {
          "title": "RolesEntity.name",
          "type": "string"
        },
        "roster": {
          "$ref": "#/definitions/Roster",
          "title": "RolesEntity.roster"
        }
      },
      "required": [
        "id",
        "name",
        "roster"
      ],
      "additionalProperties": false,
      "title": "RolesEntity",
      "type": "object"
    },
    "Roster": {
      "properties": {
        "id": {
          "title": "Roster.id",
          "type": "string"
        },
        "teamId": {
          "title": "Roster.teamId",
          "type": "string"
        },
        "playerId": {
          "title": "Roster.playerId",
          "type": "string"
        },
        "roleId": {
          "title": "Roster.roleId",
          "type": "string"
        },
        "createdAt": {
          "title": "Roster.createdAt",
          "type": "string"
        },
        "updatedAt": {
          "title": "Roster.updatedAt",
          "type": "string"
        },
        "deletedAt": {
          "title": "Roster.deletedAt",
          "nullable": true
        }
      },
      "required": [
        "id",
        "teamId",
        "playerId",
        "roleId",
        "createdAt",
        "updatedAt"
      ],
      "additionalProperties": false,
      "title": "Roster",
      "type": "object"
    },
    "Inscription": {
      "properties": {
        "id": {
          "title": "Inscription.id",
          "type": "string"
        },
        "eventId": {
          "title": "Inscription.eventId",
          "type": "string"
        },
        "teamId": {
          "title": "Inscription.teamId",
          "type": "string"
        },
        "playerId": {
          "title": "Inscription.playerId",
          "type": "string"
        },
        "createdAt": {
          "title": "Inscription.createdAt",
          "type": "string"
        },
        "updatedAt": {
          "title": "Inscription.updatedAt",
          "type": "string"
        },
        "deletedAt": {
          "title": "Inscription.deletedAt",
          "nullable": true
        }
      },
      "required": [
        "id",
        "eventId",
        "teamId",
        "playerId",
        "createdAt",
        "updatedAt"
      ],
      "additionalProperties": false,
      "title": "Inscription",
      "type": "object"
    },
    "InvitationsEntity": {
      "properties": {
        "id": {
          "title": "InvitationsEntity.id",
          "type": "string"
        },
        "team": {
          "$ref": "#/definitions/Team",
          "title": "InvitationsEntity.team"
        }
      },
      "required": [
        "id",
        "team"
      ],
      "additionalProperties": false,
      "title": "InvitationsEntity",
      "type": "object"
    },
    "Team": {
      "properties": {
        "id": {
          "title": "Team.id",
          "type": "string"
        },
        "displayName": {
          "title": "Team.displayName",
          "type": "string"
        },
        "logoUrl": {
          "title": "Team.logoUrl",
          "type": "string"
        }
      },
      "required": [
        "id",
        "displayName",
        "logoUrl"
      ],
      "additionalProperties": false,
      "title": "Team",
      "type": "object"
    },
    "UpcomingEventsEntity": {
      "properties": {
        "id": {
          "title": "UpcomingEventsEntity.id",
          "type": "string"
        },
        "name": {
          "title": "UpcomingEventsEntity.name",
          "type": "string"
        },
        "description": {
          "title": "UpcomingEventsEntity.description",
          "type": "string"
        },
        "inscripInitDate": {
          "title": "UpcomingEventsEntity.inscripInitDate",
          "type": "string"
        },
        "inscripEndDate": {
          "title": "UpcomingEventsEntity.inscripEndDate",
          "type": "string"
        },
        "isCoaching": {
          "title": "UpcomingEventsEntity.isCoaching",
          "type": "boolean"
        },
        "isLive": {
          "title": "UpcomingEventsEntity.isLive",
          "type": "boolean"
        },
        "bannerUrl": {
          "title": "UpcomingEventsEntity.bannerUrl",
          "type": "string"
        },
        "gameMode": {
          "$ref": "#/definitions/GameMode",
          "title": "UpcomingEventsEntity.gameMode"
        },
        "videoGame": {
          "$ref": "#/definitions/VideoGame",
          "title": "UpcomingEventsEntity.videoGame"
        },
        "playersInscriptions": {
          "anyOf": [
            {
              "items": {
                "anyOf": [
                  {
                    "$ref": "#/definitions/PlayersInscriptionsEntity",
                    "title": "UpcomingEventsEntity.playersInscriptions.[]"
                  },
                  {
                    "title": "UpcomingEventsEntity.playersInscriptions.[]",
                    "nullable": true
                  }
                ],
                "title": "UpcomingEventsEntity.playersInscriptions.[]"
              },
              "title": "UpcomingEventsEntity.playersInscriptions.[]",
              "type": "array"
            },
            {
              "title": "UpcomingEventsEntity.playersInscriptions",
              "nullable": true
            }
          ],
          "title": "UpcomingEventsEntity.playersInscriptions"
        },
        "teamsInscriptions": {
          "anyOf": [
            {
              "items": {
                "anyOf": [
                  {
                    "$ref": "#/definitions/TeamsInscriptionsEntity",
                    "title": "UpcomingEventsEntity.teamsInscriptions.[]"
                  },
                  {
                    "title": "UpcomingEventsEntity.teamsInscriptions.[]",
                    "nullable": true
                  }
                ],
                "title": "UpcomingEventsEntity.teamsInscriptions.[]"
              },
              "title": "UpcomingEventsEntity.teamsInscriptions.[]",
              "type": "array"
            },
            {
              "title": "UpcomingEventsEntity.teamsInscriptions",
              "nullable": true
            }
          ],
          "title": "UpcomingEventsEntity.teamsInscriptions"
        }
      },
      "required": [
        "id",
        "name",
        "description",
        "inscripInitDate",
        "inscripEndDate",
        "isCoaching",
        "isLive",
        "bannerUrl",
        "gameMode",
        "videoGame"
      ],
      "additionalProperties": false,
      "title": "UpcomingEventsEntity",
      "type": "object"
    },
    "GameMode": {
      "properties": {
        "name": {
          "title": "GameMode.name",
          "type": "string"
        },
        "description": {
          "title": "GameMode.description",
          "type": "string"
        }
      },
      "required": [
        "name",
        "description"
      ],
      "additionalProperties": false,
      "title": "GameMode",
      "type": "object"
    },
    "VideoGame": {
      "properties": {
        "displayName": {
          "title": "VideoGame.displayName",
          "type": "string"
        },
        "hardware": {
          "anyOf": [
            {
              "items": {
                "$ref": "#/definitions/HardwareEntity",
                "title": "VideoGame.hardware.[]"
              },
              "title": "VideoGame.hardware.[]",
              "type": "array"
            },
            {
              "title": "VideoGame.hardware",
              "nullable": true
            }
          ],
          "title": "VideoGame.hardware"
        }
      },
      "required": [
        "displayName"
      ],
      "additionalProperties": false,
      "title": "VideoGame",
      "type": "object"
    },
    "HardwareEntity": {
      "properties": {
        "displayName": {
          "title": "HardwareEntity.displayName",
          "type": "string"
        },
        "videoGameHardware": {
          "$ref": "#/definitions/VideoGameHardware",
          "title": "HardwareEntity.videoGameHardware"
        }
      },
      "required": [
        "displayName",
        "videoGameHardware"
      ],
      "additionalProperties": false,
      "title": "HardwareEntity",
      "type": "object"
    },
    "VideoGameHardware": {
      "properties": {
        "id": {
          "title": "VideoGameHardware.id",
          "type": "string"
        },
        "idVideoGame": {
          "title": "VideoGameHardware.idVideoGame",
          "type": "string"
        },
        "idHardware": {
          "title": "VideoGameHardware.idHardware",
          "type": "string"
        },
        "createdAt": {
          "title": "VideoGameHardware.createdAt",
          "type": "string"
        },
        "updatedAt": {
          "title": "VideoGameHardware.updatedAt",
          "type": "string"
        },
        "deletedAt": {
          "title": "VideoGameHardware.deletedAt",
          "nullable": true
        }
      },
      "required": [
        "id",
        "idVideoGame",
        "idHardware",
        "createdAt",
        "updatedAt"
      ],
      "additionalProperties": false,
      "title": "VideoGameHardware",
      "type": "object"
    },
    "PlayersInscriptionsEntity": {
      "properties": {
        "uid": {
          "title": "PlayersInscriptionsEntity.uid",
          "type": "string"
        },
        "displayName": {
          "title": "PlayersInscriptionsEntity.displayName",
          "type": "string"
        },
        "email": {
          "title": "PlayersInscriptionsEntity.email",
          "type": "string"
        },
        "phoneNumber": {
          "title": "PlayersInscriptionsEntity.phoneNumber",
          "type": "string"
        },
        "photoURL": {
          "title": "PlayersInscriptionsEntity.photoURL",
          "nullable": true,
          "type": "string"
        },
        "isAdmin": {
          "title": "PlayersInscriptionsEntity.isAdmin",
          "type": "boolean"
        },
        "inscription": {
          "$ref": "#/definitions/Inscription",
          "title": "PlayersInscriptionsEntity.inscription"
        }
      },
      "required": [
        "uid",
        "displayName",
        "email",
        "phoneNumber",
        "isAdmin",
        "inscription"
      ],
      "additionalProperties": false,
      "title": "PlayersInscriptionsEntity",
      "type": "object"
    },
    "TeamsInscriptionsEntity": {
      "properties": {
        "id": {
          "title": "TeamsInscriptionsEntity.id",
          "type": "string"
        },
        "displayName": {
          "title": "TeamsInscriptionsEntity.displayName",
          "type": "string"
        },
        "logoUrl": {
          "title": "TeamsInscriptionsEntity.logoUrl",
          "type": "string"
        },
        "players": {
          "anyOf": [
            {
              "items": {
                "$ref": "#/definitions/PlayersEntity",
                "title": "TeamsInscriptionsEntity.players.[]"
              },
              "title": "TeamsInscriptionsEntity.players.[]",
              "type": "array"
            },
            {
              "title": "TeamsInscriptionsEntity.players",
              "nullable": true
            }
          ],
          "title": "TeamsInscriptionsEntity.players"
        },
        "inscription": {
          "$ref": "#/definitions/Inscription",
          "title": "TeamsInscriptionsEntity.inscription"
        }
      },
      "required": [
        "id",
        "displayName",
        "logoUrl",
        "inscription"
      ],
      "additionalProperties": false,
      "title": "TeamsInscriptionsEntity",
      "type": "object"
    },
    "PlayersEntity": {
      "properties": {
        "uid": {
          "title": "PlayersEntity.uid",
          "type": "string"
        },
        "email": {
          "title": "PlayersEntity.email",
          "type": "string"
        },
        "displayName": {
          "title": "PlayersEntity.displayName",
          "type": "string"
        },
        "photoURL": {
          "title": "PlayersEntity.photoURL",
          "nullable": true,
          "type": "string"
        },
        "phoneNumber": {
          "title": "PlayersEntity.phoneNumber",
          "type": "string"
        },
        "isAdmin": {
          "title": "PlayersEntity.isAdmin",
          "type": "boolean"
        },
        "nationality": {
          "title": "PlayersEntity.nationality",
          "type": "string"
        },
        "nationalityPrefix": {
          "title": "PlayersEntity.nationalityPrefix",
          "type": "string"
        },
        "createdAt": {
          "title": "PlayersEntity.createdAt",
          "type": "string"
        },
        "updatedAt": {
          "title": "PlayersEntity.updatedAt",
          "type": "string"
        },
        "deletedAt": {
          "title": "PlayersEntity.deletedAt",
          "nullable": true
        },
        "inscription": {
          "$ref": "#/definitions/Inscription",
          "title": "PlayersEntity.inscription"
        }
      },
      "required": [
        "uid",
        "email",
        "displayName",
        "phoneNumber",
        "isAdmin",
        "nationality",
        "nationalityPrefix",
        "createdAt",
        "updatedAt",
        "inscription"
      ],
      "additionalProperties": false,
      "title": "PlayersEntity",
      "type": "object"
    },
    "ErrorResponse": {
      "properties": {
        "statusCode": {
          "title": "ErrorResponse.statusCode",
          "type": "number"
        },
        "error": {
          "title": "ErrorResponse.error",
          "type": "string"
        },
        "message": {
          "title": "ErrorResponse.message",
          "type": "string"
        }
      },
      "required": [
        "statusCode",
        "error",
        "message"
      ],
      "additionalProperties": false,
      "title": "ErrorResponse",
      "type": "object"
    },
    "PlayerInitType": {
      "properties": {
        "uid": {
          "title": "PlayerInitType.uid",
          "type": "string"
        },
        "email": {
          "title": "PlayerInitType.email",
          "type": "string"
        },
        "displayName": {
          "title": "PlayerInitType.displayName",
          "type": "string"
        },
        "photoURL": {
          "title": "PlayerInitType.photoURL",
          "nullable": true,
          "type": "string"
        }
      },
      "required": [
        "uid",
        "email",
        "displayName"
      ],
      "additionalProperties": false,
      "title": "PlayerInitType",
      "type": "object"
    },
    "PlayerResponse": {
      "properties": {
        "message": {
          "title": "PlayerResponse.message",
          "type": "string"
        },
        "userInfo": {
          "$ref": "#/definitions/PlayerInfo",
          "title": "PlayerResponse.userInfo"
        }
      },
      "required": [
        "message",
        "userInfo"
      ],
      "additionalProperties": false,
      "title": "PlayerResponse",
      "type": "object"
    },
    "PlayerInfo": {
      "properties": {
        "uid": {
          "title": "PlayerInfo.uid",
          "type": "string"
        },
        "email": {
          "title": "PlayerInfo.email",
          "type": "string"
        },
        "displayName": {
          "title": "PlayerInfo.displayName",
          "type": "string"
        },
        "photoURL": {
          "title": "PlayerInfo.photoURL",
          "nullable": true,
          "type": "string"
        },
        "phoneNumber": {
          "title": "PlayerInfo.phoneNumber",
          "nullable": true,
          "type": "string"
        },
        "isAdmin": {
          "title": "PlayerInfo.isAdmin",
          "type": "boolean"
        },
        "nationality": {
          "title": "PlayerInfo.nationality",
          "nullable": true,
          "type": "string"
        },
        "nationalityPrefix": {
          "title": "PlayerInfo.nationalityPrefix",
          "nullable": true,
          "type": "string"
        },
        "createdAt": {
          "title": "PlayerInfo.createdAt",
          "nullable": true,
          "type": "string"
        },
        "updatedAt": {
          "title": "PlayerInfo.updatedAt",
          "nullable": true,
          "type": "string"
        },
        "deletedAt": {
          "title": "PlayerInfo.deletedAt",
          "nullable": true,
          "type": "string"
        }
      },
      "required": [
        "uid",
        "email",
        "displayName",
        "photoURL",
        "phoneNumber",
        "isAdmin",
        "nationality",
        "nationalityPrefix",
        "createdAt",
        "updatedAt",
        "deletedAt"
      ],
      "additionalProperties": false,
      "title": "PlayerInfo",
      "type": "object"
    }
  },
  "securityDefinitions": {
    "Authorization": {
      "type": "apiKey",
      "name": "Authorization",
      "in": "header"
    }
  },
  "basePath": "/dev"
};