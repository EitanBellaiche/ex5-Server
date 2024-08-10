exports.playersController = {
    async getPlayersData(req, res) {
        const { dbConnection } = require('../db_connection');
        try {
            const connection = await dbConnection.createConnection();
            const [playersData] = await connection.execute('SELECT * FROM tbl_15_players;');
            connection.end();
            res.json({ success: true, playersData });
        } catch (error) {
            console.error('Error fetching event Notification:', error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    }
    };