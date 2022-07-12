import { FETCH_DATA,FETCH_DATA_PENDING } from '../actions/types';

const initialState = {}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
	const { type, payload } = action;;
	switch (type) {
		case FETCH_DATA:
			return { ...state,
				tasks: payload.data };
		case FETCH_DATA_PENDING:
			return { ...state,
				pending_tasks: payload.data };

		default:
			return state;
	}
}
