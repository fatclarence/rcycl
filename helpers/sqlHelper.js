

export const createTable = (db) => {
    db.transaction(tnx => {
        tnx.executeSql(
        `CREATE TABLE IF NOT EXISTS hobbies (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), hobby VARCHAR(20))`,
        [],
        (sqlTnx, res) => {
            console.log("Table Created Successfully");
        },
        error => {
            console.log("error on creating table: " + error.message);
        },
        );
    });
};
    
export const addHobies= (db, data) => {
    if (!data) {
        console.log("data not available");
            return false;
    } else {
        db.transaction(txn => {
            for (let i = 0; i < ata.length; ++i)
            txn.executeSql(
                `INSERT INTO hobbies(name, hobby) VALUES (?, ?)`,
                [
                    data[i].name,
                    data[i].hobby
                ],
                (sqlTxn, res) => {
                    console.log(`${data[i].hobby} added successfully`);
                },
                error => {
                    console.log("error on adding hobby " + error.message);
                },
            );
        });
    }
};
    
export const getLocalData = (db, setData) => {
    db.transaction(txn => {
    txn.executeSql(
    `SELECT * FROM hobbies ORDER BY id DESC`,
    [],
    (sqlTnx, res) => {
    console.log("data retrieved successfully");
    
    let len = res.rows.length;
    if (len > 0) {
    let result = [];
    for (let i = 0; i < len; i++) {
    const item = res.rows.item(i);
    result.push({
    id: item.id,
    title: item.name,
    rating: item.hobby
    });
    }
    setData(result);
    }
    },
    error => {
    console.log("error in getting result: ", error.message);
    },
    );
    });
};
    
export const deleteItem = (db, id) => {
    let query = `DELETE * FROM hobbies WHERE id = ${id}`;
    db.transaction(txn => {
    txn.executeSql(
    query,
    [],
    (sqlTnx, res) => {
    console.log("item deleted successfully");
    },
    error => {
    console.log("error in getting restaurant: ", error.message);
    },
    );
    });
}