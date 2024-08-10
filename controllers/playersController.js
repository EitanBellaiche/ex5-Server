exports.playersController = {
    async addPlayer(req, res) {
        try {
            console.log('Received data:', req.body); 

            const { dbConnection } = require('../db_connection');
            const { player_name, player_goals, player_match_played, player_description } = req.body;

            if (!player_name || !player_goals || !player_match_played || !player_description) {
                console.log('Missing fields:', {
                    player_name,
                    player_goals,
                    player_match_played,
                    player_description
                });
                return res.status(400).json({ success: false, message: 'Missing required fields' });
            }

            const connection = await dbConnection.createConnection();

            const [playerInfo] = await connection.execute(
                `INSERT INTO tbl_15_players (player_name, player_goals, player_match_played, player_description)
                 VALUES (?, ?, ?, ?)
                 ON DUPLICATE KEY UPDATE
                 player_name = VALUES(player_name),
                 player_goals = VALUES(player_goals),
                 player_match_played = VALUES(player_match_played),
                 player_description = VALUES(player_description)`,
                [player_name, player_goals, player_match_played, player_description]
            );

            console.log('Player added or updated successfully:', playerInfo);

            connection.end();

            res.json({ success: true, message: 'Player added or updated successfully!', playerInfo });
        } catch (error) {
            console.error('Error adding or updating player:', error);
            res.status(500).json({ success: false, message: 'Failed to add or update player', error: error.message });
        }
    },

    async getPlayers(req, res) {
        try {
            const { dbConnection } = require('../db_connection');
            const connection = await dbConnection.createConnection();

            const [players] = await connection.execute('SELECT player_name, player_goals, player_match_played, player_description FROM tbl_15_players');
            
            connection.end();

            res.json(players);
        } catch (error) {
            console.error('Error fetching players:', error);
            res.status(500).json({ success: false, message: 'Failed to fetch players', error: error.message });
        }
    },

    async deletePlayer(req, res) {
        try {
            const { playerName } = req.params;

            const { dbConnection } = require('../db_connection');
            const connection = await dbConnection.createConnection();

            const [result] = await connection.execute(
                `DELETE FROM tbl_15_players WHERE player_name = ?`, [playerName]
            );
            
            connection.end();

            if (result.affectedRows > 0) {
                res.json({ success: true, message: 'Player deleted successfully.' });
            } else {
                res.status(404).json({ success: false, message: 'Player not found.' });
            }
        } catch (error) {
            console.error('Error deleting player:', error);
            res.status(500).json({ success: false, message: 'Failed to delete player', error: error.message });
        }
    },

    async updatePlayer(req, res) {
        try {
            const { old_name, player_name, player_goals, player_match_played, player_description } = req.body;
    
            if (!old_name || !player_name || !player_goals || !player_match_played || !player_description) {
                console.log('Missing fields for update:', {
                    old_name,
                    player_name,
                    player_goals,
                    player_match_played,
                    player_description
                });
                return res.status(400).json({ success: false, message: 'Missing required fields for update' });
            }
    
            const { dbConnection } = require('../db_connection');
            const connection = await dbConnection.createConnection();
    
            const [result] = await connection.execute(
                `UPDATE tbl_15_players 
                 SET player_name = ?, player_goals = ?, player_match_played = ?, player_description = ? 
                 WHERE player_name = ?`, 
                [player_name, player_goals, player_match_played, player_description, old_name]
            );
    
            connection.end();
    
            if (result.affectedRows > 0) {
                res.json({ success: true, message: 'Player updated successfully.' });
            } else {
                res.status(404).json({ success: false, message: 'Player not found.' });
            }
        } catch (error) {
            console.error('Error updating player:', error);
            res.status(500).json({ success: false, message: 'Failed to update player', error: error.message });
        }
    }
    
};
