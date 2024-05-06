const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const pool = require('./conn.js'); // Assuming conn.js exports the database connection
const path = require('path');
const ejs = require('ejs');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT id,role FROM login_table WHERE username = ? AND password = ?';         //role = 1(admin) , 2(employee)
    pool.query(sql, [username, password], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        if (result.length > 0) {
            req.session.userId = result[0].id;
            req.session.userRole = result[0].role;
          //console.log(result[0].role);
            if(result[0].role==1){
                 res.redirect('/admin-page');
            }
            else if(result[0].role==2){
                res.redirect('/employee-page');
                //console.log("Emplyoee-page");
            }
           
            
        } else {    
            res.send('Invalid username or password');
        }
    });
});


app.get('/admin-page', (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
        res.status(401).send('Unauthorized');
        return;
    }

    const sqlPend = 'SELECT * FROM request_ticket WHERE status = 1';
    const sqlProg = 'SELECT * FROM request_ticket WHERE status = 2';
    const sqlComp = 'SELECT * FROM request_ticket WHERE status = 0';

    pool.query(sqlPend, (err, pendingTickets) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        pool.query(sqlComp, (err, completedTickets) => {
            if (err) {
                console.error('Database error:', err);
                res.status(500).send('Internal Server Error');
                return;
            }

            pool.query(sqlProg, (err, inProgressTickets) => {
                if (err) {
                    console.error('Database error:', err);
                    res.status(500).send('Internal Server Error');
                    return;
                }

                res.render('adash4', {
                    pendingTickets: pendingTickets,
                    completedTickets: completedTickets,
                    inProgressTickets: inProgressTickets
                });
                // res.render('adash3',{
                //     pendingTickets: pendingTickets,
                //     completedTickets: completedTickets,
                //     inProgressTickets: inProgressTickets,
                // });
            });
        });
    });
});

// ------------------------------------------------------------------------------------------------------
app.get('/view-details-pending', (req, res) => {
    const userId = req.session.id;
    if (!userId) {
        res.status(401).send('Unauthorized');
        return;
    }
    const sqlPend = 'SELECT * FROM request_ticket WHERE status = 1'; 
    const name = "Pending";                               //pending
    pool.query(sqlPend, (err, result) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.render('styles', {tickets:result,name1:name});
       
    });
});

app.get('/view-details-progress', (req, res) => {
    const userId = req.session.id;
    if (!userId) {
        res.status(401).send('Unauthorized');
        return;
    }
    const sqlProg = 'SELECT * FROM request_ticket WHERE status = 2'; 
    const name = "In Progress";                        //completed
    pool.query(sqlProg, (err, result) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.render('styles', {tickets:result,name1:name});
    });
});
app.get('/view-details-completed',  (req, res) => {
    const userId = req.session.id;
    if (!userId) {
        res.status(401).send('Unauthorized');
        return;
    }
    const sqlComp = 'SELECT * FROM request_ticket WHERE status = 0'; 
    const name = "Completed";            //In prorgess
    pool.query(sqlComp, (err, result) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.render('styles', {tickets:result,name1:name});
    });
});
// -------------------------------------------------------------------------------------------------------






app.post('/create-ticket', async (req, res) => {
    const { requestType, key1, summary, reporter, assignee, urgency, time } = req.body;
    const status = 1;
    try {
        const sql = 'INSERT INTO request_ticket (requestType, key1, summary, reporter, assignee, urgency, time , status) VALUES (?, ?, ?, ?, ?, ?, ?,?)';
        await pool.query(sql, [requestType, key1, summary, reporter, assignee, urgency, time , status]);
        
        console.log('Ticket inserted successfully:', { requestType, key1, summary, reporter, assignee, urgency, time });
       // res.json({ success: true, message: 'Ticket submitted successfully' });
       
    } catch (error) {
        console.error('Error inserting ticket:', error);
        res.status(500).json({ success: false, error: 'Error inserting ticket' });
    }
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));

app.get('/employee-page', (req, res) => {
    res.sendFile(__dirname + '/create_issue.html');
});