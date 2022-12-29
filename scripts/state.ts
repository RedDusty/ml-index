import {atom} from 'recoil';

export const modelState = atom<modelsType | null>({
	key: 'modelState',
	default: null
});
