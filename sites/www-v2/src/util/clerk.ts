import { createClerkClient } from '@clerk/backend';
import { CLERK_SECRET_KEY } from 'astro:env/server';

const clerk = createClerkClient({
	secretKey: CLERK_SECRET_KEY,
});

export async function loadUsersByIDs(ids: Array<string>) {
	const result = await clerk.users.getUserList({
		userId: ids,
	});

	return result.data;
}

export async function getUserByUsername(username: string) {
	const result = await clerk.users.getUserList({
		username: [username],
		limit: 1,
	});

	return result.data.at(0);
}

export async function createUser(user: CreateUserParams) {
	try {
		const result = await clerk.users.createUser(user);

		return result;
	} catch (error: any) {
		if (error.errors.at(0).code === 'form_identifier_exists') {
			const result = await clerk.users.getUserList({
				username: [user.username!],
				limit: 1,
			});

			return result.data.at(0);
		}
	}
}
