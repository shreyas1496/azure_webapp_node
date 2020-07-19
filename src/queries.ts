export const addMessage = (sender: string, message: string) =>
  `INSERT INTO messages (message , sender ) values ('${message}', '${sender}') `;

export const lastNMessages = ({ limit }: { limit: number }) =>
  `SELECT * FROM (
    SELECT * FROM messages ORDER BY id DESC LIMIT ${limit}
) sub
ORDER BY id ASC`;
