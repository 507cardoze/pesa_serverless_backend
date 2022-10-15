export interface UserInfoResponse {
	message: string;
	userInfo: UserInfo;
	upcomingEvents?: UpcomingEventsEntity[] | null;
}
export interface UserInfo {
	uid: string;
	displayName: string;
	email: string;
	phoneNumber: string;
	photoURL?: null;
	isAdmin: boolean;
	teams?: TeamsEntity[] | null;
	invitations?: InvitationsEntity[] | null;
}
export interface TeamsEntity {
	id: string;
	displayName: string;
	logoUrl: string;
	roles?: RolesEntity[] | null;
	inscription: Inscription;
}
export interface RolesEntity {
	id: string;
	name: string;
	roster: Roster;
}
export interface Roster {
	id: string;
	teamId: string;
	playerId: string;
	roleId: string;
	createdAt: string;
	updatedAt: string;
	deletedAt?: null;
}
export interface Inscription {
	id: string;
	eventId: string;
	teamId: string;
	playerId: string;
	createdAt: string;
	updatedAt: string;
	deletedAt?: null;
}
export interface InvitationsEntity {
	id: string;
	team: Team;
}
export interface Team {
	id: string;
	displayName: string;
	logoUrl: string;
}
export interface UpcomingEventsEntity {
	id: string;
	name: string;
	description: string;
	inscripInitDate: string;
	inscripEndDate: string;
	isCoaching: boolean;
	isLive: boolean;
	bannerUrl: string;
	gameMode: GameMode;
	videoGame: VideoGame;
	playersInscriptions?: (PlayersInscriptionsEntity | null)[] | null;
	teamsInscriptions?: (TeamsInscriptionsEntity | null)[] | null;
}
export interface GameMode {
	name: string;
	description: string;
}
export interface VideoGame {
	displayName: string;
	hardware?: HardwareEntity[] | null;
}
export interface HardwareEntity {
	displayName: string;
	videoGameHardware: VideoGameHardware;
}
export interface VideoGameHardware {
	id: string;
	idVideoGame: string;
	idHardware: string;
	createdAt: string;
	updatedAt: string;
	deletedAt?: null;
}
export interface PlayersInscriptionsEntity {
	uid: string;
	displayName: string;
	email: string;
	phoneNumber: string;
	photoURL?: string | null;
	isAdmin: boolean;
	inscription: Inscription;
}
export interface TeamsInscriptionsEntity {
	id: string;
	displayName: string;
	logoUrl: string;
	players?: PlayersEntity[] | null;
	inscription: Inscription;
}
export interface PlayersEntity {
	uid: string;
	email: string;
	displayName: string;
	photoURL?: string | null;
	phoneNumber: string;
	isAdmin: boolean;
	nationality: string;
	nationalityPrefix: string;
	createdAt: string;
	updatedAt: string;
	deletedAt?: null;
	inscription: Inscription;
}

export type ErrorResponse = {
	statusCode: number;
	error: string;
	message: string;
};
