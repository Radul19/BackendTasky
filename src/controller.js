const db = require('./database');
const { v4: uuidv4 } = require("uuid")
const moment = require('moment')
const fs = require('fs')


const Ctr = {}

Ctr.home = (req,res)=>{
    res.send('hello home page')
}

Ctr.getUserData = async (req, res) => {
    const { id } = req.params
    const result = await db.query('SELECT * FROM users WHERE id = $1', [id])
    // console.log(result.rows);
    res.send(result.rows[0])
}

Ctr.getUser = async (req, res) => {
    const { user, pass } = req.body
    const result = await db.query('SELECT * FROM users WHERE username = $1', [user])

    if (result.rows[0] == undefined) {
        res.send({ error: 'El usuario no existe' })
    }
    else if (user == result.rows[0].username) {
        if (pass == result.rows[0].userpass) {
            res.send({ user: user, id: result.rows[0].id })
        } else {
            res.send({ error: 'La contrasena es incorrecta, intente nuevamente' })
        }
    }
    else {
        res.send({ error: 'El usuario no existe' })
    }
    // res.send(test.rows[0])
    // res.send({})
}

Ctr.getDashboard = async (req, res) => {
    const result = await db.query('SELECT * FROM tasks WHERE owner = $1', [req.params.id])
    res.send(result.rows)
}
Ctr.getTask = async (req, res) => {
    const result = await db.query('SELECT * FROM tasks WHERE id = $1', [req.params.id])
    res.send(result.rows)
}
Ctr.saveTask = async (req, res) => {
    console.log('SAVE TASK ///////////////');
    const newId = uuidv4()
    const { task, expire, reminder } = req.body
    let { notifid } = req.body
    let imagename
    if(task.imageBase64 != null){
        fs.writeFile(`./src/images/${task.createtime}.jpg`, task.imageBase64, 'base64', (err) => {
            if (err) throw err
        })
        imagename = task.createtime
    }else{
        imagename = null
    }

    // console.log(req.body);
    // console.log(task);
    let { title, description, owner, exptime, createtime, tag, notifytime} = task
    if (!expire) exptime = null
    if (!reminder) {
        notifytime = null
        notifid = null
    }


    const result = await db.query("INSERT INTO tasks (owner, title, description, exptime,createtime, tag, id,pinned,imagename,notifytime,notifid) VALUES ($1 ,$2 ,$3 ,$4 ,$5,$6,$7,$8,$9,$10,$11)", [
        owner, title, description, exptime, createtime, tag, newId, 0,imagename, notifytime, notifid,
    ]);
    // console.log(test);
    res.send(result.rows)

}

Ctr.updateTask = async (req, res) => {
    console.log('UPDATE TASK ///////////////');
    const { task, expire, reminder } = req.body
    let { notifid } = req.body
    let { title, description, exptime, tag, notifytime, id } = task

    console.log(req.body);
    // console.log(expire);
    // console.log(reminder);

    if (!expire) exptime = null
    if (!reminder) {
        notifytime = null
        notifid = null
    }

    const result = await db.query("UPDATE tasks SET title = $1, description = $2, exptime = $3 ,notifytime = $4 ,notifid = $5,tag = $6 WHERE id = $7", [
        title,
        description,
        exptime,
        notifytime,
        notifid,
        tag,
        id
    ]);

    res.send(result.rows);
    // res.send({})
}


Ctr.deleteTask = async (req, res) => {
    console.log('pass here');
    const result = await db.query("DELETE FROM tasks WHERE id = $1", [
        `${req.params.id}`
    ]);
    console.log(req.params.id)
    console.log('task delete');
    res.send(result.rows)
}


Ctr.registerUser = async (req, res) => {
    const { username, password } = req.body
    const now = moment().format('x')
    const result = await db.query("INSERT INTO users (username, userpass,id,createtime,family,personal,friends,job,taskcomplete) VALUES ($1 ,$2 ,$3,$4,$5,$6,$7,$8,$9)",
        [username, password, uuidv4(), now, 0, 0, 0, 0, 0]);
    res.send(result.rows)
}

Ctr.completeTask = async (req, res) => {
    console.log(req.body);
    const { tag, id } = req.body
    const result2 = await db.query('DELETE FROM tasks WHERE id = $1', [id])
    if (result2.rowCount != 0) {
        console.log('test');
        const result1 = await db.query(`UPDATE users SET ${tag} = ${tag} + 1, taskcomplete = taskcomplete + 1 `)
    }
    res.send({})
}

Ctr.pinTask = async (req, res) => {
    const { id, pin } = req.body
    let aux
    if (pin == 1) { aux = 0 } else { aux = 1 }
    const result = await db.query('UPDATE tasks SET pinned = $1 WHERE id = $2', [
        aux,
        id,
    ])
    res.send(result.rows)
}

Ctr.searchTasks = async (req, res) => {

    const { id, title } = req.params
    const fixTitle = '%' + title + '%'
    console.log(title);
    console.log(id);
    const result = await db.query(`SELECT * FROM tasks WHERE owner = $1 AND title LIKE $2 `, [id, fixTitle])
    console.log(result.rows);
    res.send(result.rows)
}
////////////////////////////////////////////////////////////////////////////////////// 
////////////////////////// EXPERIMENTAL UPLOAD IMAGE
/////////////////////////////////////////////////////////////////////////////////////
// Ctr.loadImage = async (req, res) => {

//     // console.log(req.body);
//     console.log('what');
//     fs.writeFile(`./src/images/${req.body.title}.jpg`, req.body.imgsource, 'base64', (err) => {
//         if (err) throw err
//     })
//     // res.status(200)
//     res.send({})
// }
// // const imgage = require('./images/1626678074410')
// Ctr.getImage=(req,res)=>{
//     console.log('passing here');
//     let img = fs.readFile(`./src/images/${req.params.name}.jpg`,(err,data)=>{
//         // console.log(data);
//         let base64 = Buffer.from(data).toString('base64');
//         base64='data:image/png;base64,'+base64;
//         // console.log(base64);
//         // res.send(base64);
//         res.send({uri:base64})
//     })
//     // console.log(req.params.name);
//     // console.log(img);
//     // res.send({})    
// }
// // const xd = require('./images/')

module.exports = Ctr