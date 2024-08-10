exports.playersController = {
    async addPlayer(req, res) {
        const { dbConnection } = require('../db_connection');
        const { player_name, goals, red_cards, description } = req.body;

        try {
            const connection = await dbConnection.createConnection();

            const query = `
                INSERT INTO tbl_15_players (player_name, goals, red_cards, description)
                VALUES (?, ?, ?, ?)
            `;
            await connection.execute(query, [player_name, goals, red_cards, description]);
            connection.end();

            res.json({ success: true, message: 'Player added successfully!' });
        } catch (error) {
            console.error('Error adding player:', error);
            res.status(500).json({ success: false, message: 'Failed to add player', error: error.message });
        }
    }
};
