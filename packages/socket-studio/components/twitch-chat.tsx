import { useTwitchChat } from '../hooks';
import styles from './twitch-chat.module.css';

type TwitchChatProps = {
	username: string;
};

export function TwitchChat({ username }: TwitchChatProps) {
	const { chat } = useTwitchChat(username);

	return (
		<ul className={styles.chat}>
			{chat.map((msg) => (
				<li key={msg.time} className={styles.chatMessage}>
					<span className={styles.author}>{msg.author.username}</span>
					<span
						className={styles.message}
						dangerouslySetInnerHTML={{ __html: msg.html }}
					/>
				</li>
			))}
		</ul>
	);
}
