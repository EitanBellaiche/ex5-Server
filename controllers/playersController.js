exports.playersController = {
    async addPlayer(req, res) {
        console.log('Received data:', req.body);
        const { dbConnection } = require('../db_connection');
        const { player_id, player_name, player_goals, player_match_played, player_description } = req.body;

        console.log('Received data:', req.body); 

        try {
            const connection = await dbConnection.createConnection();

            const [playerInfo] = await connection.execute(
                `INSERT INTO tbl_15_players (player_name, player_goals, player_match_played, player_description)
                 VALUES (?, ?, ?, ?, ?)
                 ON DUPLICATE KEY UPDATE
                 player_name = VALUES(player_name),
                 player_goals = VALUES(player_goals),
                 player_match_played = VALUES(player_match_played),
                 player_description = VALUES(player_description)`,
                [player_id, player_name, player_goals, player_match_played, player_description]
            );
            
            connection.end();

            res.json({ success: true, message: 'Player added or updated successfully!' ,playerInfo});
        } catch (error) {
            console.error('Error adding or updating player:', error);
            res.status(500).json({ success: false, message: 'Failed to add or update player', error: error.message });
        }
    }
};
