const client = require("./../db");

module.exports.getUserTeams = async (req, res) => {
  try {
    const sql = `SELECT 
                        e.user_id AS id, e.display_name AS empName, 
                        m.display_name AS manager, 
                        teams.team_id,
                        teams.display_name AS team_name
                    FROM users AS e 
                    LEFT JOIN 
                        users AS m ON e.manager_id = m.user_id 
                    LEFT JOIN 
                        user_teams ON e.user_id = user_teams.user_id 
                    LEFT JOIN 
                        teams ON user_teams.team_id = teams.team_id 
                    ORDER BY 
                        team_id ASC, manager ASC NULLS FIRST`;
    const query = await client.query(sql);
    if (query) {
      if (query.rows.length > 0) {
        let empList = new Map();
        // console.log('Users data >> ', query.rows)
        query.rows.map((row) => {
          // console.log('Row', row)
          if (empList.has(row.id)) {
            let existingData = empList.get(row.id);
            existingData.team.push({
              id: row.team_id,
              name: row.team_name,
            });
            empList.set(row.id, existingData);
          } else {
            empList.set(row.id, {
              id: row.id,
              empName: row.empname,
              manager: row.manager,
              team: [
                {
                  id: row.team_id,
                  name: row.team_name,
                },
              ],
            });
          }
        });
        const users = [];
        let k = 0;
        for (const [key, value] of empList) {
          users.push(value);
        }
        res.status(200).json({
          status: 1,
          data: users,
          // data: Object.fromEntries(empList)
        });
      }
    }
  } catch (e) {
    console.log("Exp", e);
    res.json({
      status: 0,
      data: null,
      err: e,
    });
  }
};

module.exports.updateUser = async (req, res) => {
  console.log("POST data: ", req.body);
  try {
    const sql = {
      text: "SELECT user_id, display_name, manager_id FROM users WHERE user_id = $1 LIMIT 1",
      values: [req.body.id],
    };
    const query = await client.query(sql);

    if (!query.rows || query.rows.length === 0) {
      res.status(401).json({
        status: 0,
        data: null,
        err: "Invalid user",
      });
    }

    let responseObj = {
      status: 0,
      data: null,
      err: null,
    };

    try {
      await client.query("BEGIN");

      /* 1. Update users table */
      const sql = {
        text: "UPDATE users SET display_name = $1 WHERE user_id = $2",
        values: [req.body.empName, req.body.id],
      };
      const query = await client.query(sql);

      /* 2. Delete and insert in user_teams table */
      const sql1 = {
        text: "DELETE FROM user_teams WHERE user_id = $1",
        values: [req.body.id],
      };
      const query1 = await client.query(sql1);

      /* If manager's team is updated, then update all team member's team as well */
      // if (!query.rows[0].manager_id) {

      // }

      const userTeamsArr = [];
      let valIndex = 1;
      let valueIndexArr = [];
      // ['t1','t2', 't3] -> VALUES (1,2), (3,4), (5,6)
      req.body.team.map((t, k) => {
        valueIndexArr.push(`( $${valIndex}, $${valIndex + 1} )`);
        userTeamsArr.push(req.body.id);
        userTeamsArr.push(t);
        valIndex += 2;
      });

      const sql2 = {
        text:
          `INSERT INTO user_teams (user_id, team_id) VALUES ` +
          valueIndexArr.join(","),
        values: userTeamsArr,
      };
      const query2 = await client.query(sql2);

      responseObj.status = 1;
      responseObj.data = req.body;
      await client.query("COMMIT");
    } catch (e) {
      responseObj.err = e;
      await client.query("ROLLBACK");
    } finally {
      // client.release();
    }
    res.json(responseObj);

    // req.body.empName
  } catch (e) {
    console.log("Exp", e);
    res.json({
      status: 0,
      data: null,
      err: e,
    });
  }
};

module.exports.login = async (req, res) => {
  if (req.body.username === "test" && req.body.password === "test") {
    return res.json({
      status: 1,
      data: {
        userName: "test123",
        token: "user123_token",
      },
      err: null,
    });
  }
  res.json({
    status: 0,
    data: null,
    err: "Invalid credentials",
  });
};

module.exports.getAllTeams = async (req, res) => {
  try {
    const sql = `SELECT * FROM teams`;
    const query = await client.query(sql);
    if (query) {
      res.status(200).json({
        status: 1,
        data: query.rows,
      });
    }
  } catch (e) {
    console.log("Exp", e);
    res.json({
      status: 0,
      data: null,
      err: e,
    });
  }
};

module.exports.getManagerByTeam = async (req, res) => {
  try {
    if (!req.body.teamId) {
      return res.json({
        status: 0,
        data: null,
        err: "Invalid team",
      });
    }
    const sql = `SELECT 
                    e.user_id AS id, e.display_name 
                FROM users AS e 
                INNER JOIN 
                    user_teams ON e.user_id = user_teams.user_id 
                INNER JOIN 
                    teams ON user_teams.team_id = teams.team_id 
                WHERE 
                    teams.team_id = $1  AND manager_id IS NULL  
                ORDER BY 
                    teams.team_id ASC`;
    const query = await client.query(sql, [req.body.teamId]);
    if (query) {
      res.status(200).json({
        status: 1,
        data: query.rows,
      });
    }
  } catch (e) {
    console.log("Exp", e);
    res.json({
      status: 0,
      data: null,
      err: e,
    });
  }
};
