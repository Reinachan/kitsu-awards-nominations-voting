export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			KITSU_ENV: 'test' | 'dev' | 'prod';
		}
	}
}
