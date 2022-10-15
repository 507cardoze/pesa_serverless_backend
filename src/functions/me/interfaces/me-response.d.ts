export interface UserInfoType {
	message: string;
	userInfo: UserInfo;
	upcomingEvents: UpcomingEvent[];
}

export interface UpcomingEvent {
	id: string;
	name: string;
	description: string;
	inscripInitDate: Date;
	inscripEndDate: Date;
	isCoaching: boolean;
	isLive: boolean;
	bannerUrl: string;
	gameMode: GameMode;
	videoGame: VideoGame;
	playersInscriptions: UserInfo[];
	teamsInscriptions: TeamElement[];
}

export interface GameMode {
	name: string;
	description: string;
}

export interface UserInfo {
	uid: string;
	displayName: string;
	email: string;
	phoneNumber: string;
	photoURL: null | string;
	isAdmin: boolean;
	inscription?: Inscription;
	teams?: TeamElement[];
	invitations?: Invitation[];
}

export interface Inscription {
	id: string;
	eventId?: string;
	teamId: string;
	playerId: string;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: null;
	roleId?: string;
}

export interface Invitation {
	id: string;
	team: InvitationTeam;
}

export interface InvitationTeam {
	id: string;
	displayName: string;
	logoUrl: string;
}

export interface TeamElement {
	id: string;
	displayName: string;
	logoUrl: string;
	players?: Player[];
	inscription: Inscription;
	roles?: Role[];
}

export interface Player {
	uid: string;
	email: string;
	displayName: string;
	photoURL: null | string;
	phoneNumber: string;
	isAdmin: boolean;
	nationality: string;
	nationalityPrefix: string;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: null;
	inscription: Inscription;
}

export interface Role {
	id: string;
	name: string;
	roster: Inscription;
}

export interface VideoGame {
	displayName: string;
	hardware: Hardware[];
}

export interface Hardware {
	displayName: string;
	videoGameHardware: VideoGameHardware;
}

export interface VideoGameHardware {
	id: string;
	idVideoGame: string;
	idHardware: string;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: null;
}
