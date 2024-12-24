const express =require('express');  
const app = express();
const port = 3000;

app.use(express.json());
// تشفير
app.use(express.urlencoded({
    extended: true
}))

const PersonData=[];
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
    console.log(PersonData)
    res.send(PersonData);
});


app.post('/api/newuser', (req, res) => {
    console.log("result", req.body);
    const pdata = {
        "id" : (PersonData.length + 1).toString(),
        "name" : req.body.pname,
        "email" : req.body.pemail,
        "password" : req.body.ppassword,
        "age" : req.body.page
    }
    PersonData.push(pdata);
    console.log("final result",PersonData);
    
    res.status(200).send({
        "Status_code": 200,
        "message": "User created successfully",
        "person_data": pdata,
    });
});

app.get("/api/users", (req, res) => {
    if(PersonData.length > 0 ){
        res.status(200).send({
            'status_code' : 200,
            'message' : 'All users data',
            "person" : PersonData,
    });
    }else{
        res.status(200).send({
            'status_code' : 200,
            'message' : 'No user found',
        });
    }
    console.log(PersonData);

})

// update user

app.put("/api/updateuser/:id", (req, res) => {
    let id = req.params.id; // Treat id as a string
    let personTOBEUpdated = PersonData.find((person) => person.id === id);
    if (personTOBEUpdated) {
        let index = PersonData.indexOf(personTOBEUpdated);
        PersonData[index] = {
            id: id,
            name: req.body.pname, // Corrected field names
            email: req.body.pemail,
            password: req.body.ppassword,
            age: req.body.page
        };
        res.status(200).send({
            "status_code": 200,
            "message": "User updated successfully",
            "person_data": PersonData[index],
        });
    } else {
        res.status(404).send({
            "status_code": 404,
            "message": "User not found",
        });
    }
})

app.delete("/api/deleteuser/:id", (req, res) => {
    let id = req.params.id;
    let personTOBEDELETED = PersonData.find((person) => person.id === id);
    if (personTOBEDELETED) {
        let index = PersonData.indexOf(personTOBEDELETED);
        PersonData.splice(index, 1);
        res.status(200).send({
            "status_code": 200,
            "message": "User deleted successfully",
            "person_data": personTOBEDELETED,
        });
    } else {
        res.status(404).send({
            "status_code": 404,
            "message": "User not found",
        });
    }
})