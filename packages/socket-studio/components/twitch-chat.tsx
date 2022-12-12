import { mkdirSync } from 'fs';
import { rehype } from 'rehype';
import sanitize from 'rehype-sanitize';
import { useTwitchChat } from '../hooks';
import styles from './twitch-chat.module.css';

type TwitchChatProps = {
	username: string;
};

type Message = {
	time: number;
	username: string;
	roles: string[];
	html: string;
	highlighted: boolean;
};

export function TwitchChat({ username }: TwitchChatProps) {
	const { chat } = useTwitchChat(username);

	const messages: Message[] = chat
		.filter((msg) => !!msg.html) // skip if there’s no text
		.map((msg) => {
			return {
				time: Number(msg.time),
				username: msg.author.username,
				roles: msg.author.roles.map((r) => r.toLowerCase()),
				highlighted: msg.highlighted,
				html: rehype()
					.data('settings', { fragment: true })
					.use(sanitize, {
						strip: ['script'],
						protocols: {
							src: ['https'],
						},
						tagNames: ['img', 'marquee'],
						attributes: {
							img: ['src'],
							'*': ['alt'],
						},
					})
					.processSync(msg.html)
					.toString(),
			};
		})
		.filter((msg) => msg.html.length > 0); // skip if empty after sanitization

	return (
		<div className={styles.container}>
			<ul className={styles.chat}>
				{messages.map((msg) => (
					<li
						key={msg.time}
						className={styles.chatMessage}
						data-highlighted={msg.highlighted}
					>
						<span className={styles.author} data-role={msg.roles.join(' ')}>
							{msg.username}
						</span>
						<span
							className={styles.message}
							dangerouslySetInnerHTML={{ __html: msg.html }}
						/>
					</li>
				))}
			</ul>
		</div>
	);
}
